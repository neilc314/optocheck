import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FlipperPage } from "../flipper/flipper";
import { PyramidPage } from "../pyramid/pyramid";
import { RedgreenPage } from "../redgreen/redgreen";
import { BeadsPage } from '../beads/beads';
import { CubePage } from '../cube/cube';
import { CubeTranaglyphPage } from '../cube-tranaglyph/cube-tranaglyph';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import { DragShapePage } from '../drag-shape/drag-shape';
import { SnakePage } from '../snake/snake';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.items = [];
    // this.items.push({
    //   title: "Flipper",
    //   note: "",
    //   icon: "eye"
    // });
    //   this.items.push({
    //   title: "Snellen Chart",
    //   note: "",
    //   icon: "funnel"
    // });
    this.items.push({
      title: "Tranaglyph",
      note: "",
      icon: "eye"
    });
    // this.items.push({
    //   title: "Brock String",
    //   note: "",
    //   icon: "disc"
    // });
    // this.items.push({
    //   title: "Cube",
    //   note: "",
    //   icon: "cube-outline"
    // });
    // this.items.push({
    //   title: "3D Tranaglyph",
    //   note: "",
    //   icon: "cube-outline"
    // });
    this.items.push({
      title: "Snake",
      note: "",
      icon: "basketball"
    });
    this.items.push({
      title: 'Drag Shape',
      note: "",
      icon: "exit",
    })
  }

  itemTapped(event, item) {
    switch(item.title) {
      case "Flipper":
        this.navCtrl.push(FlipperPage, {
          item: item
        });
        break;
      case "Snellen Chart":
        this.navCtrl.push(PyramidPage, {
          item: item
        });
        break;
      case "Tranaglyph":
        this.navCtrl.push(RedgreenPage, {
          item: item
        });
        break;
      case "Brock String":
        this.navCtrl.push(BeadsPage, {
          item: item
        });
        break;
      case "Cube":
        this.navCtrl.push(CubePage, {
          item: item
        });
        break;
      case "3D Tranaglyph":
        this.navCtrl.push(CubeTranaglyphPage, {
          item: item
        });
        break;
      case "Snake":
        this.navCtrl.push(SnakePage, {
          item: item
        });
        // window.location.href = "http://app.iconverge.us/snake.html";
        break;
      case "Drag Shape":
        this.navCtrl.push(DragShapePage, {
          item: item
        });
        break;
    }

  }

}
