<div class="profile__tab">
    <div class="profile__tab-inner">
        <h1 class="title">Аудио</h1>
        @if (count($audio))
            <x-table-song :songs="$audio" playlistId="profile" />
        @else
            <x-nothing-find text="Ничего нет"  />
        @endif
    </div>
</div>