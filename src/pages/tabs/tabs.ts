import { Component, OnInit} from '@angular/core';

import { DreamTreePage } from '../dream/dreamtree';
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
  dream: any = DreamTreePage;
  focus: any = FocusPage;
  discover: any = discoverPage;
  mine: any = MinePage;
  tabbar:HTMLElement;

  constructor(keyboard: Keyboard, private platform: Platform) { 
    platform.ready().then(() => {
        window.addEventListener('native.keyboardhide', this.showTabbar);
        window.addEventListener('native.keyboardshow', this.hideTabbar);
      }
    );

  }

  ngOnInit() {
    this.tabbar =  <HTMLElement>document.getElementsByClassName('tabbar')[0];
    console.log("######", this.tabbar);
  }
  showTabbar(e){
    console.log("showTabbar");
    this.tabbar =  <HTMLElement>document.getElementsByClassName('tabbar')[0];
    this.tabbar.style.display = '';
  }
  hideTabbar(e){
    console.log("hideTabbar");
    this.tabbar =  <HTMLElement>document.getElementsByClassName('tabbar')[0];
    this.tabbar.style.display = 'none';
  }
}
