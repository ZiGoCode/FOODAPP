import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, App } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

/**
 * Generated class for the NewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new',
  templateUrl: 'new.html',
})
export class NewPage {

  items: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase, public actionsheetCtrl: ActionSheetController,public appCtrl: App) {

    this.angularFireAuth.authState.take(1).subscribe(data => {
      // this.items = this.angularFireDatabase.list(`restaurantID/${data.uid}`).valueChanges();
      this.items = this.angularFireDatabase.list(`restaurantID/${data.uid}`).snapshotChanges().map(caches => {
        return caches.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      });
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPage');
  }

  editR(item) {

    const actionSheet = this.actionsheetCtrl.create({
      title: 'Modify Restaurant',
      buttons: [
        // {
        //   text: 'Up the Restaurant to FOODAPP',
        //   handler: () => {
        //     console.log('...');
        //   }
        // },
        {
          text: 'UP and Edit',
          handler: () => {
            this.appCtrl.getRootNav().push('EditRestaurantPage', { item: item }, { animate: true, direction: 'forward' });
            // this.navCtrl.push('EditRestaurantPage', { item: item })
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.angularFireAuth.authState.take(1).subscribe(data => {
              this.angularFireDatabase.list(`restaurant/`).remove(item.key);
              this.angularFireDatabase.list(`restaurantID/${data.uid}`).remove(item.key);

            })
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  editRest(item){
    this.appCtrl.getRootNav().push('EditRestaurantPage', { item: item }, { animate: true, direction: 'forward' });
  }

}
