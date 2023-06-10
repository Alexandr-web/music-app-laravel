<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class ProfileTabFavorites extends Component
{
    public array $favorites = [];
    
    /**
     * Create a new component instance.
     */
    public function __construct(array $favorites)
    {
        $this->favorites = $favorites;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.profile-tab-favorites');
    }
}
