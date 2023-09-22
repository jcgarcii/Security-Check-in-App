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

  if(jobSelect === 'Visitor: Customer' || jobSelect === 'Visitor: Partner' || jobSelect === 'Visitor: Other'){
    const visitReasonInput = document.getElementById('visit-reason').value;
    const visitCompanyInput = document.getElementById('visit-company').value;
    userData = {
      time_in: '',
      time_out: '',
      time: '',
      name: nameInput,
      phoneNumber: phoneNumberInput,
      job: jobSelect,
      reason: visitReasonInput,
      company: visitCompanyInput,
      contact: '',
      area: ''
    };
  }else if(jobSelect === 'Contractor: Performing Work' || jobSelect === 'Contractor: Scouting Work' || jobSelect === 'Contractor: Supplier'){
    const contractorReasonInput = document.getElementById('contractor-reason').value;
    const contractorCompanyInput = document.getElementById('contractor-company').value;
    const contractorContactInput = document.getElementById('contractor-contact').value;
    const contractorAreaInput = document.getElementById('contractor-area').value;
    userData = {
      time_in: '',
      time_out: '',
      time: '',
      name: nameInput,
      phoneNumber: phoneNumberInput,
      job: jobSelect,
      reason: contractorReasonInput,
      copmany: contractorCompanyInput,
      contact: contractorContactInput,
      area: contractorAreaInput
    };
  }else{
    userData = {
      time_in: '',
      time_out: '',
      time: '',
      name: nameInput,
      phoneNumber: phoneNumberInput,
      job: 'Cargill Employee',
      reason:jobSelect,
      company:'Cargill', 
      contact:'', 
      area:''
    };
  }

    // Function to update and display the current time
  function updateCurrentTime() {
    const now = new Date();

    // Get hours, minutes, and seconds
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Display the formatted time in the specified element
    let time_in = `${hours}:${minutes}:${seconds}`;
    userData.time_in = time_in;
  }

  // Update the time immediately when the page loads
  updateCurrentTime();

  const jsonUserData = JSON.stringify(userData); // Convert JS object to JSON string
  console.log(jsonUserData); // Print JSON string to console
}

/*
// Function to write JSON data to a CSV file for local testing
function toCSV() {

  // Convert userData to an array of objects
  const data = [
    {
      o_time_in: userData.time_in,
      o_name: userData.name,
      o_phone: userData.phoneNumber,
      o_job: userData.job,
      o_reason: userData.reason,
      o_company: userData.company,
      o_contact: userData.contact,
      o_area: userData.area,
      o_time_out: userData.time_out,
      o_time: userData.time,
    },
  ];

  const header = [
    { id: 'o_time_in', title: 'Time In' },
    { id: 'o_name', title: 'Name' },
    { id: 'o_phone', title: 'Phone' },
    { id: 'o_job', title: 'Type' },
    { id: 'o_reason', title: 'Reason' },
    { id: 'o_company', title: 'Company' },
    { id: 'o_contact', title: 'Contact' },
    { id: 'o_area', title: 'Work Area' },
    { id: 'o_time_out', title: 'Time Out' },
    { id: 'o_time', title: 'Total Time' },
  ];

  // Create a CSV data array
  const csvData = [header.map((column) => column.title)];

  data.forEach((user) => {
    const row = header.map((column) => user[column.id]);
    csvData.push(row);
  });

  // Convert the CSV data to a CSV string
  const csvString = csvData.map((row) => row.join(',')).join('\n');

  // Create a Blob with the CSV string
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  // Create a download link and trigger the download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'output.csv';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
*/

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
  //toCSV(); 
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
