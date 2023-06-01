import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, Loading,Nav } from 'ionic-angular';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { TransactionPage } from '../transaction/transaction';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { CancelationPolicyPage } from '../cancelation-policy/cancelation-policy';



@IonicPage()
@Component({
    selector: 'page-cancelpolicy-modal',
    templateUrl: 'cancelpolicy-modal.html',
})
export class CancelpolicyModalPage {
    @ViewChild(Nav) nav: Nav;
    data:any={};
    otp_value:any='';
    karigar_id:any=''
    otp:any='';
    karigar_detail:any={};
    gift_id:any='';
    gift_detail:any='';
    loading:Loading;
    mobile_no:any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public service:DbserviceProvider,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {
        this.data.payment_type= "Paytm";
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad CancelpolicyModalPage');
        this.karigar_id = this.navParams.get('karigar_id');
        console.log(this.karigar_id);
        this.gift_id = this.navParams.get('gift_id');
        console.log(this.gift_id);
        this.getOtpDetail();
        this.presentLoading();
    }
    
    
    dismiss() {
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }
    
    goOnCancelationPolicy(){
        this.navCtrl.push(CancelationPolicyPage)
    }
    
    getOtpDetail()
    {
        console.log('otp');
        this.service.post_rqst({'karigar_id':this.service.karigar_id,'gift_id':this.gift_id},'app_karigar/sendOtp')
        .subscribe((r)=>
        {
            console.log(r);
            this.loading.dismiss();
            this.otp=r['otp'];
            console.log(this.otp);
            this.karigar_detail=r['karigar'];
            this.gift_detail=r['gift'];
        });
    }

    getbankdetails()
    {
        console.log(this.data);
        if(this.data.check2==true)
        {
            this.data.account_holder_name=this.karigar_detail.account_holder_name;
            this.data.ifsc_code=this.karigar_detail.ifsc_code;
            this.data.account_number=this.karigar_detail.account_number;
            this.data.bank_name=this.karigar_detail.bank_name;

        }
        else{
            this.data.bank_name='';
            this.data.ifsc_code='';
            this.data.account_number='';
            this.data.account_holder_name='';

        }
    }
    resendOtp()
    {
        
        this.service.post_rqst({'karigar_id':this.service.karigar_id,'gift_id':this.gift_id},'app_karigar/sendOtp')
        .subscribe((r)=>
        {
            
            console.log(r);
            this.otp=r['otp'];
            console.log(this.otp);
        });
    }
    otpvalidation() 
    {
        this.otp_value=false;
        if(this.data.otp==this.otp)
        {
            this.otp_value=true
        }
    }
    
    submit()
    {
        console.log('data');
        console.log(this.data);
        // this.data.karigar_id = this.service.karigar_id,
        // this.data.gift_id = this.gift_id,
        // this.data.offer_id = this.gift_detail.offer_id,
        if (!this.data.account_holder_name || !this.data.bank_name || !this.data.account_number || !this.data.ifsc_code) {
            this.showAlert("Bank details are missing");
            return;
        }

        this.presentLoading();        
        this.service.post_rqst( {'karigar_id':this.service.karigar_id ,"gift_id": this.gift_id,'offer_id':this.gift_detail.offer_id,'shipping_address':this.data.shipping_address,'account_number':this.data.account_number,'bank_name':this.data.bank_name,'ifsc_code':this.data.ifsc_code,'account_holder_name':this.data.account_holder_name},'app_karigar/redeemRequest')
        .subscribe( (r) =>
        {
            this.loading.dismiss();
            console.log(r);
            if(r['status']=="SUCCESS")
            {
                // this.navCtrl.setRoot(TabsPage,{index:'3'});
                this.navCtrl.push(HomePage);
                this.showSuccess("Redeemed Request Sent Successfully");
            }
            else if(r['status']=="EXIST")
            {
                this.showAlert(" Already Redeemed!");
            }
        });
    }
    showAlert(text) {
        let alert = this.alertCtrl.create({
            title:'Alert!',
            cssClass:'action-close',
            subTitle: text,
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text:'OK',
                cssClass: 'close-action-sheet',
                handler:()=>{
                    // this.navCtrl.push(TransactionPage);
                }
            }]
        });
        alert.present();
    }
    showSuccess(text)
    {
        let alert = this.alertCtrl.create({
            title:'Success!',
            cssClass:'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        
        alert.present();
    }
    presentLoading() 
    {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: false
        });
        this.loading.present();
    }
    ionViewDidLeave()
    {
        console.log('leave');
        this.dismiss()
    }
    

    myNumber()
    {
        console.log(this.data);
        if(this.data.check1==true)
        {
            this.data.payment_number=this.karigar_detail.mobile_no;
        }
        else{
            this.data.payment_number='';
        }
        
        
    }
    address()
    {
        console.log(this.data);
        if(this.data.check1==true)
        {
            this.data.shipping_address=this.karigar_detail.address + ' ,'+this.karigar_detail.city + ' ,'+this.karigar_detail.district +' ,'+ this.karigar_detail.state +' ,'+ this.karigar_detail.pincode;
        }
        else{
            this.data.shipping_address='';
        }
    }
}
