$(window).load(function(){

    var width = $(window).innerWidth();
    var height = $(window).innerHeight()-10;

    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( width, height);

    var cameraDistance = 65;
    var camera = new THREE.PerspectiveCamera( cameraDistance, width / height, 1, 200);
    camera.position.z = -cameraDistance;

    var scene = new THREE.Scene();

    var meshMaterials = [];
    meshMaterials.push(new THREE.MeshBasicMaterial({color: 0x7cfc00, transparent: true}));

    var introTick = 0;

    var createScene = function(radius, divisions, tileSize){
        introTick = -1;
        var hexasphere = new Hexasphere(radius, divisions, tileSize);
        // debugger;
        for(var i = 0; i< hexasphere.tiles.length; i++){
            var t = hexasphere.tiles[i];

            var geometry = new THREE.Geometry();

            for(var j = 0; j< t.boundary.length; j++){
                var bp = t.boundary[j];
                geometry.vertices.push(new THREE.Vector3(bp.x, bp.y, bp.z));
            }
            geometry.faces.push(new THREE.Face3(0,1,2));
            geometry.faces.push(new THREE.Face3(0,2,3));
            geometry.faces.push(new THREE.Face3(0,3,4));
            if(geometry.vertices.length > 5){
                console.log(geometry.vertices.length)
                geometry.faces.push(new THREE.Face3(0,4,5));
            }

            var material = meshMaterials[0]

            var mesh = new THREE.Mesh(geometry, material.clone());
            scene.add(mesh);

        }

        introTick = 0;
    };

    createScene(30, 2, .95);

    var lastTime = Date.now();
    var cameraAngle = -Math.PI/1.5;

    var tick = function(time){


        var dt = Date.now() - lastTime;

        var rotateCameraBy = (2 * Math.PI)/(7000/dt);
        cameraAngle += rotateCameraBy;

        lastTime = Date.now();

        camera.position.x = cameraDistance * Math.cos(cameraAngle);
        camera.position.y = Math.sin(cameraAngle)* 10;
        camera.position.z = cameraDistance * Math.sin(cameraAngle);
        camera.lookAt( scene.position );

        renderer.render( scene, camera );

        requestAnimationFrame(tick);

    }

    $("#container").append(renderer.domElement);
    requestAnimationFrame(tick);

});
