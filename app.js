const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  var fn = req.body.fName;
  var ln = req.body.lName;
  var emailId = req.body.email;

  var data = {
    members: [
      {
        email_address: emailId,
        status : "subscribed",
        merge_fields: {
          FNAME : fn,
          LNAME : ln
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  var url = "https://us11.api.mailchimp.com/3.0/lists/eb37962b9b";
  var options = {
    method: "POST",
    auth : "robinshKumar_:ddae106692c92d2f8ad6b13ba8be48a2-us11"
  }

  const request = https.request(url, options, (response) => {
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", (data) => {
      console.log(response.statusCode);
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || port, () => {
  console.log("Listening on port " + port);
});







//api key
// ddae106692c92d2f8ad6b13ba8be48a2-us11
