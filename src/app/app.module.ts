import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MinePage } from '../pages/mine/page';
import { FocusPage } from '../pages/focus/page';
import { discoverPage } from '../pages/discover/page';
import { DreamTreePage } from '../pages/dream/page';
import { DreamSprintsPage } from '../pages/dream/dreamsprints/page'
import { SprintMediaSlidePage } from '../pages/dream/dreamsprints/sprint.media.slide/page'
import { DreamDetailsPage } from '../pages/dream/dreamdetails/page'
import { SprintDetailsPage } from '../pages/dream/dreamsprints/sprintdetails/page'
import { TabsPage } from '../pages/tabs/page';
import { DataModelService, } from '../services/data.model.service'
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
