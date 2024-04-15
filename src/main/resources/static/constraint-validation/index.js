import * as FormConstraint from "./form-constraint.js";

FormConstraint.appendCustomFormValidation(document.querySelector("#validationForm"));

document.querySelector("#submitButton").addEventListener("click", function() {
    var form = document.querySelector("#validationForm");
    form.requestSubmit();
});

document.querySelector("[name=test1").addEventListener("input", function() {
    var value = this.value;
    if (value.length < 5) {
        this.setCustomValidity("length is less than 5");
    } else {
        this.setCustomValidity("");
    }
});
document.querySelector("[name=test2").addEventListener("input", function() {
    var value = this.value;
    if (value.length > 10) {
        this.setCustomValidity("length is greater than 10");
    } else {
        this.setCustomValidity("");
    }
});