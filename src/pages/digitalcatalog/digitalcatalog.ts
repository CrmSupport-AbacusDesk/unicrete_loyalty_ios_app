import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';

/**
 * Generated class for the DigitalcatalogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-digitalcatalog',
  templateUrl: 'digitalcatalog.html',
})
export class DigitalcatalogPage {
  pdf:any=[];
  uploadUrl:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public dbService:DbserviceProvider,public cons:ConstantProvider) {
    this.uploadUrl = cons.upload_url
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DigitalcatalogPage');
    this.getpdflist();

  }

  getpdflist()
 {
   this.dbService.post_rqst( {},'app_karigar/product_catalogue_list').subscribe( r =>
    {
      console.log(r);
      this.pdf = r['pdf']
      }); 
    }

}
