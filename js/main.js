"use strict";
//------------------------------------------------------------------------Меню-Бургер
const burgerMenu = document.querySelector(".header__burger");
const menuBody = document.querySelector(".menu");

if (burgerMenu) {
  burgerMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    burgerMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}

let buttons = document.querySelectorAll(".menu__link");

buttons.forEach((elem) => {
  elem.addEventListener("click", () => {
    menuBody.classList.remove("_active");
    burgerMenu.classList.remove("_active");
  });
});

//------------------------------------------------------------------------search
const search = document.querySelector(".search");
const searchInput = document.querySelector(".header__icons-search-input");
search.addEventListener("click", () => {
  searchInput.classList.toggle("open");
});

//------------------------------------------------------------------------search

//------------------------------------------------------------------------slider
$(".slider-inner").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  speed: 2000,
});

$(".products__slider").slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  speed: 2000,
  responsive: [
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow:
          '<img class="slider-arrows slider-arrows__next" src="images/arrow-r.svg">',
        prevArrow:
          '<img class="slider-arrows slider-arrows__prev" src="images/arrow-l.svg">',
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow:
          '<img class="slider-arrows slider-arrows__next" src="images/arrow-r.svg">',
        prevArrow:
          '<img class="slider-arrows slider-arrows__prev" src="images/arrow-l.svg">',
      },
    },
  ],
});
//------------------------------------------------------------------------slider

//------------------------------------------------------------------------animation main-block

const buttonTitle = document.querySelectorAll(".main-section__body-box");
const buttonRight = document.getElementById("button-right");
const buttonLeft = document.getElementById("button-left");
const blockMoveRight = document.getElementById("move-block-right");
const blockMoveLeft = document.getElementById("move-block-left");
const imageLeft = document.getElementById("image-left");
const imageRight = document.getElementById("image-right");

for (const item of buttonTitle) {
  item.addEventListener("click", () => {
    buttonRight.classList.toggle("active-right");
    blockMoveRight.classList.toggle("move-right");
    blockMoveLeft.classList.toggle("move-left");
    buttonLeft.classList.toggle("active-left");
    imageLeft.classList.toggle("image-zoom-left");
    imageRight.classList.toggle("image-zoom-right");
  });
}

//------------------------------------------------------------------------animation main-block

//------------------------------------------------------------------------popup
const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}
//
function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add("open");
    currentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});

//------------------------------------------------------------------------popup

//------------------------------------------------------------------------Accordion
const titles = document.querySelectorAll(".accordion__title");
const contents = document.querySelectorAll(".accordion__content");

titles.forEach((item) =>
  item.addEventListener("click", () => {
    const activeContent = document.querySelector("#" + item.dataset.tab);

    if (activeContent.classList.contains("active")) {
      activeContent.classList.remove("active");
      item.classList.remove("active");
      activeContent.style.maxHeight = 0;
    } else {
      contents.forEach((element) => {
        element.classList.remove("active");
        element.style.maxHeight = 0;
      });
      titles.forEach((element) => element.classList.remove("active"));

      item.classList.add("active");
      activeContent.classList.add("active");
      activeContent.style.maxHeight = activeContent.scrollHeight + "px";
    }
  })
);

//------------------------------------------------------------------------Accordion

//------------------------------------------------------------------------Tabs
const tabsButton = document.querySelectorAll(".tabs-button");
const tabsContent = document.querySelectorAll(".tabs-content");

tabsButton.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabsButton.forEach((tab) => {
      tab.classList.remove("active-tab");
    });
    tab.classList.add("active-tab");

    tabsContent.forEach((content) => {
      content.classList.remove("active-tab");
    });
    tabsContent[index].classList.add("active-tab");
  });
});
//------------------------------------------------------------------------Tabs

//------------------------------------------------------------------------Анимация цифр при скроле
window.addEventListener("scroll", () => {
  let scrollDistance = window.scrollY;

  if (window.innerWidth > 768) {
    document.querySelectorAll(".section").forEach((el, i) => {
      if (
        el.offsetTop - document.querySelector(".nav").clientHeight <=
        scrollDistance
      ) {
        document.querySelectorAll(".nav a").forEach((el) => {
          if (el.classList.contains("color")) {
            el.classList.remove("color");
          }
        });

        document
          .querySelectorAll(".nav li")
          [i].querySelector("a")
          .classList.add("color");
      }
    });
  }
});
//------------------------------------------------------------------------Анимация цифр при скроле
const animItems = document.querySelectorAll("._anim-items");
if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 5;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_action");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_action");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + screenLeft };
  }
  animOnScroll();
}
