/**
 * File: form.js
 * Author: Jose Carlos Garcia
 * Description: Contains functions related to form handling and submission.
 * Version: 1.0
 * Last Modified: 9/21/2023
 */

// Function to update and display the current time
function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
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
    const jobSelect = document.getElementById('job');
    const visitPurposeFieldset = document.getElementById('visit-purpose');
    const contractPurposeFieldset = document.getElementById('contractor-purpose');

    //FieldSet Attributes to be set as required or not required in the Visitor FieldSet
    const visitor_purpose = document.getElementById('visit-purpose');
        
     if (jobSelect.value === 'visitor_customer' || jobSelect.value === 'visitor_partner' || jobSelect.value === 'visitor_other'  ){
        setContractorFields(false);
        setVisitorFields(true)
        visitPurposeFieldset.style.display = 'block';
        contractPurposeFieldset.style.display = 'none'; 
        }
      else if(jobSelect.value === 'contractor_performing' || jobSelect.value === 'contractor_scouting' || jobSelect.value === 'contractor_supplier'){ 
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
      const contractor_purpose = document.getElementById('contractor-reason');
      const contractor_company = document.getElementById('contractor-company');
      const contractor_contact = document.getElementById('contractor-contact');
    
      contractor_purpose.required = viewOption;
      contractor_company.required = viewOption;
      contractor_contact.required = viewOption;
    }
    
    // Function to show or hide the visitor purpose fieldset based on the selected visitor type
    function setVisitorFields(viewOption) {
      const visitor_purpose = document.getElementById('visit-reason');
      visitor_purpose.required = viewOption;
    }
// Add an event listener to the job select element to call the function when the selection changes
document.getElementById('job').addEventListener('change', toggleVisitPurpose);
        
// Call the function initially to set the initial state
toggleVisitPurpose();


// Function to add a new name entry with a delete button
function addName() {
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
    });
  
    // Append the new name entry to the container
    namesContainer.appendChild(newNameEntry);
  
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