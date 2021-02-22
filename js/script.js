const nameInput = document.querySelector('#name');
const activities = document.querySelector('#activities');
const paymentOption = document.querySelector('#payment');
const activityCheckboxes = document.querySelectorAll('input[type="checkbox"]');

//Name input focus on document laod
document.addEventListener('DOMContentLoaded', () => {
  nameInput.focus(); // focus on name when the page loads
});

//Job Role select element functionality
const jobRoleSelection = function () {
  const jobRoleSelect = document.querySelector('#title');
  const otherJobRoleInput = document.querySelector('#other-job-role');

  otherJobRoleInput.style.display = 'none';
  jobRoleSelect.addEventListener('change', e => {
    if (e.target.value === 'other') {
      otherJobRoleInput.style.display = '';
    } else {
      otherJobRoleInput.style.display = 'none';
    }
  });
};

//T-shirt Info Section
const tShirtInfo = function () {
  const designSelect = document.querySelector('#design');
  const colorSelect = document.querySelector('#color');
  const colorSelectOptions = colorSelect.children;
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

const registerActivity = function () {
  const activityPrice = document.querySelector('#activities-cost');
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

const paymentMethod = function () {
  const creditCard = document.querySelector('#credit-card');
  const paypal = document.querySelector('#paypal');
  const bitcoin = document.querySelector('#bitcoin');

  paypal.style.display = 'none'; //Refactor
  bitcoin.style.display = 'none'; //Refactor

  paymentOption.children[1].setAttribute('selected', true);

  const hidePaymentInfoContainer = function () {
    paypal.style.display = 'none'; //Refactor
    bitcoin.style.display = 'none'; //Refactor
    creditCard.style.display = 'none';
  };

  paymentOption.addEventListener('change', e => {
    hidePaymentInfoContainer();
    document.getElementById(e.target.value).style.display = '';
  });
};

const formEvaluation = function () {
  const email = document.querySelector('#email');
  const creditCardNum = document.querySelector('#cc-num');
  const zipCode = document.querySelector('#zip');
  const cvv = document.querySelector('#cvv');
  const form = document.querySelector('form');

  const regEx = {
    name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/,
    ccnumber: /^((4\d{3})|(5[1-5]\d{2})|(6011))-?\d{4}-?\d{4}-?\d{4}|3[4,7]\d{13}$/,
    cvv: /^[0-9]{3,4}$/,
    zipcode: /^((\d{5}-?\d{4})|(\d{5})|([A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d))$/,
  };

  const isFieldValid = function (regEx, inputVal, inputEl, event) {
    if (!regEx.test(inputVal)) {
      inputEl.parentNode.classList.add('not-valid');
      inputEl.parentNode.classList.remove('valid');
      inputEl.parentNode.lastElementChild.style.display = 'inherit';
      event.preventDefault();
    } else {
      inputEl.parentNode.classList.remove('not-valid');
      inputEl.parentNode.classList.add('valid');
      inputEl.parentNode.lastElementChild.style.display = 'none';
    }
  };

  const checkValidation = function (e) {
    let checked = 0;
    for (let i = 0; i < activityCheckboxes.length; i++) {
      if (activityCheckboxes[i].checked) {
        checked++;
      }
      console.log(checked);
    }

    if (checked === 0) {
      activities.firstElementChild.classList.add('not-valid');
      activities.firstElementChild.classList.remove('valid');
      e.preventDefault();
    } else {
      activities.firstElementChild.classList.remove('not-valid');
      activities.firstElementChild.classList.add('valid');
    }
  };

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
    checkValidation(e);
  });
};

const formAccessibility = function () {
  for (let i = 0; i < activityCheckboxes.length; i++) {
    activityCheckboxes[i].addEventListener('focus', () => {
      activityCheckboxes[i].parentNode.classList.add('focus');
    });

    activityCheckboxes[i].addEventListener('blur', () => {
      activityCheckboxes[i].parentNode.classList.remove('focus');
    });
  }

  console.log(activityCheckboxes);
};

//Function Calls
jobRoleSelection();
tShirtInfo();
registerActivity();
paymentMethod();
formEvaluation();
formAccessibility();
