
var ready = false;
var data = [];
var minLat;
var minLon;
var maxLat;
var maxLon;

function setup() {
  createCanvas(800, 800);

  noLoop();

  //load data
  d3.csv("bikes_cleaned.csv", function (d) {
    return {
      startLat: +d['Starting Station Latitude'],
      startLon: +d['Starting Station Longitude'],
      endLat: +d['Ending Station Latitude'],
      endLon: +d['Ending Station Longitude']
    };
  }).then(function (csv) {
    console.log(csv);
    data = csv.filter(function (d, i) {
      return isValid(d);
    });
    ready = true;
    redraw();
  });

}

function draw() {

  if (!ready) {
    background(220, 0, 0);
    return;
  }
  else {
    background(255);
  }

  console.log('drawing the lines');
  minLat = d3.min(data, function (d) {
    return d3.min([d.startLat, d3.endLat]);
  });

  maxLat = d3.max(data, function (d) {
    return d3.max([d.startLat, d.endLat]);
  });

  minLon = d3.min(data, function (d) {
    return d3.min([d.startLon, d3.endLon]);
  });

  maxLon = d3.max(data, function (d) {
    return d3.max([d.startLon, d.endLon]);
  });

  console.log('lat: ' + minLat + ' ' + maxLat);
  console.log('lon: ' + minLon + ' ' + maxLon);


  for (var i = 0; i < data.length; i++) {
    //console.log(data[i]);
    var d = data[i];
    //lon is x, lat is y
    var x1 = map(d.startLon, minLon, maxLon, 0, width);
    var y1 = map(d.startLat, minLat, maxLat, 0, height);
    var x2 = map(d.endLon, minLon, maxLon, 0, width);
    var y2 = map(d.endLat, minLat, maxLat, 0, height);

    stroke(0,4);
    noFill();
    line(x1, y1, x2, y2);

  }

}

function isValid(d){
  return !(d.startLat == 0 || d.startLon == 0 || d.endLat == 0 || d.endLon == 0)
}