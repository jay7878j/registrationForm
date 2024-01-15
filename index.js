let formEl = document.querySelector("#formEl");
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirmPassword");
let dob = document.querySelector("#dob");
let country = document.querySelector("#country");
let checkbox = document.querySelector("#checkbox");
let userDetails = document.querySelector("#userDetails");
let selectedGenderValue = document.querySelectorAll('input[name="gender"]');
let isValidUsername = false;
let isValidEmail = false;
let isValidPassowrd = false;
let isvalidDob = false;
let isValidCheckbox = false;
let genderValue;

function validateUserName() {
  let userNameValue = username.value;
  if (userNameValue.length < 5 || userNameValue.length > 15) {
    document.getElementById("userNameError").textContent =
      "*Username must be between 5 and 15 characters.";
    return false;
  }

  let alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(userNameValue)) {
    document.getElementById("userNameError").textContent =
      "*Username must contain only alphanumeric characters.";
    return false;
  }

  document.getElementById("userNameError").textContent = "";

  isValidUsername = true;
  return true;
}

function validateEmail() {
  let userEmailvalue = email.value;
  let errorElement = document.querySelector("#emailError");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(userEmailvalue)) {
    errorElement.textContent =
      "Invalid email format. Please enter a valid email address.";
    return false;
  }

  isValidEmail = true;
  errorElement.textContent = "";
}

function validatePassword() {
  let passwordValue = password.value;
  let confirmPasswordValue = confirmPassword.value;
  let passwordErrorEl = document.querySelector("#passwordError");
  let confirmPasswordErrorEl = document.querySelector("#confirmPasswordError");

  // Validate the confirm password
  if (passwordValue !== confirmPasswordValue) {
    confirmPasswordErrorEl.textContent = "Passwords do not match.";
    return false;
  }

  // Validate the password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(passwordValue)) {
    passwordErrorEl.textContent =
      "Invalid password format. Password should be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.";
    return false;
  }

  // Clear any previous error messages
  passwordErrorEl.textContent = "";
  confirmPasswordErrorEl.textContent = "";

  isValidPassowrd = true;
  return true;
}

function validateDateofBirth() {
  let dobValue = dob.value;
  //   console.log(dobValue);
  let dobErrorEl = document.querySelector("#dobError");

  let enteredDate = new Date(dobValue);
  let currentDate = new Date();

  let ageYears = currentDate.getFullYear() - enteredDate.getFullYear();
  let ageMonths = currentDate.getMonth() - enteredDate.getMonth();
  let ageDays = currentDate.getDate() - enteredDate.getDate();

  console.log(ageDays);
  console.log(ageMonths);
  console.log(ageYears);
  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
  }

  if (ageYears < 18) {
    dobErrorEl.textContent = "You must be at least 18 years old.";
    return false; // Prevent form submission
  }

  isvalidDob = true;
  dobErrorEl.textContent = "";
}

function validateAgreement() {
  let checkBoxValue = checkbox.checked;
  let agreement = document.querySelector("#agreement");
  //   console.log(checkBoxValue);
  if (!checkBoxValue) {
    agreement.textContent = "*Must Accept";
    return false;
  }

  isValidCheckbox = true;
  agreement.textContent = "";
}

function showDetails() {
  console.log(selectedGenderValue.value);
  let userNameDetail = document.createElement("p");
  userNameDetail.textContent = "Username: " + username.value;
  userDetails.appendChild(userNameDetail);

  let emailDetail = document.createElement("p");
  emailDetail.textContent = "Email: " + email.value;
  userDetails.appendChild(emailDetail);

  let dobDetail = document.createElement("p");
  dobDetail.textContent = "Date of Birth: " + dob.value;
  userDetails.appendChild(dobDetail);

  let genderDetail = document.createElement("p");
  genderDetail.textContent = "Gender: " + genderValue;
  userDetails.appendChild(genderDetail);

  let countryDetail = document.createElement("p");
  countryDetail.textContent = "Country: " + country.value;
  userDetails.appendChild(countryDetail);
}

function formValidate(event) {
  userDetails.textContent = "";
  event.preventDefault();
  validateUserName();
  validateEmail();
  validatePassword();
  validateDateofBirth();
  validateAgreement();

  selectedGenderValue.forEach((each) => {
    // console.log(each.checked);
    if (each.checked) {
      genderValue = each.value;
      //   console.log(each.value);
    }
  });
  console.log(genderValue);

  let isValid =
    isValidUsername &&
    isValidPassowrd &&
    isvalidDob &&
    isValidCheckbox &&
    isValidEmail;
  console.log(isValid);

  if (isValid) {
    showDetails();
  }
}

username.addEventListener("blur", validateUserName);
email.addEventListener("blur", validateEmail);

formEl.addEventListener("submit", formValidate);
