$(document).ready(
    function() {
        var totalCharacters = 140;
        var showPosts = false;

        $("#postForm").keyup(function (event) {
            var inputText = event.target.value;
            $("#charRemaining").html(totalCharacters - inputText.length);
        });
        getComments();
        /**
         * When the page loads (or is refreshed) we request all comments from the server
         */
        function getComments(){

            $.get( "/getComments", function( data ) {
                var posts = "";
                
                for(var i=0; i<data.length; i++)
                {
                    posts += "<div class='well'><div class='row'><div class='col-xs-9'>"
                        + data[i].comment + "</div><div class='col-xs-9'>"
                        + data[i].email + "</div>"+"</div></div></div>";
                }
                $( "#feedPosts" ).html( posts );
                $( "#count" ).html(data.length);
                if(!showPosts)
                    $( "#feedPosts" ).hide();
                else
                    $( "#feedPosts" ).show();

                // Recursively call getComments every 10 seconds
                setTimeout(getComments,10000);
            });
        }

/**
  * Event handler for when the user submits a comment
  */
        $("#postForm").submit(function (event) {
            event.preventDefault();
            $.post("/addComment", {
		comment: event.target.inputPost.value
            }, function (result) {
                $("#charRemaining").html(totalCharacters);
                event.target.reset();
                getComments();
            });
        });
/**
         * Event handler for when the user deletes a comment
         */
        $("#feedPosts").click(function (event)
        {
            console.log(event.target.name);
            if(event.target.name)
            {
                $.ajax({
                url: '/removeComment/' + event.target.name,
                type: 'DELETE',
                success: function(result) {
                    getComments();
                }
            });
            }
        });
/**
         * Event handler for when the user deletes a comment
         */
        $("#btn-count").click(function (event) {
            var options = {};
            if(!showPosts)
            {
                $("#feedPosts").show( "blind", options, 1000);
                showPosts = true;
            }
            else
            {
                $("#feedPosts").hide( "blind", options, 1000);
                showPosts = false;
            }
        });
        
       
         
        
        function getContact(){

            $.get( "/getContact", function( data ) {
                var ads = "";
                
                for(var i=0; i<data.length; i++)
                {
                    ads += "<div class='well'><div class='row'><div class='col-xs-9'>"
                        + data[i].title + "</div><div class='col-xs-3'>" +
                        "<button type='button' name='"+data[i]._id+"' class='btn btn-danger'>" 		    +"Delete</button></div></div></div></div>";
                }
                $( "#feedAds" ).html( ads );
               // $( "#count" ).html(data.length);
               
                // Recursively call getComments every 10 seconds
                setTimeout(getContact,10000);
            });
        }

        $("#postForm").submit(function (event) {
            event.preventDefault();
            $.post("/addContact", {
		contact: event.target.inputPost.value
            }, function (result) {
                $("#charRemaining").html(totalCharacters);
                event.target.reset();
                getComments();
            });
        });
        $("#postForm").submit(function (event) {
            event.preventDefault();
            $.post("/addContact", {
		contact: event.target.inputPost.value
            }, function (result) {
                $("#charRemaining").html(totalCharacters);
                event.target.reset();
                getContact();
            });
        });
        
   
        app.post('/contactus', function (req, res) {
	  var mailOpts, smtpTrans;
	  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
	  smtpTrans = nodemailer.createTransport('SMTP', {
		service: 'Gmail',
		auth: {
		  user: "xxxxxxxx@gmail.com",
		  pass: "xxxxxxxxxxx"
		}
	  });
	  //Mail options
	  mailOpts = {
		from: req.body.name + req.body.email,
		to: 'yyyyyyyyyy@gmail.com',
		subject: req.body.email + '  --Msg from contactus-form',
		text: "Name: " + req.body.name + "Email: "  + req.body.email + 
		      "Contact No:  " + req.body.contactNo + "QUERY: " + req.body.message
	  };
	  smtpTrans.sendMail(mailOpts, function (error, response) {
		//Alert on event of message sent succeeds or fail.
		if (error) {
		  res.render('contactus',{msg : 'Error occured, message not sent.', err : true});
		}
		else {
		  res.render('contactus',{msg : 'Message sent! Thank you.', err : false});
		}
		smtpTrans.close();
	  });
});
function getDate() { 
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;
    document.getElementById("date").innerHTML=today;
};
function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


        });

