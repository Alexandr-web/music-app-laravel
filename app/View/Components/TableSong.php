<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class TableSong extends Component
{
    public $songs = [];
    public $playlistId;

    /**
     * Create a new component instance.
     */
    public function __construct($songs, $playlistId)
    {
        $this->songs = $songs;
        $this->playlistId = $playlistId;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.table-song');
    }
}
