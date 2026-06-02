function formatCurrency(amount) {     /* converts number into money by adding $ in front */
    return "$" + amount.toFixed(2);   /* makes 2 decimal places */
}

function updateDeposit() {     /* updates deposit amount on the page from selected restaurant */
    var restaurant = document.getElementById("restaurant");  /* gets the restaurant dropdown element from the page by finding the id */
    var depositField = document.getElementById("deposit");  
    var selected = restaurant.options[restaurant.selectedIndex];   /* finds the currently selected option inside the dropdown */
    if (selected && selected.dataset && selected.dataset.deposit) {
        var amt = parseFloat(selected.dataset.deposit);             /* turns the deposit text into a number so it can be formatted */
        depositField.value = formatCurrency(amt);     /* formats the number into money using the function */
    }
}

function showPaymentFields() {      
    var voucherRow = document.getElementById("voucherRow");
    var onlineFields = document.getElementById("onlinePaymentFields"); 
    var methodVoucher = document.getElementById("methodVoucher").checked;   /* shows voucher field if selected */
    var methodOnline = document.getElementById("methodOnline").checked;     /* shows card field if selected */

    if (methodVoucher) {
        voucherRow.style.display = "flex";   /* css display mode */
        onlineFields.style.display = "none";
    } else if (methodOnline) {
        voucherRow.style.display = "none";
        onlineFields.style.display = "block";
    } else {
        voucherRow.style.display = "none";
        onlineFields.style.display = "none";
    }
}

function sameAsEmailToggle() {
    var same = document.getElementById("sameAsEmail").checked;
    var email = document.getElementById("email").value;
    var billing = document.getElementById("billingEmail");
    if (same) {
        billing.value = email;
        billing.readOnly = true;
    } else {
        billing.readOnly = false;
    }
}

function preselectRestaurantFromURL() {       /* makes the recommendation page pass the restaurant name into the reservation page */
    // If a ?restaurant=slug is present, preselect that option
    var params = new URLSearchParams(window.location.search);
    var r = params.get('restaurant');
    if (r) {
        var sel = document.getElementById("restaurant");
        for (var i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value === r) {
                sel.selectedIndex = i;
                break;
            }
        }
    }
    updateDeposit();
}

function validateReservation() {     /* validation - stores the text inside the input box or checks if the radiobutton is selected, JS needs the values to check for mistakes */
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var restaurant = document.getElementById("restaurant").value;
    var resDateTime = document.getElementById("resDateTime").value;
    var people = document.getElementById("people").value;
    var depositMethodVoucher = document.getElementById("methodVoucher").checked;
    var depositMethodOnline = document.getElementById("methodOnline").checked;
    var cardType = document.getElementById("cardType").value;
    var cardNumber = document.getElementById("cardNumber").value;
    var billingEmail = document.getElementById("billingEmail").value;

    var errMsg = "";
    var result = true;

    /* No spaces, must contain @, must contain a dot after the @ */
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var digitsOnly = /^\d+$/;

    // Required fields
    if (fullName.trim() === "") errMsg += "Full name cannot be empty.\n";
    if (email.trim() === "") errMsg += "Email cannot be empty.\n";
    if (phone.trim() === "") errMsg += "Phone number cannot be empty.\n";
    if (restaurant === "") errMsg += "Please select a restaurant.\n";
    if (resDateTime === "") errMsg += "Please select a reservation date and time.\n";
    if (people === "" || Number(people) <= 0) errMsg += "Number of people must be greater than 0.\n";
    if (!depositMethodVoucher && !depositMethodOnline) errMsg += "Please select a deposit method.\n";
    if (billingEmail.trim() === "") errMsg += "Billing email cannot be empty.\n";

    // Email format
    if (email && !emailPattern.test(email)) errMsg += "Email address is not valid.\n";
    if (billingEmail && !emailPattern.test(billingEmail)) errMsg += "Billing email address is not valid.\n";

    // Phone: digits only, at least 10 digits
    var phoneDigits = phone.replace(/\s+/g, "");
    if (!digitsOnly.test(phoneDigits)) {
        errMsg += "Phone number must contain digits only.\n";
    } else if (phoneDigits.length < 10) {
        errMsg += "Phone number must contain at least 10 digits.\n";
    }

    /* Reservation date/time must not be in the past */
    if (resDateTime) {
        var selectedDate = new Date(resDateTime);
        var now = new Date();
        if (selectedDate < now) {
            errMsg += "Reservation date and time cannot be in the past.\n";
        }
    }

    // Payment method specifics
    if (depositMethodOnline) {
        if (cardType === "") {
            errMsg += "Please select a card type for online payment.\n";
        }
        var cardDigits = cardNumber.replace(/\s+/g, "");
        if (!digitsOnly.test(cardDigits)) {
            errMsg += "Card number must contain digits only.\n";
        } else {
            if (cardType === "visa" || cardType === "mastercard") {
                if (cardDigits.length !== 16) errMsg += "Visa/MasterCard numbers must be 16 digits.\n";
            } else if (cardType === "amex") {
                if (cardDigits.length !== 15) errMsg += "Amex card numbers must be 15 digits.\n";
            }
        }
    }

    /* oucher: per spec, voucher code is shown but does not require validation. */
    /* (no checks here.) */

    if (errMsg !== "") {
        alert(errMsg);
        result = false;
    }

    return result;
}

function initReservation() {
    /* preselect restaurant if passed via URL */
    preselectRestaurantFromURL();

    /* Event listeners */     /* watches for restaurant changes --> updates deposit */  /* watches for deposit method changes --> shows/hides payment fields */
    document.getElementById("restaurant").addEventListener("change", updateDeposit);
    var methodVoucher = document.getElementById("methodVoucher");
    var methodOnline = document.getElementById("methodOnline");
    methodVoucher.addEventListener("change", showPaymentFields);
    methodOnline.addEventListener("change", showPaymentFields);

    document.getElementById("sameAsEmail").addEventListener("change", sameAsEmailToggle);
    document.getElementById("email").addEventListener("input", function() {
        if (document.getElementById("sameAsEmail").checked) {
            document.getElementById("billingEmail").value = this.value;
        }
    });


   function init() {
    var form = document.getElementById("reservationForm");
    form.onsubmit = validateReservation; 
}

window.onload = init;


    /* initialize payment fields visibility */
    showPaymentFields();
}

window.addEventListener("DOMContentLoaded", initReservation);
