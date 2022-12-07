import Carousel from "./carousel.js";
// import {burger} from "./burger.js"

let slider = new Carousel({
        "container": ".slider__track",
        "prev": ".arrow.left",
        "next": ".arrow.right",
});

let testimonials = new Carousel({
    "container": ".carousel__container",
    "range": ".carousel__navigation",
})

slider.init();
testimonials.init();

window.onresize = function(){
    document.location.reload(true); // reload page to count carousel items to show
}

/* Pop-up */

const popupItems = document.querySelectorAll(".carousel__item");
const testimonialsSection = document.querySelector(".testimonials");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".cross");
const body = document.querySelector("body");


// console.log(popupItems);

popupItems.forEach( (item) => item.addEventListener("click", (e) => {

    const testimonialsNode = document.createElement("div");
    testimonialsNode.classList.add("popup__item");
    testimonialsNode.innerHTML = e.currentTarget.innerHTML;


    // console.log(document.documentElement.offsetWidth);
    // if(e.currentTarget.offsetWidth <= 600){
    if(document.documentElement.offsetWidth <= 640){
        popup.classList.toggle("active");
        popup.append(testimonialsNode);
        body.classList.add("lock");
        // e.currentTarget.classList.toggle("active");
        // testimonialsSection.classList.toggle("active");
    }
}));

closeButton.addEventListener("click", () => {
    popup.classList.remove("active");
    popup.removeChild(popup.lastChild);
    body.classList.remove("lock");
});

popup.addEventListener("click", (e) => {
    if(e.target === e.currentTarget){
    popup.classList.remove("active");
    popup.removeChild(popup.lastChild);
    body.classList.remove("lock");
}
})