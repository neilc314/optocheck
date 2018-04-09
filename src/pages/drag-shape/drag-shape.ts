import * as Konva from 'konva';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { isObject } from 'ionic-angular/util/util';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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
  fieldColor: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public screenOrientation: ScreenOrientation, public platform: Platform) {
    
  }

  ngAfterViewInit() {
    if (this.isCordova()) this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.redFill = '#FF0000';
    this.blueFill = '#00FFFF';
    this.fieldColor = "#f0f0f0";
    var width = window.innerWidth;
    var height = window.innerHeight - 56;

    if (window.localStorage.getItem("redFill") != null) {
      this.redFill = window.localStorage.getItem("redFill");
    }
    if (window.localStorage.getItem("cyanFill") != null) {
      this.blueFill = window.localStorage.getItem("cyanFill");
    }
    if (window.localStorage.getItem("fieldColor") != null) {
      this.fieldColor = window.localStorage.getItem("fieldColor");
    }

    this.stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });

    this.layer = new Konva.Layer();
    

    var stageRect =  new Konva.Rect({ 
      x: 0,
      y: 0,
      width: width,
      height: height,
      fill: this.fieldColor
    })
    this.layer.add(stageRect);

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
    // change objects TODO less hack
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
        x: Math.floor(Math.random() * (window.innerWidth - 200)) + 100,
        y: Math.floor(Math.random() * (window.innerHeight - 256)) + 100,
        sides: sides,
        radius: radius,
        fill: this.redFill,
        draggable: true
      });

      this.bucketOutline = new Konva.RegularPolygon({
        x: Math.floor(Math.random() * (window.innerWidth - 200)) + 100,
        y: Math.floor(Math.random() * (window.innerHeight - 256)) + 100,
        sides: sides,
        radius: radius,
        stroke: this.blueFill,
        strokeWidth: 10
      });
    } else if (shapeType < 2) {
      this.shape = new Konva.Circle({
        x: Math.floor(Math.random() * (window.innerWidth - 200)) + 100,
        y: Math.floor(Math.random() * (window.innerHeight - 256)) + 100,
        radius: radius,
        fill: this.redFill,
        draggable: true
      });

      this.bucketOutline = new Konva.Circle({ 
        x: Math.floor(Math.random() * (window.innerWidth - 200)) + 100,
        y: Math.floor(Math.random() * (window.innerHeight - 256)) + 100,
        radius: radius,
        stroke: this.blueFill,
        strokeWidth: 10
      });
    } else {
      this.shape = new Konva.Star({
        x: Math.floor(Math.random() * (window.innerWidth - 200)) + 100,
        y: Math.floor(Math.random() * (window.innerHeight - 256)) + 100,
        numPoints: sides,
        innerRadius: Math.floor(radius / 2),
        outerRadius: radius,
        fill: this.redFill,
        draggable: true
      });

      this.bucketOutline = new Konva.Star({
        x: Math.floor(Math.random() * (window.innerWidth - 200)) + 100,
        y: Math.floor(Math.random() * (window.innerHeight - 256)) + 100,
        numPoints: sides,
        innerRadius: Math.floor(radius / 2),
        outerRadius: radius,
        stroke: this.blueFill,
        strokeWidth: 10
      });
    }

    // add the shape to the layer
    this.layer.add(this.bucketOutline);
    this.layer.add(this.shape);
    

    // add the layer to the stage
    this.stage.add(this.layer);

  }

  isCordova() {
    return this.platform.is('cordova');
  }

}
