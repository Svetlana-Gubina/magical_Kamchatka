"use strict";

(function () {
  const HIDDEN_CLASS = "hidden";
  const titleCancel = document.querySelector(".slider__slide-cancel");
  const galleryList = document.querySelector(".gallery__list");
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".gallery__thumbnail");
  const preview = document.querySelector(".slider__preview");
  const sliderCancel = document.querySelector(".slider__cancel");
  const sliderCountNum = document.querySelector(".slider__count-num");
  const sliderCountTotal = document.querySelector(".slider__count-total");

  const createElement = (template, className) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    newElement.classList.add(className);
    return newElement;
  };

  const remove = (component) => {
    component.getElement().remove();
    component.removeElement();
  };

  const createSlidesMarkup = (slides) => {
    return Array.from(slides)
      .map((slide) =>
        `
     <div>
     <img src="img/${slide.dataset.number}.jpg" width="480" height="391" alt="Ducks">
     </div>`.trim()
      )
      .join(``);
  };

  titleCancel.addEventListener("click", function (evt) {
    evt.preventDefault();
    this.closest(".slider__slide-title").classList.add("hidden");
  });

  class SliderElement {
    constructor(slides) {
      this._element = null;
      this._slides = slides;
      this._slidesMarkup = createSlidesMarkup(this._slides);
    }

    getTemplate() {
      return `${this._slidesMarkup}`;
    }

    getElement() {
      if (!this._element) {
        this._element = createElement(this.getTemplate(), "slick");
      }
      return this._element;
    }

    removeElement() {
      if (this._element) {
        this._element = null;
      }
      return this._element;
    }

    show() {
      if (this._element) {
        this._element.classList.remove(HIDDEN_CLASS);
      }
    }

    hide() {
      if (this._element) {
        this._element.classList.add(HIDDEN_CLASS);
      }
    }
  }

  const sliderElement = new SliderElement(slides);

  const openSlider = function () {
    slider.classList.remove("hidden");
    preview.prepend(sliderElement.getElement());
  };

  const hideSlider = function () {
    slider.classList.add("hidden");
    remove(sliderElement);
    $(".slick").slick("unslick");
  };

  const onEscPressSliderClose = (evt) => {
    if (evt.key === "Escape") {
      hideSlider();
    }
  };

  const pictureClickHandler = (evt) => {
    let picture = evt.target;
    let num = Number(picture.dataset.number) - 1;
    openSlider();

    sliderCountNum.textContent = num + 1;
    sliderCountTotal.textContent = slides.length;

    $(".slick").on("init", function () {
      // TODO:
      // adaptiveHeight
    });

    $(".slick").slick({
      initialSlide: num,
      prevArrow: $(".slider__previous"),
      nextArrow: $(".slider__next"),
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      adaptiveHeight: true,
    });

    $(".slick").on("afterChange", function () {
      const currentSlide = $(".slick").slick("slickCurrentSlide");
      sliderCountNum.textContent = currentSlide + 1;
    });

    $(".slick").on("click", function () {
      $(".slick").slick("slickNext");
    });

    document.addEventListener("keydown", onEscPressSliderClose);
    sliderCancel.addEventListener("click", hideSlider);

    if (slider.classList.contains(HIDDEN_CLASS)) {
      sliderCancel.removeEventListener("click", hideBigPicture);
      document.removeEventListener("keydown", onEscPressSliderClose);
    }
  };

  galleryList.addEventListener("click", function (evt) {
    evt.preventDefault();
    let target = evt.target;
    if (target.classList.contains("gallery__thumbnail")) {
      pictureClickHandler(evt);
    }
  });
})();
