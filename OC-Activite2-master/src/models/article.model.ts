export class Article {
  description: string[];
  isLended: boolean;
  person?: string;

  constructor(public name: string) {
    this.isLended = false;
    //this.person = "";
  }


}
