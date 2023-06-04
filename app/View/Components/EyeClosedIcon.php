<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class EyeClosedIcon extends Component
{
    public bool $show = true;

    /**
     * Create a new component instance.
     */
    public function __construct(bool $show = false)
    {
        $this->show = $show;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.eye-closed-icon');
    }
}
