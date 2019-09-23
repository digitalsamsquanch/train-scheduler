// 1. Initialize Firebase
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyALstvP6WXVDvbo2A7_YML0dTOH1QVJVJI",
    authDomain: "train-scheduler-870d3.firebaseapp.com",
    databaseURL: "https://train-scheduler-870d3.firebaseio.com",
    projectId: "train-scheduler-870d3",
    storageBucket: "",
    messagingSenderId: "817634124792",
    appId: "1:817634124792:web:8a753e27f98fb11f996c0d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var trainStart = $("#start-input").val().trim();
    console.log(trainStart)
    var freq = $("#freq-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      dest: dest,
      start: trainStart,
      freq: freq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.freq);
  
    // alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#start-input").val("");
    $("#freq-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var trainStart = childSnapshot.val().start;
    var freq = childSnapshot.val().freq;
  
    // Employee Info
    console.log(trainName);
    console.log(dest);
    console.log(trainStart);
    console.log(freq);
  
    // Prettify the employee start
    var trainStartPretty = moment(trainStart, "HH:mm").subtract("1, years");
    console.log(trainStartPretty);
    console.log(moment().format("HH:mm"))
    // var difference = moment().diff(moment(trainStartPretty))
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainArrive = moment().diff(moment(trainStartPretty), "minutes");
    console.log(trainArrive);
  
    // Calculate the total billed rate
    var difference = trainArrive % freq
    console.log(difference)
    var minutesAway = freq - difference
    console.log(minutesAway)

    var nextArrival = moment().add(minutesAway, "minutes").format("HH: mm")
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(dest),
      $("<td>").text(freq),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );
    console.log(newRow)
  
    // Append the new row to the table
    $("#trainSched-table > tbody").append(newRow);
  });