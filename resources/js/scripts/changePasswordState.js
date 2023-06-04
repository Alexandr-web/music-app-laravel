function showIcon(icon) {
    icon.classList.remove("hide");
    icon.classList.add("show");
}

function hideIcon(icon) {
    icon.classList.remove("show");
    icon.classList.add("hide");
}

export default (selectorInput, selectorBtn, selectorOpenEyeIcon, selectorClosedEyeIcon) => {
    const openIcon = document.querySelector(selectorOpenEyeIcon);
    const closedIcon = document.querySelector(selectorClosedEyeIcon);
    const input = document.querySelector(selectorInput);
    const btn = document.querySelector(selectorBtn);

    btn.addEventListener("click", () => {
        const currentType = input.type;

        switch (currentType) {
            case "text":
                input.type = "password";

                hideIcon(openIcon);
                showIcon(closedIcon);
                break;
            case "password":
                input.type = "text";

                hideIcon(closedIcon);
                showIcon(openIcon);
        }
    });
};