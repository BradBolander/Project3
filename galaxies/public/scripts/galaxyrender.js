//Set up Three.js
// New Three renderer
// var renderer = new THREE.WebGLRenderer();
// Create new Three scene
var scene = new THREE.Scene();
// Create new Three perspective camera

var camera = new THREE.PerspectiveCamera(120, window.innerWidth/window.innerHeight, 1, 50000);
camera.position.x = 0;
camera.position.z = 0;
info = document.createElement( 'div' );
document.body.appendChild( info );
container = document.getElementById( "galaxy" );
document.body.appendChild( container );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( 500, 500 );
container.appendChild( renderer.domElement );


// The function that creates a new galaxy
function newGalaxy() {
  this.create = function(radius, height, starCount) {
    // Creates new Three geometry
    var geometry = new THREE.Geometry();
    // Creates new material AKA the squares/stars
    var material = new THREE.PointCloudMaterial({
      color: 0x001aa2,
      size: .8,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: true
    });
                                              var max = 500;
     var min = -500;
    //Loop that creates stars and detemines their positions
    for (var i = 0; i < starCount; i++) {
      var x = Math.random() * Math.PI * 2;
      var y = Math.random() * (max - min) + min;

      var randRadius = Math.random() * radius;

      var coords = new THREE.Vector3();
      coords.x = Math.random() * Math.cos(Math.PI) * -500;
      coords.y = Math.random() * Math.cos(Math.PI) * -500;
      coords.z = Math.random() * Math.cos(Math.PI) * -500;

      //Assign coordinates to geometry
      geometry.vertices.push(coords);
    }

    //Creates new star with given geometry and material
    var star = new THREE.PointCloud(geometry, material);
    return star;
  }
}

// Create new instance of newGalaxy
var newGalaxy = new newGalaxy();
var galaxy = newGalaxy.create(5000, 50, 200000);

// Add galaxy to scene
scene.add(galaxy);

// This loop updates as soon as a tick occurs
var tickNum = 0;
function update() {
  tickNum++;

  //Set camera Y coordinate
  camera.position.y = 400;
  //For a camera that rotates in and out
  /*camera.position.x = Math.cos(tickNum / 500) * 500;*/
  // Moving camera position
  camera.position.z +=20 / tickNum;
  camera.position.x +=20 / tickNum;

  // Logic for defining where the camera points
  camera.lookAt({x:Math.sin(tickNum / 500) * 500, y: 10, z: Math.cos(tickNum / 500) * 500});

  //Constant rendering of the scene
  renderer.render(scene, camera);
  requestAnimationFrame(update);
  onResize();
}
update();

//Logic for resizing window
// Also seems to add a lot of clarity to the image
function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight)
}
