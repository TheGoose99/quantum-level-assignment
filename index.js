import quotes from "./static/quotes.json" assert { type: "json" };
import questions from "./static/questions.json" assert { type: "json" };

// If I was to make the page fully responsive I would have chosen a better set of dimensions,
//but for the sake of keeping the task simple I chose these dimensions:
const isTablet = screen.width >= 600 && screen.width <= 1280 ? true : false;
const isMobile = screen.width < 600 ? true : false;

const renderNavBar = () => {
  const navBarContainer = document.getElementById("navBar");
  let navBarContent = "";

  if (!isTablet && !isMobile) {
    navBarContent = `
      <div id="navBar__Links">
        <h1 id="navBar__Logo">LOGO</h1>
        <p><a href="#">How it works</a></p>
        <p><a href="#">About</a></p>
        <p><a href="#">Instructions</a></p>
        <p><a href="#">Accounts</a></p>
        <p><a href="#">Platforms</a></p>
        <p><a href="#">Contact</a></p>
      </div>
      <div id="navBar__Buttons">
        <button id="language__button">EN<span>⌄</span></button>
        <button id="signIn__button"><a href="#contactUs">Sign In For Free</a></button>
      </div>
    `;
  } else {
    navBarContent = isMobile
      ? `
          <h1 id="navBar__Logo">LOGO</h1>
          <a id="hamburger-menu">
            <i class="fa fa-bars"></i>
          </a>
        `
      : `<div id="navBar__Buttons">
            <button id="signIn__button"><a href="#contactUs">Sign In For Free</a></button>
            <a id="hamburger-menu">
              <i class="fa fa-bars"></i>
            </a>
          </div>
        `;

    const navBarItems = `
      <div id="navBar__Links">
        <p><a href="#">How it works</a></p>
        <p><a href="#">About</a></p>
        <p><a href="#">Instructions</a></p>
        <p><a href="#">Accounts</a></p>
        <p><a href="#">Platforms</a></p>
        <p><a href="#">Contact</a></p>
      </div>
    `;

    navBarContainer.insertAdjacentHTML("afterend", navBarItems);
  }

  navBarContainer.innerHTML += navBarContent;
};

const renderQuotesBtns = () => {
  if (!isTablet && !isMobile) {
    const afterHeader = document.getElementById("left__side__quotes");
    const rightSideQuotesContainer =
      document.getElementsByClassName("newDivQuotes")[0];

    const btnsContent = `
      <button id="button__decrease" data-count="decreaseCount" >&#x2039</button>
      <button id="button__increase" data-count="increaseCount" >&#x203A</button>
    `;

    afterHeader.insertAdjacentHTML("beforeend", btnsContent);

    const rightSideQuotesContent = `
      <div id="right__side__quotes">
        <div class="top__side__quotes">
          <img class="person__image" src="#" alt="profile picture" />
          <div class="person__details">
            <p class="person__name"></p>
            <p class="person__occupation"></p>
          </div>
        </div>
        <p class="quote"></p>
        <p class="count"></p>
      </div>
    `;

    rightSideQuotesContainer.insertAdjacentHTML(
      "afterbegin",
      rightSideQuotesContent
    );
  } else if (isTablet) {
    const afterHeader = document.getElementsByClassName("newDivQuotes")[0];
    const rightSideQuotesContainer = `
      <button id="button__decrease" data-count="decreaseCount">&#x2039</button>
        <div id="right__side__quotes">
          <div class="top__side__quotes">
            <img class="person__image" src="#" alt="profile picture" />
            <div class="person__details">
              <p class="person__name"></p>
              <p class="person__occupation"></p>
            </div>
          </div>
          <p class="quote"></p>
          <p class="count"></p>
        </div>
      <button id="button__increase" data-count="increaseCount">&#x203A</button>
    `;

    afterHeader.insertAdjacentHTML("afterbegin", rightSideQuotesContainer);
  } else {
    const afterHeader = document.getElementsByClassName("newDivQuotes")[0];

    const rightSideQuotesContainer = `
      <div id="right__side__quotes">
        <div class="top__side__quotes">
          <img class="person__image" src="#" alt="profile picture" />
          <div class="person__details">
            <p class="person__name"></p>
            <p class="person__occupation"></p>
          </div>
        </div>
        <p class="quote"></p>
        <div id="quote__count__group">
          <button id="button__decrease" data-count="decreaseCount">&#x2039</button>
          <p class="count"></p>
          <button id="button__increase" data-count="increaseCount">&#x203A</button>
        </div>
      </div>
    `;

    afterHeader.insertAdjacentHTML("afterbegin", rightSideQuotesContainer);
  }
};

const isDisabled = () => {
  // Extracting the 1st character of the counting which will always be a number between 1 and 4:
  const currCount = document.getElementsByClassName("count")[0].textContent[0];
  const decreaseBtn = document.getElementById("button__decrease");
  const increaseBtn = document.getElementById("button__increase");

  // Converting it from string to number so we can verify the values and disabling them respectively:
  if (+currCount === 1) {
    decreaseBtn.disabled = true;
  } else if (+currCount === 4) {
    increaseBtn.disabled = true;
  } else {
    decreaseBtn.disabled = false;
    increaseBtn.disabled = false;
  }
};

const changeQuote = (currNo = 0) => {
  const { image, name, occupation, quote } =
    quotes[currNo === 0 ? 0 : currNo - 1];

  document.getElementsByClassName("person__image")[0].src = image;
  document.getElementsByClassName("person__name")[0].innerHTML = name;
  document.getElementsByClassName("person__occupation")[0].innerHTML =
    occupation;
  document.getElementsByClassName("quote")[0].innerHTML = quote;

  document.getElementsByClassName("count")[0].innerHTML = `${
    currNo === 0 ? 1 : currNo
  }/${quotes.length}`;
};

const changeCount = (event) => {
  const { target } = event;
  let currNo = +document.getElementsByClassName("count")[0].textContent[0];

  if (target.dataset.count === "increaseCount") {
    currNo++;
  } else if (target.dataset.count === "decreaseCount") {
    currNo--;
  }

  if (currNo >= 1 && currNo <= 4) {
    document.getElementsByClassName(
      "count"
    )[0].innerHTML = `${currNo}/${quotes.length}`;

    isDisabled();
    changeQuote(currNo);
  }
};

const handleClickQuestion = (event) => {
  const { target } = event;
  const actionType = target.getAttribute("data-actionType");
  const parentEl = target.parentElement;

  if (actionType === "open") {
    const topParentElID = target.parentElement.parentElement.dataset.id;

    parentEl.insertAdjacentHTML(
      "afterend",
      `<div class="question__description" >${questions[topParentElID].answer}</div>`
    );

    target.textContent = "x";
    target.setAttribute("data-actionType", "close");
  } else if (actionType === "close") {
    parentEl.nextElementSibling.remove();
    target.textContent = "+";
    target.setAttribute("data-actionType", "open");
  }
};

const handleChange = (event) => {
  const { target } = event;

  if (target.type === "textarea" || target.type === "text") {
    if (target.value.length >= 4) {
      if (target.nextElementSibling.classList.contains("invalid__undertext")) {
        target.nextElementSibling.remove();
      }
    } else {
      target.insertAdjacentHTML(
        "afterend",
        `<p class="invalid__undertext">Invalid ${target.name}! You must enter over 4 characters.</p>`
      );
    }
  } else {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(target.value)) {
      if (target.nextElementSibling.classList.contains("invalid__undertext")) {
        target.nextElementSibling.remove();
      }
    } else {
      target.insertAdjacentHTML(
        "afterend",
        `<p class="invalid__undertext">Invalid email type`
      );
    }
  }
};

const handleForm = (event) => {
  event.preventDefault();
  let isValid = true;

  const inputs = document.querySelectorAll(".inputs__form input, textarea");

  for (let i = 0; i < inputs.length; i++) {
    const currItem = inputs[i];

    if (!currItem.value.length) {
      isValid = false;
      const message =
        currItem.type === "email"
          ? "Invalid email type"
          : `Invalid ${currItem.name}! You must enter over 4 characters.`;

      currItem.insertAdjacentHTML(
        "afterend",
        `<p class="invalid__undertext">${message}`
      );
    }
  }

  if (isValid) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }

    alert(`Congratulations, you've sent your message!`);
  }
};

const handleHamburgerMenu = () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");

  if (hamburgerMenu) {
    const navBarLinks = document.getElementById("navBar__Links");
    navBarLinks.style.display =
      navBarLinks.style.display === "none" || navBarLinks.style.display === ""
        ? "flex"
        : "";

    document.querySelector("#hamburger-menu i").remove();

    hamburgerMenu.innerHTML +=
      navBarLinks.style.display === "flex"
        ? `<i class="fa-solid fa-xmark"></i>`
        : `<i class="fa-solid fa-bars"></i>`;
  }
};

const initStaticEvents = () => {
  // Attaching an onclick event to the buttons:
  document.getElementById("button__decrease").onclick = changeCount;
  document.getElementById("button__increase").onclick = changeCount;

  const inputs = document.querySelectorAll(".inputs__form input, textarea");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].onchange = handleChange;
  }

  document.getElementsByClassName("form__submit__btn")[0].onclick = handleForm;

  // Disabling the first button so the user can't go below 1/4 quotes:
  isDisabled();
};

const initDynamicEvents = () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");

  if (hamburgerMenu) {
    hamburgerMenu.onclick = handleHamburgerMenu;
  }

  const questions = document.querySelectorAll(".question__button");

  for (let i = 0; i < questions.length; i++) {
    questions[i].onclick = handleClickQuestion;
  }
};

const renderFrequentQuestions = () => {
  const questionsContainer = document.getElementById("questions__container");
  const noOfQuestions = questions.length;
  let htmlQuestions = "";

  for (let i = 0; i < noOfQuestions; i++) {
    htmlQuestions += `
      <div class="question__card" data-id=${i}>
       <div class="question__top">
        <div class="question__title">${questions[i].question}</div>
        <button class="question__button" data-actionType="open">+</button>
       </div>
      </div>
    `;
  }

  questionsContainer.innerHTML += htmlQuestions;
};

const renderFooterNav = () => {
  const footerContent = document.getElementsByClassName("footer__content")[0];
  const footerNavContent = `
    <div class="footer__links">
      <a href="#" class="footer__link">About us</a>
      <a href="#" class="footer__link">Instructions</a>
      <a href="#" class="footer__link">Platforms</a>
      <a href="#" class="footer__link">Contact us</a>
      <a href="#" class="footer__link">Sign in</a>
      <a href="#" class="footer__link">Sign up for free</a>
    </div>
  `;

  if (!isTablet && !isMobile) {
    footerContent.insertAdjacentHTML("afterend", footerNavContent);
  } else {
    footerContent.insertAdjacentHTML("beforebegin", footerNavContent);
  }
};

// IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined:
(() => {
  // UI section:
  renderNavBar();
  renderQuotesBtns();
  // Attributing and render the data of the 1st JSON object to the quote section:
  changeQuote();
  renderFrequentQuestions();
  renderFooterNav();

  // Events section:
  initStaticEvents();
  initDynamicEvents();
})();
