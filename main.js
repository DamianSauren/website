/* -- Carousel Navigation -- */

let activeIndex = 0;

const slides = document.getElementsByTagName('article');

const handleLeftClick = () => {
    console.log(`activeIndex: ${activeIndex}`);

    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : slides.length - 1;

    console.log(`nextIndex: ${nextIndex}`);

    const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
        nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

    currentSlide.dataset.status = "after";

    nextSlide.dataset.status = "becoming-active-from-before";

    setTimeout(() => {
        nextSlide.dataset.status = "active";
        activeIndex = nextIndex;
    })
};

const handleRightClick = () => {
    const nextIndex = activeIndex + 1 <= slides.length - 1 ? activeIndex + 1 : 0;

    const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
        nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

    currentSlide.dataset.status = "before";

    nextSlide.dataset.status = "becoming-active-from-after";

    setTimeout(() => {
        nextSlide.dataset.status = "active";
        activeIndex = nextIndex;
    });
}

/* -- Mobile Nav Toggle -- */

const nav = document.getElementsByTagName("nav");

const handleNavToggle = () => {
    nav[0].dataset.transitionable = "true";
    nav[0].dataset.toggled = nav[0].dataset.toggled === "true" ? "false" : "true";
}

window.matchMedia("(max-width: 800px)").onchange = e => {
    nav[0].dataset.transitionable = "false";
    nav[0].dataset.toggled = "false";
};

/* -- Mouse Trailer -- */
const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
    const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight / 2;

    const keyframes = {
        transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`
    }

    trailer.animate(keyframes, {
        duration: 800,
        fill: "forwards"
    });
}

const getTrailerClass = type => {
    switch (type) {
        case "video":
            return "fa-solid fa-play";
        default:
            return "fa-solid fa-arrow-up-right";
    }
}

window.onmousemove = e => {
    const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;

    const icon = document.getElementById("trailer-icon");

    animateTrailer(e, interacting);

    trailer.dataset.type = interacting ? interactable.dataset.type : "";

    if (interacting) {
        icon.className = getTrailerClass(interactable.dataset.type);
    }
}
