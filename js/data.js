//////REDIRECT TO HOME//////
$("#library").click(function () {
  window.location.href = "library.html";
  return false;
});

$("#home").click(function () {
  window.location.href = "welcome.html";
  return false;
});


// saving data to our database....
var dbRef = firebase.database().ref().child("add-std");
dbRef.on("value", function (snapshot) {
  
  $("show-student").empty();

  snapshot.forEach(function (childsnapshot) {
    var student = childsnapshot.val();
    var count = $("#myTable tr").length;
    if (inputStudentName != "" && branch != "" && year != "") {
      $("#myTable tbody").append(
        '<tr class="child"><td>' +
          count +
          "</td><td>" +
          student.name +
          "</td><td>" +
          student.branch +
          "</td><td>" +
          student.year +
          '</td><td><a href="javascript:void(0);" id=" +stdID+ "  class="remCF1 btn btn-small btn-danger  " >Remove</a></td></tr>'
          
      );
      
      
    }

    $(document).on("click", ".remCF1", function () {
      
      console.log("clicked on delete");
      var stdID = $(this).closest('tr').attr('id');
      console.log("stdID");
      firebase.database().ref("studentFormDB/" +stdID  ).remove();
    });
  });
 
});

var studentFormDB = firebase.database().ref("add-std");

document.getElementById("upload").addEventListener("click", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("inputStudentName");
  var branch = getElementVal("branch");
  var year = getElementVal("year");

  saveMessages(name, branch, year);

  document.getElementById("add-std").reset();
}

const saveMessages = (name, branch, year) => {
  var newStudentForm = studentFormDB.push();

  newStudentForm.set({
    name: name,
    branch: branch,
    year: year,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

////////////////////////////////logout///////////////////////////////////////
// logout function ///////////////////
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    location.replace("index.html");
  }
});



// sign out //////////////
$(document).ready(function () {
  // show a dialog box when clicking on a link
  $("#logout").on("click", function (e) {
    e.preventDefault();
    $.Zebra_Dialog("<strong>Do you want to Logout?</strong>", {
      type: "question",
      buttons: [
        {
          caption: "Yes",
          callback: function () {
            firebase.auth().signOut();
            console.log("logged out");
          },
        },
        { caption: "No", callback: function () {} },
        { caption: "Cancel", callback: function () {} },
      ],
    });
  });
});
// /////////////////////SEARCH FUNCTION///////////////////////

$(document).ready(function(){
  $('#searchBar').keyup(function(){
    search_table($(this).val());
  });
  function search_table(value){
    $('#myTable tr').each(function(){
      var found = 'false';
      $(this).each(function(){
        if($(this).text().toLowerCase().indexOf(value.toLowerCase())>=0){
          found = 'true';
        }

      });
      if(found== 'true'){
        $(this).show();
      }
      else{
        $(this).hide();
      }
    });
  }
})