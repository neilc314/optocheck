import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-flipper',
  templateUrl: 'flipper.html'
})
export class FlipperPage {
  selectedItem: any;
  items: Array<{title:string}>;


  constructor(public navCtrl : NavController) {
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: makeLine(5 + Math.floor(Math.random() * 2), false)
      });
    }
  }
  
  refresh(event) {
    this.navCtrl.pop();
    this.navCtrl.push(FlipperPage);
  }
}



function makeLine(charLength, isLower) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var possibleLower = "abcdefghijklmnopqrstuvwxyz";
  if (isLower) {
    for (var i = 0; i < 5; i++)
      text += possibleLower.charAt(Math.floor(Math.random() * possible.length));
  } else {
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}



