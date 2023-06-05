<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class PlusIcon extends Component
{
    public bool $show = false;

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
        return view('components.plus-icon');
    }
}
