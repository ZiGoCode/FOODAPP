import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the DishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-dish",
  templateUrl: "dish.html"
})
export class DishPage {
  images: ImagsHome[] =[
    {image: '../../assets/imgs/restaurants/restaurant10.jpg'},
    {image: '../../assets/imgs/restaurants/restaurant07.jpg'},
    {image: '../../assets/imgs/restaurants/restaurant06.jpg'},
    {image: '../../assets/imgs/restaurants/restaurant05.jpg'},
    {image: '../../assets/imgs/restaurants/restaurant08.jpg'},
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DishPage");
  }
}
export interface ImagsHome {
  image: string;
}
