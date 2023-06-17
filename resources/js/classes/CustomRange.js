export default class CustomRange {
    constructor(value, idArea, callbackWhenEndGrabbing) {
        this.value = value;
        this.callbackWhenEndGrabbing = callbackWhenEndGrabbing;
        this.isGrabbing = false;
        this.abscissa = 0;
        this.area = document.querySelector(idArea);
        this.line = document.querySelector(`${idArea} .custom-range__progress-line`);
    }

    _getAreaWidth() {
        return this.area.offsetWidth;
    }

    _setWidthLine(width) {
        this.line.style = `width: ${width}%`;
    }

    _setUserSelect(on = true) {
        document.body.style = `user-select: ${on ? "auto" : "none"}`;
    }

    _grabHandler(e) {
        this.abscissa = this._checkAbscissa(e.layerX);
        this.isGrabbing = true;
    }

    _grabEvent(add = true) {
        const method = add ? "addEventListener" : "removeEventListener";

        this.area[method]("mousedown", this._grabHandler.bind(this));
    }

    _releaseHandler() {
        if (this.isGrabbing && this.callbackWhenEndGrabbing instanceof Function) {
            const percent = this._getPercent(this.abscissa, this._getAreaWidth());
            const value = (percent * this.value) / 100;

            this.callbackWhenEndGrabbing(value);
        }

        this.isGrabbing = false;
        this._setUserSelect();
    }

    _releaseEvent(add = true) {
        const method = add ? "addEventListener" : "removeEventListener";

        window[method]("mouseup", this._releaseHandler.bind(this));
    }

    _checkAbscissa(val) {
        const areaWidth = this._getAreaWidth();

        if (val < 0) {
            return 0;
        }

        if (val > areaWidth) {
            return areaWidth;
        }

        return val;
    }

    _getPercent(current, max) {
        return Math.ceil((current / max) * 100);
    }

    _grabbingHandler(e) {
        if (!this.isGrabbing) {
            return;
        }

        const percent = this._getPercent(this.abscissa, this._getAreaWidth());

        this.abscissa = this._checkAbscissa(e.layerX);
        this._setWidthLine(percent);
        this._setUserSelect(false);
    }

    _grabbingEvent(add = true) {
        const method = add ? "addEventListener" : "removeEventListener";

        window[method]("mousemove", this._grabbingHandler.bind(this));
    }

    _resizeScreen() {
        window.addEventListener("resize", this._update.bind(this));
    }

    _addEvents() {
        this._grabEvent();
        this._releaseEvent();
        this._grabbingEvent();
    }

    _removeEvents() {
        this._grabEvent(false);
        this._releaseEvent(false);
        this._grabbingEvent(false);
    }

    _update() {
        this._removeEvents();
        this._addEvents();
    }

    setPosition(val) {
        const percent = this._getPercent(val, this.value);

        this._setWidthLine(percent);
    }

    init(currentValue) {
        this._addEvents();
        this._resizeScreen();
        this.setPosition(currentValue);

        return this;
    }
}