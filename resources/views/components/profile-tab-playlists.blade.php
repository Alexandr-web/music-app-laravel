<div class="profile__tab">
    <x-modal-window-playlist />
    <div class="profile__tab-inner">
        <h1 class="title">Плейлисты</h1>
        @if (count($playlists))
            <ul class="playlists">
                @foreach ($playlists as $data)
                    <li class="playlists__item">
                        <x-custom-playlist :playlist="$data['playlist']" :ownerNickname="$data['owner_nickname']" />
                    </li>
                @endforeach
            </ul>
        @else
            <x-nothing-find text="Ничего нет"  />
        @endif
    </div>
</div>