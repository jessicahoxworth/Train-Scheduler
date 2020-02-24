// Firebase Configuration
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBhp6aYyrPPp-SoyIHGXx4BHODUCrtA5Gs",
    authDomain: "train-scheduler-6a165.firebaseapp.com",
    databaseURL: "https://train-scheduler-6a165.firebaseio.com",
    projectId: "train-scheduler-6a165",
    storageBucket: "train-scheduler-6a165.appspot.com",
    messagingSenderId: "369134781178",
    appId: "1:369134781178:web:dd49d14d35582354a7ff43",
    measurementId: "G-XS8HSXQ6MK"
};
// initalize FireBase

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.initializeApp(firebaseConfig);
var trainData = firebase.database();

// captures input form data 

$("#addTrainBtn").on("click", function () {
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("x");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);

    alert("Train Added");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;


})

trainData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");
    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

})


