/* DONATE amount */

const amountDots = document.querySelectorAll(".amount__dot");
const amountInput = document.querySelector(".amount__select");
const inputMax = +amountInput.max;
const inputMin = +amountInput.min;

amountDots.forEach((item) => {
    item.addEventListener("click", (e) => {
        if(e.currentTarget.checked){
            amountInput.value = e.currentTarget.value;
    }
    })
});

amountInput.addEventListener("change", (e) => {
    console.log(e.currentTarget.value);
    for(i = 0; i < amountDots.length; i++){
        amountDots[i].checked = false;
        if(e.currentTarget.value == amountDots[i].value){
            amountDots[i].checked = true;
        }
    }
})

amountInput.addEventListener("input", (e) => {
    const inputValue = +e.currentTarget.value;
    if(inputValue > inputMax) {e.currentTarget.value = inputMax}
    if(inputValue < inputMin) {e.currentTarget.value = inputMin}
})