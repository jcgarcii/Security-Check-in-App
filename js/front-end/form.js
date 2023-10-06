/**
 * File: form.js
 * Author: Jose Carlos Garcia
 * Description: Contains functions related to form handling and submission.
 * Version: 1.0
 * Last Modified: 9/21/2023
 */

// Document Elements 
const form = document.getElementById('check-in-form');
const currentTimeElement = document.getElementById('current-time');
const switchButton = document.getElementById('signin-out-button');

// Main Fieldset Inputs 
const jobLabel = document.getElementById('job-label');
const jobSelect = document.getElementById('job');
const visitPurposeFieldset = document.getElementById('visit-purpose');
const contractPurposeFieldset = document.getElementById('contractor-purpose');

// Contractor Field Variable Inputs 
const contractor_purpose = document.getElementById('contractor-reason');
const contractor_company = document.getElementById('contractor-company');
const contractor_contact = document.getElementById('contractor-contact');
const namesContainer = document.getElementById('names');
const nameEntries = namesContainer.querySelectorAll('.name-entry');
const newNameEntry = document.createElement('div');

//Visitor Field Variable Inputs
const visitor_purpose = document.getElementById('visit-reason');


// Function to update and display the current time
function updateCurrentTime() {
    const now = new Date();
  
    // Get hours, minutes, and seconds
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    // Display the formatted time in the specified element
    currentTimeElement.textContent = `Time: ${hours}:${minutes}:${seconds}`;
  }
  
  // Update the time immediately when the page loads
  updateCurrentTime();
  
  // Update the time every second (1000 milliseconds)
  setInterval(updateCurrentTime, 1000);


  // Function to show or hide the visit purpose fieldset based on the selected visitor type
function toggleVisitPurpose() {

     if (jobSelect.value === 'Visitor: Customer' || jobSelect.value === 'Visitor: Partner' || jobSelect.value === 'Visitor: Other'  ){
        setContractorFields(false);
        setVisitorFields(true)
        visitPurposeFieldset.style.display = 'block';
        contractPurposeFieldset.style.display = 'none'; 
        }
      else if(jobSelect.value === 'Contractor: Performing Work' || jobSelect.value === 'Contractor: Scouting Work' || jobSelect.value === 'Contractor: Supplier'){ 
        setContractorFields(true);
        setVisitorFields(false);
        visitPurposeFieldset.style.display = 'none';
        contractPurposeFieldset.style.display = 'block';
      }
      else{
        setContractorFields(false);
        setVisitorFields(false);
        visitPurposeFieldset.style.display = 'none';
        contractPurposeFieldset.style.display = 'none';
      }
    }

    function setContractorFields(viewOption) {
      contractor_purpose.required = viewOption;
      contractor_company.required = viewOption;
      contractor_contact.required = viewOption;
    }
    
    // Function to show or hide the visitor purpose fieldset based on the selected visitor type
    function setVisitorFields(viewOption) {
      visitor_purpose.required = viewOption;
    }
// Add an event listener to the job select element to call the function when the selection changes
jobSelect.addEventListener('change', toggleVisitPurpose);
        
// Call the function initially to set the initial state
toggleVisitPurpose();

// Function to toggle the sign-in/out form type
function toggleFormType(){
  // default to sign-in form
  if (switchButton.textContent === 'Sign-In') {
    jobSelect.required = true; 
    jobSelect.style.display = 'block';
    jobLabel.style.display = 'block'; 
  } else {
    jobSelect.required = false;
    jobSelect.style.display = 'none';
    jobLabel.style.display = 'none'; 
  }
  // Add an event listener to the button to toggle its text between "Sign-In" and "Sign-Out"
  switchButton.addEventListener('click', () => {
    if (switchButton.textContent === 'Sign-In') {
      jobSelect.required = false;
      jobSelect.style.display = 'none';
      jobLabel.style.display = 'none'; 
      switchButton.textContent = 'Sign-Out';
    } else {
      jobSelect.required = true;
      jobSelect.style.display = 'block';
      jobLabel.style.display = 'block'; 
      switchButton.textContent = 'Sign-In';
    }
  });
}

// Call the function initially to set the initial state
toggleFormType();

// Function to add a new name entry with a delete button
function addName() {
  newNameEntry.className = 'name-entry';

  // Clone the HTML for the name field and delete button
  newNameEntry.innerHTML = `
    <div class="name-input">
      <input type="name" name="user-name[]">
      <button type="button" class="delete-button">
        <i class="fas fa-trash"></i>Delete
      </button>
    </div>
  `;

  // Add a click event listener to the delete button
  const deleteButton = newNameEntry.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    namesContainer.removeChild(newNameEntry);
    updateDeleteButtons();
    // Set the "required" attribute of the name input field to false
    newNameEntry.querySelector('input').required = false; 
  });

  // Add an event listener for input validation
  const nameInput = newNameEntry.querySelector('input');
  nameInput.addEventListener('input', () => {
    // Remove non-alphabetic characters from the input
    nameInput.value = nameInput.value.replace(/[^a-zA-Z ]/g, '');
  });

  // Append the new name entry to the container
  namesContainer.appendChild(newNameEntry);

  // Set the "required" attribute of the name input field to true 
  nameInput.required = true; 

  // Update delete buttons
  updateDeleteButtons();
}


// Set the button's position and width based on the form's position and width
function updateButtonPosition() {
  const formRect = form.getBoundingClientRect();

  switchButton.style.width = `${formRect.width}px`;
  switchButton.style.bottom = `${window.innerHeight - formRect.bottom + 10}px`;
}

// Add an event listener for window resize events
window.addEventListener('resize', updateButtonPosition);

// Call updateButtonPosition initially to set the initial state
updateButtonPosition();

// Function to update the visibility of delete buttons
function updateDeleteButtons() {
  const nameEntries = document.querySelectorAll('.name-entry');

  // Show delete buttons for all other entries
  nameEntries.forEach((entry, index) => {
    if (index !== 0) {
      entry.querySelector('.delete-button').style.display = 'block';
    }
  });
}

// Add an event listener to the "Add Another Name" button
document.getElementById('addName').addEventListener('click', addName);

// Call updateDeleteButtons initially to set the initial state
updateDeleteButtons();
