import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  items: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private angularFireDatabase: AngularFireDatabase) {
    
    this.items = this.angularFireDatabase.list(`restaurant`).valueChanges();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
