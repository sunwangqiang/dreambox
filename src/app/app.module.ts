import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MinePage } from '../pages/mine/mine';
import { FocusPage } from '../pages/focus/focus';
import { discoverPage } from '../pages/discover/discover';
import { DreamTreePage } from '../pages/dream/dreamtree';
import { DreamSprintsPage } from '../pages/dream/dreamsprints/dreamsprints'
import { SprintMediaSlidePage } from '../pages/dream/dreamsprints/sprint.media.slide/page'
import { DreamDetailsPage } from '../pages/dream/dreamdetails/dreamdetails'
import { SprintDetailsPage } from '../pages/dream/dreamsprints/sprintdetails/sprintdetails'
import { TabsPage } from '../pages/tabs/tabs';
import { DataModelService, } from '../services/dream.service'
import { DataAccessService } from '../services/data.access.service'
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
    DreamTreePage,
    DreamSprintsPage,
    SprintMediaSlidePage,
    DreamDetailsPage,
    SprintDetailsPage,
    TabsPage,
    MinePage,
    Autosize,
  ],

  imports: [
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FocusPage,
    discoverPage,
    DreamTreePage,
    DreamSprintsPage,
    SprintMediaSlidePage,
    DreamDetailsPage,
    SprintDetailsPage,
    TabsPage,
    MinePage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Storage, useFactory: provideStorage },
    DataAccessService, DataModelService, Keyboard,
  ]
})
export class AppModule {}
