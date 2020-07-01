     ///////////////////////////////////////////
    // The Final Showdown Lockscreen for MCR //
   // Made with love and a lot of coffee,   //
  // By Maxim Coppieters.                  //
 // Copyright (c) 2020 Maxim Coppieters   //
///////////////////////////////////////////

  //////////////////////////////////////////////////////////
 // Predefining scripted animations and element handling //
//////////////////////////////////////////////////////////

// Fade out element and then remove it
function removeFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = 'opacity '+seconds+'s ease';
  
    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, speed);
}

// Fade in element
function fadeIn( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = 'opacity '+seconds+'s ease';
  
    el.style.opacity = 1;
}

// Fade out element but don't remove it
function justFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = 'opacity '+seconds+'s ease';
  
    el.style.opacity = 0;
}

// Preloading audio
const correctaudio = new Audio('sectionpass.mp3');
correctaudio.addEventListener('canplaythrough', () => {
    console.log('Ready to play the correctaudio');
});
const incorrectaudio = new Audio('sectionfail.mp3');
incorrectaudio.addEventListener('canplaythrough', () => {
    console.log('Ready to play the incorrectaudio');
});

// Disable context menu, CTRL+SHIFT+I, CTRL+SHIFT+J, CTRL+U
window.addEventListener('contextmenu', function (e) {
  // do something here... or how about nothing
  e.preventDefault();
}, false);

document.onkeydown = function (event) {
  event = (event || window.event);
  if (event.keyCode == 123 || event.keyCode == 18)
  {
    return false;
  }
}
document.onkeydown = function(e) {
  if(event.keyCode == 123) {
  return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
  return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
  return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
  return false;
  }
}

var input = document.getElementById('showdown-password');
// Trigger the eventlistener when you press enter
input.addEventListener('keyup', function(event) {
  // Number 13 is the 'Enter' key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById('submitbutton').click();
  }
});

  ////////////////////
 // The Main Event //
////////////////////
// Wait for a while
setTimeout(() => {
// Add eventlistener for buttonclick
document.getElementById('submitbutton').addEventListener('click', function(){
// Get the value inside the input box
var a8efa6har = document.getElementById('showdown-password').value;
// Compare it against the correct value
// If correct
if (a8efa6har == 'the CorRect ValUe') {
  // Play sound
  correctaudio.play();
  // Create the iframe with the page you access
    const iframe = Object.assign(document.createElement('iframe'), {
        id: 'mainframe',
        src: 'https://github.com/MaxTechnics/', // The URL
        allow: "camera;microphone",
        class: 'mainframe'
      });
      document.body.append(iframe);
// Fade in the green background
fadeIn(document.getElementById('overlaycorrect'), 350);
// Turn the button green
document.getElementById('submitbutton').style.background = '#76b852';

// Wait a little while
setTimeout(() => {
// Remove the no longer needed backgrounds
removeFadeOut(document.getElementById('overlayincorrect'), 500);
removeFadeOut(document.getElementById('overlaydefault'), 500);
setTimeout(() => {
  // Remove all parts of the login box
    removeFadeOut(document.getElementById('overlaycorrect'), 500);
    removeFadeOut(document.getElementById('showdown-login'), 500);
    removeFadeOut(document.getElementById('showdown-hr'), 500);
    removeFadeOut(document.getElementById('showdown-footer'), 500);
}, 500);
// Wait another while to prevent the other things for clipping
setTimeout(() => {
    // Remove the last element of the login screen (just a div)
    removeFadeOut(document.getElementById('showdown-page'), 500);
}, 10000);
}, 600);
}
// Password incorrect
else {
  // Play sound
  incorrectaudio.play();
  // Make the background red
  fadeIn(document.getElementById('overlayincorrect'), 330);
  // Make the button red
  document.getElementById('submitbutton').style.background = '#D62121';
  // Shake the body
  shake(document.body, 15);
  // Clear the password box
  document.getElementById('showdown-password').value = '';
  // Wait a while
  setTimeout(() => {
    // Turn the button blue again
    document.getElementById('submitbutton').style.background = '#2d7acb';
    // Turn the background blue again
    justFadeOut(document.getElementById('overlayincorrect'), 330);
  }, 700);
}
})
}, 50);

// Shaker
var shakingElements = [];  
var shake = function (element, magnitude = 16) {
  // First set the initial tilt angle to the right (+1) 
  var tiltAngle = 1;
  // A counter to count the number of shakes
  var counter = 1;
  // The total number of shakes (there will be 1 shake per frame)
  var numberOfShakes = 20;
  // Capture the element's position and angle so you can
  // Restore them after the shaking has finished
  var startX = 0,
      startY = 0,
      startAngle = 0;
  // Divide the magnitude into 10 units so that you can 
  // reduce the amount of shake by 10 percent each frame
  var magnitudeUnit = magnitude / numberOfShakes;
  // The 'randomInt' helper function
  var randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Add the element to the 'shakingElements' array if it
  // isn't already there
  if(shakingElements.indexOf(element) === -1) {
    shakingElements.push(element);
    // Add an 'updateShake' method to the element.
    // The 'updateShake' method will be called each frame 
      upAndDownShake();
  }

  // The 'upAndDownShake' function
  function upAndDownShake() {

    // Shake the element while the 'counter' is less than 
    // the 'numberOfShakes'
    if (counter < numberOfShakes) {

      // Reset the element's position at the start of each shake
      element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';
      // Reduce the magnitude
      magnitude -= magnitudeUnit;
      // Randomly change the element's position
      var randomX = randomInt(-magnitude, magnitude);
      var randomY = randomInt(-magnitude, magnitude);
      element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';
      // Add 1 to the counter
      counter += 1;
      requestAnimationFrame(upAndDownShake);
    }

    // When the shaking is finished, restore the element to its original 
    // position and remove it from the 'shakingElements' array
    if (counter >= numberOfShakes) {
        element.removeAttribute('style');
        shakingElements.splice(shakingElements.indexOf(element), 1);
      }
  }
};