export default class Carousel {
  constructor(settings) {
    this.settings = settings;
    this.elements = {
      "container": document.querySelector(this.settings.container),
      "items": document.querySelector(this.settings.container).children,
      "prev": document.querySelector(this.settings.prev),
      "next": document.querySelector(this.settings.next),
      "range": document.querySelector(this.settings.range),
    };
  }


  init() {

    this.options = {
      "position": 0,
      "elements_count": this.elements.items.length,
      "elements_show": this.elements.container.offsetWidth < 1220 ? 3 : 4,
    };

    this.preferences = {
      "steps": Math.ceil(this.options.elements_count / this.options.elements_show),
      "is_finished": true,
    }

    if (!this.elements.range) {
      this.elements.prev.addEventListener("click", () => { this.prevSlide() });
      this.elements.next.addEventListener("click", () => { this.nextSlide() });
      this.elements.container.addEventListener("animationend", () => { this.animationController() });
    }

    if (this.elements.range) {
      this.elements.range.max = this.elements.items.length;
      this.elements.range.addEventListener("input", () => { this.rangeSlider() });
    }

    // randomize items drawing
    let randomizedArray = this.CreateShuffledList(this.options.elements_count);
    for (let i = 0; i < this.options.elements_count; i++) {
      this.elements.items[i].style["order"] = randomizedArray[i];
    }
  }

  rangeSlider() {

    let value = this.elements.range.value;
    let containerWidth = this.elements.container.offsetWidth;
    let itemWidth = this.elements.items[0].offsetWidth;
    let itemsAmount = Math.floor(containerWidth / itemWidth);
    let sliderStep = itemWidth + (containerWidth - itemWidth * itemsAmount) / (itemsAmount - 1);
    let gap = (containerWidth - itemWidth * itemsAmount) / (itemsAmount - 1);

    // set MAX of range
    let itemsCount = this.elements.items.length;
    let maxValue = itemsCount - itemsAmount + 1;
    this.elements.range.max = maxValue;

    if (value <= maxValue) {
      this.elements.container.style["transform"] = `translateX(${-((value - 1) * sliderStep)}px)`;
    }

  }

  nextSlide() {

    if (this.preferences.is_finished) {
      this.preferences.is_finished = false;
      this.elements.container.classList.add("active");
      let randomizedArray = this.CreateShuffledList(this.options.elements_count);

      for (let i = 0; i < this.options.elements_count; i++) {
        this.elements.items[i].style["order"] = randomizedArray[i];
      }
    }
  }

  prevSlide() {
    this.nextSlide();
  }

  animationController() {
    this.elements.container.classList.remove("active");
    this.preferences.is_finished = true;
  }


  // create random list
  CreateShuffledList(itemsCount) {
    let randomArray = [];
    for (let i = 0; i < itemsCount; i++) {
      randomArray.push(i);
    }
    this.FisherYets(randomArray);
    return randomArray;
  }

  // fisher-yets algorithm to shuffle array
  FisherYets(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let t = array[i];
      array[i] = array[j];
      array[j] = t;
    }
  }
}