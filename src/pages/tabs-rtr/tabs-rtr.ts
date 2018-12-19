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
  idteb: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {

    this.idteb = this.navParams.get('idteb');

  }
  ionViewWillEnter() {
    this.tabRef.select(this.idteb);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsRtrPage');
  }
  rootpage() {
    this.appCtrl.getRootNav().pop({ animate: true, direction: 'forward' });
  }

}
