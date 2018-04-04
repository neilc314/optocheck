import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { InstructionsTranaglyphPage } from '../instructions-tranaglyph/instructions-tranaglyph';

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
      public platform: Platform) {
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

  ngAfterViewInit() {
    // this.screenOrientation.lock('landscape');
    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + "");
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + "");

    this.ctx = this.canvasElement.getContext('2d');

    this.greenX = Math.floor(this.platform.width() / 2);
    this.redX = Math.floor(this.platform.width() / 2);
    this.shiftVal = 0;

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
    this.ctx.globalAlpha = 1;
    this.ctx.clearRect(0, 0, this.platform.width(), this.platform.height());
    this.ctx.fillStyle = this.fieldColor;
    this.ctx.fillRect(0, 0, this.platform.width(), this.platform.height());
    this.drawSailboat(this.ctx, 'cyan', this.greenX - 120, 30);
    this.drawSailboat(this.ctx, 'red', this.redX - 120, 30);
  }

  drawSailboat(context, color, x, y) {
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
		context.moveTo(25+x, 160+y);
		context.lineTo(70+x, 180+y);
		context.lineTo(150+x, 180+y);
		context.lineTo(175+x, 160+y);
		context.closePath();
		// context.stroke();
		context.fill();
		
		// pole
		context.beginPath();
		context.lineWidth = 5;
		context.moveTo(100+x,160+y);
		context.lineTo(100+x,50+y);
		context.stroke();
		
		// left sail
		context.beginPath();
		context.moveTo(96+x,50+y);
		context.lineTo(50+x,155+y);
		context.lineTo(90+x,140+y);
		context.fill();
		
		// right sail
		context.beginPath();
		context.moveTo(104+x,50+y);
		context.lineTo(160+x,150+y);
		context.lineTo(110+x,150+y);
    context.fill();
    
    // circle
    if (color == 'red') {
      context.beginPath();
      context.arc(x+100, y+120, 100, 0, 2 * Math.PI, false);
      context.stroke();
    } else {
      context.beginPath();
      context.arc(x+110, y+120, 100, 0, 2 * Math.PI, false);
      context.stroke();
    }

}


}