<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class FileUploadArea extends Component
{
    public bool $isAvatar = false;
    public bool $isPoster = false;
    public bool $isAudio = false;
    public string $id = '';
    public string $name = '';
    public array $accept = [];
    public string $defaultSrc = '';

    /**
     * Create a new component instance.
     */
    public function __construct(string $id, string $name, array $accept, bool $isAudio = false, bool $isPoster = false, string $defaultSrc = '', bool $isAvatar = false)
    {
        $this->isAvatar = $isAvatar;
        $this->isPoster = $isPoster;
        $this->isAudio = $isAudio;
        $this->id = $id;
        $this->name = $name;
        $this->accept = $accept;
        $this->defaultSrc = $defaultSrc;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.file-upload-area');
    }
}
