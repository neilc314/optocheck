import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FlipperPage } from "../flipper/flipper";

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
      this.items.push({
      title: "Pyramid",
      note: "",
      icon: "triangle"
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(FlipperPage, {
      item: item
    });
  }

}
