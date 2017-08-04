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
    
    let ctx = this.canvasElement.getContext('2d');
    this.drawSailboat(ctx, 'red', 0, 0);
    this.drawSailboat(ctx, 'green', 50, 0);
  }

  drawSailboat(context, color, x, y) {
    if (color == 'red') {
      context.fillStyle = "rgb(255, 0, 0)";
      context.strokeStyle = "rgb(255, 0, 0)";
    } else {
      context.fillStyle = "rgb(0, 255, 0)";
      context.strokeStyle = "rgb(0, 255, 0)";
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