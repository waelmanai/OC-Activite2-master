import {Component, OnInit} from '@angular/core';
import {LoadingController, MenuController, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {

  errorMessage: string;
  private signupForm: FormGroup;

  constructor(private navCtrl: NavController, private menuCtrl: MenuController,
              private formBuilder: FormBuilder, private authService: AuthService,
              private loadingCtrl: LoadingController,) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });

  }

  onSubmitForm() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const passwordConfirmation = this.signupForm.get('password_confirmation').value;
    if (passwordConfirmation !== password) {
      this.errorMessage = "Password confirmation doesn't match";
      return;
    }
    let loader = this.loadingCtrl.create({
      content: 'Inscription en cours…'
    });
    loader.present();
    this.authService.signUpUser(email, password).then(
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

  onToggleMenu() {
    this.menuCtrl.open();
  }

}
