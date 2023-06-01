import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelpolicyModalPage } from './cancelpolicy-modal';
import { createTranslateLoader } from '../language/language.module';

@NgModule({
  declarations: [
    CancelpolicyModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CancelpolicyModalPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class CancelpolicyModalPageModule {}
