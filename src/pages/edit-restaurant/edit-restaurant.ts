import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Restaurant } from '../../firebase/restaurant';



@IonicPage()
@Component({
  selector: 'page-edit-restaurant',
  templateUrl: 'edit-restaurant.html',
})
export class EditRestaurantPage {

  public onYourRestaurantForm: FormGroup;
  restaurant = {} as Restaurant;

  constructor(private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _fb: FormBuilder,
    public loadingCtrl: LoadingController) {


    this.restaurant = this.navParams.get('item');
    

    // this.angularFireAuth.authState.take(1).subscribe(data => {
    //   // this.items = this.angularFireDatabase.list(`restaurantID/${data.uid}`).valueChanges();
    //   this.items = this.angularFireDatabase.list(`restaurantID/${data.uid}${rtrID}`).snapshotChanges().map(caches => {
    //     return caches.map(c => ({
    //       key: c.payload.key, ...c.payload.val()
    //     }));
    //   });
    // });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRestaurantPage');
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


  editRestaurant(restaurant) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: 'crescent',
    });
    loader.present();
    this.angularFireAuth.authState.take(1).subscribe(data => {
      this.angularFireDatabase.list(`restaurantID/${data.uid}`).update(restaurant.key, restaurant).then(()=>{
        this.navCtrl.pop();
      });
    });
    loader.dismiss();
  }
}
