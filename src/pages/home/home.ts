import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FlipperPage } from "../flipper/flipper";
import { PyramidPage } from "../pyramid/pyramid";
import { RedgreenPage } from "../redgreen/redgreen";
import { BeadsPage } from '../beads/beads';
import { CubePage } from '../cube/cube';

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
    this.items.push({
      title: "Flipper",
      note: "",
      icon: "eye"
    });
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
    this.items.push({
      title: "Brock String",
      note: "",
      icon: "disc"
    });
    this.items.push({
      title: "Cube",
      note: "",
      icon: "cube-outline"
    });
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
    }

  }

}
