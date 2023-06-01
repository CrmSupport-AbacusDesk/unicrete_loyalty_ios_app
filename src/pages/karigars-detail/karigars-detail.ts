import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { ConstantProvider } from '../../providers/constant/constant';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { KarigarGalleryPage } from '../karigar-gallery/karigar-gallery';
import { RemarkPage } from '../remark/remark';

/**
 * Generated class for the KarigarsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-karigars-detail',
  templateUrl: 'karigars-detail.html',
})
export class KarigarsDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public service:DbserviceProvider,
    public modalCtrl:ModalController,public translate:TranslateService,public storage:Storage,public constn:ConstantProvider) {
  }
  kar_id;
  karImage;
  lang:any='';
  sendEmail;
  upload_url="";
  ionViewDidLoad() {
    console.log('ionViewDidLoad KarigarsDetailPage');
    this.kar_id = this.navParams.get('id');
    this.upload_url = this.constn.upload_url;
    console.log(this.kar_id);
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    this.getKarGallery();
    // this.sendEmail=localStorage.getItem('sendEmail');
    // console.log(this.sendEmail);
    // localStorage.removeItem('sendEmail');
  }
  getKarGallery(){
    this.service.post_rqst({"id":this.kar_id},"app_karigar/karigarSiteGallaryDetail").subscribe(r=>{
      console.log(r);
      this.karImage=r['stateWiseKarigarsDetail'];
      console.log(this.karImage);
      
    })
  }
  sendEnquiry(){
    console.log(this.service.karigar_id);
    console.log(this.kar_id);
    let remarkModal = this.modalCtrl.create(RemarkPage,{"kar_id":this.kar_id});
    remarkModal.present();                            
    return;
    // this.service.post_rqst({"id":this.kar_id,"customer_id":this.service.karigar_id},
      // "app_karigar/karigarEmail").subscribe(r=>{
      //   console.log(r);
      // })
  }
  goOnGalleryImage(id,image){
    this.navCtrl.push(KarigarGalleryPage,{"id":id,"image":image});
  }
}
