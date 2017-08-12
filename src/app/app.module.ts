import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FlipperPage } from '../pages/flipper/flipper';
import { PyramidPage } from '../pages/pyramid/pyramid';
import { RedgreenPage } from '../pages/redgreen/redgreen';
import { BeadsPage } from '../pages/beads/beads';
import { CubePage } from '../pages/cube/cube';
import { InstructionsCubePage } from '../pages/instructions-cube/instructions-cube';
import { InstructionsFlipperPage } from '../pages/instructions-flipper/instructions-flipper';
import { InstructionsTranaglyphPage } from '../pages/instructions-tranaglyph/instructions-tranaglyph';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FlipperPage,
    // PyramidPage,
    RedgreenPage,
    BeadsPage, 
    CubePage,
    InstructionsCubePage,
    InstructionsFlipperPage,
    InstructionsTranaglyphPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FlipperPage,
    // PyramidPage, 
    RedgreenPage,
    BeadsPage, 
    CubePage,
    InstructionsCubePage,
    InstructionsFlipperPage,
    InstructionsTranaglyphPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
