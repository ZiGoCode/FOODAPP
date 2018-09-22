import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Restaurant } from '../../firebase/restaurant';
import { Observable } from 'rxjs';

/**
 * Generated class for the RegisterRtrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-rtr',
  templateUrl: 'register-rtr.html',
})
export class RegisterRtrPage {

  public onYourRestaurantForm: FormGroup;

  restaurant = {} as Restaurant;
  restaurantData: Observable<any>;
  items: Observable<any[]>;

  constructor(private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams, private _fb: FormBuilder) {

    this.angularFireAuth.authState.take(1).subscribe(data =>{
      this.restaurantData = this.angularFireDatabase.object(`restaurantID/${data.uid}`).valueChanges();
    });
      this.items = this.angularFireDatabase.list("/restaurant/").valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterRtrPage');
  }

  ngOnInit() {
    this.onYourRestaurantForm = this._fb.group({
      profiledata: [true, Validators.compose([
        Validators.required
      ])],
      restaurantTitle: ['', Validators.compose([
        Validators.required
      ])],
      restaurantAddress: ['', Validators.compose([
        Validators.required
      ])],
      restaurantType: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  addRestaurant(restaurant: Restaurant) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: 'crescent',
    });
    loader.present();
    this.angularFireDatabase.list("/restaurant/").push(restaurant);
    this.angularFireAuth.authState.take(1).subscribe(data => {
      this.angularFireDatabase.object(`restaurantID/${data.uid}`).set(restaurant).then(() => {
        this.navCtrl.setRoot(RegisterRtrPage);
      });
    });

    loader.dismiss();
  }

}
