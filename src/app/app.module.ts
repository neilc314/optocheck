import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

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
import { CubeTranaglyphPage } from '../pages/cube-tranaglyph/cube-tranaglyph';
import { DragShapePage } from '../pages/drag-shape/drag-shape';
import { SnakePage } from '../pages/snake/snake';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree } from '@ionic-native/admob-free';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { GlassConfigPage } from '../pages/glass-config/glass-config';
import { InstructionsDragShapePage } from '../pages/instructions-drag-shape/instructions-drag-shape';
import { InstructionsSnakePage } from '../pages/instructions-snake/instructions-snake';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FlipperPage,
    // PyramidPage,
    DragShapePage,
    RedgreenPage,
    BeadsPage, 
    CubePage,
    InstructionsCubePage,
    InstructionsFlipperPage,
    InstructionsTranaglyphPage,
    InstructionsDragShapePage,
    InstructionsSnakePage,
    CubeTranaglyphPage,
    SnakePage,
    GlassConfigPage
    
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
    SnakePage,
    // PyramidPage, 
    RedgreenPage,
    BeadsPage, 
    CubePage,
    InstructionsCubePage,
    InstructionsFlipperPage,
    InstructionsTranaglyphPage,
    InstructionsDragShapePage,
    InstructionsSnakePage,
    CubeTranaglyphPage,
    DragShapePage,
    GlassConfigPage

  ],
  providers: [
    AdMobFree,
    NativeAudio,
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
