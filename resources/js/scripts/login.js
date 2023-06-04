import ValidForm from "../helpers/ValidForm";

export default function () {
    const options = {
        "nickname": { min: 3, max: 16, },
        "password": { min: 9, },
    };
    const callbackWhenAllCompleted = (e) => {
        console.log(e);
    };
    const validForm = new ValidForm(".form#login-form", options, callbackWhenAllCompleted);

    validForm.init();
}