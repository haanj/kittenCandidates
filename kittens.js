// Holds all kittens
var allKittens = [];
var chart;


// Constructor for photos
function Photo(id) {
  this.id = id;
  this.image = "contestants/" + id + ".jpg";
  this.wins = []; //stores ids of all kittens it's won against. Can just loop through, looking for specific kittens to get stats
  this.losses = []; //ditto
}


function startUp() {
  // creates dummy placeholder stats for layout purposes
  $('#imageStats').html('<p> blahblah </p>' + "<button id='continue'>Continue</button>");



  // If user data exists, restores, else initializes new data
  if (localStorage.allKittens) {
    restoreAllKittens();
  } else {
    initKittens();
  }

  // Adds reset button event listener to reset user data
  $('#reset').click(function(){
    allKittens.forEach(function(kitten){
      kitten.wins = [];
      kitten.losses = [];
    });
  });

  printImages();
}

// Create array of kitten objects
function initKittens(){
  // hardcoded placeholder array - replace sometime with array generated from files in /contestants
  var kittenIds = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"];

  // If allKittens already exists, check against current kittenIds, deleting/adding where necessary
  if (allKittens) {
    // Apparently this isn't possible...
  } else {
    // creates array of Photos objects from array of ids
    var kittens = kittenIds.map(function(kitten){
      return new Photo(kitten);
    });

    console.log(kittens);
    allKittens = kittens;
  }
}

function backupAllKittens(){
  var encoded = JSON.stringify(allKittens);
  localStorage.setItem('allKittens', encoded);
  console.log('Kittens saved!');
}

function restoreAllKittens(){
  var data = localStorage.getItem('allKittens');
  allKittens = JSON.parse(data);
}


// returns array of two Photos objects
function randomKittens(){
  console.log('running randomKittens');
  var firstKitten = allKittens[Math.floor(Math.random()*(allKittens.length))];
  var secondKitten;

  do {
    secondKitten = allKittens[Math.floor(Math.random()*(allKittens.length))];
  } while (firstKitten === secondKitten);

  return [firstKitten, secondKitten];
}


// Prints images to page
function printImages(){
  //
  $firstImage = $('#leftPic');
  $secondImage = $('#rightPic');

  // remove event listeners on images
  $firstImage.off();
  $secondImage.off();

  // Shows all images, hide #imageStats
  $firstImage.show("fast");
  $secondImage.show("fast");
  $('#imageStats').css('visibility','hidden')

  //$('#myChart').css('display', 'none');

  var kittens = randomKittens();



  $firstImage.html('<img src="'+kittens[0].image + '">');
  $secondImage.html('<img src="'+kittens[1].image + '">');

  //add event listeners
  $firstImage.click(function(){
    changeScore(kittens[0].id, kittens[1].id);
    $secondImage.hide("fast");
    statistics(kittens[0]);
  });

  $secondImage.click(function(){
    changeScore(kittens[1].id, kittens[0].id);
    $firstImage.hide("fast");
    statistics(kittens[1]);
  });
}

// Displays stats of Photo object
function statistics(kitten){
  //$('#myChart').css('display', 'block');
  backupAllKittens();
  /*
  if (chart) {
    chart.destroy();
  }
  chart = buildGraph(kittens);
  */

  $stats = $('#imageStats');
  $firstImage = $('#leftPic');
  $secondImage = $('#rightPic');

  // removes event listeners
  $firstImage.off();
  $secondImage.off();

  var message = "This kitten has won " + kitten.wins.length + " out of " + (kitten.wins.length + kitten.losses.length) + " match-ups";

  $stats.css('visibility','visible');

  $stats.html('<p>' + message + '</p>' + "<button id='continue'>Vote Again!</button>");

  $button = $('#continue');

  $button.click(function(){
    $secondImage.show("fast");
    printImages();
  });
  $firstImage.click(function(){
    $secondImage.show("fast");
    printImages();
  });
  $secondImage.click(function(){
    $secondImage.show("fast");
    printImages();
  });
}


// Registers vote, argument needs to be string
function changeScore(winner, loser){
  allKittens.forEach(function(kitten){
    if (winner === kitten.id){
      kitten.wins.push(loser);
      console.log("1 point logged for " + kitten.id);
    } else if (loser === kitten.id){
      kitten.losses.push(loser);
      console.log("1 loss logged for " + kitten.id);
    }
  });

  backupAllKittens();
}

// Gets kitten id string from image source. Not currently used
function getKittenFromImage(image){
  image = image.replace('contestants/', '');
  image = image.replace('.jpg', '');
  console.log("kitten id is " + image);
  return image;
}

// prints graph -- Unfinished and removed, as Charlie didn't like how Chart.js went in class
/*
function buildGraph(kittens){
  var ctx = document.getElementById("myChart").getContext("2d");

  var data = [
      {
          value: kittens[0].wins.filter(function(kitten){
            console.log(kitten);
            if (kitten === kittens[1].id) {
              return true;
            }
          }).length,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Red"
      },
      {
          value: kittens[1].wins.filter(function(kitten){
            console.log(kitten);
            if (kitten === kittens[0].id) {
              return true;
            }
          }).length,
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "Green"
      }
  ]

  return new Chart(ctx).Pie(data);
}
*/

$(document).ready(startUp);
