import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Restaurant } from './restaurant';
import { Injectable } from '@angular/core';

@Injectable()
export class Services {

    constructor(private angularFireAuth: AngularFireAuth,
        private angularFireDatabase: AngularFireDatabase) {

    }

    edit(restaurant: Restaurant) {
        this.angularFireAuth.authState.take(1).subscribe(data => {
            this.angularFireDatabase.list<Restaurant>(`restaurantID/${data.uid}`).update(restaurant.id, restaurant);
        });
    }
}