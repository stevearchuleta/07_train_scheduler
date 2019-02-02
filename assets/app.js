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

database.ref().push({
  name:trainName,
  destination:destination,
  time:departureTime,
  frequency: departureFrequency
})
console.log('test02')

});

  database.ref().on('child_added', function(db){
    var dbObject = db.val();
    var NewTableRow = $('<tr>');
  console.log(dbObject);

    NewTableRow.append($('<td>' + dbObject.name + '</td>'));
    NewTableRow.append($('<td>' + dbObject.destination + '</td>'));
    NewTableRow.append($('<td>' + dbObject.frequency + '</td>'));
    NewTableRow.append($('<td>' + dbObject.time + '</td>'));
  
    $('tbody').append(NewTableRow);
  
  })