import {Injectable} from "@angular/core";

@Injectable()
export class ConstantService {
  public settingToast: any = {
    position: 'top',
    duration: 1500,
    cssClass: 'center'
  };

}
