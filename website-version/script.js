
let userData = {}; // Empty object to store user data

// Function to format the phone number as the user types
function formatPhoneNumber() {
  const phoneNumberInput = document.getElementById('tel');
  let phoneNumber = phoneNumberInput.value.replace(/\D/g, ''); // Remove non-numeric characters

  if (phoneNumber.length >= 4) {
    phoneNumber = phoneNumber.replace(/(\d{3})(\d)/, '$1-$2'); // Format as: 123-4...
  }
  if (phoneNumber.length >= 7) {
    phoneNumber = phoneNumber.replace(/(\d{3})-(\d{3})(\d)/, '$1-$2-$3'); // Format as: 123-456-7...
  }

  // Cap the phone number length at 12 characters (including dashes)
  phoneNumber = phoneNumber.substring(0, 12);

  phoneNumberInput.value = phoneNumber; // Update the input field with the formatted and capped phone number
}

// Add an event listener to the phone input element to call the formatPhoneNumber function
document.getElementById('tel').addEventListener('input', formatPhoneNumber);

  
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
        

     if (jobSelect.value === 'visitor_customer' || jobSelect.value === 'visitor_partner' || jobSelect.value === 'visitor_other'  ){
        visitPurposeFieldset.style.display = 'block';
        contractPurposeFieldset.style.display = 'none'; 
        }
      else if(jobSelect.value === 'contractor_performing' || jobSelect.value === 'contractor_scouting' || jobSelect.value === 'contractor_supplier'){ 
        visitPurposeFieldset.style.display = 'none';
        contractPurposeFieldset.style.display = 'block';
      }
      else{
        visitPurposeFieldset.style.display = 'none';
        contractPurposeFieldset.style.display = 'none';
      }
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
      <input type="name" name="user_name[]">
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



// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent the form from actually submitting

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
