import anime from "animejs/lib/anime.es.js";

export default (el, options, many = false) => {
    let t = null;

    if (el instanceof HTMLElement) {
        t = el;
    } else if (typeof el === "string") {
        const method = many ? "querySelectorAll" : "querySelector";

        t = document[method](el);
    }

    anime({
        targets: t,
        ...options,
    });
};