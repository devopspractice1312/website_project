const express = require("express");
const app = express();

app.get("/", function(req,res){
	res.sendFile(__dirname +"/vinayaka/vinayaka.html")
});

app.get("/my_profile", function(request,response){
	response.sendFile(__dirname +"/my_profile/pr.html")
});

app.use(express.static("vinayaka"));
app.use(express.static("my_profile"));

app.listen(3000, function(){
	console.log("Well Done, Success!")
});

