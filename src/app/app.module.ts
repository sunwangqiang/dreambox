import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MinePage } from '../pages/mine/mine';
import { FocusPage } from '../pages/focus/focus';
import { discoverPage } from '../pages/discover/discover';
import { DreamPage } from '../pages/dream/dream';
import { DreamSprintsPage } from '../pages/dream/dreamsprints/dreamsprints'
import { NewDreamPage } from '../pages/dream/newdream/newdream'
import { SprintDetailsPage } from '../pages/dream/dreamsprints/sprintdetails/sprintdetails'
import { TabsPage } from '../pages/tabs/tabs';
import { DreamService } from '../services/dream.service'

import {ContenteditableModel} from '../common/contenteditableModel.directive'
import {Autosize} from '../common/autosize.directive';
import { Keyboard } from 'ionic-native'

import { Storage } from '@ionic/storage';
export function provideStorage() {
  return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__mydb' });
}

@NgModule({
  declarations: [
    MyApp,
    FocusPage,
    discoverPage,
    DreamPage,
    DreamSprintsPage,
    NewDreamPage,
    SprintDetailsPage,
    TabsPage,
    MinePage,
    ContenteditableModel,
    Autosize,
  ],

  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FocusPage,
    discoverPage,
    DreamPage,
    DreamSprintsPage,
    NewDreamPage,
    SprintDetailsPage,
    TabsPage,
    MinePage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Storage, useFactory: provideStorage },
    DreamService,Keyboard,
  ]
})
export class AppModule {}
