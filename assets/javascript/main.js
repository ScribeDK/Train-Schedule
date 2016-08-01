var trainNumber = 0;

console.log(localStorage)

loadPage();


function loadPage(){
oldCount = localStorage.getItem("trainNumber");

if (oldCount != null){
	trainNumber = parseInt(oldCount);
	console.log("on load: "+trainNumber);
}
createTrains();
}

$(".addTrainInfo").on("click", function(){
	
	var name = document.getElementById("train-name").value;
	var destination = document.getElementById("train-dest").value;
	var firstTrain = document.getElementById("train-first").value;
	var frequency = document.getElementById("train-freq").value;
	
	if (name != ""){if (destination != ""){if (firstTrain != ""){if (frequency != ""){
	
	trainNumber += 1;
	
	localStorage.setItem("trainNumber", trainNumber);
	
	name = name.toUpperCase();
	destination = destination.toUpperCase();
	
	localStorage.setItem("name" + trainNumber, name);
	localStorage.setItem("destination" + trainNumber, destination);
	localStorage.setItem("firstTrain" + trainNumber, firstTrain);
	localStorage.setItem("frequency" + trainNumber, frequency);
	
	$("#train-name").val('');
	$("#train-dest").val('');
	$("#train-first").val('');
	$("#train-freq").val('');
	
	console.log(localStorage);
	
	createTrains();
	}}}}
	
	return false;
});

function createTrains(){
	
	$("#schedule").html("<section class='col-md-2 name'><p class='bold'>Train Name</p></section><section class='col-md-2 dest'><p class='bold'>Destination</p></section><section class='col-md-2 freq'><p class='bold'>Frequency(min)</p></section><section class='col-md-2 next'><p class='bold'>Next Arrival(HH:mm)</p></section><section class='col-md-2 away'><p class='bold'>Minutes Away</p></section>");
	
	if (trainNumber > 0){
	
		var currentTime = new Date()
		
	
		for (i = 1; i <= trainNumber; i++){
			
			var hours = currentTime.getHours()
			var minutes = currentTime.getMinutes()
			
			var name = localStorage.getItem("name" + i);
			var destination = localStorage.getItem("destination" + i);
			var firstTrain = localStorage.getItem("firstTrain" + i);
			var frequency = localStorage.getItem("frequency" + i);
			
			console.log("Data for " + name);
			
			var trainTimeSplit = firstTrain.split(":")
			console.log("trainTimeSplit: " + trainTimeSplit)
			var trainTime = (parseInt(trainTimeSplit[0])*60) + parseInt(trainTimeSplit[1]);
			console.log("trainTime: " + trainTime);
			trainTimeSplit = (parseInt(hours)*60) + parseInt(minutes);
			console.log("trainTimeSplit2: "+trainTimeSplit);
			
			while(trainTime < trainTimeSplit){
				trainTime = trainTime + parseInt(frequency);
			}
			console.log("trainTime2: " + trainTime);
			var awayTrain = trainTime - trainTimeSplit;
			
			console.log("awayTrain: " + awayTrain);
			
			minutes = minutes + awayTrain;
			console.log("minutes: " + minutes);
			while (minutes >= 60){
				hours += 1;
				minutes -= 60;
			}
			while (hours >= 24){
					hours = hours - 24;
				}
			
			$(".name").append(name + "<br>");
			$(".dest").append(destination + "<br>");
			$(".freq").append(frequency + "<br>");
			
			if (minutes > 9){
				$(".next").append(hours + ":" + minutes + "<br>");
			}
			else{
				$(".next").append(hours + ":0" + minutes + "<br>");
			}
			
			$(".away").append(awayTrain + "<br>");
			
		}
	}
	
}