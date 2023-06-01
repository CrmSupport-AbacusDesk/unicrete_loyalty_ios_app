import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';

/**
 * Generated class for the KarigarGalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-karigar-gallery',
  templateUrl: 'karigar-gallery.html',
})
export class KarigarGalleryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public constn:ConstantProvider,
    public translate:TranslateService,) {
  }
  image_id;
  image;
  upload_url:any="";
  image_list;
  lang;
  ionViewDidLoad() {
    console.log('ionViewDidLoad KarigarGalleryPage');
    this.image_id = this.navParams.get('id');
    console.log(this.image_id);
    this.upload_url = this.constn.upload_url;
    console.log(this.upload_url);
    this.image = this.navParams.get("image");
    console.log(this.image);
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    // this.image_list = this.navParams.get("list");
    
  }

}
