const body = document.querySelector("body");
const burger = document.querySelector(".burger");
const headerInner = document.querySelector(".header__inner");
const header = document.querySelector(".header");

burger.addEventListener("click", (e) => {
    classToggle(e.currentTarget, "active"); // === classToggle(burger, "active");
    classToggle(headerInner, "active");
    classToggle(header, "active");
    classToggle(body, "lock");
});

header.addEventListener("click", (e) => {
    if(e.target.classList.contains("header")){
        classToggle(burger, "active");
        classToggle(headerInner, "active");
        classToggle(header, "active");
        classToggle(body, "lock");
    }
});

function classToggle(element, className) {
    if(element.classList.contains(className)){
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
};