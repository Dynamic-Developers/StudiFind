<html>
<head>
<title>
Login page
</title>
</head>
<body>
<h1 style="font-family:Comic Sans Ms;text-align="center";font-size:20pt;
color:#00FF00;>
Simple Login Page
</h1>
<form name="login">
Username<input type="text" name="userid"/>
Password<input type="password" name="pswrd"/>
<input type="button" onclick="check(this.form)" value="Login"/>
<input type="reset" value="Cancel"/>
</form>
<script language="javascript">
    function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
   
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
    
         var id_token = googleUser.getAuthResponse().id_token;
    
        console.log("ID Token: " + id_token);
        window.location = "http://www.yoururl.com";
      };


function check(form)/*function to check userid & password*/
{
 /*the following code checkes whether the entered userid and password are matching*/
 if(form.userid.value == "myuserid" && form.pswrd.value == "mypswrd")
  {
    window.open('target.html')/*opens the target page while Id & password matches*/
  
  logged = true;
  }
 else
 {
   alert("Error Password or Username")/*displays error message*/
  }
}

function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
   
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
    
         var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
      };


</script>
</body>
</html>