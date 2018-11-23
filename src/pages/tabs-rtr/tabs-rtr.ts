import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs-rtr',
  templateUrl: 'tabs-rtr.html',
})
export class TabsRtrPage {
  @ViewChild('myTabs') tabRef;
  tab1 = 'NewPage';
  tab2 = 'OpenPage';
  tab3 = 'OrdersPage';
  tab4 = 'MessagesRtrPage';
  tab5 = 'StarsPage';
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public appCtrl: App) {
    
  }
  ionViewWillEnter() {
    this.tabRef.select(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsRtrPage');
  }
  rootpage(){
    this.appCtrl.getRootNav().pop({animate: true, direction: 'forward'});
  }
 
}
