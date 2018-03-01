import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular'; 
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

import { FlipperPage } from "../flipper/flipper";
import { PyramidPage } from "../pyramid/pyramid";
import { RedgreenPage } from "../redgreen/redgreen";
import { BeadsPage } from '../beads/beads';
import { CubePage } from '../cube/cube';
import { CubeTranaglyphPage } from '../cube-tranaglyph/cube-tranaglyph';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import { DragShapePage } from '../drag-shape/drag-shape';
import { SnakePage } from '../snake/snake';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public adMob: AdMobFree, public screenOrientation: ScreenOrientation) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.screenOrientation.unlock();

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
    });

    this.showBanner();
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
        // this.showBanner(); plugin not installed?
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
  showBanner() {
    let bannerConfig: AdMobFreeBannerConfig = {
        isTesting: false, // Remove in production
        autoShow: true,
        id: 'ca-app-pub-2057575361319869/2324998752'
    };

    this.adMob.banner.config(bannerConfig);

    this.adMob.banner.prepare().then(() => {
        // success
    }).catch(e => console.log(e));
  }

}
