import { Component } from '@angular/core';

import { DreamPage } from '../dream/dream';
import { FocusPage } from '../focus/focus';
import { discoverPage } from '../discover/discover';
import { MinePage } from '../mine/mine';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  dream: any = DreamPage;
  focus: any = FocusPage;
  discover: any = discoverPage;
  mine: any = MinePage;

  constructor() {

  }
}
