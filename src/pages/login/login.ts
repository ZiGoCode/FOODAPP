import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { User } from '../../firebase/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  pet: string = "login";

  user = {} as User;

  constructor(private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) {

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: 'crescent',
    });
    loader.present();
    try {
      const resulr = await this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (resulr) {
        this.navCtrl.setRoot('TabsPage');
        loader.dismiss();
      }
    }
    catch (e) {
      const alert = this.alertCtrl.create({
        title: 'ERROR',
        subTitle: 'อีเมลหรือรหัสผ่าน ที่คุณป้อนไม่ถูกต้อง',
        buttons: ['OK']
      });
      loader.dismiss();
      alert.present();
      console.error(e);
    }
  }

  async register(user: User) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: 'crescent',
    });
    loader.present();
    try {
      const result = await this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        this.angularFireAuth.authState.take(1).subscribe(data =>{
          this.angularFireDatabase.object(`user/${data.uid}`).set(this.user);
        });
        this.navCtrl.setRoot('TabsPage');
        loader.dismiss();
      }
    }catch(e){
      const alert = this.alertCtrl.create({
        title: 'ERROR!',
        subTitle: 'Email นี้มีอยู่แล้ว หรือ Password น้อยกว่า 6 ตัวอักษร!',
        buttons: ['OK']
      });
      loader.dismiss();
      alert.present();
      console.error(e);
    }
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Forgot Password?',
      message: "Enter an email address to request a password change.",
      inputs: [
        {
          name: 'Email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enter',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
