<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class CustomRadio extends Component
{
    public string $id = "";
    public string $name = "";
    public string $text = "";
    public bool $checked = false;

    /**
     * Create a new component instance.
     */
    public function __construct(string $id, string $name, string $text, bool $checked = false)
    {
        $this->id = $id;
        $this->name = $name;
        $this->text = $text;
        $this->checked = $checked;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.custom-radio');
    }
}
