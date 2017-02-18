import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MinePage } from '../pages/mine/mine';
import { FocusPage } from '../pages/focus/focus';
import { discoverPage } from '../pages/discover/discover';
import { DreamPage } from '../pages/dream/dream';
import { DreamSprintsPage } from '../pages/dream/dreamsprints/dreamsprints'
import { NewDreamPage } from '../pages/dream/newdream/newdream'
import { TabsPage } from '../pages/tabs/tabs';
import { DataModel } from '../datamodel/datamodel'

@NgModule({
  declarations: [
    MyApp,
    FocusPage,
    discoverPage,
    DreamPage,
    DreamSprintsPage,
    NewDreamPage,
    TabsPage,
    MinePage,
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
    TabsPage,
    MinePage
  ],
  providers: [DataModel, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
