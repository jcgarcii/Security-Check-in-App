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
  
    phoneNumberInput.value = phoneNumber; // Update the input field with the formatted phone number
  }
  
  // Add an event listener to the phone input element to call the formatPhoneNumber function
  document.getElementById('tel').addEventListener('input', formatPhoneNumber);
  

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