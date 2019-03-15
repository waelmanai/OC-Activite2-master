import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {OnInit} from "@angular/core";

export class AuthService implements  OnInit{
  isAuth:boolean;

  constructor() {
    this.isAuth = false;
  }

  ngOnInit(){
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.isAuth = true;
        }else{
          this.isAuth = false;
        }
      }
    );
  }

  signUpUser(mail: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(mail, password).then(
          (user) => {
            resolve(user);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(mail: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(mail, password).then(
          (user) => {
            resolve(user);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOut(){
    firebase.auth().signOut();
  }

}
