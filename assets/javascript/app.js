
// remaining items to code
//1. users are still able to input invadit data, which is then displayed 
//2. past train arrivals should be romoved from the display. 
//3. next arrival and frequency are not factored into arrival

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAdbTKvQInZr_k2JJGJxbDbWojd_dGV2DA",
    authDomain: "train-scheduler-6d376.firebaseapp.com",
    databaseURL: "https://train-scheduler-6d376.firebaseio.com",
    projectId: "train-scheduler-6d376",
    storageBucket: "train-scheduler-6d376.appspot.com",
    messagingSenderId: "548737796938"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();



// Capture Button Click
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    console.log("clicked submit buttons")
    // Grabbed values from text boxes
    var sTrainName = $("#train-name-input").val().trim();
    var sDestination = $("#destination-input").val().trim();
    var nTime = $("#time-input").val().trim();
    var nFrequency = $("#frequency-input").val().trim();
    if (sTrainName === "" ||
        sDestination === "" ||
        nTime === "" ||
        nFrequency === "") {
        alert("Complete all fields to continue.");
        return;
    } else {
        // Code for handling the push
        database.ref().push({
            name: sTrainName,
            destination: sDestination,
            time: nTime,
            frequency: nFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $("#train-name-input").val("")
        $("#destination-input").val("")
        $("#time-input").val("")
        $("#frequency-input").val("")
    }
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = childSnapshot.val();

    // Console.loging the last user's data
    console.log(sv);
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.frequency);
    console.log("moment: " + moment().startOf(sv.time).fromNow());
 console.log("minutes till train: " + moment(sv.time, 'HH:mm').diff(moment(), "minutes")) 


    // Change the HTML to reflect

    //   var row = $("<tr>");
    //   var cell = $("<td id='#train-name-display'>");
    //   row.append(
    //     cell.attr("id", "#train-name-display").text(sv.name) +
    //     cell.attr("id","#destination-display").text(sv.destination) +
    //     cell.attr("id","#time-display").text(sv.time) +
    //     cell.attr("id","#frequency-display").text(sv.frequency)
    //   );

    // store time variable for display
    var sArrival = moment(sv.time, 'HH:mm').format('hh:mm a');
    var sMinutes = moment(sv.time, 'HH:mm').diff(moment(), "minutes");

    if(sMinutes <= 0) {
        sMinutes = "Departed";
    }


    $("#train-table").append("<tr><th class='train-name-display' scope='row'>" +
        sv.name +
        " </th><th class='destination-display'>" + sv.destination +
        " </th><th class='frequency-display'>" + sv.frequency +
        //convert sv.time to a usable format for moment.js then format for display in hh, which displays hours in standard time
        " </th><th class='time-display'>" + sArrival +
        " </th><th class='moment-display'>" + sMinutes + "</th></tr>");
    //   $("#train-table").append(row)
    //   $("#train-name-display").text(sv.name);
    //   $("#destination-display").text(sv.destination);
    //   $("#time-display").text(sv.time);
    //   $("#frequency-display").text(sv.frequency);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});