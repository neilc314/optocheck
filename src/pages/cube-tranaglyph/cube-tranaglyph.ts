import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as THREE from 'three';

import * as $ from 'jquery'

/**
 * Generated class for the CubeTranaglyphPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-cube-tranaglyph',
  templateUrl: 'cube-tranaglyph.html',
})
export class CubeTranaglyphPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngAfterViewInit() {
    var scene = new THREE.Scene();
    var scene2 = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    var camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.autoClear = false;
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
    
    camera.position.z = 5;
    camera2.position.z = 5;
    camera2.position.y = 0.05;
    
    var redMaterial = new THREE.LineBasicMaterial({
        color: 0xf00002
    });
    var greenMaterial = new THREE.LineBasicMaterial({
        color: 0x00fefe
    });
    

    var redCube =  wireframeCube(-1, -1, -1, 2, redMaterial);
    var greenCube =  wireframeCube(-1, -1, -1, 2, greenMaterial);

    var cubeShift = 0;

    scene.add( redCube );
    scene2.add( greenCube );

  function animate() {
      requestAnimationFrame( animate );
      redCube.rotation.x += 0.01;
      redCube.rotation.y += 0.01;
      redCube.rotation.z += 0.01;
      greenCube.rotation.x += 0.01;
      greenCube.rotation.y += 0.01;
      greenCube.rotation.z += 0.01;
      // camera.rotation.z += 0.01;
      // camera.rotation.y += 0.0005;
      renderer.clear();
      renderer.render( scene, camera );
      renderer.clearDepth();
      renderer.render( scene2, camera2 );
  }
  animate();

  function wireframeCube(x, y, z, sideLength, material) {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( x + sideLength, y + sideLength, z + sideLength ), // A
        new THREE.Vector3( x + sideLength, y + sideLength, z ), // B
        new THREE.Vector3( x + sideLength, y, z ), // C
        new THREE.Vector3( x + sideLength, y, z + sideLength ), // D
        new THREE.Vector3( x + sideLength, y + sideLength, z + sideLength ), // A
        new THREE.Vector3( x, y + sideLength, z + sideLength ), // E
        new THREE.Vector3( x, y + sideLength, z ), // F
        new THREE.Vector3( x, y, z ), // G
        new THREE.Vector3( x, y, z + sideLength ), // H
        new THREE.Vector3( x, y + sideLength, z + sideLength ), // E
        new THREE.Vector3( x, y + sideLength, z ), // F
        new THREE.Vector3( x + sideLength, y + sideLength, z ), // B
        new THREE.Vector3( x, y + sideLength, z ), // F
        new THREE.Vector3( x, y, z ), // G
        new THREE.Vector3( x + sideLength, y, z ), // C
        new THREE.Vector3( x, y, z ), // G
        new THREE.Vector3( x, y, z + sideLength ), // H
        new THREE.Vector3( x + sideLength, y, z + sideLength ), // D
    );
    return new THREE.Line( geometry, material );
  }


  }
  

}
