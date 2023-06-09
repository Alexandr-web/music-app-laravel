<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use App\Models\Playlist;

class CustomPlaylist extends Component
{
    public Playlist $playlist;
    public string $ownerNickname;

    /**
     * Create a new component instance.
     */
    public function __construct(Playlist $playlist, string $ownerNickname)
    {
        $this->playlist = $playlist;
        $this->ownerNickname = $ownerNickname;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.custom-playlist');
    }
}
