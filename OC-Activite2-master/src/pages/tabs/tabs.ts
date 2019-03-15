import {Component} from '@angular/core';
import {ArticleListPage} from "../article-list/article-list";
import {ArticleType} from "../../models/article-type.enum";


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  cd: any  = {type: ArticleType.Cd}
  book: any = {type: ArticleType.Book}
  articleListPage: any = ArticleListPage;

  constructor() {
  }

}
