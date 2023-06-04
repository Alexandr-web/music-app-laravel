<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class FileUploadArea extends Component
{
    public bool $isAvatar = true;
    public string $id = "";
    public string $name = "";
    public array $accept = [];

    /**
     * Create a new component instance.
     */
    public function __construct(bool $isAvatar, string $id, string $name, array $accept)
    {
        $this->isAvatar = $isAvatar;
        $this->id = $id;
        $this->name = $name;
        $this->accept = $accept;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.file-upload-area');
    }
}
