$(document).ready(function(e){ // Ensures the page is fully loaded before running any of these scripts.

  // Toggles the visibility of the password input box from hidden to shown or shown to hidden.
  // Changes the icon appropriately when clicked.
  $('#passwordToggle').on('click', function(event){
    event.preventDefault(); 
    if($('#loginPassword').attr('type') == 'text'){
      $('#loginPassword').attr('type', 'password');
      $('#passwordToggle i').addClass( "fa-eye-slash" );
      $('#passwordToggle i').removeClass( "fa-eye" );
    }else if($('#loginPassword').attr("type") == "password"){
      $('#loginPassword').attr('type', 'text');
      $('#passwordToggle i').removeClass( "fa-eye-slash" );
      $('#passwordToggle i').addClass( "fa-eye" );
    }
  });

});

// Display an alert message in a predefined container.
function alertBanner(message){
  var wrapper = document.createElement('div'); // Create a div for the banner to go in.
  // Set the html value of the banner.
  wrapper.innerHTML =  '<div class="alert alert-danger alert-dismissable" role="alert">'
   + message + '<button class="btn-close" id="alertCloseButton" type="button"'
   + 'data-bs-dismiss="alert" aria-label="Close"</button></div>';

  // Find the container for the banner on the page and add it on.
  let bannerContainer = document.querySelector('#errorContainer');
  bannerContainer.append(wrapper);

  // Set a timeout for the banner to delete after three seconds.
  setTimeout(function(){
    bannerContainer.innerHTML= "";
  }, 3000);

}

// Function to delete the banner before its natural expiry.
function closeAlert(event) {
  event.parentNode.remove();
}