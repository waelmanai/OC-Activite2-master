import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {TabsPage} from "../pages/tabs/tabs";
import {OptionsPage} from "../pages/options/options";
import {AuthService} from "../services/auth.service";
import {IonicStorageModule} from "@ionic/storage";
import {ArticleListPage} from "../pages/article-list/article-list";
import {LendArticlePage} from "../pages/lend-article/lend-article";
import {BookService} from "../services/book.service";
import {CdService} from "../services/cd.service";
import {ConstantService} from "../services/constant.service";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OptionsPage,
    ArticleListPage,
    LendArticlePage,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    OptionsPage,
    ArticleListPage,
    LendArticlePage,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    BookService,
    CdService,
    ConstantService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
