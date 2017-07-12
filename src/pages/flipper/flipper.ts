import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-flipper',
  templateUrl: 'flipper.html'
})
export class FlipperPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl : NavController) {

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
  text += "<br/>";
  return text;
}
