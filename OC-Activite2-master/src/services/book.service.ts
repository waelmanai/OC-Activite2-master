import {ArticleServiceInterface} from "./article.service";
import {Article} from "../models/article.model";
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";

@Injectable()
export class BookService extends ArticleServiceInterface {

  private static field: string = "books";
  private static books: Article[] = [
    {
      name: 'Book 1',
      description: ['Description 1'],
      isLended: false
    },

    {
      name: 'Book 2',
      description: ['Description 2'],
      isLended: false
    },

    {
      name: 'Book 3',
      description: ['Description 3'],
      isLended: false
    }
  ]

  constructor(storage: Storage) {
      super(BookService.field, BookService.books, storage);
  }

}
