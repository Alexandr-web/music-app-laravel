<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class NothingFind extends Component
{
    public string $text = '';
    public bool $hide = false;
    public string $id = '';

    /**
     * Create a new component instance.
     */
    public function __construct(string $text, string $id = '', bool $hide = false)
    {
        $this->text = $text;
        $this->hide = $hide;
        $this->id = $id;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.nothing-find');
    }
}
