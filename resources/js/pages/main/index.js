import User from "../../classes/User";

window.addEventListener("load", () => {
    const user = new User();

    user.setDataInCookie();
    user.displayOnHeader();
});