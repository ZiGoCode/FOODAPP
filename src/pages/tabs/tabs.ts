import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('myTabs') tabRef;
  private selectedTab: number;
  tab1 = 'HomePage';
  tab2 = 'RestaurantPage';
  tab3 = 'FeedPage';
  tab4 = 'SavedPage';
  tab5 = 'MyProfilePage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedTab = this.navParams.get('selectedTab') || 0;
  }
  ionViewWillEnter() {
    if (this.selectedTab) {
      this.tabRef.select(this.selectedTab);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
