/**
 * File: validation.js
 * Author: Jose Carlos Garcia
 * Description: Contains functions related to form handling and submission.
 * Version: 2.0
 * Last Modified: 9/21/2023
 */

const { ipcRenderer } = window.api; // Import ipcRenderer from the Electron main process

let userData = {}; // Empty object to store user data

// Function to validate the phone number length
function validatePhoneNumber() {
  let tel = phoneNumberInput.value 

  if (tel.length !== 12) {
    // Display an error message or take appropriate action
    alert('Please enter a valid 10-digit phone number (e.g., 888-888-8888).');
    phoneNumberInput.focus(); // Focus back on the input field
    return false; // Prevent form submission
  }
  return true; // Phone number is valid
}

// Function to place user input into the userData object
function objectifyForm() {
  const nameInputValue = document.getElementById('user_name').value;
  const phoneNumberInputValue = document.getElementById('tel').value;
  const jobSelectValue = document.getElementById('job').value;
  
  

  if(switchButton.textContent == 'I want to: Sign-Out'){
    i_id = '';
    i_time_in = '';
    i_time_out = '';
    i_time = '';
    i_name = nameInputValue;
    i_phoneNumber = phoneNumberInputValue;
    i_job = '';
    i_reason = '';
    i_company = '';
    i_contact = '';
    i_area = '';
  }else{
    if(jobSelectValue === 'Visitor: Customer' || jobSelectValue === 'Visitor: Partner' || jobSelectValue === 'Visitor: Other'){
      const visitReasonInputValue = document.getElementById('visit-reason').value;
      const visitCompanyInputValue = document.getElementById('visit-company').value;
      // assign values to be filled into user data object
      i_id = ''
      i_time_in = ''
      i_time_out = ''
      i_time = ''
      i_name = nameInputValue
      i_phoneNumber = phoneNumberInputValue
      i_job = jobSelectValue
      i_reason = visitReasonInputValue
      i_company = visitCompanyInputValue
      i_contact = ''
      i_area = ''
    }else if(jobSelectValue === 'Contractor: Performing Work' || jobSelectValue === 'Contractor: Scouting Work' || jobSelectValue === 'Contractor: Supplier'){
      const contractorReasonInputValue = document.getElementById('contractor-reason').value;
      const contractorCompanyInputValue = document.getElementById('contractor-company').value;
      const contractorContactInputValue = document.getElementById('contractor-contact').value;
      const contractorAreaInputValue = document.getElementById('contractor-area').value;
      // assign values to be filled into user data object
      i_id = '';
      i_time_in = '';
      i_time_out = '';
      i_time = '';
      i_name = nameInputValue;
      i_phoneNumber = phoneNumberInputValue;
      i_job = jobSelectValue;
      i_reason = contractorReasonInputValue;
      i_company = contractorCompanyInputValue;
      i_contact = contractorContactInputValue;
      i_area = contractorAreaInputValue;
    }else{
      // assign values to be filled into user data object
      i_id = '';
      i_time_in = '';
      i_time_out = '';
      i_time = '';
      i_name = nameInputValue;
      i_phoneNumber = phoneNumberInputValue;
      i_job = 'Cargill Emplooyee';
      i_reason = jobSelectValue;
      i_company = 'Cargill';
      i_contact = '';
      i_area = '';
    }
  }
  // assign values to userData
  userData={
    "Active": '', // 0 for active, 1 for inactive
    "ID": i_id,
    "Time In": i_time_in,
    "Time Out": i_time_out,
    "Name": i_name,
    "Phone Number": i_phoneNumber,
    "Job": i_job,
    "Reason": i_reason,
    "Company": i_company,
    "Contact": i_contact,
    "Area": i_area,
    "Time": i_time,
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
}


// Function to write user data to a file
async function writeToFile() {
  // Convert userData to a JSON string
  const json_UD = JSON.stringify(userData);


  const formData = new FormData(form);
  let userNames = [];

  for (const [name, value] of formData.entries()) {
    if (name === 'user-name[]') {
      userNames.push(value);
    }
  }

  const extraNames = userNames
  const args = [json_UD, extraNames]
  
  try {
    // Send a message to the main process to call the Python script using ipcRenderer.invoke
    const response = await window.api.invoke('python_sign_in', args);

    console.log('Received response from main process:', response);
  } catch (error) {
    console.error('Error communicating with main process:', error);
  }
}

// Function to remove all additional name fields and delete buttons
function removeAllNames() {
  const namesContainerValid = document.getElementById('names');
  const nameEntriesValid = namesContainerValid.querySelectorAll('.name-entry');

  // Remove all name entries
  nameEntriesValid.forEach(entry => {
    namesContainerValid.removeChild(entry);
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

  userDetailsFieldset.style.display = 'none';
  visitPurposeFieldset.style.display = 'none';
  contractorPurposeFieldset.style.display = 'none'; 
  currentTimeElement.style.display = 'none';
  submitButton.style.display = 'none';
  cargillBanner.style.display = 'none';
  switchButton.style.display = 'none'; // Hide the switch button

  objectifyForm(); // Call the function to place user input into the userData object
  writeToFile(); // Call the function to write user data to a file

  thankYouMessage.style.display = 'block';

  // Reset the form after a brief delay (e.g., 3 seconds)
  setTimeout(() => {
    thankYouMessage.style.display = 'none'; // Hide the message
    userDetailsFieldset.style.display = 'block';
    currentTimeElement.style.display = 'block';
    submitButton.style.display = 'block';
    cargillBanner.style.display = 'block';
    switchButton.style.display = 'block'; // Show the switch button
    removeAllNames(); // Remove all additional name fields and delete buttons
    document.getElementById('check-in-form').reset(); // Reset the form
  }, 3000); // Adjust the delay (in milliseconds) as needed
}

submitButton.addEventListener('click', handleSubmit);

// Add an event listener to the form for form submission
//document.getElementById('check-in-form').addEventListener('submit', handleSubmit);
