import {Subject} from "rxjs/Subject";
import {Article} from "../models/article.model";
import {Storage} from "@ionic/storage";
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

export abstract class ArticleServiceInterface {
  public subject$:Subject<Article[]>;
  public articles: Article[];

  constructor(private fieldName: string, articles: Article[] ,private storage: Storage) {
    this.articles = articles;
    this.retrieveLocal();
    this.subject$ = new Subject<Article[]>();
  }

  emit() {
    this.subject$.next(this.articles);
  }

  update(id:number, article: Article){
    this.articles[id] = article;
  }

  saveLocal(){
    this.storage.set(this.fieldName, this.articles);
  }

  retrieveLocal() {
    this.storage.get(this.fieldName).then(
      (articles) => {
        if(articles){
          this.articles = articles.slice();
          this.emit();
        }
      }
    );
  }

  saveServer() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(this.fieldName).set(this.articles).then(
          (data: DataSnapshot) => {
            resolve(data);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  retrieveServer() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(this.fieldName).once('value').then(
          (data: DataSnapshot) => {
            this.articles = data.val();
            this.emit();
            resolve('Données récupérées avec succès !');
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

}
