import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { createTranslateLoader } from '../../language/language.module';
import { CoupanCodePage } from './coupan-code';

@NgModule({
  declarations: [
    CoupanCodePage,
  ],
  imports: [
    IonicPageModule.forChild(CoupanCodePage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class CoupanCodePageModule {}
