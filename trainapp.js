

var config = {
    apiKey: "AIzaSyAKVxpluBWLT6tg1LPYAVDoZSea58m4SG4",
    authDomain: "trainscheduler-a33d3.firebaseapp.com",
    databaseURL: "https://trainscheduler-a33d3.firebaseio.com",
    storageBucket: "trainscheduler-a33d3.appspot.com",
    messagingSenderId: "440154924424"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
   /*var trainName = "";
  var destination = "";
  var trainTime  = "";
  var frequency = 0;*/

    // Capture Button Click
$("#trainSubmitButton").on("click", function(event) {
 event.preventDefault();

  // Capture Inputs and store them into variables

  var trainName = $("#trainName").val().trim();
  var trainDestination = $("#trainDestination").val().trim();
  var trainTime = $("#trainTime").val().trim();
  var trainFrequency = $("#trainFrequency").val().trim();


  database.ref().push({
    trainName: trainName,
    trainDestination: trainDestination,
    trainTime: trainTime,
    trainFrequency: trainFrequency,
         
  });

  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#trainTime").val("");
  $("#trainFrequency").val("");

});


database.ref().on("child_added", function(snapshot) {

  // Log everything that's coming out of snapshot
      
  
  var tableRow = $("<tr>");
  $("#trainsTable").append(tableRow);     

  var trainName = snapshot.val().trainName;
  var trainDestination = snapshot.val().trainDestination;

 var trainFrequency = snapshot.val().trainFrequency;

 var startTime = snapshot.val().trainTime;
 

  var viewTime = moment(startTime, "hh:mm a");

  
  var minutesTime = moment().diff(viewTime, "minutes");

  
  var minutesMod = minutesTime % trainFrequency;

   
  var minutesAway = trainFrequency - minutesMod;

  

  var nextTrainTime = moment().add(minutesAway, "minutes").format("LT");

  
  


  // var trainTime = snapshot.val().trainTime;
  // var frequency = snapshot.val().frequency;

  var trainsArray = [trainName, trainDestination, trainFrequency, nextTrainTime, minutesAway];

  for(var i = 0; i<trainsArray.length; i++) {

    var tableData = $("<td>");
    tableData.text(trainsArray[i]);
    tableRow.append(tableData);

  };
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code)
});
