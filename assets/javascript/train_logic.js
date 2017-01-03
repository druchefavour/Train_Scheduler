// 1 - initialize Firebase
// -------------------------------------------------------

  var config = {
    apiKey: "AIzaSyC2nT2FRp2puKFfR9ewuhxO9PnkG2OSqpg",
    authDomain: "train-schedule-project-3aee4.firebaseapp.com",
    databaseURL: "https://train-schedule-project-3aee4.firebaseio.com",
    storageBucket: "train-schedule-project-3aee4.appspot.com",
    messagingSenderId: "146067859884"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var currrenttime = "03.16"

  // 2 - Button for adding trains
  //----------------------------------------------------------
  $("#add-train-btn").on("click", function() {

  	// Grabs user input
  	var trnName = $("#train-name-input").val().trim();
  	var trnDestination = $("#destination-input").val().trim();
  	var trnStart = moment($("#start-input").val().trim(), "hh.mm").format("hh.mm");
  	var trnFrequency = $("#frequency-input").val().trim();

  // 3 - Create local "temporary" object for holding train data
  // --------------------------------------------------------------
  var newTrain = {
  	name: trnName,
  	destination: trnDestination,
  	start: trnStart,
  	frequency: trnFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train sucessfully added");

  // Clears all of the text-boxes

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page

  return false;
  
  });
// 4 - Create firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());
	// store everything into a variable.

	var trnName = childSnapshot.val().name;
	var trnDestination = childSnapshot.val().destination;
	var trnStart = childSnapshot.val().start;
	var trnFrequency = childSnapshot.val().frequency;

	//Train info
	console.log(trnName);
	console.log(trnDestination);
	console.log(trnStart);
	console.log(trnFrequency);

	//Prettify the train start
	var trnStartPretty = moment.unix(trnStart).format("hh:mm");

	// Time is 3:30 AM
    var firstTime = "03:00";

      // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
     console.log(firstTimeConverted);

	// Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	// Difference between the times

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);


	//var diffTime = moment().diff(moment(trnStart), "minutes");
    //  console.log("DIFFERENCE IN TIME: " + diffTime);

	//Calculate next train arrival time
	// Time apart (remainder)
      var tRemainder = diffTime % trnFrequency;
      console.log(tRemainder);

    // Minute Until Train
      var tMinutesTillTrain = trnFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var arrivalTime = moment(nextTrain).format("hh:mm");
      console.log("ARRIVAL TIME: " + arrivalTime);

       // Add each train's data into the table
  $("#train-table > tbody").append("<tr></td>" +  "<td>" + trnName + "</td>" + "<td>" + trnDestination+ "</td>" + "<td>" +
 trnFrequency + "</td>" +  "<td>"+ arrivalTime + "</td>" + "<td>" + tMinutesTillTrain + "</td>" + "<td></tr>");

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);

});