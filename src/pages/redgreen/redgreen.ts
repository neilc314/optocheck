import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer,
      public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedgreenPage');
  }

  ngAfterViewInit() {
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

  shift($val: number){
    this.greenX += $val * 5;
    this.shiftVal += $val;
    this.refreshCanvas();
  }

  refreshCanvas() {
    this.ctx.clearRect(0, 0, this.platform.width(), this.platform.height());
    this.drawSailboat(this.ctx, 'green', this.greenX, 0);
    this.drawSailboat(this.ctx, 'red', this.redX, 0);
  }

  drawSailboat(context, color, x, y) {
    context.globalAlpha = 0.5;
    if (color == 'red') {
      context.fillStyle = "rgb(255, 0, 0)";
      context.strokeStyle = "rgb(255, 0, 0)";
    } else if (color == 'green') {
      context.fillStyle = "rgb(0, 225, 180)";
      context.strokeStyle = "rgb(0, 225, 180)";
    } else {
      console.log('invalid color requested: ' + color);
      return;
    }
		context.lineWidth = 2;
		context.beginPath();
		context.moveTo(25+x, 160+y);
		context.lineTo(70+x, 180+y);
		context.lineTo(150+x, 180+y);
		context.lineTo(175+x, 160+y);
		context.closePath();
		context.stroke();
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
}


}