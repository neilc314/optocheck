import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the GlassConfigPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-glass-config',
  templateUrl: 'glass-config.html',
})
export class GlassConfigPage {

  redColor: number = 200;
  cyanColor: number = 200;
  cyanFine: number = 0;
  cyanOpacity: number = 100;
  redOpacity: number = 100;
  fieldColor = "#f0f0f0";
  text:  number = 0;

  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  ctx: any;
  width: number;
  height: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, public renderer: Renderer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GlassConfigPage');
  }

  ngAfterViewInit() {
    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;

    this.width = Math.min(this.platform.width(), 400);
    this.height = Math.min(this.platform.height(), 200)
    this.renderer.setElementAttribute(this.canvasElement, 'width',  + this.width + "");
    this.renderer.setElementAttribute(this.canvasElement, 'height',  + this.height + "");

    this.ctx = this.canvasElement.getContext('2d');

    setInterval(() => {
      this.update();
    }, 20);
  }

  update() {
    console.log(this.redColor); // remove in prod
    this.ctx.fillStyle = this.fieldColor;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // fill red
    this.ctx.fillStyle = "rgba(" + this.redColor + ", 0, 0, " + (this.cyanOpacity / 255) + " )";
    this.ctx.fillRect(25, 25, (this.width - 100) / 2, (this.height - 50));

    // fill cyan 
    this.ctx.fillStyle = "rgba(" + this.cyanFine + "," + this.cyanColor + ", " + this.cyanColor + ", " + (this.cyanOpacity / 255) + " )";
    this.ctx.fillRect(this.width / 2 + 10, 25, (this.width - 100) / 2, (this.height - 50) );
  }
}
