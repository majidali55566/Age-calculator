const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");

const convertValues = document.querySelector("#convert-value");

const yearsResult = document.querySelector("#years-result");
const monthsResult = document.querySelector("#months-result");
const daysResult = document.querySelector("#days-result");

document.addEventListener("DOMContentLoaded", () => {
  initialResultsStyling();
});

convertValues.addEventListener("click", () => {
  validateInputDate(year.value, month.value, day.value);
});

function validateDay(dayInput) {
  const dayValidationMessage = document.querySelector(
    "#day-validation-message"
  );

  if (!dayInput) {
    applyStylingForNotDefinedInput(day);
  } else if (dayInput < 0 || dayInput >= 32) {
    dayValidationMessage.textContent = "day b/w 1-31";
    applyStylingForInvalidInput(day);
  } else {
    applyStylingForValidInput(day);
  }
}

function validateMonth(monthInput) {
  const monthValidationMessage = document.querySelector(
    "#month-validation-message"
  );
  if (!monthInput) {
    applyStylingForNotDefinedInput(month);
  } else if (monthInput < 0 || monthInput >= 13) {
    applyStylingForInvalidInput(month);
    monthValidationMessage.textContent = "months b/w 1-12";
  } else {
    applyStylingForValidInput(month);
  }
}
function validateYear(yearInput) {
  const yearValidationMessage = document.querySelector(
    "#year-validation-message"
  );
  const date = new Date();
  const currentYear = date.getFullYear();
  if (!yearInput) {
    applyStylingForNotDefinedInput(year);
  } else if (yearInput > currentYear) {
    yearValidationMessage.textContent = `must be <= ${currentYear}`;
    applyStylingForInvalidInput(year);
  } else if (yearInput.length != 4) {
    yearValidationMessage.textContent = "4 digit value i.e 1934";
    applyStylingForInvalidInput(year);
  } else {
    applyStylingForValidInput(year);
  }
}

function applyStylingForInvalidInput(inputField) {
  inputField.classList.add("invalid-input");
  inputField.classList.remove("valid-input");
  inputField.parentElement.querySelector("label").style.color =
    "var(--clr-light-red)";
}
function applyStylingForValidInput(inputField) {
  inputField.parentElement.querySelector("span").textContent = "";
  inputField.parentElement.querySelector("label").style.color =
    "var(--clr-neutral-800)";
  inputField.classList.add("valid-input");
  inputField.classList.remove("invalid-input");
}

function applyStylingForNotDefinedInput(inputField) {
  inputField.parentElement.querySelector("span").textContent =
    "this field is required";
  applyStylingForInvalidInput(inputField);
}

function initialResultsStyling() {
  const results = document.querySelectorAll(".results");
  for (const result of results) {
    const dashOne = document.createElement("div");
    const dashTwo = document.createElement("div");
    dashTwo.classList.add("parallelogram");
    dashOne.classList.add("parallelogram");
    result.insertBefore(dashOne, result.firstChild);
    result.insertBefore(dashTwo, dashOne);
  }
}

function setUpResults(calculatedDate) {
  const resultContainer = document.querySelector("#result-container");
  const results = resultContainer.getElementsByClassName("results");

  if (day.value && month.value && year.value) {
    populateResults(yearsResult, calculatedDate["years"]);
    populateResults(monthsResult, calculatedDate["months"]);
    populateResults(daysResult, calculatedDate["days"]);
  }

  resultsArray = Array.from(results);

  for (const result of resultsArray) {
    removeDashesStyles(result);
  }
}

function removeDashesStyles(result) {
  const dashes = result.getElementsByClassName("parallelogram");
  const dashesArray = Array.from(dashes);

  //remove dashes
  for (const element of dashesArray) {
    result.removeChild(element);
  }
}

function populateResults(result, calculatedResult) {
  if (!result.querySelector("span")) {
    const resultNumber = document.createElement("span");
    resultNumber.classList.add("color-primary");
    resultNumber.textContent = calculatedResult;
    result.insertBefore(resultNumber, result.firstChild);
  } else {
    result.querySelector("span").textContent = calculatedResult;
  }
}

function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust for negative months and days
  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    days =
      new Date(today.getFullYear(), today.getMonth(), 0).getDate() -
      birthDate.getDate() +
      today.getDate();
  }

  return {
    years,
    months,
    days,
  };
}

function validateInputDate(yearValue, monthValue, dayValue) {
  validateDay(dayValue);
  validateMonth(monthValue);
  validateYear(yearValue);
  const yearInput = parseInt(yearValue, 10);
  const monthInput = parseInt(monthValue, 10) - 1;
  const dayInput = parseInt(dayValue, 10);

  const testDate = new Date(yearInput, monthInput, dayInput);
  if (
    testDate.getMonth() !== monthInput ||
    testDate.getDate() !== dayInput ||
    testDate.getFullYear() !== yearInput
  ) {
    applyStylingForInvalidInput(month);
    applyStylingForInvalidInput(day);
    applyStylingForInvalidInput(year);
  }
  if (
    day.classList.contains("valid-input") &&
    month.classList.contains("valid-input") &&
    year.classList.contains("valid-input")
  ) {
    const calculatedDate = calculateAge(testDate);
    console.log(calculatedDate);
    setUpResults(calculatedDate);
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth()).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
