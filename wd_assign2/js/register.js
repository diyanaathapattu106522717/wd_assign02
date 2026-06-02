function validate() {
    var username = document.getElementById("username").value;   /* finds the input id username + stores the text inside the input box */
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var genderM = document.getElementById("genderM").checked;      /* checks if the radiobutton is selected & obtains the value stored in a radio input */
    var genderF = document.getElementById("genderF").checked;

    var diet = document.getElementById("diet").value;
    var country = document.getElementById("country").value;

    var errMsg = "";     /* starts as empty string */
    var result = true;

    var namePattern = /^[a-zA-Z ]+$/;   /* regular expression for letters and spaces only in usernme*/

    /* Required fields */
    if (username == "") errMsg += "Username cannot be empty.\n";
    if (email == "") errMsg += "Email cannot be empty.\n";
    if (phone == "") errMsg += "Phone number cannot be empty.\n";
    if (password == "") errMsg += "Password cannot be empty.\n";
    if (confirmPassword == "") errMsg += "Confirm Password cannot be empty.\n";
    if (!genderM && !genderF) errMsg += "Please select a gender.\n";
    if (diet == "none") errMsg += "Please select a dietary preference.\n";
    if (country == "none") errMsg += "Please select a country/region.\n";

    /* Email must contain @ */
    if (email.indexOf('@') == 0)
        errMsg += "Email cannot start with @.\n";
    if (email.indexOf('@') < 0)
        errMsg += "Email must contain an @ symbol.\n";

    /* Passwords must match */
    if (password != confirmPassword)
        errMsg += "Passwords do not match.\n";

    /* Username letters only */
    if (!username.match(namePattern))
        errMsg += "Username must contain letters and spaces only.\n";

    /* Show popup */
    if (errMsg != "") {
        alert(errMsg);
        result = false;
    }

    return result;
}

function init() {
    var regForm = document.getElementById("regForm");
    regForm.onsubmit = validate;
}

window.onload = init;
