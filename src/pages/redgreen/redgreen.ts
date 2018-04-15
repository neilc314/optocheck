import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { InstructionsTranaglyphPage } from '../instructions-tranaglyph/instructions-tranaglyph';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the RedgreenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-redgreen',
  templateUrl: 'redgreen.html',
})
export class RedgreenPage {

  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  ctx: any;
  greenX: number;
  redX: number;
  shiftVal: number;
  prettyShift: string;
  divCon: string;

  fieldColor: string;
  redFill: string;
  cyanFill: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer,
      public platform: Platform, public screenOrientation: ScreenOrientation) {
    this.redFill = '#FF0000';
    this.cyanFill = '#00FFFF';
    this.fieldColor = "#f0f0f0";
    var width = window.innerWidth;
    var height = window.innerHeight;

    if (window.localStorage.getItem("redFill") != null) {
      this.redFill = window.localStorage.getItem("redFill");
    }
    if (window.localStorage.getItem("cyanFill") != null) {
      this.cyanFill = window.localStorage.getItem("cyanFill");
    }
    if (window.localStorage.getItem("fieldColor") != null) {
      this.fieldColor = window.localStorage.getItem("fieldColor");
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedgreenPage');
  }

  isCordova() {
    return this.platform.is('cordova');
  }

  ngAfterViewInit() {
    if(this.isCordova() && !this.platform.is('tablet')) this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + "");
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + "");

    this.ctx = this.canvasElement.getContext('2d');

    this.greenX = Math.floor(this.platform.width() / 2);
    this.redX = Math.floor(this.platform.width() / 2);
    this.shiftVal = 0;

    this.reset();
    this.refreshCanvas();
  }

  instructions() {
    this.navCtrl.push(InstructionsTranaglyphPage);
  }

  shift($val: number){
    console.log(this.greenX);
    console.log(this.redX);
    console.log(this.platform.width());

    // start shifting red if green is at the edge of the screen
    // green at right edge
    if (this.greenX > this.platform.width() - 100) {
      if ($val > 0) {
        this.redX -= $val * 5;
      } else if (this.redX == Math.floor(this.platform.width() / 2)) {
        this.greenX += $val * 5;
      } else {
        this.redX -= $val * 5;
      }
    }
    // green at left edge
    else if (this.greenX < 100) {
      if ($val < 0) {
        this.redX -= $val * 5;
      } else if (this.redX == Math.floor(this.platform.width() / 2)) {
        this.greenX += $val * 5;
      } else {
        this.redX -= $val * 5;
      }
    }
    // otherwise, shift green as usual
    else {
      this.greenX += $val * 5;
    }
    
    this.shiftVal += $val / 5;
    this.prettyShift = this.shiftVal.toFixed(1);
    if (this.shiftVal == 0) {
      this.divCon = "";
    } else if (this.shiftVal < 0) {
      this.divCon = "Convergent";
    } else {
      this.divCon = "Divergent";
    }
    this.refreshCanvas();
  }

  reset() {
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + "");
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + "");

    this.greenX = Math.floor(this.platform.width() / 2);
    this.redX = Math.floor(this.platform.width() / 2);
    this.shiftVal = 0;
    this.shift(0);  
  }

  refreshCanvas() {
    this.canvasElement.width = this.canvasElement.offsetWidth;
    this.canvasElement.height = this.canvasElement.offsetHeight;
    this.ctx.globalAlpha = 1;
    this.ctx.clearRect(0, 0, this.platform.width(), 5000);
    this.ctx.fillStyle = this.fieldColor;
    this.ctx.fillRect(0, 0, this.platform.width(), 5000);
    if (this.platform.height() > 500) {
      this.drawSailboat(this.ctx, 'cyan', this.greenX - 120, 75, 1);
      this.drawSailboat(this.ctx, 'red', this.redX - 120, 75, 1);
    } else if (this.platform.height() > 300) {
      this.drawSailboat(this.ctx, 'cyan', this.greenX - 120, 75, 0.75);
      this.drawSailboat(this.ctx, 'red', this.redX - 120, 75, 0.75  );
    }

  }

  drawSailboat(context, color, x, y, scale) {
    context.globalAlpha = 0.5;
    if (color == 'red') {
      context.fillStyle = this.redFill;
      context.strokeStyle = this.redFill;
    } else if (color == 'cyan') {
      // context.fillStyle = "rgb(208, 255, 194)";
      // context.strokeStyle = "rgb(208, 255, 194)";
      context.fillStyle = this.cyanFill;
      context.strokeStyle = this.cyanFill
    } else {
      console.log('invalid color requested: ' + color);
      return;
    }
    context.lineWidth = 2;
    
    // base
		context.beginPath();
		context.moveTo(25 * scale + x, 160 * scale + y);
		context.lineTo(70* scale + x, 180 * scale + y);
		context.lineTo(150* scale + x, 180 * scale + y);
		context.lineTo(175 * scale + x, 160 * scale + y);
		context.closePath();
		context.fill();
		
		// pole
		context.beginPath();
		context.lineWidth = 5;
		context.moveTo(100 * scale + x,160 * scale + y);
		context.lineTo(100 * scale + x,50 * scale + y);
		context.stroke();
		
		// left sail
		context.beginPath();
		context.moveTo(96 * scale + x,50 * scale + y);
		context.lineTo(50 * scale + x,155 * scale + y);
		context.lineTo(90 * scale + x,140 * scale + y);
		context.fill();
		
		// right sail
		context.beginPath();
		context.moveTo(104 * scale + x,50 * scale + y);
		context.lineTo(160 * scale + x,150 * scale + y);
		context.lineTo(110 * scale + x,150 * scale + y);
    context.fill();
    
    // circle
    if (color == 'red') {
      context.beginPath();
      context.arc(x + scale * 100, y + scale * 120, 100 * scale, 0, 2 * Math.PI, false);
      context.stroke();
    } else {
      context.beginPath();
      context.arc(x + scale * 110, y + scale * 120, 100 * scale, 0, 2 * Math.PI, false);
      context.stroke();
    }
  }
}