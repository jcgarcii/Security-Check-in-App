/**
 * File: variables.js
 * Author: Jose Carlos Garcia
 * Description: Contains all variables used throughout the project
 * Version: 2.0
 * Last Modified: 10/6/2023
 */

// Form Reference
const form = document.getElementById('check-in-form');

// Elements 
const thankYouMessage = document.getElementById('thank-you-message');
const submitButton = document.getElementById('submit-button');
const cargillBanner = document.getElementById('cargill-banner');
const currentTimeElement = document.getElementById('current-time');
const switchButton = document.getElementById('signin-out-button');

// Fielsets
const userDetailsFieldset = document.getElementById('details');
const visitPurposeFieldset = document.getElementById('visit-purpose');
const contractorPurposeFieldset = document.getElementById('contractor-purpose');

// Main Fields
const nameInput = document.getElementById('user_name');
const phoneNumberInput = document.getElementById('tel');
const jobLabel = document.getElementById('job-label');
const jobSelect = document.getElementById('job');

// Visitor Fields
const visitReasonInput = document.getElementById('visit-reason');
const formatVisitCompanyInput = document.getElementById('visit-company');

// Contractor Fields
const contractorReasonInput = document.getElementById('contractor-reason');
const contractorCompanyInput = document.getElementById('contractor-company');
const contractorContactInput = document.getElementById('contractor-contact');
const contractorAreaInput = document.getElementById('contractor-area');