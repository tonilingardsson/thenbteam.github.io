var userID = {id:"null"};

$(document).ready(function(){


 var signedInAs;

 // Login status
  $.getJSON("/api/loginstatus.php")

    .done(function(data){
        userID.id = data.id;
        console.log("Anropar checked login");
        console.log("status: " + data.status);
        console.log("firstname: " + data.firstname);
        console.log("lastname: " + data.lastname);
      if(data.status){ // Galet data.status
        $(".signInMenu").hide();
        $(".signOutMenu").show();
        $(".signedInAsWrapper").show();
        signedInAs = "<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>  Du är inloggad som " + data.firstname + " " + data.lastname;
        $(".signedInAs").html(signedInAs);
      }
      else{
        $(".signOutMenu").hide();
        $(".signInMenu").show();
        $(".signedInAsWrapper").hide();
      }
    });




  // Registration form
  $("#registerWindow").on('click', '#registerConfirmButton', function (e) {
        e.preventDefault();
        var firstName = $('.first_name').val();
        var lastName = $('.last_name').val();
        var company = $('.company').val();
        var email = $('.email').val();
        var password1 = $('.password1').val();
        var password2 = $('.password2').val();
        var city = $('.city').val();
        var website = $('.website').val();

        if(password1 === password2){

        $.post( "/api/register.php?",
          { ffirstname: firstName,
            flastname: lastName,
            fcompany: company,
            femail: email,
            fpassword: password2,
            fcity: city,
            fwebsite: website} )
          .done(function(data){
            console.log("Success" + data);
            $("#registerWindow").modal('hide');
          })
          .fail(function(error){
            console.log("Failed register" + error);
          });
        }
        else {
          alert("Lösenorden matchar inte varandra");
        }
    });




    // Sign In form
    $("#signInWindow").on('click', '#logInButton', function () {
          var email = $('.emailSignIn').val();
          var password = $('.passwordSignIn').val();

        $.post( "api/checklogin.php?",
          {
            email: email,
            password: password} )
          .done(function(data){
            console.log("Success " + data);
            $("#signInWindow").modal('hide');
            location.reload();
          })
          .fail(function(error){
            console.log("Failed login" + error);
          });
    });




    // Sign out
    $("nav").on('click', '.signOutButton', function () {
          alert("Du har blivit utloggad");
      $.post("api/logout.php?")
    });




    // Recover Password (Funktionen är inte implementerad än)
    $("#recoverPasswordWindow").on('click', '#recoverPasswordButton', function (e) {
          e.preventDefault();
          var email = $('.emailRecover').val();

          alert("Clicked recover button \n" +
          "\nEmail: " + email);
    });




    // Upload edits
    $("#editUserWindow").on('click', '#updateUserButton', function () {
      var firstName = $('.updateFirstName').val();
      var lastName = $('.updateLastName').val();
      var profilePicture = $(".updateProfilePicture").val();
      var company = $('.updateCompany').val();
      var email = $('.updateEmail').val();
      var city = $('.updateCity').val();
      var website = $('.updateWebsite').val();
      var bio = $('.updateBio').val();
      var pic1 = $(".updatePicture1").val();
      var pic2 = $(".updatePicture2").val();
      var pic3 = $(".updatePicture3").val();
      var pic4 = $(".updatePicture4").val();
      var pic5 = $(".updatePicture5").val();

      $.post( "/api/edit.php?",
        { ufirstname: firstName,
          ulastname: lastName,
          ucompany: company,
          uemail: email,
          ucity: city,
          uwebsite: website,
          ubio: bio,
          uprofilepic: profilePicture,
          upic1: pic1,
          upic2: pic2,
          upic3: pic3,
          upic4: pic4,
          upic5: pic5} )
        .done(function(data){
          //alert("Success" + data);
          $("#editUserWindow").modal('hide');
          location.reload();
        })
        .fail(function(error){
          console.log("Failed update" + error);
        });
    });




    // Delete User
    $("#deleteWindow").on('click', '#deleteUserButton', function () {
        alert("Din profil har blivit raderad");
        $.post("api/delete_user.php?");
        location.reload();
    });


    // Search results
    searchResult();
});

// View profile
function showPhotographer(photographerId){

  $.post( "api/read2.php?",
    {id: photographerId} )
      .done(function(data){
        var parsedData = JSON.parse(data);

      // Starta modal här
      $("#profileWindow").modal("show");

      var photographerName = parsedData.info.firstname + " " + parsedData.info.lastname;
      var photographerPicture = "<img src='" + parsedData.info.profilepic +"'  alt='profilePicture' />";
      var photographerCompany = parsedData.info.company;
      var photographerCity = parsedData.info.city;
      var photographerWebsite = "<a href='http://"+ parsedData.info.website + "'>Hemsida</a>";
      var photographerContact = "<a href='mailto:" + parsedData.info.email+ "?Subject=Newbie%20fotografer' target='_top'>Skicka mail</a";
      var photographerFreeText = parsedData.info.bio;

      var img1 = '<img src="'+ parsedData.info.pic1 +'">';
      var img2 = '<img src="'+ parsedData.info.pic2 +'">';
      var img3 = '<img src="'+ parsedData.info.pic3 +'">';
      var img4 = '<img src="'+ parsedData.info.pic4 +'">';
      var img5 = '<img src="'+ parsedData.info.pic5 +'">';

      $(".photographerName").html(photographerName);
      $(".photographerPicture").html(photographerPicture);
      $(".photographerCompany").html(photographerCompany);
      $(".photographerCity").html(photographerCity);
      $(".photographerWebsite").html(photographerWebsite);
      $(".photographerContact").html(photographerContact);
      $(".photographerFreeText").html(photographerFreeText);
      $(".img1").html(img1);
      $(".img2").html(img2);
      $(".img3").html(img3);
      $(".img4").html(img4);
      $(".img5").html(img5);
    });
};

// Edit profile
function editUser(){

  $.post( "api/read2.php?",
    {id: userID.id} )
      .done(function(data){
      var parsedData = JSON.parse(data);
      var photographerFirstname = parsedData.info.firstname;
      var photographerLastname = parsedData.info.lastname;
      var photographerPicture = parsedData.info.profilepic;
      var photographerCompany = parsedData.info.company;
      var photographerCity = parsedData.info.city;
      var photographerWebsite = parsedData.info.website;
      var photographerContact = parsedData.info.email;
      var photographerFreeText = parsedData.info.bio;

      var img1 = parsedData.info.pic1;
      var img2 = parsedData.info.pic2;
      var img3 = parsedData.info.pic3;
      var img4 = parsedData.info.pic4;
      var img5 = parsedData.info.pic5;

      $(".updateFirstName").val(photographerFirstname);
      $(".updateLastName").val(photographerLastname);
      $(".updateProfilePicture").val(photographerPicture);
      $(".updateCompany").val(photographerCompany);
      $(".updateCity").val(photographerCity);
      $(".updateWebsite").val(photographerWebsite);
      $(".updateEmail").val(photographerContact);
      $(".updateBio").val(photographerFreeText);
      $(".updatePicture1").val(img1);
      $(".updatePicture2").val(img2);
      $(".updatePicture3").val(img3);
      $(".updatePicture4").val(img4);
      $(".updatePicture5").val(img5);
    });
};


  var searchResult = function(){
    $.getJSON("/api/read.php")
    .done(function(data){
      tableStart = "<table class='table table-hover table-condensed'>" ;
      for(var i = 0; i < data.length; i++){
          tableStart += "<tr id=" + data[i].id + ">" +
              "<th><a href='#' onclick='showPhotographer("+ data[i].id +");'>" + data[i].firstname + " " + data[i].lastname + "</a></th>" +
              "<td class='textAlignCenter'><a href='#' onclick='showPhotographer("+ data[i].id +");'>" + data[i].company + "</a></td>" +
              "<td class='textAlignRight'><a href='#' onclick='showPhotographer("+ data[i].id +");'>" + data[i].city +"</a></td>" +
            "</tr>";
          }
    tableStart += "</table>";
    $(".searchResults").html(tableStart);
  });
}
