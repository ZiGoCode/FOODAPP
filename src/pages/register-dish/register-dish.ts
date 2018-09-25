import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Dish } from '../../firebase/dish';

/**
 * Generated class for the RegisterDishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-dish',
  templateUrl: 'register-dish.html',
})
export class RegisterDishPage {

  items: Observable<any[]>;
  dish = {} as Dish;



  constructor(private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {

    this.angularFireAuth.authState.take(1).subscribe(data => {
      // this.items = this.angularFireDatabase.list(`restaurantID/${data.uid}`).valueChanges();
      this.items = this.angularFireDatabase.list(`restaurantID/${data.uid}`).snapshotChanges().map(caches => {
        return caches.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      });
    });
  
  }

  registerDish(dish: Dish,) {
    
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: 'crescent',
    });
    loader.present();
    this.angularFireAuth.authState.take(1).subscribe(data => {
      this.angularFireDatabase.list(`restaurantID/${data.uid}/${dish.id}`).push(dish).then(()=>{
        this.navCtrl.setRoot(RegisterDishPage);
      });
    });
    loader.dismiss();
  }


  ionViewDidLoad() {
    
  }

}
