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

    this.diagram();
  }
  
  diagram() {
    
    
    this.drawBall(this.platform.width() / 2 - this.radius, this.platform.height() / 2, 'lightblue');
    this.drawBall(this.platform.width() / 2 + this.radius, this.platform.height() / 2, 'lightblue');    
  }
  
  drawBall(x: number, y: number, fillStyle: string) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = fillStyle;
    this.ctx.fill();
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y2);
		this.ctx.lineTo(x2, y2);
		this.ctx.closePath();
    this.ctx.stroke();
  }

}
