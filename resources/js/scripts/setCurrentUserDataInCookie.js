import User from "../classes/User";
import Cookie from "../helpers/Cookie";

export default () => {
    const cookie = new Cookie();
    const res = new User().getByToken();

    if (!res) {
        return;
    }

    res.then(({ success, user, }) => {
        if (success) {
            cookie.add("currentUser", user, true);
        }
    }).catch((err) => {
        throw err;
    });
};