<label class="custom-radio__area" for="{{ $id }}">
    <span class="custom-radio__text">{{ $text }}</span>
    <input class="custom-radio__input" type="radio" value="{{ $value }}" name="{{ $name }}" id="{{ $id }}" {{ $checked ? "checked" : "" }}>
    <div class="custom-radio__block"></div>
</label>