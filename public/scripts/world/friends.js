var Friends = function(){

	this.friends = {};
	this.offsetBrightness = 0.3
	this.fakeObject = new THREE.Object3D();
}

Friends.prototype.place = function(position, id){

	//Only place if friend hasn't been spawned already;
   if(this.friends[id])return;

   var friend = new THREE.Object3D();
   friend.position.copy(position);
   scene.add(friend);
	//head
	var scale = randFloat(2, 3)
	var bodyRadius = 3;
	var friendGeo = new THREE.SphereGeometry(bodyRadius, 16, 16);

	var mat = new THREE.MeshBasicMaterial({
		color: new THREE.Color().setRGB(Math.random(), Math.random(), Math.random())
	});
	var body = new THREE.Mesh(friendGeo, mat);
	body.scale.y = scale;
	body.position.y = (bodyRadius * scale);
	this.friends[id] = friend;
	friend.add(body);
	friend.body = body;

	var headRadius = 3.5;

	var headGeo = new THREE.SphereGeometry(headRadius, 16, 16);
	var head = new THREE.Mesh(headGeo);
	head.position.y = 2 * (bodyRadius * scale)
	friend.add(head);

	var eyeRadius = .5;
	var eyeSpace = randFloat(0.6, 1.1);
	var eyeGeo = new THREE.SphereGeometry(0.5);
	var leftEye = new THREE.Mesh(eyeGeo);
	leftEye.position.z += headRadius;
	leftEye.position.x -= eyeSpace;
	head.add(leftEye);
	friend.head = head;

	var rightEye = leftEye.clone();
	rightEye.position.x += eyeSpace * 2
;	head.add(rightEye);
}

Friends.prototype.highlight = function(id){
	this.friends[id].body.material.color.offsetHSL(0, 0, this.offsetBrightness);

}

Friends.prototype.unHighlight = function(id){
	this.friends[id].body.material.color.offsetHSL(0, 0, -this.offsetBrightness);

}

Friends.prototype.teleport = function(id){
	var friend = this.friends[id];
	//get position of avatar, and rotation, then translate camera in front of that
	this.fakeObject = friend.clone();
	this.fakeObject.translateZ(30);
	camera.position.set(this.fakeObject.position.x, camera.position.y, this.fakeObject.position.z);
	var headPos = new THREE.Vector3();
	headPos.setFromMatrixPosition(friend.head.matrixWorld);
	camera.lookAt(headPos);
	//get position
}