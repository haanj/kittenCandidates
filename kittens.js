// Constructor for photos
function Photos(id) {
  this.id = id;
  this.image = "contestants/" + id + ".jpg";
  this.votes = 0;
  this.losses = 0;
}

// Create array of kitten objects
function initKittens(){
  console.log('running initKittens');

  // hardcoded placeholder array - replace sometime with array generated from files in /contestants
  var kittenIds = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"];

  // creates array of Photos objects from array of ids
  var kittens = kittenIds.map(function(kitten){
    return new Photos(kitten);
  })

  console.log(kittens);
  return kittens;
}

var allKittens = initKittens();


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
  console.log('running printImages')
  var kittens = randomKittens();

  console.log('kittens are ' + kittens);

  $('#imageStats').html("");

  $firstImage = $('#leftPic');
  $secondImage = $('#rightPic');

  $firstImage.html('<img src="'+kittens[0].image + '">');
  $secondImage.html('<img src="'+kittens[1].image + '">');

  //add event listeners
  $firstImage.click(function(){
    vote(kittens[0].id);
    loss(kittens[1].id);
    statistics(kittens[0]);
  });

  $secondImage.click(function(){
    vote(kittens[1].id);
    loss(kittens[0].id);
    statistics(kittens[1])
  });
}

// Displays stats of Photo object
function statistics(kitten){
  $stats = $('#imageStats');
  $firstImage = $('#leftPic');
  $secondImage = $('#rightPic');

  $firstImage.off();
  $secondImage.off();

  var message = "This kitten has won " + kitten.votes + " out of " + (kitten.votes+kitten.losses) + " times.";

  $firstImage.html('<img src="'+ kitten.image + '">');
  $secondImage.html('');
  $stats.html('<p>' + message + '</p>' + "<button id='continue'>Continue</button>");

  $button = $('#continue');

  $button.click(printImages);
  $firstImage.click(printImages);

}


// Registers vote, argument needs to be string
function vote(id){
  allKittens.forEach(function(kitten){
    if (id === kitten.id){
      kitten.votes++;
      console.log("1 point logged for " + kitten.id);
    }
  });
}

function loss(id){
  allKittens.forEach(function(kitten){
    if (id === kitten.id){
      kitten.losses++;
      console.log("1 loss logged for " + kitten.id);
    }
  });
}

// Gets kitten id string from image source. Not currently used
function getKittenFromImage(image){
  image = image.replace('contestants/', '');
  image = image.replace('.jpg', '');
  console.log("kitten id is " + image);
  return image;
}

function backupAllKittens(){
  var encoded = JSON.stringify(allKittens);
  localStorage.setItem('allKittens', encoded);
}

printImages();
//statistics(allKittens[0]);
