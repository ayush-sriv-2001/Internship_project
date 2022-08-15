// Function for Sign in existing users 

function SignIn(email,password){
  firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
  // Hadle errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
  alert(errorMessage);
  
  });
  }
 ///////////////////////////////////////////////////////////////////
 
 

  
  //////////////////////// button listners for existing user sign in ///////////////////////////////////
  
  $("#sign-in-button").click(function(){
    var email = $("#InputEmail").val();
    var password =$("#InputPassword").val();
    console.log("Existing user =" + email + " " + password);
    SignIn(email,password);
  });

/////////////////////////////////////////////////////////////////////




///////////////////////////////////   GOOGLE LOGIN         /////////////////////////////////////
  $("#google-login-button").click(function(){
    console.log("clicked google login");
    var provider = new firebase.auth.GoogleAuthProvider();


    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var currentuser = result.user;
    console.log("logged in using Google")
    console.log(currentUser);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    
    var errorMessage = error.message;
    alert(errorMessage);
    
  });

  });
///////////////////////////////////////////////////////////////////////////////////////////////////////////






//////////////////////// CREATING THE NEW USER////////////////////////////////////////
var currentUser = {};
// button listners for creating new user
$("#create-newuser-button").click(function(){
var email = $("#InputEmail").val();
var password =$("#InputPassword").val();
console.log("New user =" + email + " " + password);
CreateNewUser(email,password);
});

////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////// Function for creating new user///////////////////////////////

function CreateNewUser(email, paswword){
firebase.auth().createUserWithEmailAndPassword(email,paswword)
.catch(function(error){
var errorCode = error.code;
var errorMessage = error.message;
console.log(errorMessage);
alert(errorMessage);
// ..
});

}
//////////////////////////////////////////////////////////////////////////



firebase.auth().onAuthStateChanged(function(user){
if (user) {
// User is signed in
var email = user.email;
currentUser = user;

// calling write user data fuction


// writeUserData(user);

console.log(currentUser.email + " has logged in");
} else {
// User is signed out
// ...
}
});

// preventing from reload
document.getElementById("login-form").addEventListener("button",(event)=>{
  event.preventDefault()
});



firebase.auth().onAuthStateChanged((user)=>{
  if(user){
      location.replace("welcome.html")
  }
  else{
      // location.replace("index.html")
  }
})


