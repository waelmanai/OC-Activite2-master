import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import {TabsPage} from "../pages/tabs/tabs";
import {OptionsPage} from "../pages/options/options";
import {AuthService} from "../services/auth.service";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  optionsPage:any = OptionsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  isAuth:boolean;

  @ViewChild('content') content: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController, private authService:AuthService) {
    platform.ready().then(() => {
      this.isAuth = false;
      let config = {
        apiKey: "AIzaSyBCOh3Fr8yFRV5pGlXsa4kFGvURdjpvhIc",
        authDomain: "oc-activite2-4bfb6.firebaseapp.com",
        databaseURL: "https://oc-activite2-4bfb6.firebaseio.com",
        projectId: "oc-activite2-4bfb6",
        storageBucket: "oc-activite2-4bfb6.appspot.com",
        messagingSenderId: "618990512235"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(
        (user)=>{
          if(user){
            this.isAuth = true;
            this.content.setRoot(this.tabsPage);
          }else{
            this.isAuth = false;
            this.content.setRoot(this.signinPage);
          }
        }
      );


      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onNavigate(page: any, data?:{}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }

  onDisconnect(){
    this.authService.signOut();
    this.menuCtrl.close();
  }

}

