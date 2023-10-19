/**
 * File: form.js
 * Author: Jose Carlos Garcia
 * Description: Contains functions related to form handling and submission.
 * Version: 1.0
 * Last Modified: 9/21/2023
 */

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
        contractorPurposeFieldset.style.display = 'none'; 
        }
      else if(jobSelect.value === 'Contractor: Performing Work' || jobSelect.value === 'Contractor: Scouting Work' || jobSelect.value === 'Contractor: Supplier'){ 
        setContractorFields(true);
        setVisitorFields(false);
        visitPurposeFieldset.style.display = 'none';
        contractorPurposeFieldset.style.display = 'block';
      }
      else{
        setContractorFields(false);
        setVisitorFields(false);
        visitPurposeFieldset.style.display = 'none';
        contractorPurposeFieldset.style.display = 'none';
      }
    }

    function setContractorFields(viewOption) {
      contractorReasonInput.required = viewOption;
      contractorCompanyInput.required = viewOption;
      contractorContactInput.required = viewOption;
    }
    
    // Function to show or hide the visitor purpose fieldset based on the selected visitor type
    function setVisitorFields(viewOption) {
      visitReasonInput.required = viewOption;
    }
// Add an event listener to the job select element to call the function when the selection changes
jobSelect.addEventListener('change', toggleVisitPurpose);
        
// Call the function initially to set the initial state
toggleVisitPurpose();

// Function to toggle the sign-in/out form type
function toggleFormType(){
  // default to sign-in form
  if (switchButton.textContent === 'I want to: Sign-In') {
    jobSelect.required = true; 
    jobSelect.style.display = 'block';
    jobLabel.style.display = 'block'; 
  } else {
    jobSelect.required = false;
    contractorReasonInput.required = false;
    contractorCompanyInput.required = false;
    contractorContactInput.required = false;
    visitReasonInput.required = false;
    jobSelect.style.display = 'none';
    jobLabel.style.display = 'none'; 
  }
  // Add an event listener to the button to toggle its text between "Sign-In" and "Sign-Out"
  switchButton.addEventListener('click', () => {
    if (switchButton.textContent === 'I want to: Sign-In') {
      jobSelect.required = false;
      contractorReasonInput.required = false;
      contractorCompanyInput.required = false;
      contractorContactInput.required = false;
      visitReasonInput.required = false;
      jobSelect.style.display = 'none';
      jobLabel.style.display = 'none'; 
      // hide additional fields if open 
      if(contractorPurposeFieldset.style.display === 'block'){
        contractorPurposeFieldset.style.display = 'none';
      }
      else if(visitPurposeFieldset.style.display === 'block'){
        visitPurposeFieldset.style.display = 'none'
      }
      switchButton.textContent = 'I want to: Sign-Out';
    } else {
      jobSelect.required = true;
      jobSelect.style.display = 'block';
      jobLabel.style.display = 'block'; 
      switchButton.textContent = 'I want to: Sign-In';
    }
  });
}


// Call the function initially to set the initial state
toggleFormType();

// Function to add a new name entry with a delete button
function addName() {
  // Contractor: Additional Names Variable Inputs 
  const namesContainer = document.getElementById('names');
  const nameEntries = namesContainer.querySelectorAll('.name-entry');
  const newNameEntry = document.createElement('div');
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
