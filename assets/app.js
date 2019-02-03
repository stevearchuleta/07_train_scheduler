// Initialize Firebase
var config = {
  apiKey: "AIzaSyCRTbI51_gzEzEd0I-FA0hUwJbKssgjjRU",
    authDomain: "trainschedulehw-cbec9.firebaseapp.com",
    databaseURL: "https://trainschedulehw-cbec9.firebaseio.com",
    projectId: "trainschedulehw-cbec9",
    storageBucket: "trainschedulehw-cbec9.appspot.com",
    messagingSenderId: "770556813020"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();
console.log('Test01');

var now = moment().format("hh:mm");
console.log(moment().format("hh:mm"));
console.log(now);

$('#add-train').on('click', function(event){
event.preventDefault();

var trainName = $('#name-input').val().trim();
var destination = $('#destination-input').val().trim();
var firstTrainTime = $('#time-input').val().trim();
var departureFrequency = $('#frequency-input').val().trim();

console.log(trainName);
console.log(destination);
console.log(firstTrainTime);
console.log(departureFrequency);

//the following statement creates an moment object (firstTrain) from a string (firstTrainTime). Subtracting 1 year prevents "a negative number output" in a future calulation (below).
var firstTrain = moment(firstTrainTime, "HH:mm").subtract(1, "years");
console.log(firstTrain);

//the following statement yields the difference between current time, which is captured as moment(), and the first train time.

// but... this code did not work: 
// var diff = moment().diff((firstTrain.diff(now, 'minutes')));
var diff = moment().diff(moment(firstTrain), "minutes");
// var diff = moment().diff(firstTrain, 'minutes');
console.log(diff);
//convert unix time to a number
// var timeDiff = moment.unix(diff).format('mm');
// console.log(timeDiff);

//calculate the remainder of diff mod departure frequency
var timeSinceLastTrain = diff % Number(departureFrequency);
console.log(timeSinceLastTrain);
//time remaining
var minutesAway = departureFrequency - timeSinceLastTrain;
console.log("minutes away: ", minutesAway);

//nextArrival. The .format statement below converts an object to a string so that I'll be able to push it to the database.
// var nextArrival = moment().add(minutesAway, "minutes");
var nextArrival = moment().add(minutesAway, 'minutes').format('HH:mm');
console.log(nextArrival);




database.ref().push({
  name:trainName,
  destination:destination,
  time:firstTrainTime,
  frequency: departureFrequency,
  minutesAway: minutesAway,
  nextArrival: nextArrival
 
})

console.log('test02')

//empty imputs
$('#name-input').val('');
$('#destination-input').val('');
$('#time-input').val('');
$('#frequency-input').val('');



});

  database.ref().on('child_added', function(db){
    var dbObject = db.val();
    var NewTableRow = $('<tr>');
  console.log(dbObject);

    NewTableRow.append($('<td>' + dbObject.name + '</td>'));
    NewTableRow.append($('<td>' + dbObject.destination + '</td>'));
    NewTableRow.append($('<td>' + dbObject.frequency + '</td>'));
    // NewTableRow.append($('<td>' + dbObject.time + '</td>'));
    NewTableRow.append($('<td>' + dbObject.nextArrival + '</td>'));
    NewTableRow.append($('<td>' + dbObject.minutesAway + '</td>'));
  
    $('tbody').append(NewTableRow);
  
  })

//    x-ok, var departureFrequency = '30'
//    x-ok, var frequency = Number(frequencyFromDOM);
//    x-ok, var firstTraintTime = '9:30';
//    x-ok, var firstTrain = moment(firstTrainTime, 'HH:mm');

//    x-ok, var diff = moment().diff(firstTrain, 'minutes');

//    x-ok, var timeSinceLastTrain = diff % frequency;
//    x-ok, var timeRemaining = frequency - timeSinceLastTrain;
//    x-ok, var nextArrival = moment().add(timeRemaining, 'minutes').format('HH:mm');



// real time arrival updates using moment.js

// autoTrain ***************************************************************************

// var tFrequency = 3;
//     var firstTime = "03:35"; // Time is 3:30 AM

//     // First Time (pushed back 1 year to make sure it comes before current time)
//     var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
//     console.log(firstTimeConverted);

//     // Current Time
//     var currentTime = moment();
//     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//     // Difference between the times
//     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     console.log("DIFFERENCE IN TIME: " + diffTime);

//     // Time apart (remainder)
//     var tRemainder = diffTime % tFrequency;
//     console.log(tRemainder);

//     // Minute Until Train
//     var tMinutesTillTrain = tFrequency - tRemainder;
//     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//     // Next Train
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes")
//     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))




// autoTrain ***************************************************************************

