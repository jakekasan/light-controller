module.exports = function(data, proposedPoint) {
  console.log("New point proposed with Env: " + proposedPoint.env_brightness + "\tLed: " + proposedPoint.led_brightness);
  var maxDist = 100;
  var maxIndex;
  for (var i = 0; i < data.length; i++) {
    thisDist = Math.sqrt((data[i].env_brightness - proposedPoint.env_brightness)**2);
    if (thisDist < maxDist) {
      maxDist = thisDist;
      maxIndex = i;
    }
  }
  console.log("Closest point is Env: " + data[maxIndex].env_brightness + "\tLed: " + data[maxIndex].led_brightness);

  data[maxIndex].env_brightness = proposedPoint.env_brightness;
  data[maxIndex].led_brightness = proposedPoint.led_brightness;

  return(data);
}
