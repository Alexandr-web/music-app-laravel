export default () => {
    const btn = document.querySelector("#btn-back-history");

    if (!btn) {
        return;
    }

    if (!history.length) {
        btn.classList.add("hide");
    }

    btn.addEventListener("click", () => history.back());
};