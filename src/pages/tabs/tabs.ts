import { Component, OnInit} from '@angular/core';

import { DreamPage } from '../dream/dream';
import { FocusPage } from '../focus/focus';
import { discoverPage } from '../discover/discover';
import { MinePage } from '../mine/mine';
import { Keyboard } from 'ionic-native'
import { Platform } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit{
  // this tells the tabs component which Pages
  // should be each tab's root Page
  dream: any = DreamPage;
  focus: any = FocusPage;
  discover: any = discoverPage;
  mine: any = MinePage;
  tabbar:HTMLElement;

  constructor(keyboard: Keyboard) {
      Keyboard.onKeyboardShow().subscribe(() => { this.hideTabbar() });
      Keyboard.onKeyboardHide().subscribe(() => { this.showTabbar() });
/*    
    platform.ready().then(() => {
      //console.log(platform);
      Keyboard.onKeyboardShow().subscribe(() => { this.hideTabbar() });
      Keyboard.onKeyboardHide().subscribe(() => { this.showTabbar() });
    }
    );
*/
  }
  ngOnInit() {
    this.tabbar =  <HTMLElement>document.getElementsByClassName('tabbar')[0];
    //console.log(this.tabbar);
  }
  showTabbar(){
    this.tabbar.style.display = 'block';
    console.log("showTabbar");
  }
  hideTabbar(){
    this.tabbar.style.display = 'none';
    console.log("hideTabbar");
  }
}
