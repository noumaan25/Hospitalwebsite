// document.getElementById("admissionForm").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const phoneNumber = document.getElementById('phoneNumber').value;
//     const phonePattern = /^[0-9]{10,12}$/;
  
//     if (!phonePattern.test(phoneNumber)) {
//       alert("Please enter a valid 10 or 12 digit phone number.");
//       return;
//     }
  
//     alert("Form submitted successfully!");
//   });
  
//the above thins is for later on - reminder -----do not remove


  document.getElementById("admissionForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting right away
  
    // Get form field values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const city = document.getElementById('city').value.trim();
    const houseNo = document.getElementById('houseNo').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const diagnosis = document.getElementById('diagnosis').value.trim();
    const dateBooked = document.getElementById('dateBooked').value;
    const timeBooked = document.getElementById('timeBooked').value;
    const operatingRoom = document.getElementById('operatingRoom').value.trim();
    const plannedOpDate = document.getElementById('plannedOpDate').value;
    const plannedOpTime = document.getElementById('plannedOpTime').value;
    const consultantName = document.getElementById('consultantName').value.trim();
    const receptionistName = document.getElementById('receptionistName').value.trim();
  
    // Regular expressions for validation
    const namePattern = /^[A-Za-z\s]+$/;  // Only letters and spaces
    const pincodePattern = /^[0-9]{6}$/;  // Exactly 6 digits for pincode
    const phonePattern = /^[0-9]{10,12}$/;  // Only 10 or 12 digit numbers
  
    // Array to store the field validations
    const validationChecks = [
      { field: firstName, message: "First Name is required.", id: 'firstName' },
      { field: lastName, message: "Last Name is required.", id: 'lastName' },
      { field: dob, message: "Date of Birth is required.", id: 'dob' },
      { field: gender, message: "Gender is required.", id: 'gender' },
      { field: city, message: "City is required.", id: 'city' },
      { field: houseNo, message: "House Number is required.", id: 'houseNo' },
      { field: pincode, message: "Pincode must be a 6-digit number.", id: 'pincode', pattern: pincodePattern },
      { field: phoneNumber, message: "Phone number must be either 10 or 12 digits.", id: 'phoneNumber', pattern: phonePattern },
      { field: diagnosis, message: "Diagnosis is required.", id: 'diagnosis' },
      { field: dateBooked, message: "Booking date is required.", id: 'dateBooked' },
      { field: timeBooked, message: "Booking time is required.", id: 'timeBooked' },
      { field: operatingRoom, message: "Operating Room is required.", id: 'operatingRoom' },
      { field: plannedOpDate, message: "Planned Operation Date is required.", id: 'plannedOpDate' },
      { field: plannedOpTime, message: "Planned Operation Time is required.", id: 'plannedOpTime' },
      { field: consultantName, message: "Consultant Name is required.", id: 'consultantName' },
      { field: receptionistName, message: "Receptionist Name is required.", id: 'receptionistName' }
    ];
  
    // Function to validate individual fields
    function validateField(check) {
      // Check if the field is empty
      if (check.field === "") {
        // Show a custom alert asking if they want to ignore the error
        const ignore = confirm(`${check.message} Do you want to ignore this field?`);
        if (!ignore) {
          // If user doesn't want to ignore, focus the field and stop validation
          document.getElementById(check.id).focus();
          return false;
        }
      }
  
      // Check if there's a pattern to validate
      if (check.pattern && !check.pattern.test(check.field)) {
        alert(check.message);
        document.getElementById(check.id).focus();
        return false;
      }
      
      return true;
    }
  
    // Run through all validations and stop if any fails
    for (let check of validationChecks) {
      if (!validateField(check)) {
        return;  // Stop form submission if any validation fails
      }
    }
  
    // If all validations pass or are ignored
    alert("Form submitted successfully!");
    // Raahil bhai here you can add code to submit the form.
  });
  