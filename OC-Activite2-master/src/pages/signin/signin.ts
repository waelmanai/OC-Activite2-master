import {Component, OnInit} from '@angular/core';
import {LoadingController, MenuController, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TabsPage} from "../tabs/tabs";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit{

  errorMessage:string;
  private signinForm: FormGroup;

  constructor(private navCtrl: NavController, private menuCtrl:MenuController,
              private formBuilder: FormBuilder, private authService:AuthService,
              private loadingCtrl: LoadingController) {
  }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  onSubmitForm() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    let loader = this.loadingCtrl.create({
      content: 'Connexion en cours…'
    });
    loader.present();
    this.authService.signInUser(email, password).then(
      () => {
        this.navCtrl.setRoot(TabsPage);
        loader.dismiss();
      }
    ).catch(
      (error) => {
        this.errorMessage = error;
        loader.dismiss();
      }
    );
  }
}
