import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  profileData: Observable<any>;

  constructor(private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,public appCtrl: App) {

    this.angularFireAuth.authState.subscribe(data =>{
      this.profileData = this.angularFireDatabase.object(`user/${data.uid}`).valueChanges();
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  logout(){
    
    this.appCtrl.getRootNav().setRoot('LoginPage');
  
  }

}
