export default class ValidForm {
    constructor(selectorForm, options, callbackWhenAllCompleted, callbackWhenFailed) {
        this.options = options;
        this.validClassName = "form__input-block--valid";
        this.invalidClassName = "form__input-block--invalid";
        this.form = document.querySelector(selectorForm);
        this.allComplete = false;
        this.callbackWhenAllCompleted = callbackWhenAllCompleted;
        this.callbackWhenFailed = callbackWhenFailed;
        this.completeNames = [];
        this.failedNames = [];
    }

    _getElementByName(name) {
        return document.querySelector(`[name=${name}]`);
    }

    checkMin(min, value) {
        return value.length >= min;
    }

    checkMax(max, value) {
        return value.length <= max;
    }

    checkEmail(value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }

    checkEqual(val1, val2) {
        return val1 === val2;
    }

    isFile(value) {
        return value instanceof File;
    }

    _getOptionsExceptTypeFile() {
        return Object
            .keys(this.options)
            .filter((n) => this._getElementByName(n).type !== "file")
            .reduce((acc, name) => {
                acc.push({
                    name,
                    element: this._getElementByName(name),
                    options: this.options[name],
                });

                return acc;
            }, []);
    }

    _getOptionsOnlyWithTypeFile() {
        return Object
            .keys(this.options)
            .filter((n) => this._getElementByName(n).type === "file")
            .reduce((acc, name) => {
                acc.push({
                    name,
                    element: this._getElementByName(name),
                    options: this.options[name],
                });

                return acc;
            }, []);
    }

    checkAll(name, value) {
        const options = this.options[name];
        const res = {};

        for (const option in options) {
            switch (option) {
                case "min":
                    res[option] = this.checkMin(options[option], value);
                    break;
                case "max":
                    res[option] = this.checkMax(options[option], value);
                    break;
                case "equal":
                    res[option] = this.checkEqual(options[option], value);
                    break;
                case "email":
                    res[option] = this.checkEmail(value);
                    break;
                case "file":
                    res[option] = this.isFile(value);
                    break;
            }
        }

        return Object.values(res).every(Boolean);
    }

    _setValidElement(element) {
        element.classList.remove(this.invalidClassName);
        element.classList.add(this.validClassName);
    }

    _setInvalidElement(element) {
        element.classList.remove(this.validClassName);
        element.classList.add(this.invalidClassName);
    }

    _inputIsComplete(name, element) {
        const findIndexName = this.failedNames.indexOf(name);

        if (findIndexName !== -1) {
            this.failedNames.splice(findIndexName, 1);
        }

        if (!this.completeNames.includes(name)) {
            this.completeNames.push(name);
        }

        element && this._setValidElement(element);
    }

    _inputIsFailed(name, element) {
        const findIndexName = this.completeNames.indexOf(name);

        if (findIndexName !== -1) {
            this.completeNames.splice(findIndexName, 1);
        }

        if (!this.failedNames.includes(name)) {
            this.failedNames.push(name);
        }

        element && this._setInvalidElement(element);
    }

    _checkAllStatesOnCompleted() {
        this.allComplete = this.completeNames.length === Object.keys(this.options).length;
    }

    _handlerValueInput(element, name) {
        const blockInput = element.closest(".form__input-block");
        const checkIsComplete = this.checkAll(name, element.value);

        if (checkIsComplete) {
            this._inputIsComplete(name, blockInput);
        } else {
            this._inputIsFailed(name, blockInput);
        }

        this._checkAllStatesOnCompleted();
    }

    _setEventInputs() {
        this._getOptionsExceptTypeFile().forEach(({ name, element, }) => {
            element.addEventListener("input", this._handlerValueInput.bind(this, element, name));
            element.addEventListener("blur", this._handlerValueInput.bind(this, element, name));
        });

        this._getOptionsOnlyWithTypeFile().forEach(({ name, element, }) => {
            element.addEventListener("change", (e) => {
                const file = e.target.files[0];
                const checkIsComplete = this.checkAll(name, file);

                if (checkIsComplete) {
                    this._inputIsComplete(name);
                } else {
                    this._inputIsFailed(name);
                }

                this._checkAllStatesOnCompleted();
            });
        });
    }

    _setEventForm() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this.allComplete) {
                this.callbackWhenAllCompleted instanceof Function && this.callbackWhenAllCompleted(e);
            } else {
                this._getOptionsExceptTypeFile().forEach(({ name, element, }) => {
                    const blockInput = element.closest(".form__input-block");

                    if (!this.completeNames.includes(name)) {
                        this._setInvalidElement(blockInput);
                    } else {
                        this._setValidElement(blockInput);
                    }
                });

                this.callbackWhenFailed instanceof Function && this.callbackWhenFailed(e);
            }
        });
    }

    init() {
        this._setEventInputs();
        this._setEventForm();
    }
}