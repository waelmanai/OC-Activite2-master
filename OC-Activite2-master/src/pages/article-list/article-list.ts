import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, MenuController, ModalController, NavParams, ToastController} from 'ionic-angular';
import {Article} from "../../models/article.model";
import {Subscription} from "rxjs/Subscription";
import {LendArticlePage} from "../lend-article/lend-article";
import {ArticleServiceInterface} from "../../services/article.service";
import {BookService} from "../../services/book.service";
import {CdService} from "../../services/cd.service";
import {ArticleType} from "../../models/article-type.enum";
import {ConstantService} from "../../services/constant.service";

@Component({
  selector: 'page-article-list',
  templateUrl: 'article-list.html',
})
export class ArticleListPage implements OnInit, OnDestroy {
  title:string;
  articles: Article[];
  private type: ArticleType;
  private subscription: Subscription;
  private articleService: ArticleServiceInterface;


  private settingToast: any = {
    position: 'top',
    duration: 2000,
    cssClass: 'center'
  };

  constructor(public modalCtrl: ModalController, public navParams: NavParams,
              private menuCtrl: MenuController, private bookService: BookService,
              private cdService: CdService, private toastCtrl: ToastController,
              private loadingCtrl: LoadingController, private constantService: ConstantService) {
  }

  ngOnInit() {
    this.type = this.navParams.get('type');
    this.articleService = this.type == ArticleType.Cd ? this.cdService : this.bookService;
    this.title = this.type===ArticleType.Cd ? "Liste des cds" : "Liste des livres";
    this.subscription = this.articleService.subject$.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articleService.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickArticle(id: number) {
    let modal = this.modalCtrl.create(LendArticlePage, {id: id, type: this.type});
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onSave() {
    let loader = this.loadingCtrl.create({
      content: 'Envoi en cours…'
    });
    loader.present();
    this.articleService.saveServer().then(
      ()=>{
        this.toastCtrl.create({
          message: "Données mise à jour sur le serveur",
          duration: this.constantService.settingToast.duration,
          cssClass: this.constantService.settingToast.cssClass,
          position: this.constantService.settingToast.position
        }).present();
        loader.dismiss();
      }
    ).catch(
      (error)=>{
        this.toastCtrl.create({
          message: error,
          duration: this.constantService.settingToast.duration,
          cssClass: this.constantService.settingToast.cssClass,
          position: this.constantService.settingToast.position
        }).present();
        loader.dismiss();
      }
    );
  }

  onFetch() {
    let loader = this.loadingCtrl.create({
      content: 'Récupération en cours…'
    });
    loader.present();
    this.articleService.retrieveServer().then(
      ()=>{
        this.articleService.saveLocal();
        this.toastCtrl.create({
          message: "Données mise à jour sur l'appareil",
          duration: this.settingToast.duration,
          cssClass: this.settingToast.cssClass,
          position: this.settingToast.position
        }).present();
        loader.dismiss();
      }
    ).catch(
      (error)=>{
        this.toastCtrl.create({
          message: error,
          duration: this.settingToast.duration,
          cssClass: this.settingToast.cssClass,
          position: this.settingToast.position
        }).present();
        loader.dismiss();
      }
    );
  }

}
