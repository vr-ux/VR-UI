var World = {};

var scene, camera, renderer, controls;
var randFloat = THREE.Math.randFloat;


var init = function() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.y = 15;
	camera.position.z = 30;
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	var container = document.createElement('div');
	container.id = "glContainer";
	document.body.appendChild(container);
	container.appendChild(renderer.domElement);

	// controls = new THREE.OrbitControls(camera, container);
	// controls.rotateSpeed = .5
	// controls.maxPolarAngle = Math.PI / 2.5;

	var geometry = new THREE.PlaneGeometry(2000, 2000, 50, 50);
	geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

	for (var i = 0, l = geometry.vertices.length; i < l; i++) {

		var vertex = geometry.vertices[i];
		vertex.x += Math.random() * 20 - 10;
		vertex.y += Math.random() * 2;
		vertex.z += Math.random() * 20 - 10;

	}

	for (var i = 0, l = geometry.faces.length; i < l; i++) {

		var face = geometry.faces[i];
		face.vertexColors[0] = new THREE.Color().setHSL(Math.random(), 0.75, Math.random());
		face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
		face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3, 0.75, Math.random() * 0.25 + 0.75);

	}

	var material = new THREE.MeshBasicMaterial({
		vertexColors: THREE.VertexColors
	});

	var floor = new THREE.Mesh(geometry, material);
	scene.add(floor);


	World.friends = new Friends();

}


var animate = function() {
	requestAnimationFrame(animate);
	// controls.update();
	renderer.render(scene, camera);
}

function randColor(){
	return Math.floor(Math.random()*16777215).toString(16);
}

init();
animate();