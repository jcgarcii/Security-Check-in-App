/**
 * File: form.js
 * Author: Jose Carlos Garcia
 * Description: Contains functions related to form handling and submission.
 * Version: 1.3
 * Last Modified: 9/21/2023
 */

let userData = {}; // Empty object to store user data
const apiUrl = 'https://msschu05mp.pcg.cargill.com/piwebapi/assetdatabases/F1RDZ_V1ACw-sE-EcebTfGIGhQbEk9SdqtBUC2vWiEA02JNQTVNTQ0hVMDVNUFxERVZfU0NIVVlMRVIgQVNTRVQgVFdJTg'; // Define the API URL as a global variable


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

  if(jobSelect === 'Visitor: Customer' || jobSelect === 'Visitor: Partner' || jobSelect === 'Visitor: Other'){
    const visitReasonInput = document.getElementById('visit-reason').value;
    const visitCompanyInput = document.getElementById('visit-company').value;
    // assign values to be filled into user data object
    i_time_in = ''
    i_time_out = ''
    i_time = ''
    i_name = nameInput
    i_phoneNumber = phoneNumberInput
    i_job = jobSelect
    i_reason = visitReasonInput
    i_company = visitCompanyInput
    i_contact = ''
    i_area = ''
  }else if(jobSelect === 'Contractor: Performing Work' || jobSelect === 'Contractor: Scouting Work' || jobSelect === 'Contractor: Supplier'){
    const contractorReasonInput = document.getElementById('contractor-reason').value;
    const contractorCompanyInput = document.getElementById('contractor-company').value;
    const contractorContactInput = document.getElementById('contractor-contact').value;
    const contractorAreaInput = document.getElementById('contractor-area').value;
    // assign values to be filled into user data object
    i_time_in = ''
    i_time_out = ''
    i_time = ''
    i_name = nameInput
    i_phoneNumber = phoneNumberInput
    i_job = jobSelect
    i_reason = contractorReasonInput
    i_company = contractorCompanyInput
    i_contact = contractorContactInput
    i_area = contractorAreaInput
  }else{
    // assign values to be filled into user data object
    i_time_in = ''
    i_time_out = ''
    i_time = ''
    i_name = nameInput
    i_phoneNumber = phoneNumberInput
    i_job = 'Cargill Emplooyee'
    i_reason = jobSelect
    i_company = 'Cargill'
    i_contact = ''
    i_area = ''
  }

  // assign values to userData
  userDate={
    "Time In": i_time_in,
    "Time Out": i_time_out,
    "Time": i_time,
    "Name": i_name,
    "Phone Number": i_phoneNumber,
    "Job": i_job,
    "Reason": i_reason,
    "Company": i_company,
    "Contact": i_contact,
    "Area": i_area,
  }; 

    // Function to update and display the current time
  function updateCurrentTime() {
    const now = new Date();

    // Get hours, minutes, and seconds
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    //Date(s)
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.getMonth().toString().padStart(2, '0');
    const year = now.getFullYear().toString().padStart(2, '0');

    // Display the formatted time in the specified element
    let time_in = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    userData["Time In"] = time_in;
  }

  // Update the time immediately when the page loads
  updateCurrentTime();

  const jsonUserData = JSON.stringify(userData); // Convert JS object to JSON string
  console.log(jsonUserData); // Print JSON string to console
}

/*
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    // Handle the data from the successful response
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });
*/

function getData() {
  const url = apiUrl; // Replace with your API endpoint

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response JSON
    })
    .then(data => {
      // Handle the response data here
      console.log('GET response:', data);
    })
    .catch(error => {
      console.error('GET error:', error);
    });
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
  getData(); 

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
