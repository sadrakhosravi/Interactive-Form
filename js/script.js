//Form Variable
const form = document.querySelector('form');

//Basic Info Variables
const nameInput = document.querySelector('#name');
const email = document.querySelector('#email');
const jobRoleSelect = document.querySelector('#title');
const otherJobRoleInput = document.querySelector('#other-job-role');
const designSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');
const colorSelectOptions = colorSelect.children;

//Activities Variables
const activities = document.querySelector('#activities');
const activityCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const activityPrice = document.querySelector('#activities-cost');

//Payment Variables
const paymentOption = document.querySelector('#payment');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

//Credit Card Variables
const creditCard = document.querySelector('#credit-card');
const creditCardNum = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

/**
 * Focuses on the name input on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  nameInput.focus();
});

/**
 * Hides the element passed to it - Helper function
 * @param {Element} el - The element to hide
 */
const hideElement = function (el) {
  el.style.display = 'none';
};

/**
 * Shows the element passed to it - Helper function
 * @param {Element} el - The element to be shown
 */
const showElement = function (el) {
  el.style.display = 'inherit';
};

/**
 * Shows/hide other job role field based on the job select value
 */
const jobRoleSelection = function () {
  hideElement(otherJobRoleInput);
  jobRoleSelect.addEventListener('change', e => {
    if (e.target.value === 'other') {
      showElement(otherJobRoleInput);
    } else {
      hideElement(otherJobRoleInput);
    }
  });
};

/**
 * Based on user's selection of design select box, enables and displays t-shirt colors.
 */
const tShirtInfo = function () {
  colorSelect.disabled = true;

  designSelect.addEventListener('change', e => {
    colorSelect.disabled = false;

    for (let i = 0; i < colorSelectOptions.length; i++) {
      const value = e.target.value;
      const currentOption = colorSelectOptions[i];
      const currentOptionAttr = colorSelectOptions[i].getAttribute('data-theme');

      if (value === currentOptionAttr) {
        currentOption.hidden = false;
        currentOption.selected = true;
      } else {
        currentOption.hidden = true;
        currentOption.selected = false;
      }
    }
  });
};

/**
 * Calculates the total price of the selected activity and outputs it on the page.
 */
const registerActivity = function () {
  let totalPrice = 0;

  activities.addEventListener('change', e => {
    const activityCost = parseInt(e.target.getAttribute('data-cost'));

    if (e.target.checked) {
      totalPrice += activityCost;
    } else {
      totalPrice -= activityCost;
    }

    activityPrice.innerHTML = `Total: $${totalPrice}`;
  });
};

/**
 * Shows the selected payment option information on the page.
 */
const paymentMethod = function () {
  /**
   * Hides PayPal and Bitcoin payment containers.
   */
  const hidePayPalAndBitcoin = function () {
    hideElement(paypal);
    hideElement(bitcoin);
  };

  paymentOption.children[1].setAttribute('selected', true); //Default option
  hidePayPalAndBitcoin();
  showElement(creditCard);

  paymentOption.addEventListener('change', e => {
    hidePayPalAndBitcoin();
    hideElement(creditCard);
    document.getElementById(e.target.value).style.display = '';
  });
};

/**
 * Evaluates name, email, activities, and payment option fields and prevents submission
 * if the fields were invalid.
 */
const formEvaluation = function () {
  //RegEx object used for field evaluation
  const regEx = {
    name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/,
    ccnumber: /^[0-9]{13,16}$/,
    cvv: /^[0-9]{3}$/,
    zipcode: /^[0-9]{5}$/,
  };

  /**
   * Checks if the value entered in the required field is valid. If not displays and error. If valid, displays checkmark.
   * @param {Object} regEx - Regex object to compare the value to
   * @param {String/Number} inputVal - Input value
   * @param {Element} inputEl - Input element
   * @param {Object} event - Event object
   */
  const isFieldValid = function (regEx, inputVal, inputEl, event) {
    if (!regEx.test(inputVal)) {
      inputEl.parentNode.classList.add('not-valid');
      inputEl.parentNode.classList.remove('valid');
      showElement(inputEl.parentNode.lastElementChild);
      event.preventDefault();
    } else {
      inputEl.parentNode.classList.remove('not-valid');
      inputEl.parentNode.classList.add('valid');
      hideElement(inputEl.parentNode.lastElementChild);
    }
  };

  /**
   * Checks if any activity is selected and prevents the form from submitting if no activity selected.
   * @param {Object} e
   */
  const activitiesValidation = function (e) {
    let checked = 0;
    for (let i = 0; i < activityCheckboxes.length; i++) {
      if (activityCheckboxes[i].checked) {
        checked++;
      }
    }

    if (checked === 0) {
      activities.firstElementChild.classList.add('not-valid');
      activities.firstElementChild.classList.remove('valid');
      showElement(activities.lastElementChild);
      e.preventDefault();
    } else {
      activities.firstElementChild.classList.remove('not-valid');
      activities.firstElementChild.classList.add('valid');
      hideElement(activities.lastElementChild);
    }
  };
  const ccRealTimeEvaluation = function () {
    creditCardNum.addEventListener('input', e => {
      const ccNumber = parseInt(creditCardNum.value);
      isFieldValid(regEx.ccnumber, ccNumber, creditCardNum, e);
    });
  };

  ccRealTimeEvaluation();

  //On submit, evaluates the form.
  form.addEventListener('submit', e => {
    const nameInputVal = nameInput.value;
    const emailVal = email.value;
    const ccNumber = parseInt(creditCardNum.value);
    const zipcodeVal = zipCode.value;
    const cvvNumber = parseInt(cvv.value);

    isFieldValid(regEx.name, nameInputVal, nameInput, e);
    isFieldValid(regEx.email, emailVal, email, e);
    if (paymentOption.value === 'credit-card') {
      isFieldValid(regEx.ccnumber, ccNumber, creditCardNum, e);
      isFieldValid(regEx.zipcode, zipcodeVal, zipCode, e);
      isFieldValid(regEx.cvv, cvvNumber, cvv, e);
    }
    activitiesValidation(e);
  });
};

/**
 * Adds a focus class when an activity is clicked on.
 */
const activitiesFocus = function () {
  for (let i = 0; i < activityCheckboxes.length; i++) {
    activityCheckboxes[i].addEventListener('focus', () => {
      activityCheckboxes[i].parentNode.classList.add('focus');
    });

    activityCheckboxes[i].addEventListener('blur', () => {
      activityCheckboxes[i].parentNode.classList.remove('focus');
    });
  }
};

//Function Calls
jobRoleSelection();
tShirtInfo();
registerActivity();
paymentMethod();
formEvaluation();
activitiesFocus();
