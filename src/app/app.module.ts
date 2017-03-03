import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MinePage } from '../pages/mine/mine';
import { FocusPage } from '../pages/focus/focus';
import { discoverPage } from '../pages/discover/discover';
import { DreamPage } from '../pages/dream/dream';
import { DreamSprintsPage } from '../pages/dream/dreamsprints/dreamsprints'
import { NewDreamPage } from '../pages/dream/newdream/newdream'
import { NewSprintPage } from '../pages/dream/newsprint/newsprint'
import { TabsPage } from '../pages/tabs/tabs';
import { DreamBoxService } from '../services/dreambox.service'

import {ContenteditableModel} from '../common/contenteditableModel.directive'

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
    NewSprintPage,
    TabsPage,
    MinePage,
    ContenteditableModel,
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
    NewSprintPage,
    TabsPage,
    MinePage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Storage, useFactory: provideStorage },
    DreamBoxService,
  ]
})
export class AppModule {}
