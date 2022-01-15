function validateForm() {
  let x = document.forms["contactForm"]["email"].value;
  // console.log(x) // for debugging
  if (!/\S+@\S+\.\S+/.test(x)) { // using regex to check email address
    alert("Please sign up with a valid email address, thanks!");
    return false;
  }
}

