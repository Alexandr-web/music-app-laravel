<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class CustomPlaylist extends Component
{
    public array $playlist;

    /**
     * Create a new component instance.
     */
    public function __construct(array $playlist)
    {
        $this->playlist = $playlist;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.custom-playlist');
    }
}
