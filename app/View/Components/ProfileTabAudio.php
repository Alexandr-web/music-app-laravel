<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class ProfileTabAudio extends Component
{
    public array $audio = [];

    /**
     * Create a new component instance.
     */
    public function __construct(array $audio)
    {
        $this->audio = $audio;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.profile-tab-audio');
    }
}
