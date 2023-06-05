<header class="header">
    <div class="header__inner">
        <nav class="header__nav">
            <div class="header__block">
                <button class="btn btn--back">
                    <x-arrow-back-icon />
                </button>
            </div>
            <div class="header__block header__block--flex">
                <div class="header__search">
                    <div class="header__search-input-area header__search-input-area--active">
                        <input class="header__search-input" id="search-input" name="search" type="search" placeholder="Найти">
                        <button class="btn header__search-btn">
                            <x-search-icon />
                        </button>
                    </div>
                    <div class="header__search-result">
                        <x-nothing-find text="Ничего не нашлось" />
                        {{-- <ul class="header__search-list">
                            <li class="header__search-list-item">
                                <a class="link header__search-list-link" href="/">Результат поиска</a>
                            </li>
                            <li class="header__search-list-item">
                                <a class="link header__search-list-link" href="/">Результат поиска</a>
                            </li>
                        </ul> --}}
                    </div>
                </div>
                <div class="header__profile">
                    <a class="header__profile-link" href="/">
                        <img class="header__profile-avatar" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="Аватар пользователя">
                    </a>
                </div>
            </div>
        </nav>
    </div>
</header>