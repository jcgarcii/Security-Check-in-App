/**
 * File: format.js
 * Author: Jose Carlos Garcia
 * Description: Contains functions related to form input formatting.
 * Version: 3.0
 * Last Modified: 9/21/2023
 */

  // Function to format the phone number as the user types
  function formatPhoneNumber() {

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
  }phoneNumberInput.addEventListener('input', formatPhoneNumber);
  
  // Function to formata the name input
  function formatName(){
    let name = nameInput.value.replace(/[^a-zA-Z ]/g, ""); // Remove non-alphabetic characters
    nameInput.value = name; // Update the input field with the formatted name
  }nameInput.addEventListener('input', formatName);
  
  // Function to format the vist reason input
  function formatVisitReason(){
    let visitReason = visitReasonInput.value.replace(/[^a-zA-Z1-9 ]/g, ""); // Remove non-alphabetic characters
    visitReasonInput.value = visitReason; // Update the input field with the formatted name
  }visitReasonInput.addEventListener('input', formatVisitReason);

  // Function to format the vist company input
  function formatVisitCompany(){
    let visitCompany = formatVisitCompanyInput.value.replace(/[^a-zA-Z1-9 ]/g, ""); // Remove non-alphabetic characters and non-numerical characters 
    formatVisitCompanyInput.value = visitCompany; // Update the input field with the formatted name
  }formatVisitCompanyInput.addEventListener('input', formatVisitCompany);

  // Function to format the contractor visit input
  function formatContractorReason(){
    let contractorReason = contractorReasonInput.value.replace(/[^a-zA-Z1-9 ]/g, ""); // Remove non-alphabetic characters
    contractorReasonInput.value = contractorReason; // Update the input field with the formatted name
  }contractorReasonInput.addEventListener('input', formatContractorReason);

  // Function to format the contractor company input
  function formatContractorCompany(){
    let contractorCompany = contractorCompanyInput.value.replace(/[^a-zA-Z1-9 ]/g, ""); // Remove non-alphabetic characters
    contractorCompanyInput.value = contractorCompany; // Update the input field with the formatted name
  }contractorCompanyInput.addEventListener('input', formatContractorCompany);

  // Function to format the contractor contact input
  function formatContractorContact(){
    let contractorContact = contractorContactInput.value.replace(/[^a-zA-Z1-9 ]/g, ""); // Remove non-alphabetic characters
    contractorContactInput.value = contractorContact; // Update the input field with the formatted name
  }contractorContactInput.addEventListener('input', formatContractorContact);

  // Function to format the contractor area input
  function formatContractorArea(){
    let contractorArea = contractorAreaInput.value.replace(/[^a-zA-Z1-9 ]/g, ""); // Remove non-alphabetic characters
    contractorAreaInput.value = contractorArea; // Update the input field with the formatted name
  }contractorAreaInput.addEventListener('input', formatContractorArea);
