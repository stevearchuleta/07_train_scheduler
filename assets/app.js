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
// this code did not work: var diff = moment().diff((firstTrain.diff(now, 'minutes')));
var diff = moment().diff(moment(firstTrain), "minutes");
console.log(diff);

//calculate the remainder of diff mod departure frequency
var modulusRemainder = diff % Number(departureFrequency);
console.log("minutes away: ", minutesAway);

var minutesAway = departureFrequency - modulusRemainder;

var nextArrival = moment().add(minutesAway, "minutes");
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
    NewTableRow.append($('<td>' + dbObject.nextArrrival + '</td>'));
    NewTableRow.append($('<td>' + dbObject.minutesAway + '</td>'));
  
    $('tbody').append(NewTableRow);
  
  })