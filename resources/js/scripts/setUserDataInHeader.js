import Cookie from "../helpers/Cookie";
import host from "../helpers/host";

export default () => {
    const cookie = new Cookie();
    const user = cookie.get("currentUser", true);

    if (user) {
        const link = document.querySelector(".header__profile-link");
        const image = document.querySelector(".header__profile-avatar");

        link.href = `/user/${user.id}`;
        image.src = `${host}/storage/avatars/${user.avatar}`;
    }
};