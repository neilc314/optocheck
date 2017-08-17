import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BeadsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-beads',
  templateUrl: 'beads.html',
})
export class BeadsPage {
  @ViewChild('beadsCanvas') canvas: any;
  canvasElement: any;
  ctx: any;
  radius: number;
  offset: number;
  angle: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeadsPage');
  }

  ngAfterViewInit() {
    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + "");
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + "");
    this.ctx = this.canvasElement.getContext('2d');

    this.radius = 25;
    this.offset = 50;
    this.angle = 5 * Math.PI / 180;

    this.diagram();
  }
  
  diagram() {
    this.drawLine(this.platform.width() / 2 - this.offset, 0, 
      this.platform.width() / 2 - this.offset - Math.tan(this.angle) * this.platform.height(), this.platform.height());

    this.drawLine(this.platform.width() / 2 + this.offset, 0, 
      this.platform.width() / 2 + this.offset + Math.tan(this.angle) * this.platform.height(), this.platform.height());

    this.drawLine(this.platform.width() / 2, 0, this.platform.width() / 2, this.platform.height());
    
    this.drawBallOnLine(this.platform.height() / 2 + 80, true, 'lightblue');
    this.drawBallOnLine(this.platform.height() / 2 + 80, false, 'lightblue');

    this.drawBallOnLine(this.platform.height() / 2 - 80, true, 'red');
    this.drawBallOnLine(this.platform.height() / 2 - 80, false, 'red');
  }
  
  drawBall(x: number, y: number, fillStyle: string) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = fillStyle;
    this.ctx.fill();
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.closePath();
    this.ctx.stroke();
  }

  drawBallOnLine(y: number, isLeft: boolean, fillStyle: string) {
    if (isLeft) {
      this.drawBall(this.platform.width() / 2 - this.offset - Math.tan(this.angle) * y, y, fillStyle);      
    } else {
      this.drawBall(this.platform.width() / 2 + this.offset + Math.tan(this.angle) * y, y, fillStyle);          
    }
  }

}
