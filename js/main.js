var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;
var three = THREE;
var lastFrameTime = new Date().getTime() / 1000;
var totalGameTime = 0;

var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};

function init() {
    scene = new THREE.Scene();

     var axes = new THREE.AxisHelper(20);
        scene.add(axes);
    
   // controls = new THREE.OrbitControls( camera, renderer.domElement );

    initMesh();
    initCamera();
    initLights();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}


function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);
    //controls = new THREE.OrbitControls( camera, renderer.domElement );
    
}

function initLights() {
    var light = new THREE.AmbientLight(0xfffffe);
    scene.add(light);
}

var mesh = null;
function initMesh() {
    var loader = new THREE.JSONLoader();
    loader.load('./BlenderToJSON.json', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(materials));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
        mesh.translation = THREE.GeometryUtils.center(geometry);
        mesh.material.color.setHex( 0x339966 );
        scene.add(mesh);
    });
}



function rotateMesh() {
    if (!mesh) {
        return;
    }

    mesh.rotation.x -= SPEED * 2;
    mesh.rotation.y -= SPEED;
    mesh.rotation.z -= SPEED * 3;
}

function render() {
 requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
}


init();
render();

