const callbackArray=[]; 
export const observer = new MutationObserver(function(mutationList, observer){
    callbackArray.reduce((acc,cur,idx)=>{
        if(!acc)return false;var c=cur(mutationList, observer);
        return c;
    },true);
}); 

observer.observe(document,{childList:true,subtree:true}); 

export function addObserverCallback(callbackFunction){callbackArray.push(callbackFunction);}