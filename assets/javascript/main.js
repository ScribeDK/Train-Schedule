//set starting train count
var trainNumber = 0;

console.log(localStorage)

//load inputed data
loadPage();

//load inputed data
function loadPage(){
	
//get previous trainNumber
oldCount = localStorage.getItem("trainNumber");

//check if previous trainNumber is blank if not set trainNumber to be an int
if (oldCount != null){
	trainNumber = parseInt(oldCount);
}

//load trains
createTrains();
}

// add new train to localStorage
$(".addTrainInfo").on("click", function(){
	
	//get train data from text boxes
	var name = document.getElementById("train-name").value;
	var destination = document.getElementById("train-dest").value;
	var firstTrain = document.getElementById("train-first").value;
	var frequency = document.getElementById("train-freq").value;
	
	//check if any text box was blank
	if (name != ""){if (destination != ""){if (firstTrain != ""){if (frequency != ""){
	
	//increase trainNumber
	trainNumber += 1;
	
	//store new trainNumber
	localStorage.setItem("trainNumber", trainNumber);
	
	//set train name and destination to uppercase
	name = name.toUpperCase();
	destination = destination.toUpperCase();
	
	//save train data to localStorage
	localStorage.setItem("name" + trainNumber, name);
	localStorage.setItem("destination" + trainNumber, destination);
	localStorage.setItem("firstTrain" + trainNumber, firstTrain);
	localStorage.setItem("frequency" + trainNumber, frequency);
	
	//empty text boxes
	$("#train-name").val('');
	$("#train-dest").val('');
	$("#train-first").val('');
	$("#train-freq").val('');
	
	console.log(localStorage);
	
	//load trains
	createTrains();
	}}}}
	
	return false;
});

//create trains from localStorage data
function createTrains(){
	
	//clear previous data and create columns for data
	$("#schedule").html("<section class='col-md-2 name'><p class='bold'>Train Name</p></section><section class='col-md-2 dest'><p class='bold'>Destination</p></section><section class='col-md-2 freq'><p class='bold'>Frequency(min)</p></section><section class='col-md-2 next'><p class='bold'>Next Arrival(HH:mm)</p></section><section class='col-md-2 away'><p class='bold'>Minutes Away</p></section>");
	
	//check if train data exists
	if (trainNumber > 0){
		
		//get current time data from PC
		var currentTime = new Date()
		
		for (i = 1; i <= trainNumber; i++){
			
			//set current time hours and minutes
			var hours = currentTime.getHours()
			var minutes = currentTime.getMinutes()
			
			//get localStorage data for current train 
			var name = localStorage.getItem("name" + i);
			var destination = localStorage.getItem("destination" + i);
			var firstTrain = localStorage.getItem("firstTrain" + i);
			var frequency = localStorage.getItem("frequency" + i);
			
			//breakup firt train time into hours and minutes
			var trainTimeSplit = firstTrain.split(":")
			
			//calculate first train time in minutes
			var trainTime = (parseInt(trainTimeSplit[0])*60) + parseInt(trainTimeSplit[1]);
			
			//calculate current time in minutes
			trainTimeSplit = (parseInt(hours)*60) + parseInt(minutes);
			
			// if the first train leaves before the current time add the frequency until it leaves at or after the current time
			while(trainTime < trainTimeSplit){
				trainTime = trainTime + parseInt(frequency);
			}
			
			//calculate how long till the next time the train leaves
			var awayTrain = trainTime - trainTimeSplit;
			
			//add the minutes till the train leaves to the current time
			minutes = minutes + awayTrain;
			
			//check if minutes is over an hour
			while (minutes >= 60){
				hours += 1;
				minutes -= 60;
			}
			//check if hours is past mid-night
			while (hours >= 24){
					hours = hours - 24;
				}
			
			//output data to columns
			$(".name").append(name + "<br>");
			$(".dest").append(destination + "<br>");
			$(".freq").append(frequency + "<br>");
			
			//check if minutes has two digits
			if (minutes > 9){
				$(".next").append(hours + ":" + minutes + "<br>");
			}
			//if not add '0' before
			else{
				$(".next").append(hours + ":0" + minutes + "<br>");
			}
			//check if train is arriving now if not show minutes till it arrives
			if (awayTrain != 0){
			$(".away").append(awayTrain + "<br>");
			}
			//if it is give message
			else{
				$(".away").append("Arriving now!<br>");
			}
		}
	}
	
}