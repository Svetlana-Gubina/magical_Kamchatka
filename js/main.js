"use strict";
(function () {
  const BREAKPOINTS = {
    tablet: "1024px",
  };

  const toggle = document.querySelector(".main-nav__toggle");
  const menu = document.querySelector(".main-nav__list");

  const handleBreackpointChange = (event) => {
    if (event.matches) {
      menu.classList.add("visually-hidden");
      toggle.classList.remove("visually-hidden");
    } else {
      menu.classList.remove("visually-hidden");
      toggle.classList.add("visually-hidden");
    }
  };

  const mediaQueryList = window.matchMedia(
    "(max-width:" + BREAKPOINTS.tablet.toString() + ""
  );
  mediaQueryList.addListener(handleBreackpointChange);
  handleBreackpointChange(mediaQueryList);

  toggle.addEventListener("click", function (evt) {
    evt.preventDefault();
    this.classList.toggle("main-nav__toggle-close");
    menu.classList.toggle("visually-hidden");
  });
})();

// fancybox

$(document).ready(function () {
  $('[data-fancybox="gallery"]').fancybox({
    height: 700,
    protect: true,
    loop: true,
    infobar: false,
    arrows: false,
    afterLoad: function (instance, current) {
      if (instance.group.length > 1 && current.$content) {
        current.$content.append(
          `<div class="slider__preview-flex">
        <div class="slider__slide-title" data-title>
          <p class="slider__slide-text">${
            current.opts.$orig[0].dataset.title
          }</p>
          <p class="slider__slide-text">${
            current.opts.$orig[0].dataset.date
          }</p>
          <button data-close type="button" class="slider__slide-cancel"></button>
        </div>
        <div class="slider__nav fancybox-navigation">
          <a data-fancybox-prev class="slider__previous" href="javascript:;">Предыдущий</a>
          <span class="slider__count"><span class="slider__count-num" data-fancybox-index>${
            current.opts.index + 1
          }</span> из <span data-fancybox-count class="slider__count-total">${
            instance.group.length
          }</span></span>
          <a data-fancybox-next class="slider__next" href="javascript:;">Следующий</a>
        </div>
      </div>`
        );
      }

      $(document).on("click", ".slider__slide-cancel", function (evt) {
        evt.preventDefault();
        this.closest(".slider__preview-flex").classList.add("highlighted");
        current.$content.find(".slider__preview-flex").remove();
        current.$content.append(
          '<a data-fancybox-next class="button-next" href="javascript:;">→</a><a data-fancybox-previous class="button-previous" href="javascript:;">←</a>'
        );
      });
    },
  });
});
