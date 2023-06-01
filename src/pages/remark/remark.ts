import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, ModalController, Nav, NavController, NavParams, ViewController } from 'ionic-angular';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { KarigarsDetailPage } from '../karigars-detail/karigars-detail';

/**
 * Generated class for the RemarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remark',
  templateUrl: 'remark.html',
})
export class RemarkPage {
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams,public service:DbserviceProvider,
    public modalCtrl:ModalController,public viewCtrl:ViewController,
    public translate:TranslateService,public storage:Storage) {
  }
  id;
  kar_id;
  lang:any='';
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RemarkPage');
    this.id=this.service.karigar_id;
    console.log(this.id);
    this.kar_id = this.navParams.get('kar_id');
    console.log(this.kar_id);
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
  }
  remark;
  enterRemark(e){
    console.log("you type: "+e);
    this.remark=e;
  }
  sendEmail;
  saveRemark(){
    console.log("save remark clicked");
    this.service.post_rqst({"id":this.kar_id,"customer_id":this.id,'remark':this.remark},"app_karigar/karigarEmail")
    .subscribe(r=>{
    console.log(r);
    // localStorage.setItem('sendEmail','true');
    this.viewCtrl.dismiss(this.data);
    })
  }
  data = { 'foo': 'bar' };
  
  gotoPreviousPage(){
    // this.navCtrl.push(KarigarsDetailPage,{"id":this.kar_id});
    this.viewCtrl.dismiss(this.data);
  }

}
