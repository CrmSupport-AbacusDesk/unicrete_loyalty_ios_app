import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { createTranslateLoader } from '../language/language.module';
import { ShippingDetailPage } from './shipping-detail';

@NgModule({
  declarations: [
    ShippingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ShippingDetailPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class ShippingDetailPageModule {}
