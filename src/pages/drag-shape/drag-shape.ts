import * as Konva from 'konva';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DragShapePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-drag-shape',
  templateUrl: 'drag-shape.html',
})
export class DragShapePage {

  layer: Konva.Layer;
  stage: Konva.Stage;
  shape: any; // likely RegularPolygon or Star
  bucketOutline: any;
  redFill: string;
  blueFill: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngAfterViewInit() {
    this.redFill = '#FF0000';
    this.blueFill = '#0000FF';
    var width = window.innerWidth;
    var height = window.innerHeight;

    this.stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });

    this.layer = new Konva.Layer();

    this.shape = new Konva.RegularPolygon({
      x: 100,
      y: 150,
      sides: 6,
      radius: 70,
      fill: this.redFill,
      opacity: 0.2,
      draggable: true
    });

    this.bucketOutline = new Konva.RegularPolygon({
      x: 200,
      y: 250,
      sides: 6,
      radius: 75,
      stroke: this.blueFill,
      strokeWidth: 10,
      opacity: 0.2
    });



    // add the shape to the layer
    this.layer.add(this.bucketOutline);
    this.layer.add(this.shape);
    

    // add the layer to the stage
    this.stage.add(this.layer);

    this.stage.on("dragend", () => {
      var pos = this.stage.getPointerPosition();
      var shape = this.layer.getIntersection(pos);
      if (shape) {
          console.log('hi');
      }
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DragShapePage');
  }

}
