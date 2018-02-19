import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { FlipperPage } from '../pages/flipper/flipper';
// import { PyramidPage } from '../pages/pyramid/pyramid';
import { RedgreenPage } from '../pages/redgreen/redgreen';
// import { BeadsPage } from '../pages/beads/beads';
// import { CubePage } from '../pages/cube/cube';
// import { CubeTranaglyphPage } from '../pages/cube-tranaglyph/cube-tranaglyph';
import { DragShapePage } from '../pages/drag-shape/drag-shape';
import { SnakePage } from '../pages/snake/snake';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      // { title: 'Flipper', component: FlipperPage  },
      // { title: 'Pyramid', component: PyramidPage  },
      { title: 'Tranaglyph', component: RedgreenPage  },
      // { title: 'Brock String', component: BeadsPage  }, 
      // { title: 'Cube', component: CubePage},
      // { title: '3D Tranaglyph', component: CubeTranaglyphPage},
      { title: 'Drag Shape', component: DragShapePage},
      { title: 'Snake', component: SnakePage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
