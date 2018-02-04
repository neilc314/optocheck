import * as Konva from 'konva';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { isObject } from 'ionic-angular/util/util';

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
    this.blueFill = '#00FFFF';
    var width = window.innerWidth;
    var height = window.innerHeight;

    this.stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });

    this.layer = new Konva.Layer();

    this.stage.on("dragend", () => {
      console.log('dragend');
      if ((Math.abs(this.bucketOutline.x() - this.shape.x()) <= 10) && 
      (Math.abs(this.bucketOutline.y() - this.shape.y()) <= 10) ){
        this.bucketOutline.opacity(0);
        this.shape.opacity(0);
        this.generateShape();
      }
    });
    this.generateShape();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DragShapePage');
  }

  restart() {
    // change objects
    this.bucketOutline.opacity(0);
    this.shape.opacity(0);
  }

  generateShape() {
    var shapeType = Math.random() * 3;
    var sides = Math.floor(Math.random() * 8) + 3;
    var radius =  Math.floor(Math.random() * 50) + 50;
    var opacity = 0.5;

    if (shapeType < 1.5) {
      this.shape = new Konva.RegularPolygon({
        x: Math.floor(Math.random() * 200) + 100,
        y: Math.floor(Math.random() * 400) + 100,
        sides: sides,
        radius: radius,
        fill: this.redFill,
        opacity: opacity,
        draggable: true
      });

      this.bucketOutline = new Konva.RegularPolygon({
        x: Math.floor(Math.random() * 200) + 100,
        y: Math.floor(Math.random() * 400) + 100,
        sides: sides,
        radius: radius,
        stroke: this.blueFill,
        strokeWidth: 10,
        opacity: opacity
      });
    } else if (shapeType < 2) {
      this.shape = new Konva.Circle({
        x: Math.floor(Math.random() * 200) + 100,
        y: Math.floor(Math.random() * 400) + 100,
        radius: radius,
        fill: this.redFill,
        opacity: opacity,
        draggable: true
      });

      this.bucketOutline = new Konva.Circle({
        x: Math.floor(Math.random() * 200) + 100,
        y: Math.floor(Math.random() * 400) + 100,
        radius: radius,
        stroke: this.blueFill,
        strokeWidth: 10,
        opacity: opacity
      });
    } else {
      this.shape = new Konva.Star({
        x: Math.floor(Math.random() * 200) + 100,
        y: Math.floor(Math.random() * 400) + 100,
        numPoints: sides,
        innerRadius: Math.floor(radius / 2),
        outerRadius: radius,
        fill: this.redFill,
        opacity: opacity,
        draggable: true
      });

      this.bucketOutline = new Konva.Star({
        x: Math.floor(Math.random() * 200) + 100,
        y: Math.floor(Math.random() * 400) + 100,
        numPoints: sides,
        innerRadius: Math.floor(radius / 2),
        outerRadius: radius,
        stroke: this.blueFill,
        strokeWidth: 10,
        opacity: opacity
      });
    }

    // add the shape to the layer
    this.layer.add(this.bucketOutline);
    this.layer.add(this.shape);
    

    // add the layer to the stage
    this.stage.add(this.layer);

    // this.stage.on("dragend", () => {
    //   console.log('dragend');
    //   if ((Math.abs(this.bucketOutline.x() - this.shape.x()) <= 10) && 
    //   (Math.abs(this.bucketOutline.y() - this.shape.y()) <= 10) ){
    //     this.bucketOutline.opacity(0);
    //     this.shape.opacity(0);
    //     this.generateShape();
    //   }
    // });
  }

}
