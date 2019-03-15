import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavParams, ToastController, ViewController} from 'ionic-angular';
import {Article} from "../../models/article.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {BookService} from "../../services/book.service";
import {CdService} from "../../services/cd.service";
import {ArticleServiceInterface} from "../../services/article.service";
import {ArticleType} from "../../models/article-type.enum";
import {ConstantService} from "../../services/constant.service";


@Component({
  selector: 'page-lend-article',
  templateUrl: 'lend-article.html',
})
export class LendArticlePage implements OnInit, OnDestroy {
  private lendForm: FormGroup;
  private id: number;
  private type: ArticleType;
  private article: Article;
  private subscription: Subscription;
  private articleService: ArticleServiceInterface;

  constructor(public navParams: NavParams, private formBuilder: FormBuilder,
              public viewCtrl: ViewController, private bookService: BookService,
              private cdService: CdService, private toastCtrl: ToastController,
              private constantService: ConstantService) {
    this.lendForm = this.formBuilder.group({
      person: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.type = this.navParams.get('type');
    this.articleService = this.type === ArticleType.Cd ? this.cdService : this.bookService;
    this.subscription = this.articleService.subject$.subscribe(
      (cdList: Article[]) => {
        this.article = cdList[this.id];
      }
    );
    this.articleService.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmitForm() {
    this.article.person = this.lendForm.value.person;
    this.article.isLended = !this.article.isLended;
    this.articleService.update(this.id, this.article);
    this.articleService.saveLocal();
    this.toastCtrl.create({
      message: "Données mise à jour sur l'appareil",
      duration: this.constantService.settingToast.duration,
      cssClass: this.constantService.settingToast.cssClass,
      position: this.constantService.settingToast.position
    }).present();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }


}
