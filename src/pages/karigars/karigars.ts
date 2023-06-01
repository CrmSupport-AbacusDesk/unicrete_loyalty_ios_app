import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { KarigarsDetailPage } from '../karigars-detail/karigars-detail';
import * as jwt_decode from "jwt-decode";


/**
 * Generated class for the KarigarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-karigars',
  templateUrl: 'karigars.html',
})
export class KarigarsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public service:DbserviceProvider,
    public loadingCtrl:LoadingController,public translate:TranslateService,public storage:Storage) {


          
  }
  filter:'';
  kar_id;
  loading:Loading;
  kar_detail;
  lang:any='';
  tokenInfo:any={};
  kar_state;
  ionViewDidLoad() {
    console.log('ionViewDidLoad KarigarsPage');
    this.kar_id = this.navParams.get('id');
    console.log(this.kar_id);
    this.presentLoading();
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    this.service.post_rqst( {'filter':this.filter,'karigar_id': this.service.karigar_id },'app_karigar/karigarHome').subscribe( r =>
      {
        console.log(r);
        this.loading.dismiss();
        this.kar_detail=r['karigar'];
        console.log(this.kar_detail);
        console.log(this.kar_detail.state);
        this.kar_state=this.kar_detail.state;
        this.getKarigarList();

      });
  }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }
  kar_list;
  getKarigarList(){
    console.log('hello');
    this.service.post_rqst({"state":this.kar_state},'app_karigar/karigarSiteGallary').
    subscribe(r=>{
      console.log(r);
      this.kar_list=r['stateWiseKarigars'];
      console.log(this.kar_list);
    })
  }
  goToKarigarGallery(id){
    console.log("karigar is : "+id);
    this.navCtrl.push(KarigarsDetailPage,{'id':id})
  }
  presentLoading() 
    {
        this.translate.get("Please wait...")
        .subscribe(resp=>{
            this.loading = this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            this.loading.present();
        })
    }
    searchKarigar(e){
      console.log(e);
      this.service.post_rqst({"search":e,"state":this.kar_state},'app_karigar/karigarSiteGallary').
      subscribe(r=>{
      console.log(r);
      this.kar_list=r['stateWiseKarigars'];
      console.log(this.kar_list);
    })
    }
}
