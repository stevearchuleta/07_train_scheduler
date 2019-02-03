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

var now = moment().format("hh:mm");
console.log(moment().format("hh:mm"));
console.log(now);
// Create a variable to reference the database.
var database = firebase.database();
console.log('Test01');

$('#add-train').on('click', function(){
event.preventDefault();

var trainName = $('#name-input').val().trim();
var destination = $('#destination-input').val().trim();
var departureTime = $('#time-input').val().trim();
var departureFrequency = $('#frequency-input').val().trim();

console.log(trainName);
console.log(destination);
console.log(departureTime);
console.log(departureFrequency);

//this creates an moment object (firstTrainTime) from a string (departureTime)
var firstTrainTime = moment(departureTime, "HH:mm").subtract(1, "years");
console.log(firstTrainTime);

//this yields the difference between current time, which is captured as moment(), and the first train time.
// var diff = moment().diff((firstTrainTime.diff(now, 'minutes')));
var diff = moment().diff(moment(firstTrainTime), "minutes");
console.log(diff);

var minutesAway = diff % Number(departureFrequency);
console.log("minutes away: ", minutesAway);

// var nextArrrival = departureFrequency - minutesAway;
var nextArrrival = now.add(minutesAway, 'minutes');
console.log(nextArrrival);
console.log("next arrival: ", nextArrrival);



database.ref().push({
  name:trainName,
  destination:destination,
  time:departureTime,
  frequency: departureFrequency,
  nextArrrival, nextArrrival,
  minutesAway, minutesAway
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
    NewTableRow.append($('<td>' + dbObject.nextArrrival + '</td>'));
    NewTableRow.append($('<td>' + dbObject.minutesAway + '</td>'));
  
    $('tbody').append(NewTableRow);
  
  })