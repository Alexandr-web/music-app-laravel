import setCurrentUserData from "../../scripts/setCurrentUserDataInCookie";
import setUserDataInHeader from "../../scripts/setUserDataInHeader";

window.addEventListener("load", () => {
    setCurrentUserData();
    setUserDataInHeader();
});