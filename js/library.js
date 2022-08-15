// save data

$('#data').click(function() {
  window.location.href = "data.html";
  return false;
});

$('#home').click(function() {
  window.location.href = "welcome.html";
  return false;
}); 



// logout function ///////////////////
firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }
});


///////////////////////////////////////////////////////// sign out ///////////////////////////////////////////
$(document).ready(function() {
  // show a dialog box when clicking on a link
  $("#logout").on('click', function(e) {
      e.preventDefault();
      $.Zebra_Dialog('<strong>Do you want to Logout?</strong>', {
          'type':     'question',
          'buttons':  [
                          {caption: 'Yes', callback: function() { 
                            firebase.auth().signOut();
                            console.log("logged out")
                          }},
                          {caption: 'No', callback: function() { }},
                          {caption: 'Cancel', callback: function() { }}
                      ]
      });
  });
});


/////////////////////////////Uploading //////////////////////////////////////

window.onload = function uploadImage() {
  const ref = firebase.storage().ref().child("library");
  const file = document.querySelector("#photo").files;
  const name = +new Date() + "-" ;
  const metadata = {
    // contentType: file.type
  };
  const task = ref.child(name).put(file, metadata);
  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      console.log(url);
      document.querySelector("#image").src = url;
    })
    .catch(console.error);
}



