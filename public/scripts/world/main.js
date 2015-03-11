var scene, camera, renderer;


var init = function() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.y = 10;
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	var container = document.createElement('div');
	container.id = "glContainer";
	document.body.appendChild(container);
	container.appendChild(renderer.domElement);

	var mesh = new THREE.Mesh(new THREE.SphereGeometry(5, 20));
	scene.add(mesh);
	mesh.position.z = -50

	var ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100));
	ground.rotation.x = -Math.PI/2;
	scene.add(ground);
}


var animate = function() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

init();
animate();