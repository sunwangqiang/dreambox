import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MinePage } from '../pages/mine/mine';
import { FocusPage } from '../pages/focus/focus';
import { discoverPage } from '../pages/discover/discover';
import { DreamPage } from '../pages/dream/dream';
import { DreamDetailsPage } from '../pages/dream/details/details'
import { NewDreamPage } from '../pages/dream/newdream/newdream'
import { TabsPage } from '../pages/tabs/tabs';
import { Service } from '../service/service'

@NgModule({
  declarations: [
    MyApp,
    FocusPage,
    discoverPage,
    DreamPage,
    DreamDetailsPage,
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
    DreamDetailsPage,
    NewDreamPage,
    TabsPage,
    MinePage
  ],
  providers: [Service, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
