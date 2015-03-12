var Friends = function(){

	console.log('yeaa')
}

Friends.prototype.place = function(position){


	//head
	var scale = randFloat(2, 3)
	var radius = 3;
	var friendGeo = new THREE.SphereGeometry(radius, 16, 16);

	var mat = new THREE.MeshBasicMaterial({
		color: new THREE.Color().setRGB(Math.random(), Math.random(), Math.random())
	});
	var friend = new THREE.Mesh(friendGeo, mat);
	friend.scale.y = scale;
	friend.position.copy(position);
	friend.position.y = (radius * scale);
	scene.add(friend);
}