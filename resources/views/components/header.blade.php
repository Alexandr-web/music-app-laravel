<header class="header">
    <div class="header__inner">
        <nav class="header__nav">
            <div class="header__block">
                <button class="btn btn--back" id="btn-back-history">
                    <x-arrow-back-icon />
                </button>
            </div>
            <div class="header__block header__block--flex">
                <div class="header__search">
                    <input class="header__search-input" id="search-input" name="search" type="search" placeholder="Найти">
                    <button class="btn header__search-btn">
                        <x-search-icon />
                    </button>
                </div>
                <div class="header__profile">
                    <a class="header__profile-link" href="/user/{{ $user['id'] }}">
                        <img class="header__profile-avatar" src="{{ asset('storage/avatars').'/'.$user['avatar'] }}" alt="Аватар пользователя">
                    </a>
                </div>
            </div>
        </nav>
    </div>
</header>