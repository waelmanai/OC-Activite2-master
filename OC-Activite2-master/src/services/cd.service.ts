import {ArticleServiceInterface} from "./article.service";
import {Article} from "../models/article.model";
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";

@Injectable()
export class CdService extends ArticleServiceInterface {

  private static field: string = "cds"
  private static cds : Article[] = [
    {
      name : 'CD 1',
      description :['description 1'],
      isLended: false
    },
    {
      name : 'CD 2',
      description :['description 2'],
      isLended : false
    },
    {
      name : 'CD 3',
      description :['description 3'],
      isLended: false
    },
  ];

  constructor(storage: Storage) {
    super(CdService.field, CdService.cds, storage);
  }
}
