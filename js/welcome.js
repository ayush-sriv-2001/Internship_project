// save data

$('#data').click(function() {
  window.location.href = "data.html";
  return false;
});

// library

$('#library').click(function() {
  window.location.href = "library.html";
  return false;
});



// logout function ///////////////////
firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }
});

// sign out //////////////
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



/////////////////////////////Quote//////////////////////
const quoteText = document.querySelector(".quote"),
authorName = document.querySelector('.author .name')
quoteBtn = document.querySelector("button");
function randomQuote(){
  fetch("http://api.quotable.io/random").then(res => res.json()).then(result => {
    console.log(result)
    quoteText.innerText = result.content;
    authorName.innerText = result.author;


  });

}
 quoteBtn.addEventListener("click" , randomQuote);


