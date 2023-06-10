<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class FileUploadArea extends Component
{
    public bool $isAvatar = false;
    public string $id = '';
    public string $name = '';
    public array $accept = [];
    public string $defaultSrc = '';

    /**
     * Create a new component instance.
     */
    public function __construct(bool $isAvatar = false, string $id, string $name, array $accept, string $defaultSrc = '')
    {
        $this->isAvatar = $isAvatar;
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
