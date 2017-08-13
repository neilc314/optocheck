import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InstructionsFlipperPage } from '../instructions-flipper/instructions-flipper'

@Component({
  selector: 'page-flipper',
  templateUrl: 'flipper.html'
})
export class FlipperPage {
  selectedItem: any;
  items: Array<{title:string}>;
  fontSize: number = 1.0;


  constructor(public navCtrl : NavController) {
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: makeLine(5 + Math.floor(Math.random() * 2), false)
      });
    }
  }

  instructions() {
    this.navCtrl.push(InstructionsFlipperPage);
  }
  
  refresh(event) {
    for (let i = 1; i < 11; i++) {
      this.items.pop();
    }
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: makeLine(5 + Math.floor(Math.random() * 2), false)
      });
    }
  }

  fontSizeChange($val: number){
    this.fontSize += $val;
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



