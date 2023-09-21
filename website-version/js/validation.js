/**
 * File: form.js
 * Author: Jose Carlos Garcia
 * Description: Contains functions related to form handling and submission.
 * Version: 1.0
 * Last Modified: 9/21/2023
 */

let userData = {}; // Empty object to store user data

// Function to validate the phone number length
function validatePhoneNumber() {
  const phoneNumberInput = document.getElementById('tel');
  const phoneNumber = phoneNumberInput.value.replace(/\D/g, ''); // Remove non-numeric characters

  if (phoneNumber.length !== 10) {
    // Display an error message or take appropriate action
    alert('Please enter a valid 10-digit phone number (e.g., 888-888-8888).');
    phoneNumberInput.focus(); // Focus back on the input field
    return false; // Prevent form submission
  }

  return true; // Phone number is valid
}

// Function to place user input into the userData object
function objectifyForm() {
  const nameInput = document.getElementById('user_name').value;
  const phoneNumberInput = document.getElementById('tel').value;
  const jobSelect = document.getElementById('job').value;

  if(jobSelect === 'visitor_customer' || jobSelect === 'visitor_partner' || jobSelect === 'visitor_other'){
    const visitReasonInput = document.getElementById('visit-reason').value;
    const visitCompanyInput = document.getElementById('visit-company').value;
    userData = {
      name: nameInput,
      phoneNumber: phoneNumberInput,
      job: jobSelect,
      visitReason: visitReasonInput,
      visitCompany: visitCompanyInput
    };
  }else if(jobSelect === 'contractor_performing' || jobSelect === 'contractor_scouting' || jobSelect === 'contractor_supplier'){
    const contractorReasonInput = document.getElementById('contractor-reason').value;
    const contractorCompanyInput = document.getElementById('contractor-company').value;
    const contractorContactInput = document.getElementById('contractor-contact').value;
    const contractorAreaInput = document.getElementById('contractor-area').value;
    userData = {
      name: nameInput,
      phoneNumber: phoneNumberInput,
      job: jobSelect,
      contractorReason: contractorReasonInput,
      contractorCompany: contractorCompanyInput,
      contractorContact: contractorContactInput,
      contractorArea: contractorAreaInput
    };
  }else{
    userData = {
      name: nameInput,
      phoneNumber: phoneNumberInput,
      job: jobSelect
    };
  }

  const jsonUserData = JSON.stringify(userData); // Convert JS object to JSON string
  console.log(jsonUserData); // Print JSON string to console
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from actually submitting

  // Call the phone validation function
  if (!validatePhoneNumber()) {
    // If the phone number is invalid, display an error message
    alert('Please enter a valid 10-digit phone number (e.g., 888-888-8888).');
    return; // Exit the function without proceeding further
  }

  // Display the "Thank you" message
  const thankYouMessage = document.getElementById('thank-you-message');
  const userDetailsFieldset = document.getElementById('details');
  const visitPurposeFieldset = document.getElementById('visit-purpose');
  const visitContractorPurposeFieldset = document.getElementById('contractor-purpose');
  const submitButton = document.getElementById('submit-button');
  const cargillBanner = document.getElementById('cargill-banner');
  const currentTimeElement = document.getElementById('current-time');

  userDetailsFieldset.style.display = 'none';
  visitPurposeFieldset.style.display = 'none';
  visitContractorPurposeFieldset.style.display = 'none'; 
  currentTimeElement.style.display = 'none';
  submitButton.style.display = 'none';
  cargillBanner.style.display = 'none';

  objectifyForm(); // Call the function to place user input into the userData object
  thankYouMessage.style.display = 'block';

  // Reset the form after a brief delay (e.g., 3 seconds)
  setTimeout(() => {
    thankYouMessage.style.display = 'none'; // Hide the message
    userDetailsFieldset.style.display = 'block';
    currentTimeElement.style.display = 'block';
    submitButton.style.display = 'block';
    cargillBanner.style.display = 'block';
    document.getElementById('check-in-form').reset(); // Reset the form
  }, 3000); // Adjust the delay (in milliseconds) as needed
}


// Add an event listener to the form for form submission
document.getElementById('check-in-form').addEventListener('submit', handleSubmit);
