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
        
    if (jobSelect.value === 'default' || jobSelect.value === 'employee_new' || jobSelect.value === 'employee_vvs' || jobSelect.value === 'employee_qsi' || jobSelect.value === 'employee_lost') {
        visitPurposeFieldset.style.display = 'none';
    } else {
        visitPurposeFieldset.style.display = 'block';
        }
    }

// Add an event listener to the job select element to call the function when the selection changes
document.getElementById('job').addEventListener('change', toggleVisitPurpose);
        
// Call the function initially to set the initial state
toggleVisitPurpose();