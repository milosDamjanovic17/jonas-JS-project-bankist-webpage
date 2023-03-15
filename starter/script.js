"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

////////////////////////////////////////////////////////////////////
///////// Page Navigation => bad practice because of event propagation
/*
document.querySelectorAll(".nav__link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
if for example we have 10k elements, this method will create a copy of 10k elements which is not efficient
END*/

///// use of event delegation, bind the action to parent element and catch it from there =>
//
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    console.log("LINK");
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    // dodali smo event listener na parent element .nav__links i onda ispitujemo da li odredjeni child parenta ima nav__link klasu, SAMO AKO IMA ODRADI scroll f-ju
  }
});

/* DOM Traversing
const h1 = document.querySelector("h1");
// Going downwards: child elements
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.children);
h1.firstElementChild.style.color = "#482e92";
h1.lastElementChild.style.color = "#8e1f2f";

// Going upwards: parents
console.log(h1.parentElement);
h1.closest("header").style.background = "var(--gradient-secondary)";

h1.closest("h1").style.background = "var(--gradient-primary)";

// Going sideways
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// move up to parent element and read all children elements from there
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = "scale(0.5)";
  //scaleuj sve elemente koji nisu h1
});
END*/

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const theHeader = document.querySelector(".header");
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);

// document.getElementById("section--1");
// const allButtons = document.getElementsByTagName("button");

// console.log(allButtons);

// console.log(document.getElementsByClassName("btn"));

// // creating and inserting elements

// const message = document.createElement("div");
// message.classList.add("cookie-message");
// // message.textContent = 'We use cookies for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class= "btn btn--close-cookie">Got it</button>';

// // theHeader.prepend(message);
// theHeader.append(message);

// // theHeader.before(message);
// // theHeader.after(message);

// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });

// // Styles
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

// console.log(message.style.color);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// // document.documentElement.style.setProperty("--color-primary", "#482e92");

// // Attributes
// const logo = document.querySelector(".nav__logo");
// console.log(logo);

// // absolute value
// console.log(logo.src);
// // relative value
// console.log(logo.getAttribute("src"));

// const link = document.querySelector(".nav__link--btn");

// console.log(link.href); //=> http://127.0.0.1:8080/#
// console.log(link.getAttribute("href")); //=> #

// // Data attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add("add");
// logo.classList.remove("remove");
// logo.classList.toggle("toggle");
// logo.classList.contains("contains");

// // Don't use this:
// // logo.className = 'jonas' => it will override all classes
// //END

// const btnScrollTo = document.querySelector(".btn--scroll-to");

// const section1 = document.querySelector("#section--1");

// btnScrollTo.addEventListener("click", function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   //Apply Smooth Scrolling
//   section1.scrollIntoView({ behavior: "smooth" });
// });

// const h1 = document.querySelector("h1");

// const alertH1 = function (e) {
//   alert("addEventListener: Great! You are reading the h1!");
// };

// oldschool, can't attach multiple event listeners
// h1.onmouseenter = function (e) {
//   alert("addEventListener: Great! You are reading the h1!");
// };

// h1.addEventListener("mouseenter", alertH1);

// remove event listener after 3 seconds of loading the page
// setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// rgb(0-255,0-255,0-255)

/* EVENT PROPAGATION
const radnomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${radnomInt(0, 255)},${radnomInt(0, 255)},${radnomInt(0, 255)})`;

console.log(randomColor());

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target);
  // PREVENT PARENT ELEMENTS FROM BEING AFFECTED TO CLICK
  // e.stopPropagation(); // => BAD PRACTICE
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAV", e.target);
});
END*/
