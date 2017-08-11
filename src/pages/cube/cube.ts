import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CubePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-cube',
  templateUrl: 'cube.html',
})
export class CubePage {
  @ViewChild('glCanvas') canvas: any;
  canvasElement: any;
  ctx: any;
  radius: number;
  leftBallX: number;
  leftBallY: number;
  rightBallX: number;
  rightBallY: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CubePage');
  }
  
  ngAfterViewInit() {
    console.log(this.canvas);
    this.radius = 25;
    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + "");
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + "");
    this.ctx = this.canvasElement.getContext('2d');

    this.leftBallX = 5;
    this.leftBallY = 5;
    
    window.requestAnimationFrame(()=>{this.cycle()});
  }

  drawCenterLine() {
    this.ctx.beginPath();
    this.ctx.moveTo(Math.floor(this.platform.width() / 2), 0);
    this.ctx.lineTo(Math.floor(this.platform.width() / 2), Math.floor(this.platform.height()));
    this.ctx.stroke();
  }

  cycle() {
    if (this.leftBallX < this.platform.width() / 2) {
      this.ctx.clearRect(0, 0, this.platform.width(), this.platform.height());
      this.drawCenterLine();
      this.updateLeftBall(this.leftBallX + 5, this.leftBallY);
      this.drawLeftBall();
    }
    window.requestAnimationFrame(()=>{this.cycle()});
  }

  updateLeftBall(x: number, y: number) {
    this.leftBallX = x;
    this.leftBallY = y;
  }

  updateRightBall(x: number, y: number) {
    this.rightBallX = x;
    this.rightBallY = y;
  }

  drawLeftBall() {
    this.drawBall(this.leftBallX, this.leftBallY, 'lightblue');
  }

  drawRightBall() {
    this.drawBall(this.rightBallX, this.rightBallY, 'lightblue');
  }

  drawBall(x: number, y: number, fillStyle: string) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = fillStyle;
    this.ctx.fill();
  }


}
