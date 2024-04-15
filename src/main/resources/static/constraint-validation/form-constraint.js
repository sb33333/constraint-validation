const ERROR_CONTAINER_SUFFIX="-error";
let forms=[]; 
/** mutation observer로 form삭제를 확인하고 event listener를 해제합니다.*/ 
const cb = function(mutationList) {
    mutationList.forEach(mutation=>{
        Array.from(mutation.removedNodes)
            .flatMap(removedNode=>{
                if(forms.includes(removedNode)) return [removedNode]; 
                else{
                    var f =removedNode.querySelectorAll?.("form");
                    if(f?.length >0) {
                        return Array.from(f).filter(e=>forms.includes(e));
                    }else{
                        return[];
                    }
                }
            })
            .forEach(removedForm=>{
                removeCustomFormValidation(removedForm);
                forms=forms.filter(elelemt=>element!==removedForm);
            });
        });
    return true;
} 
import ("./global-mutation-observer.js")
    .then(module=>{module.addObserverCallback(cb);})
    .catch(error=>console.log(error)); 
    
function inputEventHandler({target}){
    var {validity, validationMessage}=target; 
    if(validity.valid) target.removeAttribute("aria-invalid");
    else target.setAttribute("aria-invalid", true); 
    var container=null; 
    if(container = findErrorContainer(target)){
        container.innerHTML=validity.valid?"":validationMessage;
    }
} 

function submitEventHandler(event){
    event.preventDefault(); 
    var form=this;
    var invalidElements=Array.from(form.elements).filter(control=>!control.validity.valid); 
    if(invalidElements.length ===0) {
        form.submit();
        return true;
    }else{
        form.invalidElementArrayConsumer(invalidElements);
        return false;
    }
} 

function defaultInvalidElementArrayConsumer(invalidElementArray){
    var target=invalidElementArray[0];
    if(target){
        alert(target.validationMessage);
        target.focus();
    }
    return;
} 

function findErrorContainer(inputElement){
    var errorContainerId=inputElement.getAttribute("aria-describedby")?.split(" ").find(id=>id.includes(inputElement.form.errorContainerSuffix));
    return document.querySelector("#"+errorContainerId);
} 

function appendCustomFormValidation(formElement){
    formElement.setAttribute("novalidate", ""); 
    formElement.addEventListener("input", inputEventHandler);
    formElement.addEventListener("submit", submitEventHandler); 
    Object.defineProperties(formElement, {
        "errorContainerSuffix":{get:function(){return this._errorContainerSuffix;}, set:function(val){this._errorContainerSuffix=val;},configurable:true},
        "invalidElementArrayConsumer":{get:function(){return this._invalidElementArrayConsumer;}, set:function(func){this._invalidElementArrayConsumer=func;}, configurable:true}
    });
    formElement.errorContainerSuffix = ERROR_CONTAINER_SUFFIX; 
    formElement.invalidElementArrayConsumer = defaultInvalidElementArrayConsumer;
    forms.push(formElement);
} 

/** form event listener를 해제합니다. */ 
function removeCustomFormValidation(formElement){
    formElement.removeAttribute("novalidate");
    formElement.removeEventListener("input", inputEventHandler); 
    formElement.removeEventListener("submit", submitEventHandler); 
    delete formElement?.errorContainerSuffix; 
    delete formElement?.invalidElementArrayConsumer;
} 

export {appendCustomFormValidation};