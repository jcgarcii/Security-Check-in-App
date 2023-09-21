/**
 * File: format.js
 * Author: Jose Carlos Garcia
 * Description: Contains functions related to form input formatting.
 * Version: 2.0
 * Last Modified: 9/21/2023
 */

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
  
  // Function to sanitize the name input
  function formatName(){
    const nameInput = document.getElementById('user_name');
    let name = nameInput.value.replace(/[^a-zA-Z ]/g, ""); // Remove non-alphabetic characters
  
    nameInput.value = name; // Update the input field with the formatted name
  }
  
  document.getElementById('user_name').addEventListener('input', formatName);
  
  