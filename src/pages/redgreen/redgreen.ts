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

  }

}
