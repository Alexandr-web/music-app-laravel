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
        return value.trim().length >= min;
    }

    checkMax(max, value) {
        return value.trim().length <= max;
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

    _checkValueInput(element, name, options) {
        const blockInput = element.closest(".form__input-block");

        let checkIsComplete = true;

        if (!options.optional || element.value.trim().length) {
            checkIsComplete = this.checkAll(name, element.value);
        }

        checkIsComplete ? this._inputIsComplete(name, blockInput) : this._inputIsFailed(name, blockInput);

        this._checkAllStatesOnCompleted();
    }

    _checkValueFile(name, options, e) {
        const file = e.target.files[0];

        let checkIsComplete = true;

        if (!options.optional) {
            checkIsComplete = this.checkAll(name, file);
        }

        checkIsComplete ? this._inputIsComplete(name) : this._inputIsFailed(name);

        this._checkAllStatesOnCompleted();
    }

    _setEventInputs() {
        this._getOptionsExceptTypeFile().forEach(({ name, element, options, }) => {
            element.addEventListener("input", this._checkValueInput.bind(this, element, name, options));
            element.addEventListener("blur", this._checkValueInput.bind(this, element, name, options));
        });

        this._getOptionsOnlyWithTypeFile().forEach(({ name, element, options, }) => {
            element.addEventListener("change", (e) => this._checkValueFile(name, options, e));
        });
    }

    _setEventForm() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            this._getOptionsExceptTypeFile().forEach(({ name, element, options, }) => {
                this._checkValueInput(element, name, options);
            });

            this._getOptionsOnlyWithTypeFile().forEach(({ name, options, }) => {
                if (options.optional) {
                    this._inputIsComplete(name);
                }
            });

            this._checkAllStatesOnCompleted();

            if (this.allComplete) {
                this.callbackWhenAllCompleted instanceof Function && this.callbackWhenAllCompleted(new FormData(this.form));
            } else {
                this.callbackWhenFailed instanceof Function && this.callbackWhenFailed(e);
            }
        });
    }

    init() {
        this._setEventInputs();
        this._setEventForm();
    }
}