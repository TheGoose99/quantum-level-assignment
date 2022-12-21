import quotes from "./static/quotes.json" assert { type: "json" };
import questions from "./static/questions.json" assert { type: "json" };

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
      const message = currItem.type === "email" ? "Invalid email type" : `Invalid ${currItem.name}! You must enter over 4 characters.`;

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

// IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined:
(() => {
  // UI section:
  // Attributing and render the data of the 1st JSON object to the quote section:
  changeQuote();
  renderFrequentQuestions();

  // Events section:
  initStaticEvents();
  initDynamicEvents();
})();
