$(document).ready(function() {
var config = {
apiKey: "AIzaSyDQrTJbbEJOltv_EDzXu5R8ehU7AqtG3Sc",
authDomain: "rps-multiplayer-7ac9c.firebaseapp.com",
databaseURL: "https://rps-multiplayer-7ac9c.firebaseio.com",
projectId: "rps-multiplayer-7ac9c",
storageBucket: "",
messagingSenderId: "990066240414"
};

firebase.initializeApp(config);

var database = firebase.database()
var players=["player1, player2"]
var choices = ["rock", "paper", "scissors"];
var choice1="nothing";
var choice2="nothing";
var player1Done=false;
var player2Done=false;
var player1Choices =[];
var player2Choices =[];
var wins1=0;
var losses1=0;
var wins2=0;
var losses2=0;
var ties=0;

var player1fist = $('<img class="rounded" src="./assets/images/fist-emoji-2.png">')

var player2fist = $('<img class="rounded" src="./assets/images/fist-emoji-1.png">')



for (j=0; j < choices.length; j++){
  
  var choiceButton = $("<button type='button' class='btn btn-secondary m-2' id='player1button'>");
      
  choiceButton.text(choices[j]);
      
  choiceButton.attr("data-choice", choices[j]);
      
  $("#player1buttons").append(choiceButton);

}


for (j=0; j < choices.length; j++){
      
  var choiceButton = $("<button type='button' class='btn btn-secondary m-2' id='player2button'>");
      
  choiceButton.text(choices[j]);
      
  choiceButton.attr("data-choice", choices[j]);

  choiceButton.attr("data-player", "player2");
      
  $("#player2buttons").append(choiceButton);
}

function startGame() { 

choice1=0
choice2=0
player1Done=false;
player2Done=false;
database.ref().set({
  choice1:0,
  choice2:0
});
enableButtons1();
enableButtons2();

$("#choiceImage1").html(player1fist);
$("#choiceImage2").html(player2fist);

console.log("The players are: "+players)
console.log("The options are: "+choices)
console.log("Player 1 has chosen: "+choice1);
console.log("Player 2 has chosen: "+choice2);

};

database.ref().on("value", function(snapshot) {
  var value = snapshot.val()
  if (value.choice2){

    if (value.choice2 === "rock"){
      console.log("it worked")
      choice2 = "rock";

      var imageURL = ["./assets/images/"+choice2+".jpg"]
      var choiceImage = $("<img class='rounded'>");
      choiceImage.attr("src", imageURL);
      $("#choiceImage2").html(choiceImage);

    }

    else if (value.choice2 === "paper"){

      choice2 = "paper";

      var imageURL = ["./assets/images/"+choice2+".jpg"]
      var choiceImage = $("<img class='rounded'>");
      choiceImage.attr("src", imageURL);
      $("#choiceImage2").html(choiceImage);
    }

    else if (value.choice2 === "scissors"){

      choice2 = "scissors";

      var imageURL = ["./assets/images/"+choice2+".jpg"]
      var choiceImage = $("<img class='rounded'>");
      choiceImage.attr("src", imageURL);
      $("#choiceImage2").html(choiceImage);
    }
    player2Done=true;
    checkRound()
  }

  else {

    if (value.choice1) {
     
      if (value.choice1 === "rock"){
        console.log("it worked")
        choice1 = "rock";

        var imageURL = ["./assets/images/"+choice1+".jpg"]
        var choiceImage = $("<img class='rounded'>");
        choiceImage.attr("src", imageURL);
        $("#choiceImage1").html(choiceImage);

      }

      else if (value.choice1 === "paper"){

        choice1 = "paper";

        var imageURL = ["./assets/images/"+choice1+".jpg"]
        var choiceImage = $("<img class='rounded'>");
        choiceImage.attr("src", imageURL);
        $("#choiceImage1").html(choiceImage);
      }

      else if (value.choice1 === "scissors"){

        choice1 = "scissors";

        var imageURL = ["./assets/images/"+choice1+".jpg"]
        var choiceImage = $("<img class='rounded'>");
        choiceImage.attr("src", imageURL);
        $("#choiceImage1").html(choiceImage);
      }
      player1Done=true;
      checkRound()
    }
  }
});

function enableButtons1(){
$(document).one("click", "#player1button", function (){
  choice1 = $(this).attr("data-choice");
  player1Choices.push(choice1);
  database.ref().set({
    choice1,
  });
});
};

function enableButtons2(){
$(document).one("click", "#player2button", function (){
  choice2 = $(this).attr("data-choice");
  player2Choices.push(choice2);
  database.ref().set({
    choice1,
    choice2,
  });
});
};

function checkRound() {

if (player1Done==true && player2Done==true) { 
    console.log("checking round")
    
    if ((choice1 === "rock") && (choice2 === "scissors")) {
        wins1++;
        losses2++;
        setTimeout(function(){ alert("Player 1 Wins!"); }, 3000);
      }

      if ((choice1 === "rock") && (choice2 === "paper")) {
        losses1++;
        wins2++;
        setTimeout(function(){ alert("Player 2 Wins!"); }, 3000);
      }

      if ((choice1 === "scissors") && (choice2 === "rock")) {
        losses1++;
        wins2++;
        setTimeout(function(){ alert("Player 2 Wins!"); }, 3000);
      }

      if ((choice1 === "scissors") && (choice2 === "paper")) {
        wins1++;
        losses2++;
        setTimeout(function(){ alert("Player 1 Wins!"); }, 3000);
      }

      if ((choice1 === "paper") && (choice2 === "rock")) {
        wins1++;
        losses2++;
        setTimeout(function(){ alert("Player 1 Wins!"); }, 3000);
      }

      if ((choice1 === "paper") && (choice2 === "scissors")) {
        losses1++;
        wins2++;
        setTimeout(function(){ alert("Player 2 Wins!"); }, 3000);
      }

      if (choice1 === choice2) {
        ties++;
        setTimeout(function(){ alert("Tie Game!"); }, 3000);
      }

  gameOver()
    }

  };

function gameOver() {

  $("#gamecounter").html("Player 1 Wins: " + wins1+"<br> Player 1 Losses: " + losses1+"<br> Player 2 Wins: " + wins2+"<br>Player 2 Losses: " + losses2+"<br> Ties: "+ ties);
  setTimeout(startGame, 5000);
}


startGame();

});
