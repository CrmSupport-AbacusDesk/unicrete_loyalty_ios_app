webpackJsonp([2],{

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoupanCodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CoupanCodePage = /** @class */ (function () {
    function CoupanCodePage(navCtrl, navParams, service, alertCtrl, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.barcodeScanner = barcodeScanner;
        this.qr_code = '';
        this.data = {};
        this.flag = '';
    }
    CoupanCodePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CoupanCodePage');
    };
    CoupanCodePage.prototype.submit = function (data) {
        var _this = this;
        this.flag = 1;
        console.log(data);
        this.qr_code = data;
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id, 'qr_code': this.qr_code }, 'app_karigar/karigarCoupon').subscribe(function (r) {
            console.log(r);
            if (r['status'] == 'BLANK') {
                _this.showAlert("This Coupon Code doesn't contain any Value");
                return;
            }
            else if (r['status'] == 'INVALID') {
                _this.showAlert("Invalid Coupon Code");
                return;
            }
            else if (r['status'] == 'REQUIRED') {
                _this.showAlert("Please Enter Coupon Code");
                return;
            }
            else if (r['status'] == 'USED') {
                _this.showAlert("Coupon Already Used");
                return;
            }
            else if (r['status'] == 'UNASSIGNED OFFER') {
                _this.showAlert("This Coupon Code is not applicable in your Area");
                return;
            }
            _this.showSuccess(r['coupon_value'] + " points has been added into your wallet");
            // this.navCtrl.setRoot(TabsPage,{index:'0'});
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
        });
    };
    CoupanCodePage.prototype.scan = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (resp) {
            console.log(resp);
            _this.qr_code = resp.text;
            console.log(_this.qr_code);
            if (resp.text != '') {
                _this.service.post_rqst({ 'karigar_id': _this.service.karigar_id, 'qr_code': _this.qr_code }, 'app_karigar/karigarCoupon').subscribe(function (r) {
                    console.log(r);
                    if (r['status'] == 'INVALID') {
                        _this.showAlert("Invalid Coupon Code");
                        return;
                    }
                    else if (r['status'] == 'USED') {
                        _this.showAlert("Coupon Already Used");
                        return;
                    }
                    else if (r['status'] == 'UNASSIGNED OFFER') {
                        _this.showAlert("Invalid Coupon Code");
                        return;
                    }
                    else if (r['status'] == 'REQUIRED') {
                        _this.showAlert("Please Enter the coupon code ");
                        return;
                    }
                    _this.showSuccess(r['coupon_value'] + " points has been added into your wallet");
                    // this.navCtrl.setRoot(TabsPage,{index:'0'});
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                });
            }
            else {
                console.log('not scanned anything');
            }
        });
    };
    CoupanCodePage.prototype.showAlert = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Alert!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    CoupanCodePage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    CoupanCodePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-coupan-code',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/scane-pages/coupan-code/coupan-code.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'Enter Coupon Code\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="bg-margin">\n    <div class="paragraph mt15">\n      <p>{{\'Please enter coupon code here, to get your points\' | translate}}</p>\n    </div>\n    <div class="nrml-input">\n      <input type="text" placeholder="Coupon Code" [(ngModel)]="data.code" #code="ngModel" name="code">\n    </div>\n    <div class="coupon-error" *ngIf="!data.code && flag==1">\n      <p>{{\'Required\' | translate}}</p>\n    </div>\n    <button class="cs-btn btn-radius-four" (click)="submit(data.code)"><span>{{\'Submit\' | translate}}</span></button>\n    <!-- mt50 -->\n    <div class="scane-img" >\n      <img src="assets/imgs/scane.png" (click)="scan()">\n      <p>{{\'Tap on scan icon to scan your coupon\' | translate}} </p>\n    </div>\n</div>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/scane-pages/coupan-code/coupan-code.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
    ], CoupanCodePage);
    return CoupanCodePage;
}());

//# sourceMappingURL=coupan-code.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gift_gallery_gift_list_gift_list__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__profile_profile__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_home_main_home__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__transaction_transaction__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_section_mobile_login_mobile_login__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_dbservice_dbservice__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var TabsPage = /** @class */ (function () {
    function TabsPage(storage, navParams, translate, db) {
        var _this = this;
        this.storage = storage;
        this.navParams = navParams;
        this.translate = translate;
        this.db = db;
        this.index = '';
        this.tokenInfo = {};
        this.lang = "";
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__gift_gallery_gift_list_gift_list__["a" /* GiftListPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_5__main_home_main_home__["a" /* MainHomePage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_6__transaction_transaction__["a" /* TransactionPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_4__profile_profile__["a" /* ProfilePage */];
        this.index = this.navParams.get('index');
        storage.get('token_value').then(function (val) {
            console.log(val);
            if (val == '') {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__login_section_mobile_login_mobile_login__["a" /* MobileLoginPage */];
            }
            else {
                _this.rootPage = TabsPage_1;
            }
        });
        this.get_user_lang();
    }
    TabsPage_1 = TabsPage;
    TabsPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    TabsPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_10_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], TabsPage.prototype, "nav", void 0);
    TabsPage = TabsPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/tabs/tabs.html"*/'<ion-tabs selectedIndex= {{index}}>\n  <ion-tab [root]="tab1Root" tabTitle="{{\'HOME\' | translate}}" tabIcon="tab-home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="{{\'GIFT GALLERY\' | translate}}" tabIcon="tab-gift"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="" tabIcon="center-tab"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="{{\'HISTORY\' | translate}}" tabIcon="tab-history"></ion-tab>\n  <ion-tab [root]="tab5Root" tabTitle="{{\'PROFILE\' | translate}}" tabIcon="tab-profile"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_11__providers_dbservice_dbservice__["a" /* DbserviceProvider */]])
    ], TabsPage);
    return TabsPage;
    var TabsPage_1;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GiftDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cancelpolicy_modal_cancelpolicy_modal__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__offers_offers__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var GiftDetailPage = /** @class */ (function () {
    function GiftDetailPage(navCtrl, navParams, modalCtrl, service, loadingCtrl, app, storage, translate, db, constant, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.storage = storage;
        this.translate = translate;
        this.db = db;
        this.constant = constant;
        this.toastCtrl = toastCtrl;
        this.gift_id = '';
        this.gift_detail = {};
        this.balance_point = '';
        this.star = '';
        this.rating_star = '';
        this.offer_balance = '';
        this.karigar_detail = {};
        this.tokenInfo = {};
        this.lang = '';
        this.uploadUrl = '';
        this.karigar_info = JSON.parse(localStorage.getItem('karigar_info'));
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        this.translate.get("19000 and above points to redeem. Pan card details are mandatory")
            .subscribe(function (resp) {
            _this.point_alert = resp;
        });
        this.translate.get("You have insufficient points!")
            .subscribe(function (resp) {
            _this.msg_alert = resp;
        });
    }
    GiftDetailPage.prototype.ionViewDidLoad = function () {
        this.uploadUrl = this.constant.upload_url;
        console.log('ionViewDidLoad GiftDetailPage');
        this.gift_id = this.navParams.get('id');
        this.getGiftDetail(this.gift_id);
        this.presentLoading();
        this.get_user_lang();
    };
    GiftDetailPage.prototype.toastAlert = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    GiftDetailPage.prototype.goOnOfferDetailPage = function (offer_id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__offers_offers__["a" /* OffersPage */], { 'id': offer_id });
    };
    GiftDetailPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    GiftDetailPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_7_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    GiftDetailPage.prototype.getGiftDetail = function (gift_id) {
        var _this = this;
        console.log(gift_id);
        this.service.post_rqst({ 'gift_id': gift_id, 'karigar_id': this.service.karigar_id, 'id': '' }, 'app_karigar/giftDetail')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.karigar_detail = r['karigar'];
            _this.gift_detail = r['gift'];
            _this.rating_star = parseInt(r['gift'].rating);
            _this.gift_detail.coupon_points = parseInt(_this.gift_detail.coupon_points);
            if (r['gift_star']) {
                _this.star = parseInt(r['gift_star'].star);
            }
            var referal_point_per = r['referral_point_per'].one_time_percentage;
            var referral_amount = ((_this.karigar_detail.referal_point_balance * referal_point_per) / 100);
            _this.offer_balance = parseInt(_this.karigar_detail.balance_point) + (referral_amount);
            console.log(_this.offer_balance);
            if (_this.offer_balance < _this.gift_detail.coupon_points) {
                _this.toastAlert(_this.msg_alert);
            }
        });
    };
    GiftDetailPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    GiftDetailPage.prototype.presentCancelPolicyModal = function () {
        if (this.offer_balance > 19000) {
            if (this.karigar_detail.pan_img == '' || this.karigar_detail.pan_no == '') {
                this.toastAlert(this.point_alert);
                return;
            }
            else {
                var contactModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cancelpolicy_modal_cancelpolicy_modal__["a" /* CancelpolicyModalPage */], { 'karigar_id': this.service.karigar_id, 'gift_id': this.gift_id });
                contactModal.present();
            }
        }
        else {
            var contactModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cancelpolicy_modal_cancelpolicy_modal__["a" /* CancelpolicyModalPage */], { 'karigar_id': this.service.karigar_id, 'gift_id': this.gift_id });
            contactModal.present();
        }
    };
    GiftDetailPage.prototype.rating = function (star) {
        var _this = this;
        this.presentLoading();
        console.log(star);
        this.service.post_rqst({ 'star': star, 'gift_id': this.gift_id, 'karigar_id': this.service.karigar_id, 'offer_id': this.gift_detail.offer_id }, 'app_karigar/giftRating').subscribe(function (r) {
            console.log(r);
            if (r) {
                _this.getGiftDetail(_this.gift_id);
            }
        });
    };
    GiftDetailPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    GiftDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-gift-detail',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/gift-gallery/gift-detail/gift-detail.html"*/'\n<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'Gift Gallery\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div class="top-nav nav-adjust">\n		<p>{{gift_detail.title |titlecase}} {{\'Offer Points\' | translate}}</p>\n		<h1>{{offer_balance || 0}}</h1>\n	</div>\n	<div class="margin-padding pb0">\n		<div class="phone">\n			<div class="phone-head">\n				<h1>{{lang !=\'en\' ? gift_detail.hin_gift_title : gift_detail.gift_title | titlecase}}</h1>\n				<!-- <p> {{\'Points\' | translate}}</p>\n				 -->\n			</div>\n			<div class="phone-img">\n				<img [src]="uploadUrl + gift_detail.gift_image" alt="">\n				<!-- <img src="{{gift_detail.image}}"> -->\n			</div>\n		</div>\n		<div class="detail-list">\n			<div class="detail">\n				<div class="img-section">\n					<img src="{{gift_detail.offer_banner}}">\n				</div>\n				<div class="info" (click)="goOnOfferDetailPage(gift_detail.offer_id)">\n					<h1>{{lang !=\'en\' ? gift_detail.hin_title : gift_detail.title | titlecase}}</h1>\n					<p><span>{{\'Valid Upto\' | translate}} :</span> {{gift_detail.end_date | date:\'d MMMM y\'}}</p>\n				</div>\n			</div>  \n			<div class="product-icon">\n				<i class="material-icons">keyboard_arrow_right</i>\n			</div>\n		</div>\n		<div class="rating">\n			<i class="material-icons" [ngClass]="{\'active\':rating_star>=1}">star_rate</i>\n			<i class="material-icons" [ngClass]="{\'active\':rating_star>=2}">star_rate</i>\n			<i class="material-icons" [ngClass]="{\'active\':rating_star>=3}">star_rate</i>\n			<i class="material-icons" [ngClass]="{\'active\':rating_star>=4}">star_rate</i>\n			<i class="material-icons" [ngClass]="{\'active\':rating_star>=5}">star_rate</i>\n			<p>{{rating_star}} {{\'Star\' | translate}} - {{gift_detail.votes}} {{\'Votes\' | translate}} </p>\n		</div>\n\n		<div class="lorem-text">\n			<p><Strong>{{\'Points\' | translate}} : {{gift_detail.coupon_points}}</Strong></p>\n			<p><Strong>{{\'Reward Points\' | translate}} : {{gift_detail.reward_points}}</Strong></p>\n		</div>\n\n		<div class="lorem-text" *ngIf="gift_detail.gift_specification != \'\'">\n			<p><Strong>{{\'Specification\' | translate}} : <div [innerHTML]="lang !=\'en\' ? gift_detail.hin_gift_specification : gift_detail.gift_specification"></div> </Strong></p>\n		</div>\n		<button ion-item class="cs-btn btn-radius mb0" (click)="presentCancelPolicyModal()" *ngIf="offer_balance >= gift_detail.coupon_points">{{\'Send Redeem Request\' | translate}}</button>\n		<div class="h32"></div>\n	</div>\n	<div class="fix-item">\n		<p>{{\'Rate a Gift\' | translate}}</p>\n		<i class="material-icons" [ngClass]="{\'active\':star>=1}" (click)="rating(\'1\')">star_rate</i>\n		<i class="material-icons" [ngClass]="{\'active\':star>=2}" (click)="rating(\'2\')">star_rate</i>\n		<i class="material-icons" [ngClass]="{\'active\':star>=3}" (click)="rating(\'3\')">star_rate</i>\n		<i class="material-icons" [ngClass]="{\'active\':star>=4}" (click)="rating(\'4\')">star_rate</i>\n		<i class="material-icons" [ngClass]="{\'active\':star>=5}" (click)="rating(\'5\')">star_rate</i>\n	</div>    \n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/gift-gallery/gift-detail/gift-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */]])
    ], GiftDetailPage);
    return GiftDetailPage;
}());

//# sourceMappingURL=gift-detail.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jwt_decode__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TermsPage = /** @class */ (function () {
    function TermsPage(navCtrl, navParams, service, loadingCtrl, storage, translate, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.translate = translate;
        this.db = db;
        this.offer_id = '';
        this.terms_detail = {};
        this.tokenInfo = {};
        this.lang = '';
    }
    TermsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TermsPage');
        this.offer_id = this.navParams.get('id');
        this.getTermsDetail(this.offer_id);
        this.get_user_lang();
        this.presentLoading();
    };
    TermsPage.prototype.getTermsDetail = function (offer_id) {
        var _this = this;
        console.log(offer_id);
        this.service.post_rqst({ 'offer_id': offer_id, 'karigar_id': 22 }, 'app_karigar/offerTermCondition').subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.terms_detail = r['offer'];
        });
    };
    TermsPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    TermsPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    TermsPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_5_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    TermsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-terms',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/terms/terms.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'Terms & Condition\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div class="fix">\n		<div class="bg-banner">\n			 <img src="{{terms_detail.offer_banner}}">\n		</div>\n	</div>\n	<div class="terms-text">\n		<p [innerHTML]="terms_detail.terms">{{terms_detail.terms}}</p>\n	</div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/terms/terms.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */]])
    ], TermsPage);
    return TermsPage;
}());

//# sourceMappingURL=terms.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdvanceTextPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__aboutus_modal_aboutus_modal__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AdvanceTextPage = /** @class */ (function () {
    function AdvanceTextPage(navCtrl, navParams, modalCtrl, service, loadingCtrl, storage, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.translate = translate;
        this.profile_data = {};
        this.tokenInfo = {};
        this.lang = '';
    }
    AdvanceTextPage.prototype.ionViewDidLoad = function () {
        this.getCompanyprofile();
        this.get_user_lang();
        console.log('ionViewDidLoad AdvanceTextPage');
    };
    AdvanceTextPage.prototype.presentAboutModal = function () {
        var contactModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__aboutus_modal_aboutus_modal__["a" /* AboutusModalPage */]);
        contactModal.present();
    };
    AdvanceTextPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    AdvanceTextPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_5_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    AdvanceTextPage.prototype.getCompanyprofile = function () {
        var _this = this;
        this.presentLoading();
        this.service.post_rqst({}, 'app_karigar/companyProfile')
            .subscribe(function (response) {
            console.log(response);
            _this.loading.dismiss();
            _this.profile_data = response.getData;
        });
    };
    AdvanceTextPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    AdvanceTextPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-advance-text',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/advance-text/advance-text.html"*/'\n<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'About Us\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	\n	<div style="padding: 16px; text-align: center;">\n		<img [src]="profile_data.profile_banner" alt="" style="height: 120px;">\n	</div>\n	\n	<div class="policy-text" (click)="presentAboutModal()" padding [innerHTML]="profile_data.about">\n		\n	</div>\n	\n	<!-- <div class="about-content">\n		<h2>Company Profile</h2>\n		<p>\n			Incorporated in the year 1987, Vidya Ply & Board Pvt. Ltd is one of the leading manufacturers a of panel products that stand high in terms of durability and finish. Known for quality rich plywood variants, we have a superior infrastructure that is equipped with new age technology and cutting edge facilities. <br>\n			\n			The wealth of expertise gained for more than two decades of manufacturing wood products, coupled with an unwavering commitment to excellence have always put our products on top.<br>\n			\n			Strong commitment and emphasis to get " better than the best" plywood has driven the company to invest in Research and Technology consistently. As a result "BSC Paints" has established itself as a one of the finest and strongest brand in the Plywood industry.<br>\n			\n			It bears the ISI marks which serves as a benchmark in terms of quality, reliability, durability aesthetics and customer satisfaction.\n		</p>\n\n		<h2>Our Mission</h2>\n		<p>\n			Growth has allowed us to expand our offering of products. This growth seemed to stem from the highly successful strategy and vision, both individually and corporately. It\'s great to see people enjoy deriving pleasure from our products. <br>\n\n			Vidya Ply and Board is committed to strengthen its leading position in the Indian Plywood Industry by following the statutory and regulatory standards related to products and by adopting latest available technology, involving competent employees, focusing on quality consciousness and cost competitiveness, thus enhancing customer satisfaction through continual improvement.<br>\n\n			Our products enable people to relax, have a good time, and enjoy. From the moment they buy, they are touched by an unforgettable experience."\n\n		</p>\n\n		<h2>Our Quality</h2>\n		<ul>\n			<li>Manufactured by India\'s best machineries in supervision of wood experts.</li>\n			<li>Products are treated with unique "Hot & cold Diffusing Technology" to make safe against termite and borer.</li>\n			<li>Maintains highest quality standards by only using the best available raw materials that are processed in house.</li>\n			<li>100% selected, treated and seasoned timber is used in the manufacturing of Block Boards</li>\n			<li>The Resins are produced in a modern Resin Plant supervised by a team of senior chemists.</li>\n			<li>Microprocessor controlled automatic wide belt Sanding Machine ensures perfect thickness & imparts ultimate smoothness to the products.</li>\n		</ul>\n	</div> -->\n	\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/advance-text/advance-text.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
    ], AdvanceTextPage);
    return AdvanceTextPage;
}());

//# sourceMappingURL=advance-text.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NotificationPage = /** @class */ (function () {
    function NotificationPage(navCtrl, navParams, app, service, storage, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.service = service;
        this.storage = storage;
        this.translate = translate;
        this.tokenInfo = {};
        this.lang = '';
        this.karigar_id = "";
        this.data_list = [];
        this.flag = '';
        this.get_user_lang();
        this.storage.get('token')
            .then(function (resp) {
            console.log(__WEBPACK_IMPORTED_MODULE_3_jwt_decode__(resp));
            var tokendata = __WEBPACK_IMPORTED_MODULE_3_jwt_decode__(resp);
            console.log(tokendata);
            _this.karigar_id = tokendata.sub;
            console.log(_this.karigar_id);
            _this.get_notification();
        });
    }
    NotificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationPage');
    };
    NotificationPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    NotificationPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_3_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    NotificationPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    NotificationPage.prototype.get_notification = function () {
        var _this = this;
        this.service.post_rqst({ "karigar_id": this.karigar_id, "limit": this.data_list.length }, "app_karigar/get_notification")
            .subscribe(function (resp) {
            console.log(resp);
            _this.data_list = resp['notification'];
        });
    };
    NotificationPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        this.service.post_rqst({ "karigar_id": this.karigar_id, "limit": this.data_list.length }, 'app_karigar/get_notification')
            .subscribe(function (resp) {
            console.log(resp);
            if (resp == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.data_list = _this.data_list.concat(resp['notification']);
                    console.log('Asyn operation has stop');
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    NotificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notification',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/notification/notification.html"*/'\n<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'Notification\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding class="main-backgroung">\n    <div class="image-detail" *ngIf="data_list.length == 0">\n        <img src="assets/imgs/no_found.svg">\n    </div>\n    \n    <div class="notification {{row.active ? \'active\' : \'\'}}" *ngFor="let row of data_list" [ngClass]="{\'disable\':row.read}" (click)="row.active=!row.active">\n        <h1>{{lang == \'en\' ? row.notification : row.hindi_notification}}</h1>\n        <p>{{row.date_created}}</p>\n    </div>\n    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)"  *ngIf="flag!=1">\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="{{\'Loading more data...\' | translate}}">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/notification/notification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
    ], NotificationPage);
    return NotificationPage;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl, navParams, app, db, storage, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.db = db;
        this.storage = storage;
        this.translate = translate;
        this.tokenInfo = {};
        this.lang = '';
    }
    ContactPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactPage');
    };
    ContactPage.prototype.go_to_map = function () {
        console.log('map');
        var destination = 28.90903731508301 + ',' + 77.11608768061168;
        this.get_user_lang();
        var label = encodeURI('A-214, 2nd Floor, Roman Court, Ansal Sushant City, Sector 61, Kundli, Delhi/NCRKundli - 131023, Haryana, India)');
        window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    };
    ContactPage.prototype.ionViewDidLeave = function () {
        this.get_user_lang();
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    ContactPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    ContactPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_3_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/contact/contact.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'Contact Us\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div class="nev-adjust">\n		<div class="background hp100">\n			<iframe src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d6985.506177972584!2d77.11168869950924!3d28.905684458486316!3m2!1i1024!2i768!4f13.1!2m1!1sA-214%2C%202nd%20Floor%2C%20Roman%20Court%2C%20Ansal%20Sushant%20City%2C%20Sector%2061%2C%20Kundli%2C%20Delhi%2FNCRKundli%20-%20131023%2C%20Haryana%2C%20India!5e0!3m2!1sen!2sin!4v1656481719130!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>\n			</div> \n		\n		<div class="cs-nevigation">\n			<div class="map-main" >\n				<div class="map-content"  >\n					<div class="nevigation"  (click)="go_to_map()">\n						<i class="material-icons">near_me</i>\n					</div>\n					<div class="location" >\n						<i class="material-icons">location_on</i>\n						<p>A-214, 2nd Floor, Roman Court, Ansal Sushant City, Sector 61, Kundli, Delhi/NCRKundli - 131023, Haryana, India</p>\n					</div>\n					<div class="location  brd-btm">\n						<i class="material-icons">phone</i>\n						<a>1800-572-0908</a>\n					</div>\n					<div class="location">\n						<i class="material-icons">email</i>\n						<a href="mailto:cc@unicrete.in" target="_blank">cc@unicrete.in</a>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/contact/contact.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news_detail_news_detail__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jwt_decode__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NewsPage = /** @class */ (function () {
    function NewsPage(navCtrl, navParams, service, loadingCtrl, app, translate, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.translate = translate;
        this.storage = storage;
        this.filter = {};
        this.news_list = '';
        this.lang = '';
        this.tokenInfo = {};
        this.flag = '';
    }
    NewsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewsPage');
        this.get_user_lang();
        this.getNewsList();
        this.presentLoading();
    };
    NewsPage.prototype.goOnNewsDetailPage = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__news_detail_news_detail__["a" /* NewsDetailPage */], { 'id': id });
    };
    NewsPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    NewsPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_6_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    NewsPage.prototype.getNewsList = function () {
        var _this = this;
        this.filter.limit = 0;
        this.service.post_rqst({ 'filter': this.filter }, 'app_master/newsList').subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.news_list = r['news'];
        });
    };
    NewsPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    NewsPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        console.log('loading');
        this.filter.limit = this.news_list.length;
        this.service.post_rqst({ 'filter': this.filter }, 'app_master/newsList').subscribe(function (r) {
            console.log(r);
            if (r['news'] == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.news_list = _this.news_list.concat(r['news']);
                    console.log('Asyn operation has stop');
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    NewsPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                this.navCtrl.popToRoot();
            }
        }
    };
    NewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-news',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/news/news.html"*/'\n<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'Latest News\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="latest-news">\n        <div class="news-list" *ngFor="let list of news_list;let i=index" (click)="goOnNewsDetailPage(list.id)">\n            <div class="thumb"><img src={{list.image}} alt=""></div>\n            <div class="desc">\n                <div class="d-data">\n                    <p>{{list.source}}</p>\n                    <p><i class="material-icons">date_range</i> {{list.date_created | date:\'d MMMM y\'}}</p>\n                </div>\n                \n                <div class="description">\n                    <p>{{lang !=\'en\' ? list.hin_title : list.title | lowercase |titlecase}}</p>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)"  *ngIf="flag!=1">\n        <ion-infinite-scroll-content\n        loadingSpinner="bubbles"\n        loadingText="{{\'Loading more data...\' | translate}}">\n    </ion-infinite-scroll-content>\n</ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/news/news.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], NewsPage);
    return NewsPage;
}());

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__faq_answer_faq_answer__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jwt_decode__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FaqPage = /** @class */ (function () {
    function FaqPage(navCtrl, navParams, db, storage, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.storage = storage;
        this.translate = translate;
        this.tokenInfo = {};
        this.lang = '';
        this.question_list = [];
    }
    FaqPage.prototype.ionViewDidLoad = function () {
        this.get_user_lang();
        this.get_question();
    };
    FaqPage.prototype.get_question = function () {
        var _this = this;
        this.db.post_rqst("", "app_karigar/getQuestions")
            .subscribe(function (resp) {
            console.log(resp);
            _this.question_list = resp['question_list'];
            _this.question_list.map(function (resp) {
                resp.active = false;
            });
        });
    };
    FaqPage.prototype.goOnfaqanswerPage = function (data) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__faq_answer_faq_answer__["a" /* FaqAnswerPage */], { data: data });
    };
    FaqPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    FaqPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_6_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    FaqPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-faq',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/faq/faq.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'FAQ\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="image-detail" *ngIf="question_list.length == 0">\n        <img src="assets/imgs/no_found.svg">\n    </div>\n    \n    <div class="clcsd">\n        <ul class="collapsible">\n            <li *ngFor="let row of question_list;let i=index" class="{{row.active ? \'active\' : \'\'}}">\n                <div class="collapsible-header" (click)="row.active = !row.active">\n                    <div class="counter">{{i+1}}</div>\n                    <div [innerHTML]="row.question"></div>\n                </div>\n                <div class="collapsible-body">\n                    <div [innerHTML]="row.answer"></div>\n                </div>\n            </li>\n        </ul> \n    </div>\n</ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/faq/faq.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], FaqPage);
    return FaqPage;
}());

//# sourceMappingURL=faq.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfferListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offers_offers__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var OfferListPage = /** @class */ (function () {
    function OfferListPage(navCtrl, navParams, service, loadingCtrl, app, db, translate, storage, constant) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.db = db;
        this.translate = translate;
        this.storage = storage;
        this.constant = constant;
        this.offer_list = [];
        this.filter = {};
        this.flag = '';
        this.lang = '';
        this.tokenInfo = {};
        this.uploadUrl = '';
    }
    OfferListPage.prototype.ionViewDidLoad = function () {
        this.uploadUrl = this.constant.upload_url;
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        this.get_user_lang();
        console.log('ionViewDidLoad OfferListPage');
        this.getofferList();
        this.presentLoading();
    };
    OfferListPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    OfferListPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_6_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    OfferListPage.prototype.goOnOffersPage = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__offers_offers__["a" /* OffersPage */], { 'id': id });
    };
    OfferListPage.prototype.getofferList = function () {
        var _this = this;
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id }, 'app_karigar/offerList')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.offer_list = r['offer'];
            console.log(_this.offer_list);
        });
    };
    OfferListPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    OfferListPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                this.navCtrl.popToRoot();
            }
        }
    };
    OfferListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-offer-list',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/offer-list/offer-list.html"*/'\n<ion-header>\n    <ion-navbar>\n        <ion-title> {{\'My Offer\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="Product m16">\n        <button ion-item class="bg-product mb16" *ngFor="let list of offer_list;let i=index" (click)="goOnOffersPage(list.id)">\n            <div class="thumbnail">\n                <img src="{{list.offer_banner}}">\n            </div>\n            <div class="errow">\n                <div class="list-tags wthspan">\n                    <h1>{{lang != \'en\'? list.hin_title : list.title |titlecase}}</h1>\n                    <p>{{\'Valid Upto\' | translate}} : {{list.end_date | date:\'d MMMM y\'}}</p>\n                </div>\n                <i class="material-icons">trending_flat</i>\n            </div>\n        </button>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/offer-list/offer-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__["a" /* ConstantProvider */]])
    ], OfferListPage);
    return OfferListPage;
}());

//# sourceMappingURL=offer-list.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_detail_product_detail__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__description_model_description_model__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ProductsPage = /** @class */ (function () {
    function ProductsPage(navCtrl, navParams, service, con, loadingCtrl, app, modalCtrl, translate, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.con = con;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.storage = storage;
        this.prod_cat_list = [];
        this.filter = {};
        this.flag = '';
        this.cat_images = [];
        this.lang = '';
        this.tokenInfo = {};
        this.uploadUrl = "";
    }
    ProductsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductsPage');
        this.get_user_lang();
        this.uploadUrl = this.con.upload_url;
    };
    ProductsPage.prototype.ionViewWillEnter = function () {
        this.getProductCategoryList();
        this.presentLoading();
    };
    ProductsPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    ProductsPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_7_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    ProductsPage.prototype.goOnProductDetailPage = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__product_detail_product_detail__["a" /* ProductDetailPage */], { 'id': id });
    };
    ProductsPage.prototype.getProductCategoryList = function () {
        var _this = this;
        console.log('catagorylist');
        this.filter.limit = 0;
        this.service.post_rqst({ 'filter': this.filter }, 'app_master/categoryList')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.prod_cat_list = r['categories'];
        });
    };
    ProductsPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        console.log('loading');
        this.filter.limit = this.prod_cat_list.length;
        this.service.post_rqst({ 'filter': this.filter }, 'app_master/categoryList')
            .subscribe(function (r) {
            console.log(r);
            if (r['categories'] == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.prod_cat_list = _this.prod_cat_list.concat(r['categories']);
                    console.log('Asyn operation has stop');
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    ProductsPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    ProductsPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    ProductsPage.prototype.view_description = function (value, id) {
        console.log(value);
        var contactModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__description_model_description_model__["a" /* DescriptionModelPage */], { 'description': value, 'id': id });
        contactModal.present();
        console.log('otp');
    };
    ProductsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-products',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/products/products.html"*/'\n<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'Categories\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="Product" *ngFor="let list of prod_cat_list; let i=index">\n        <div ion-item class="bg-product" (click)="goOnProductDetailPage(list.id)">\n            <div class="thumbnail">\n                <ion-slides class="slide" pager autoplay="1000" speed="1000" loop="true" *ngIf="list.image && list.image.length" >\n                    <ion-slide *ngFor="let image of list.image; let i=index">\n                        <img [src]="uploadUrl+image.image_name">\n                    </ion-slide>\n                </ion-slides>\n                <ion-slides class="slide"  *ngIf="list.image && list.image.length ==0" >\n                    <ion-slide>\n                        <img src="assets/imgs/default-image.png">\n                    </ion-slide>\n                </ion-slides>\n            </div>\n            <div class="errow height-as">\n                <!-- For Hindi -->\n                <!-- {{lang !=\'en\' ? list.hin_category_name : list.category_name |titlecase}} -->\n                <p >{{list.category_name |titlecase}}</p>\n                <i  (click)="goOnProductDetailPage(list.id)" class="material-icons">trending_flat</i>\n                \n                <p class="view-btn" *ngIf="list.description" (click)="view_description(lang !=\'en\' ? list.hin_description : list.description, \'category description\')">{{\'View Description\' | translate}}</p>\n            </div>\n        </div>\n    </div>\n    \n    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)"  *ngIf="flag!=1">\n        <ion-infinite-scroll-content\n        loadingSpinner="bubbles"\n        loadingText="{{\'Loading more data...\' | translate}}">\n    </ion-infinite-scroll-content>\n</ion-infinite-scroll>\n<div class="h30"></div>\n</ion-content>\n\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/products/products.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], ProductsPage);
    return ProductsPage;
}());

//# sourceMappingURL=products.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_constant_constant__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FeedbackPage = /** @class */ (function () {
    function FeedbackPage(navCtrl, navParams, service, alertCtrl, app, storage, translate, contsn, actionSheetController, camera, loadingCtrl, transfer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.storage = storage;
        this.translate = translate;
        this.contsn = contsn;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.transfer = transfer;
        this.data = {};
        this.rootPage = '';
        this.feedbackdata = [];
        this.tokenInfo = {};
        this.lang = '';
        this.ok = "";
        this.upload_url = "";
        this.formdata = new FormData();
        this.timeLeft = 20;
        this.cam = "";
        this.gal = "";
        this.cancl = "";
        this.upl_file = "";
        this.save_succ = "";
        this.image = "";
        this.startTimer();
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.translate.get("OK")
            .subscribe(function (resp) {
            _this.ok = resp;
        });
        this.translate.get('Cancel')
            .subscribe(function (resp) {
            _this.cancl = resp;
        });
        console.log('ionViewDidLoad FeedbackPage');
        this.get_user_lang();
        this.Feedbackdata();
        this.translate.get("OK")
            .subscribe(function (resp) {
            _this.ok = resp;
        });
        this.upload_url = this.contsn.upload_url;
    };
    FeedbackPage.prototype.startTimer = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.timeLeft > 0) {
                _this.timeLeft--;
            }
            else {
                _this.timeLeft = 20;
                _this.Feedbackdata();
            }
        }, 1000);
    };
    FeedbackPage.prototype.download = function (data) {
        window.open(data, '_self');
    };
    FeedbackPage.prototype.scroll = function () {
        var messagesContent = this.content;
        console.log(messagesContent.getContentDimensions());
        console.log(messagesContent.getContentDimensions().contentHeight);
        messagesContent.scrollToBottom(1000);
        // messagesContent.scrollTo(0, messagesContent.getContentDimensions().contentHeight, 700);
    };
    FeedbackPage.prototype.submitFeedback = function () {
        var _this = this;
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id, 'feedback': this.data.feedback }, 'app_karigar/feedback')
            .subscribe(function (r) {
            console.log(r);
            _this.Feedbackdata();
            _this.data.feedback = '';
        });
    };
    FeedbackPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.Feedbackdata();
        refresher.complete();
    };
    FeedbackPage.prototype.showSuccess = function (text) {
        var _this = this;
        this.translate.get("ThankYou")
            .subscribe(function (resp) {
            var alert = _this.alertCtrl.create({
                title: resp + '!',
                subTitle: text,
                buttons: [_this.ok]
            });
            alert.present();
        });
    };
    FeedbackPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    FeedbackPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_2_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    FeedbackPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    FeedbackPage.prototype.Feedbackdata = function () {
        var _this = this;
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id }, 'app_karigar/feedback_data')
            .subscribe(function (r) {
            console.log(r);
            _this.feedbackdata = r.feedback;
            _this.scroll();
        });
    };
    FeedbackPage.prototype.open_camera = function () {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: "Select An Option",
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: this.cam,
                    icon: 'camera',
                    handler: function () {
                        console.log("Camera Clicked");
                        _this.takePhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: this.gal,
                    icon: 'image',
                    handler: function () {
                        console.log("Gallery Clicked");
                        _this.getImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: this.cancl,
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionsheet.present();
    };
    FeedbackPage.prototype.takePhoto = function () {
        var _this = this;
        console.log("i am in camera function");
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 400
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            console.log(imageData);
            _this.image = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.image);
            _this.save_picture();
        });
    };
    FeedbackPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            console.log(imageData);
            _this.image = 'data:image/jpeg;base64,' + imageData;
            _this.formdata.append("image", _this.image);
            console.log(_this.image);
            _this.save_picture();
        });
    };
    FeedbackPage.prototype.save_picture = function () {
        var _this = this;
        var updateAlert = this.alertCtrl.create({
            title: 'Are you sure ?',
            message: 'You want to send this!',
            buttons: [
                { text: this.cancl, },
                { text: this.ok,
                    handler: function () {
                        var loader = _this.loadingCtrl.create({
                            content: "Uploading..."
                        });
                        loader.present();
                        var fileTransfer = _this.transfer.create();
                        var random = Math.floor(Math.random() * 100);
                        var options = {
                            fileKey: 'photo',
                            fileName: "myImage_" + random + ".jpg",
                            chunkedMode: false,
                            mimeType: "image/jpeg",
                        };
                        fileTransfer.upload(_this.image, _this.contsn.rootUrl + 'user_attact?id=' + _this.service.karigar_id, options)
                            .then(function (data) {
                            console.log(data);
                            loader.dismiss();
                            _this.Feedbackdata();
                        });
                    }
                }
            ]
        });
        updateAlert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('scrollElement'),
        __metadata("design:type", Object)
    ], FeedbackPage.prototype, "content", void 0);
    FeedbackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-feedback',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/feedback/feedback.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title >{{\'Chat with us\' | translate}}</ion-title>\n        \n    </ion-navbar>\n</ion-header>\n\n<ion-content padding #scrollElement>\n    \n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content  pullingIcon="arrow-dropdown"\n        pullingText="{{\'Pull to refresh\' | translate}}"\n        refreshingSpinner="circles"\n        refreshingText="{{\'Refreshing...\' | translate}}">\n    </ion-refresher-content>\n</ion-refresher>\n\n<div class="chat">\n    <ul>\n        <ng-container *ngFor="let row of feedbackdata">\n            <li class="me" *ngIf="row.feedback || row.attach_feedback">\n                <div class="entete">\n                    <h3>{{row.date_created == \'0000-00-00 00:00:00\' ? \'\' : row.date_created | date:\'d MMM h:m a\'}}</h3>\n                    <span class="status blue"></span>\n                </div>\n                \n                <div *ngIf="row.feedback" class="message">\n                    {{row.feedback}}\n                </div>\n                <div *ngIf="row.attach_feedback" class="message img-type" (click)="download(upload_url+row.attach_feedback)">\n                    <img src="{{upload_url+row.attach_feedback}}">\n                </div>\n            </li>\n            <li class="you" *ngIf="row.reply || row.attach_reply">\n                <div class="entete">\n                    <span class="status green"></span>\n                    <h3>{{row.reply_date == \'0000-00-00 00:00:00\' ? \'\' : row.reply_date | date:\'d MMM h:m a\'}}</h3>\n                </div>\n                \n                <div *ngIf="row.reply" class="message">\n                    {{row.reply}}\n                </div>\n                <div *ngIf="row.attach_reply" class="message img-type" (click)="download(upload_url+row.attach_reply)">\n                    <img src="{{upload_url+row.attach_reply}}">\n                </div>\n            </li>\n        </ng-container>\n    </ul>\n</div>\n\n</ion-content>\n\n<ion-footer>\n    <div class="chat-message" >\n        <textarea type="text" placeholder="{{\'Write something\' | translate}}" name="feedback" #feedback="ngModel" [(ngModel)]="data.feedback">{{\'Write something\' | translate}}</textarea>\n        <a class="attachment" (click)="open_camera()"><i class="material-icons">attach_file</i></a>\n        <a class="send-btn" (click)="submitFeedback()"><i class="material-icons">send</i></a>\n    </div>\n</ion-footer>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/feedback/feedback.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_6__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer__["a" /* FileTransfer */]])
    ], FeedbackPage);
    return FeedbackPage;
}());

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstantProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConstantProvider = /** @class */ (function () {
    function ConstantProvider(http) {
        this.http = http;
        // live url
        this.rootUrl = 'http://apps.abacusdesk.com/unicrete/dd_api/';
        this.server_url = this.rootUrl + 'index.php/app/';
        this.upload_url = 'http://apps.abacusdesk.com/unicrete/dd_api/app/uploads/';
        // clonned url
        // public rootUrl: string = 'http://phpstack-83335-1175063.cloudwaysapps.com/dd_api/';  
        // public server_url: string = this.rootUrl + 'index.php/app/';
        // public upload_url: string ='http://phpstack-83335-1175063.cloudwaysapps.com/dd_api/app/uploads/';
        this.backButton = 0;
        console.log('Hello ConstantProvider Provider');
    }
    ConstantProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
    ], ConstantProvider);
    return ConstantProvider;
}());

//# sourceMappingURL=constant.js.map

/***/ }),

/***/ 200:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 200;

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/aboutus-modal/aboutus-modal.module": [
		245
	],
	"../pages/advance-text/advance-text.module": [
		366
	],
	"../pages/cancelation-policy/cancelation-policy.module": [
		367
	],
	"../pages/cancelpolicy-modal/cancelpolicy-modal.module": [
		368
	],
	"../pages/chating/chating.module": [
		369
	],
	"../pages/contact/contact.module": [
		370
	],
	"../pages/description-model/description-model.module": [
		371
	],
	"../pages/digitalcatalog/digitalcatalog.module": [
		372
	],
	"../pages/faq-answer/faq-answer.module": [
		373
	],
	"../pages/faq/faq.module": [
		374
	],
	"../pages/feedback/feedback.module": [
		375
	],
	"../pages/furniture-ideas/furniture-ideas.module": [
		376
	],
	"../pages/furniture-ideasdetail/furniture-ideasdetail.module": [
		377
	],
	"../pages/furniture-ideasshare/furniture-ideasshare.module": [
		378
	],
	"../pages/gift-gallery/gift-detail/gift-detail.module": [
		379
	],
	"../pages/gift-gallery/gift-list/gift-list.module": [
		380
	],
	"../pages/karigar-gallery/karigar-gallery.module": [
		381
	],
	"../pages/karigars-detail/karigars-detail.module": [
		382
	],
	"../pages/karigars/karigars.module": [
		789,
		1
	],
	"../pages/language/language.module": [
		77
	],
	"../pages/login-section/login-screen/login-screen.module": [
		383
	],
	"../pages/login-section/mobile-login/mobile-login.module": [
		384
	],
	"../pages/login-section/otp/otp.module": [
		386
	],
	"../pages/login-section/registration/registration.module": [
		385
	],
	"../pages/main-home/main-home.module": [
		387
	],
	"../pages/news-detail/news-detail.module": [
		388
	],
	"../pages/news/news.module": [
		389
	],
	"../pages/notification/notification.module": [
		390
	],
	"../pages/offer-list/offer-list.module": [
		391
	],
	"../pages/offers/offers.module": [
		392
	],
	"../pages/points/point-detail/point-detail.module": [
		393
	],
	"../pages/points/point-list/point-list.module": [
		394
	],
	"../pages/product-detail/product-detail.module": [
		395
	],
	"../pages/product-subdetail/product-subdetail.module": [
		396
	],
	"../pages/products/products.module": [
		397
	],
	"../pages/profile/profile.module": [
		398
	],
	"../pages/receive-remark-modal/receive-remark-modal.module": [
		399
	],
	"../pages/remark/remark.module": [
		790,
		0
	],
	"../pages/scane-pages/coupan-code/coupan-code.module": [
		400
	],
	"../pages/scane-pages/scan/scan.module": [
		402
	],
	"../pages/shipping-detail/shipping-detail.module": [
		401
	],
	"../pages/site-popover/site-popover.module": [
		403
	],
	"../pages/terms/terms.module": [
		404
	],
	"../pages/transaction/transaction.module": [
		405
	],
	"../pages/video/video.module": [
		406
	],
	"../pages/view-profile/view-profile.module": [
		407
	],
	"../pages/working-site/working-site.module": [
		409
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 244;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutusModalPageModule", function() { return AboutusModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__aboutus_modal__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AboutusModalPageModule = /** @class */ (function () {
    function AboutusModalPageModule() {
    }
    AboutusModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__aboutus_modal__["a" /* AboutusModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__aboutus_modal__["a" /* AboutusModalPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], AboutusModalPageModule);
    return AboutusModalPageModule;
}());

//# sourceMappingURL=aboutus-modal.module.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__coupan_code_coupan_code__ = __webpack_require__(147);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScanPage = /** @class */ (function () {
    function ScanPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ScanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ScanPage');
    };
    ScanPage.prototype.goOnCoupanCodePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__coupan_code_coupan_code__["a" /* CoupanCodePage */]);
    };
    ScanPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scan',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/scane-pages/scan/scan.html"*/'<!--\n  Generated template for the ScanePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>scan</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="scan-bg" (click)="goOnCoupanCodePage()">\n\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/scane-pages/scan/scan.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], ScanPage);
    return ScanPage;
}());

//# sourceMappingURL=scan.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CancelpolicyModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cancelation_policy_cancelation_policy__ = __webpack_require__(252);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CancelpolicyModalPage = /** @class */ (function () {
    function CancelpolicyModalPage(navCtrl, navParams, viewCtrl, service, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.data = {};
        this.otp_value = '';
        this.karigar_id = '';
        this.otp = '';
        this.karigar_detail = {};
        this.gift_id = '';
        this.gift_detail = '';
        this.data.payment_type = "Paytm";
    }
    CancelpolicyModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CancelpolicyModalPage');
        this.karigar_id = this.navParams.get('karigar_id');
        console.log(this.karigar_id);
        this.gift_id = this.navParams.get('gift_id');
        console.log(this.gift_id);
        this.getOtpDetail();
        this.presentLoading();
    };
    CancelpolicyModalPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    CancelpolicyModalPage.prototype.goOnCancelationPolicy = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__cancelation_policy_cancelation_policy__["a" /* CancelationPolicyPage */]);
    };
    CancelpolicyModalPage.prototype.getOtpDetail = function () {
        var _this = this;
        console.log('otp');
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id, 'gift_id': this.gift_id }, 'app_karigar/sendOtp')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.otp = r['otp'];
            console.log(_this.otp);
            _this.karigar_detail = r['karigar'];
            _this.gift_detail = r['gift'];
        });
    };
    CancelpolicyModalPage.prototype.getbankdetails = function () {
        console.log(this.data);
        if (this.data.check2 == true) {
            this.data.account_holder_name = this.karigar_detail.account_holder_name;
            this.data.ifsc_code = this.karigar_detail.ifsc_code;
            this.data.account_number = this.karigar_detail.account_number;
            this.data.bank_name = this.karigar_detail.bank_name;
        }
        else {
            this.data.bank_name = '';
            this.data.ifsc_code = '';
            this.data.account_number = '';
            this.data.account_holder_name = '';
        }
    };
    CancelpolicyModalPage.prototype.resendOtp = function () {
        var _this = this;
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id, 'gift_id': this.gift_id }, 'app_karigar/sendOtp')
            .subscribe(function (r) {
            console.log(r);
            _this.otp = r['otp'];
            console.log(_this.otp);
        });
    };
    CancelpolicyModalPage.prototype.otpvalidation = function () {
        this.otp_value = false;
        if (this.data.otp == this.otp) {
            this.otp_value = true;
        }
    };
    CancelpolicyModalPage.prototype.submit = function () {
        var _this = this;
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
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id, "gift_id": this.gift_id, 'offer_id': this.gift_detail.offer_id, 'shipping_address': this.data.shipping_address, 'account_number': this.data.account_number, 'bank_name': this.data.bank_name, 'ifsc_code': this.data.ifsc_code, 'account_holder_name': this.data.account_holder_name }, 'app_karigar/redeemRequest')
            .subscribe(function (r) {
            _this.loading.dismiss();
            console.log(r);
            if (r['status'] == "SUCCESS") {
                // this.navCtrl.setRoot(TabsPage,{index:'3'});
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                _this.showSuccess("Redeemed Request Sent Successfully");
            }
            else if (r['status'] == "EXIST") {
                _this.showAlert(" Already Redeemed!");
            }
        });
    };
    CancelpolicyModalPage.prototype.showAlert = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Alert!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    cssClass: 'close-action-sheet',
                    handler: function () {
                        // this.navCtrl.push(TransactionPage);
                    }
                }]
        });
        alert.present();
    };
    CancelpolicyModalPage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    CancelpolicyModalPage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    CancelpolicyModalPage.prototype.ionViewDidLeave = function () {
        console.log('leave');
        this.dismiss();
    };
    CancelpolicyModalPage.prototype.myNumber = function () {
        console.log(this.data);
        if (this.data.check1 == true) {
            this.data.payment_number = this.karigar_detail.mobile_no;
        }
        else {
            this.data.payment_number = '';
        }
    };
    CancelpolicyModalPage.prototype.address = function () {
        console.log(this.data);
        if (this.data.check1 == true) {
            this.data.shipping_address = this.karigar_detail.address + ' ,' + this.karigar_detail.city + ' ,' + this.karigar_detail.district + ' ,' + this.karigar_detail.state + ' ,' + this.karigar_detail.pincode;
        }
        else {
            this.data.shipping_address = '';
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], CancelpolicyModalPage.prototype, "nav", void 0);
    CancelpolicyModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cancelpolicy-modal',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/cancelpolicy-modal/cancelpolicy-modal.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>cancelpolicy-modal</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding class="popup-modal">\n	\n	<div class="modal-center">\n		<div class="modal-content in-modal">\n			<form #f="ngForm">\n				<h1>{{\'Unicrete\' | translate}}</h1>\n				<p class="highligt-error" *ngIf="karigar_detail.document_image == \'\' || karigar_detail.document_no == \'\'" >* {{\'Your document details are missing\' | translate}} !</p>\n\n				<p>{{\'Are you sure to redeem your\' | translate}} {{gift_detail.coupon_points}} {{\'points?\' | translate}}</p>\n				\n				<div class="number-content">\n					<p>{{\'Enter your 6 digit number that sent to\' | translate}} <span class="blue-color lineh24">+91 {{karigar_detail.mobile_no}}</span>\n					</p>\n				</div>\n				<div class="input-section">\n					<div class="input-adjust m0">\n						<input class="pl16 radius-none" type="tel" name="otp" placeholder="Enter OTP" #otp="ngModel" [(ngModel)]="data.otp" (ngModelChange)="otpvalidation()" required>\n						<div class="otp-error" *ngIf="!otp_value && otp?.touched">\n							<p>{{\'Wrong OTP value\' | translate}}</p>\n						</div>	\n					</div>\n					<div class="resend">	\n						<a (click)="resendOtp()">{{\'Resend\' | translate}}</a>\n					</div>	\n				</div>\n				\n				<!-- <div class="check-bx">\n					<ion-item>\n						<ion-checkbox color="secondary" checked="true" name="check1" #check1="ngModel" [(ngModel)]="data.check1"  (click)="address()">							\n						</ion-checkbox>\n					</ion-item>\n					<p>Same as address</p>\n				</div>\n				\n				<div class="input-section">\n                    <div class="input-adjust m0 mt0">\n                        <textarea class="pl16 mt0"  name="shipping_address" placeholder="Address" #shipping_address="ngModel" [(ngModel)]="data.shipping_address"   required></textarea>\n                        <div class="otp-error" *ngIf="!shipping_address && otp?.shipping_address">\n                            <p>{{data.payment_type}} number required</p>\n                        </div>\n                    </div>\n                </div> -->\n\n				 <!-- <ion-list radio-group class="payment-option" name="payment_type" [(ngModel)]="data.payment_type" #user_type="ngModel" payment_type>\n                    <ion-list-header>\n                         {{\'Received Type\' | translate}}\n                    </ion-list-header>\n                    \n                    <ion-item>\n                        <ion-label><img src="assets/imgs/paytm.png">{{\'Paytm\' | translate}}</ion-label>\n                        <ion-radio value="Paytm"></ion-radio>\n                    </ion-item>\n                    \n                    <ion-item>\n                        <ion-label><img src="assets/imgs/phonepay.png">PhonePe</ion-label>\n                        <ion-radio value="PhonePe"></ion-radio>\n                    </ion-item>\n                    \n                    <ion-item>\n                        <ion-label><img src="assets/imgs/googlepay.png">{{\'Google Pay\' | translate}}</ion-label>\n                        <ion-radio value="Google Pay"></ion-radio>\n                    </ion-item>\n                </ion-list> -->\n\n                \n                <!-- <div class="check-bx">\n                    <ion-item>\n                        <ion-checkbox color="secondary" checked="true" name="check1" #check1="ngModel" [(ngModel)]="data.check1" (click)="myNumber()">\n                        </ion-checkbox>\n                    </ion-item>\n                    <p>{{\'Same as login number\' | translate}}</p>\n                </div>\n                \n                <div class="input-section">\n                    <div class="input-adjust m0">\n                        <input class="pl16 radius-none" type="tel" name="payment_number" placeholder="{{data.payment_type}} Number" #payment_number="ngModel" [(ngModel)]="data.payment_number" minlength="10" maxlength="10"  required>\n                        <div class="otp-error" *ngIf="!payment_number && otp?.payment_number">\n                            <p>{{data.payment_type}} number required</p>\n                        </div>\n                    </div>\n                </div> -->\n\n				<div class="check-bx"  *ngIf="karigar_detail.account_holder_name && karigar_detail.account_number && karigar_detail.bank_name && karigar_detail.ifsc_code" >\n					<ion-item>\n						<ion-checkbox color="secondary" checked="true" name="check2" #check2="ngModel" [(ngModel)]="data.check2" (click)="getbankdetails()">\n						</ion-checkbox>\n					</ion-item>\n					<p>{{\'Same as given profile details\' | translate}}</p>\n				</div>\n\n				<!-- <div class="ragistration-fields"> -->\n					<div class="cs-form">\n						<ion-list>\n							<ion-item class="cs-input mb0 mt10" >\n								<ion-label floating>{{\'Account Holder Name\' | translate}}</ion-label>\n								<ion-input type="text"  name="account_holder_name"  ng-pattern-restrict #account_holder_name ="ngModel" [(ngModel)]="data.account_holder_name "></ion-input>\n							</ion-item>\n							\n							<ion-item class="cs-input mb0 mt10" >\n								<ion-label floating>{{\'Bank Name\' | translate}}</ion-label>\n								<ion-input type="text"  name="bank_name " pattern="[\x00-\x7F]+" ng-pattern-restrict #bank_name ="ngModel" [(ngModel)]="data.bank_name "></ion-input>\n							</ion-item>\n							\n							\n							<ion-item class="cs-input mb0 mt10" >\n								<ion-label floating>{{\'Account No.\' | translate}}</ion-label>\n								<ion-input type="tel" name="account_number " #account_number ="ngModel" [(ngModel)]="data.account_number" minlength="9" maxlength="18"></ion-input>\n							</ion-item>\n							\n							<ion-item class="cs-input mb0 mt10" >\n								<ion-label floating>{{\'IFSC Code\' | translate}}</ion-label>\n								<ion-input type="text"  name="ifsc_code " #ifsc_code ="ngModel" [(ngModel)]="data.ifsc_code"  pattern="^[A-z]{4}[0][A-z0-9]{6}$"></ion-input>\n							</ion-item>	\n							\n						</ion-list>\n					</div>\n				<!-- </div> -->\n				<div class="check-bx">\n					<ion-item>\n						<ion-checkbox color="secondary" checked="true" name="check" #check="ngModel" [(ngModel)]="data.check" required ></ion-checkbox>\n					</ion-item>\n					<p>{{\'I have read\' | translate}} <a (click)="goOnCancelationPolicy()">{{\'cancelation policy\' | translate}}</a></p>\n				</div>\n				<div class="footer-btn">\n					<button class="outline-btn" (click)="dismiss()">{{\'No\' | translate}}</button>	\n					<button class="fill-btn" [disabled]="!data.check ||!data.otp ||!otp_value || karigar_detail.document_image == \'\' || karigar_detail.document_no == \'\' " (click)="f.form.valid && submit()">{{\'Yes\' | translate}}</button>\n				</div>	\n			</form>\n		</div>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/cancelpolicy-modal/cancelpolicy-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], CancelpolicyModalPage);
    return CancelpolicyModalPage;
}());

//# sourceMappingURL=cancelpolicy-modal.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CancelationPolicyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CancelationPolicyPage = /** @class */ (function () {
    function CancelationPolicyPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CancelationPolicyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CancelationPolicyPage');
    };
    CancelationPolicyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cancelation-policy',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/cancelation-policy/cancelation-policy.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>Cancelation policy</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/cancelation-policy/cancelation-policy.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], CancelationPolicyPage);
    return CancelationPolicyPage;
}());

//# sourceMappingURL=cancelation-policy.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registration_registration__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__aboutus_modal_aboutus_modal__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mobile_login_mobile_login__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_home__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var OtpPage = /** @class */ (function () {
    function OtpPage(navCtrl, navParams, service, alertCtrl, modalCtrl, storage, loadingCtrl, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.karigar_detail = {};
        this.otp = '';
        this.lang = '';
        this.otp_value = '';
        this.data = {};
        this.mobile_no = '';
        this.tokan_value = '';
        this.tokenInfo = '';
    }
    OtpPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad OtpPage');
        this.mobile_no = this.navParams.get('mobile_no');
        this.otp = this.navParams.get('otp');
        this.lang = this.navParams.get('lang');
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        this.translate.get("OK")
            .subscribe(function (resp) {
            _this.ok = resp;
        });
    };
    OtpPage.prototype.otpvalidation = function () {
        this.otp_value = false;
        if (this.data.otp == this.otp) {
            this.otp_value = true;
        }
        console.log(this.otp);
        console.log(this.otp_value);
    };
    OtpPage.prototype.submit = function () {
        var _this = this;
        this.presentLoading();
        console.log('data');
        console.log(this.data);
        this.service.post_rqst({ 'mobile_no': this.mobile_no, 'mode': 'App', "lang": this.lang }, 'auth/login')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            if (r['status'] == 'NOT FOUND') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__registration_registration__["a" /* RegistrationPage */], { 'mobile_no': _this.mobile_no, "lang": _this.lang });
                return;
            }
            else if (r['status'] == 'ACCOUNT SUSPENDED') {
                _this.translate.get("Your account has been suspended")
                    .subscribe(function (resp) {
                    _this.showAlert(resp);
                });
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__mobile_login_mobile_login__["a" /* MobileLoginPage */]);
                return;
            }
            else if (r['status'] == 'SUCCESS') {
                _this.storage.set('token', r['token']);
                _this.service.karigar_id = r['user'].id;
                _this.service.karigar_status = r['user'].status;
                console.log(_this.service.karigar_id);
                if (r['user'].status != 'Verified') {
                    var contactModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__aboutus_modal_aboutus_modal__["a" /* AboutusModalPage */]);
                    contactModal.present();
                    return;
                }
            }
            _this.storage.set('token', r['token']);
            _this.service.karigar_id = r['user'].id;
            console.log(_this.service.karigar_id);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */]);
            // this.navCtrl.push(TabsPage);
        });
    };
    OtpPage.prototype.resendOtp = function () {
        var _this = this;
        this.service.post_rqst({ 'mobile_no': this.mobile_no }, 'app_karigar/karigarLoginOtp').subscribe(function (r) {
            if (r['status'] == "SUCCESS") {
                _this.translate.get("OTP has been send")
                    .subscribe(function (resp) {
                    _this.showSuccess(resp);
                    _this.otp = r['otp'];
                });
            }
        });
    };
    OtpPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_4_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    OtpPage.prototype.showAlert = function (text) {
        var _this = this;
        this.translate.get("Alert")
            .subscribe(function (resp) {
            var alert = _this.alertCtrl.create({
                title: resp + '!',
                cssClass: 'action-close',
                subTitle: text,
                buttons: [_this.ok]
            });
            alert.present();
        });
    };
    OtpPage.prototype.showSuccess = function (text) {
        var _this = this;
        this.translate.get("Success")
            .subscribe(function (resp) {
            var alert = _this.alertCtrl.create({
                title: resp + '!',
                cssClass: 'action-close',
                subTitle: text,
                buttons: [_this.ok]
            });
            alert.present();
        });
    };
    OtpPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: "",
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    OtpPage.prototype.back = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__mobile_login_mobile_login__["a" /* MobileLoginPage */]);
    };
    OtpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-otp',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/login-section/otp/otp.html"*/'<ion-header no-border>\n	<ion-navbar color="white"  class="ios-coustom-height nav-bar-back">\n		<ion-title class="coustom-header-ios">\n			<div class="logo no-margin" >\n				<img src="assets/imgs/logo.png">\n			</div>\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	\n	<form  #f="ngForm"  class="hp100" (ngSubmit)="f.form.valid && submit()">\n		\n		<div class="center-block">\n			<div class="mobile-login">\n				<div class="text">\n					<p class="primary">{{\'Enter your 4 digit number that has been send to \' | translate}} <span class="lineh24">+91 {{mobile_no}}</span></p>\n				</div>\n				<div class="input-section">\n					<div class="input-adjust m16 mb0">\n						<input class="pl16 radius-none" type="tel" name="otp" placeholder="{{\'Enter OTP\' | translate}}" #otp="ngModel" [(ngModel)]="data.otp" (ngModelChange)="otpvalidation()" required>\n						<div class="otp-error" *ngIf="!otp_value && otp?.touched">\n							<p>{{\'Wrong OTP value\' | translate}}</p>\n						</div>\n					</div>\n					<div class="resend" >	\n						<a (click)="resendOtp()">{{\'Resend\' | translate}}</a>\n					</div>	\n				</div>\n				\n				<div class="login-btn" >\n					<button [disabled]="!otp_value">{{\'Continue\' | translate}}</button>\n				</div>\n				\n			</div>\n		</div>\n	</form>\n	\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/login-section/otp/otp.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */]])
    ], OtpPage);
    return OtpPage;
}());

//# sourceMappingURL=otp.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__advance_text_advance_text__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notification_notification__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contact_contact__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__video_video__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__news_news__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__faq_faq__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MainHomePage = /** @class */ (function () {
    function MainHomePage(navCtrl, navParams, storage, translate, db, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.translate = translate;
        this.db = db;
        this.alertCtrl = alertCtrl;
        this.items = [
            'Advance Decorative Laminates'
        ];
        this.tokenInfo = {};
        this.lang = '';
        this.inputs = [];
    }
    MainHomePage.prototype.ionViewDidLoad = function () {
        this.get_user_lang();
        console.log('ionViewDidLoad MainHomePage');
    };
    MainHomePage.prototype.goOnAdvanceTextPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__advance_text_advance_text__["a" /* AdvanceTextPage */]);
    };
    MainHomePage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    MainHomePage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_9_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    MainHomePage.prototype.goOnNotificationPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__notification_notification__["a" /* NotificationPage */]);
    };
    MainHomePage.prototype.goOnContactPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__contact_contact__["a" /* ContactPage */]);
    };
    MainHomePage.prototype.goOnVideoPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__video_video__["a" /* VideoPage */]);
    };
    MainHomePage.prototype.goOnNewsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__news_news__["a" /* NewsPage */]);
    };
    MainHomePage.prototype.goOnfaqPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__faq_faq__["a" /* FaqPage */]);
    };
    MainHomePage.prototype.goOnlanguage = function () {
        var _this = this;
        this.inputs = [];
        this.db.get_rqst("app_karigar/get_languages")
            .subscribe(function (resp) {
            console.log(resp);
            _this.inputs = resp;
            console.log(_this.inputs);
            for (var i = 0; i < _this.inputs.length; i++) {
                _this.inputs[i]['type'] = "radio";
                _this.inputs[i]['checked'] = _this.inputs[i]['value'] == _this.lang ? true : false;
            }
            console.log(_this.inputs);
            if (_this.inputs.length > 0) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Choose your Language',
                    inputs: _this.inputs,
                    buttons: [
                        {
                            text: 'OK',
                            handler: function (data) {
                                console.log(data);
                                _this.lang = data;
                                _this.db.post_rqst({ "login_id": _this.tokenInfo.sub, "lang": _this.lang }, "app_karigar/change_language")
                                    .subscribe(function (resp) {
                                    console.log(resp);
                                    _this.translate.use(_this.lang);
                                });
                            }
                        }
                    ]
                });
                alert_1.present();
            }
        });
    };
    MainHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-main-home',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/main-home/main-home.html"*/'\n<ion-header>\n    <ion-navbar>\n        <ion-title></ion-title>\n    </ion-navbar>\n</ion-header>\n<div class="header-logo">\n    <img src="assets/imgs/logo.png">\n</div>\n\n<ion-content padding>\n    <div class="list-adjust">\n        <ion-list>\n            <button ion-item (click)="goOnAdvanceTextPage()">\n                {{\'Advance Decorative Laminates\' | translate}}<i class="material-icons">\n                    keyboard_arrow_right\n                </i>\n            </button>  \n            <button ion-item (click)="goOnNewsPage()">\n                {{\'Latest News\' | translate}}<i class="material-icons">\n                    keyboard_arrow_right\n                </i>\n            </button>  \n            <button ion-item (click)="goOnVideoPage()">\n                {{\'Videos\' | translate}}<i class="material-icons">\n                    keyboard_arrow_right\n                </i>\n            </button>  \n            <button ion-item (click)="goOnContactPage()">\n                {{\'Contact Us\' | translate}}<i class="material-icons">\n                    keyboard_arrow_right\n                </i>\n            </button>\n            <button ion-item (click)="goOnfaqPage()">\n                {{\'FAQ\' | translate}}\n                <i class="material-icons">keyboard_arrow_right</i>\n            </button>\n        </ion-list>\n    </div>\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/main-home/main-home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_10__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MainHomePage);
    return MainHomePage;
}());

//# sourceMappingURL=main-home.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jwt_decode__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NewsDetailPage = /** @class */ (function () {
    function NewsDetailPage(navCtrl, navParams, service, loadingCtrl, app, translate, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.translate = translate;
        this.storage = storage;
        this.news_id = '';
        this.news_detail = {};
        this.lang = '';
        this.tokenInfo = {};
    }
    NewsDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NewsDetailPage');
        this.news_id = this.navParams.get('id');
        this.get_user_lang();
        this.getNewsDetail(this.news_id);
        this.presentLoading();
    };
    NewsDetailPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    NewsDetailPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_5_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    NewsDetailPage.prototype.getNewsDetail = function (news_id) {
        var _this = this;
        this.service.post_rqst({ 'news_id': news_id }, 'app_master/newsDetail').subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.news_detail = r['news'];
        });
    };
    NewsDetailPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    NewsDetailPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    NewsDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-news-detail',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/news-detail/news-detail.html"*/'\n<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'News Detail\' | translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div class="fix">\n		<div class="pr-img">\n			<img src={{news_detail.image}}>\n		</div>\n	</div>\n	<div class="box">\n		<div class="date">\n			<span><i class="material-icons">date_range</i></span>\n			<p>{{news_detail.date_created |date:\'d MMM, y\'}}</p>\n		</div>\n		<div class="social">\n			<span><i class="material-icons">public</i></span>\n			<p>{{news_detail.source}}</p>\n		</div>\n	</div>\n	<div class="pr-about">\n		<h1>{{lang != \'en\' ? news_detail.hin_title : news_detail.title |titlecase}}</h1>\n		<p><strong>{{\'Description\' | translate}}</strong> : {{lang != \'en\' ? news_detail.hin_desc : news_detail.desc}}</p>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/news-detail/news-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], NewsDetailPage);
    return NewsDetailPage;
}());

//# sourceMappingURL=news-detail.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqAnswerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jwt_decode__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FaqAnswerPage = /** @class */ (function () {
    function FaqAnswerPage(navCtrl, navParams, db, storage, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.storage = storage;
        this.translate = translate;
        this.tokenInfo = {};
        this.lang = '';
        this.data = {};
    }
    FaqAnswerPage.prototype.ionViewDidLoad = function () {
        this.data = this.navParams.get('data');
    };
    FaqAnswerPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    FaqAnswerPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_5_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    FaqAnswerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-faq-answer',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/faq-answer/faq-answer.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'FAQ Answer\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="faq-answer">\n        <div class="faq-top">\n            <img src="assets/imgs/question.png">\n            <p [innerHTML]="data.question"></p>\n        </div>\n        <div class="faq-bottom">\n            <img src="assets/imgs/ans.png">\n            <p [innerHTML]="data.answer"></p>\n        </div>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/faq-answer/faq-answer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], FaqAnswerPage);
    return FaqAnswerPage;
}());

//# sourceMappingURL=faq-answer.js.map

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShippingDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser_ngx__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ShippingDetailPage = /** @class */ (function () {
    function ShippingDetailPage(navCtrl, navParams, service, loadingCtrl, alertCtrl, app, InAppBrowser, constn) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.InAppBrowser = InAppBrowser;
        this.constn = constn;
        this.karigar_gift_id = '';
        this.shipped_detail = {};
        this.gift_detail = {};
        this.gift_id = '';
        this.receive_status = '';
        this.karigar_gift = {};
        this.edit = '';
        this.upload_url = '';
    }
    ShippingDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShippingDetailPage');
        this.upload_url = this.constn.upload_url;
        this.karigar_gift_id = this.navParams.get('id');
        this.gift_id = this.navParams.get('gift_id');
        console.log(this.gift_id);
        this.getShippedDetail();
        this.getGiftDetail();
        this.presentLoading();
    };
    ShippingDetailPage.prototype.getShippedDetail = function () {
        var _this = this;
        this.service.post_rqst({ 'karigar_gift_id': this.karigar_gift_id }, 'app_karigar/shippedDetail').subscribe(function (r) {
            console.log(r);
            if (r['shipped'])
                _this.shipped_detail = r['shipped'];
        });
    };
    ShippingDetailPage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    ShippingDetailPage.prototype.getGiftDetail = function () {
        var _this = this;
        console.log();
        this.service.post_rqst({ 'id': this.karigar_gift_id, 'gift_id': this.gift_id, 'karigar_id': this.service.karigar_id }, 'app_karigar/giftDetail').subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.gift_detail = r['gift'];
            _this.karigar_gift = r['karigar_gift'];
            if (r['karigar_gift'] != null) {
                _this.receive_status = r['karigar_gift'].receive_status;
            }
            console.log(_this.receive_status);
            console.log(_this.gift_detail);
            _this.gift_detail.coupon_points = parseInt(_this.gift_detail.coupon_points);
        });
    };
    ShippingDetailPage.prototype.recvConfirmation = function (gift_id) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmation!',
            subTitle: 'Did you receive this gift?',
            cssClass: 'action-close',
            buttons: [{
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    cssClass: 'close-action-sheet',
                    handler: function () {
                        console.log(gift_id);
                        _this.service.post_rqst({ 'id': gift_id, 'karigar_id': _this.service.karigar_id }, 'app_karigar/redeemReceiveStatus').subscribe(function (r) {
                            console.log(r);
                            _this.showSuccess('You have receive gift successfully');
                            // this.navCtrl.setRoot(TabsPage,{index:'3'});
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                        });
                    }
                }]
        });
        alert.present();
    };
    ShippingDetailPage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    ShippingDetailPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    ShippingDetailPage.prototype.goto_link = function (url) {
        console.log(url);
        this.InAppBrowser.create(url);
    };
    ShippingDetailPage.prototype.editAddress = function () {
        var _this = this;
        this.service.post_rqst({ 'id': this.karigar_gift.id, 'shipping_address': this.karigar_gift.shipping_address }, 'app_karigar/editAddress').subscribe(function (result) {
            if (result['status'] = 'SUCCESS')
                _this.edit = '';
            _this.showSuccess("Shipping Address Updated !");
            _this.getGiftDetail();
        });
    };
    ShippingDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shipping-detail',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/shipping-detail/shipping-detail.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'Payment Detail\'  | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="shipped-detail" >\n        <!-- <div class="content edit-content" *ngIf="karigar_gift.shipping_address" >\n            <p>Shipping Address</p>\n            <a *ngIf="!shipped_detail.shipped_type && edit==\'\' && karigar_gift.gift_status==\'Pending\'" class="edit-field" (click)="edit=\'1\'"><i class="material-icons">create</i></a>\n            <h1 *ngIf="edit==\'\'">{{karigar_gift.shipping_address}}</h1> \n            \n            <div *ngIf="edit==\'1\'">\n                <textarea palceholder="Shipping Address" name="shipping_address " #shipping_address ="ngModel" [(ngModel)]="karigar_gift.shipping_address" ></textarea>\n                <button ion-item class="cs-btn btn-radius mb0 mt10" [disabled]="karigar_gift.shipping_address==\'\'" (click)="editAddress()">Save</button>\n            </div>\n        </div>\n        <div *ngIf="shipped_detail.shipped_type">\n            <div class="content">\n                <p>Shipped By</p>\n                <h1>{{shipped_detail.shipped_type}}</h1> \n            </div>\n            <div class="content" >\n                <p>Estimate Delivery Time</p>\n                <h1>{{shipped_detail.estimated_date}}</h1>\n            </div>\n            <div class="content">\n                <p>Shipping Information</p>\n                <h1 [innerHTML]="shipped_detail.shipping_information" (click)="goto_link(shipped_detail.shipping_information)" ></h1>\n            </div>\n        </div> -->\n\n        <div *ngIf="shipped_detail.transaction_type">\n            <div class="content">\n                <p>{{\'Received Amount\' | translate}}</p>\n                <h1>&#8377;  {{shipped_detail.redeem_amount}}</h1> \n            </div>\n            <div class="content">\n                <p>{{\'Received Date\' | translate}}</p>\n                <h1>{{shipped_detail.last_updated | date:\'d MMMM y, h:mm a\'}}</h1> \n            </div>\n            <div class="content" >\n                <p>{{\'Status\' | translate}}</p>\n                <h1>{{shipped_detail.status}}</h1>\n            </div>\n            <div class="content" *ngIf="shipped_detail.failure_reason">\n                <p>{{\'Failure Reason\' | translate}}</p>\n                <h1>{{shipped_detail.failure_reason}}</h1>\n            </div>\n            \n        </div>\n    </div>\n    <div class="margin-padding">\n        <div class="phone">\n            <div class="phone-head">\n                <h1>{{gift_detail.gift_title}}</h1>\n            </div>\n            <div class="phone-img">\n                <img [src]="upload_url+gift_detail.gift_image">\n                <!-- <img [src]="gift_detail.image"> -->\n            </div>\n        </div>\n        <div class="lorem-text" *ngIf="gift_detail.gift_specification != \'\'">\n            <p><Strong>{{\'Specification\' | translate}} : <div [innerHTML]="gift_detail.gift_specification"> </div></Strong></p>\n        </div>\n        <div class="fix-btn" *ngIf="receive_status == null">\n            <button ion-item class="cs-btn btn-radius mb0" (click)="recvConfirmation(gift_detail.id)">{{\'Click Here if you Receive\' | translate}}</button>\n        </div>\n    </div>\n</ion-content>\n\n<ion-footer>\n    \n</ion-footer>\n<!-- {{gift_detail.gift_specification}} -->\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/shipping-detail/shipping-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__["a" /* ConstantProvider */]])
    ], ShippingDetailPage);
    return ShippingDetailPage;
}());

//# sourceMappingURL=shipping-detail.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ChatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatingPage = /** @class */ (function () {
    function ChatingPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ChatingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatingPage');
    };
    ChatingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chating',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/chating/chating.html"*/'<!--\n  Generated template for the ChatingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n	<ion-navbar>\n		<ion-title>\n				<img src="assets/imgs/bill.jpg">\n				<div class="profile-text">\n					<h1>BSC Paints</h1><p>last seen today at 12:30</p>\n				</div>\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding class="main-backgroung">\n	<div class="chat-main">\n		<div class="cs-flexright">\n			<div class="chat other-chat">\n				<p>09:11 PM</p>\n				<div class="content">\n					<span>Gastroenteritis means \n						inflammation of stomach as well \n					as the gastrointestinal tract.</span>\n				</div>\n			</div>\n		</div>\n		<div class="cs-flexleft">	\n			<div class="chat">\n				<p>09:11 PM</p>\n				<div class="content">\n					<span>Gastroenteritis means \n						inflammation of stomach as well \n					as the gastrointestinal tract.</span>\n				</div>\n			</div>\n		</div>\n		<div class="cs-flexright">\n			<div class="chat other-chat">\n				<p>09:11 PM</p>\n				<div class="content">\n					<span>Gastroenteritis means \n						inflammation of stomach as well \n					as the gastrointestinal tract.</span>\n				</div>\n			</div>\n		</div>	\n		<div class="cs-flexleft">		\n			<div class="chat">\n				<p>09:11 PM</p>\n				<div class="content">\n					<span>Gastroenteritis means \n						inflammation of stomach as well \n					as the gastrointestinal tract.</span>\n				</div>\n			</div>\n		</div>	\n\n	</div>\n</ion-content>\n<ion-footer>\n	<div class="say-something">\n		<ion-input type="text" placeholder="Say something…" value=""></ion-input>\n		<i class="material-icons">arrow_forward</i>\n	</div>\n</ion-footer>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/chating/chating.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], ChatingPage);
    return ChatingPage;
}());

//# sourceMappingURL=chating.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReceiveRemarkModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReceiveRemarkModalPage = /** @class */ (function () {
    function ReceiveRemarkModalPage(navCtrl, navParams, viewCtrl, alertCtrl, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.data = {};
        this.gift_id = '';
    }
    ReceiveRemarkModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReceiveRemarkModalPage');
        this.gift_id = this.navParams.get('gift_id');
    };
    ReceiveRemarkModalPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    ReceiveRemarkModalPage.prototype.submit = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmation!',
            subTitle: 'Did you receive this gift?',
            cssClass: 'action-close',
            buttons: [{
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    cssClass: 'close-action-sheet',
                    handler: function () {
                        // console.log(gift_id);
                        _this.service.post_rqst({ 'id': _this.gift_id, 'karigar_id': _this.service.karigar_id, 'remark': _this.data.receiving_remark }, 'app_karigar/redeemReceiveStatus').subscribe(function (r) {
                            console.log(r);
                            // this.navCtrl.setRoot(TabsPage,{index:'3'});
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                            _this.showSuccess('You have receive gift successfully');
                            // this.getTransactionDetail()
                        });
                    }
                }]
        });
        alert.present();
    };
    ReceiveRemarkModalPage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    ReceiveRemarkModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-receive-remark-modal',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/receive-remark-modal/receive-remark-modal.html"*/'\n<ion-content padding class="popup-modal">\n  <div class="modal-center">\n    <div class="modal-content in-modal">\n      <p>Receiving Remark</p>\n      \n      <div class="input-section">\n        <div class="input-adjust m0">\n          <textarea class="radius-none" type="text" placeholder="Enter Remark" name="receiving_remark"  #receiving_remark="ngModel" [(ngModel)]="data.receiving_remark"  required></textarea>\n        </div>\n      </div>\n      \n      <div class="footer-btn">\n        <button class="outline-btn" (click)="dismiss()">Cancel</button>	\n        <button class="fill-btn" [disabled]="!data.receiving_remark" (click)="submit()">Save</button>\n      </div>	\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/receive-remark-modal/receive-remark-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */]])
    ], ReceiveRemarkModalPage);
    return ReceiveRemarkModalPage;
}());

//# sourceMappingURL=receive-remark-modal.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__point_detail_point_detail__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jwt_decode__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PointListPage = /** @class */ (function () {
    function PointListPage(navCtrl, navParams, service, loadingCtrl, app, storage, translate, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.storage = storage;
        this.translate = translate;
        this.db = db;
        this.coupon_list = [];
        this.karigar_point = {};
        this.filter = {};
        this.last_scanned_date = '';
        this.tokenInfo = {};
        this.lang = '';
        this.history = "scanned";
        this.total_balance_point = 0;
        this.flag = '';
    }
    PointListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PointListPage');
        this.getCoupanHistory();
        this.presentLoading();
        this.get_user_lang();
    };
    PointListPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getCoupanHistory();
        refresher.complete();
    };
    PointListPage.prototype.goOnPointDetailPage = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__point_detail_point_detail__["a" /* PointDetailPage */], { 'id': id });
    };
    PointListPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    PointListPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_6_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    PointListPage.prototype.getCoupanHistory = function () {
        var _this = this;
        console.log('coupan');
        this.filter.limit = 0;
        this.service.post_rqst({ 'filter': this.filter, 'karigar_id': this.service.karigar_id }, 'app_karigar/couponHistory').subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.coupon_list = r['coupon'];
            _this.karigar_point = r['karigar'];
            _this.ref_kar = r['ref_kar'];
            _this.total_balance_point = parseInt(_this.karigar_point.balance_point) + parseInt(_this.karigar_point.referal_point_balance);
        });
    };
    PointListPage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    PointListPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        console.log('loading');
        this.filter.limit = this.coupon_list.length;
        this.service.post_rqst({ 'filter': this.filter, 'karigar_id': this.service.karigar_id }, 'app_karigar/couponHistory').subscribe(function (r) {
            console.log(r);
            if (r['coupon'] == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.coupon_list = _this.coupon_list.concat(r['coupon']);
                    console.log('Asyn operation has stop');
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    PointListPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    PointListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-point-list',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/points/point-list/point-list.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'My Points\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    \n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="{{\'Pull to refresh\' | translate}}" refreshingSpinner="circles" refreshingText="{{\'Refreshing...\' | translate}}">\n        </ion-refresher-content>\n    </ion-refresher>\n    \n    <div class="top-nav nav-adjust-2">\n        <p>{{\'Balance Points\' | translate}}</p>\n        <h1>{{total_balance_point}}</h1>\n        <h2> {{\'Last updated\' | translate}} {{ (karigar_point.balance_update!=\'0000-00-00\') ? (karigar_point.balance_update | date:\'d MMMM y\') : (\'Not updated yet\') }}</h2>\n    </div>\n    \n \n    <div >\n        <ion-segment [(ngModel)]="history">\n            \n            <ion-segment-button value="scanned">\n                {{ \'Scanned Points\' | translate }}\n            </ion-segment-button>\n            \n            <ion-segment-button value="referral">\n                {{ \'Other Points\' | translate }}\n            </ion-segment-button>\n        </ion-segment>\n    </div>\n    \n    <div [ngSwitch]="history">\n        \n        <ion-list  *ngSwitchCase="\'scanned\'">\n            <div class="no-history" *ngIf="coupon_list.length == 0">\n                <img src="assets/imgs/history.png">\n                <p>{{\'No History\' | translate}}</p>\n            </div>\n            <!-- (click)="goOnPointDetailPage(list.id)" -->\n            <ion-item *ngFor="let list of coupon_list; let i=index" >\n                <div class="left-block">\n                    <!-- <p>{{\'Scanned Points\' | translate}}</p> -->\n                    <span><strong>{{\'Coupon Code\' | translate}} : </strong> {{list.coupon_code}} <br>({{list.scan_by_karigar_date | date:\'d MMMM y, h:mm a\'}})</span>\n                </div>\n                <div class="right-block">\n                    <h2>{{list.coupon_value}} <span>PT</span></h2>\n                </div>\n            </ion-item>\n        </ion-list>\n        \n        <ion-list  *ngSwitchCase="\'referral\'">\n            \n            <div class="no-history" *ngIf="ref_kar.length == 0">\n                <img src="assets/imgs/history.png">\n                <p>{{\'No History\' | translate}}</p>\n            </div>\n            <ion-item *ngFor="let row of ref_kar;">\n                <div class="left-block">\n                    <p>{{row.summary}}</p>\n                    <span>({{row.date_created | date:\'d MMMM y\'}})</span>\n                </div>\n                <div class="right-block">\n                    <h2>{{row.points}} <span>PT</span></h2>\n                </div>\n            </ion-item>\n        </ion-list>\n    </div>\n    \n    \n    <!-- <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)" *ngIf="flag!=1">\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="{{\'Loading more data...\' | translate}}">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll> -->\n</ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/points/point-list/point-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */]])
    ], PointListPage);
    return PointListPage;
}());

//# sourceMappingURL=point-list.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__offers_offers__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PointDetailPage = /** @class */ (function () {
    function PointDetailPage(navCtrl, navParams, service, loadingCtrl, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.coupon_id = '';
        this.coupon_detail = '';
        this.offer_detail = {};
    }
    PointDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PointDetailPage');
        this.coupon_id = this.navParams.get('id');
        this.getCouponDetail(this.coupon_id);
        this.presentLoading();
    };
    PointDetailPage.prototype.getCouponDetail = function (coupon_id) {
        var _this = this;
        this.service.post_rqst({ 'coupon_id': coupon_id, 'karigar_id': this.service.karigar_id }, 'app_karigar/couponDetail').subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.coupon_detail = r['coupon'];
            _this.offer_detail = r['offer_detail'];
        });
    };
    PointDetailPage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    PointDetailPage.prototype.goOnOffersPage = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__offers_offers__["a" /* OffersPage */], { 'id': id });
    };
    PointDetailPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    PointDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-point-detail',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/points/point-detail/point-detail.html"*/'\n<ion-header>\n    <ion-navbar>\n        <ion-title>Points Detail</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="Product no-margin">\n        <button ion-item class="bg-product mb16" (click)="goOnOffersPage(offer_detail.id)">\n            <div class="thumbnail" style="height: inherit;">\n                <img src="{{offer_detail.offer_banner}}">\n            </div>\n            <div class="errow">\n                <div class="list-tags wthspan">\n                    <h1>{{offer_detail.title}}</h1>\n                    <p>{{offer_detail.offer_code}}</p>\n                </div>\n                <i class="material-icons">trending_flat</i>\n            </div>\n        </button>\n    </div>\n    \n    <div class="detail-content">\n        <h1>Get Point</h1>\n        <p>{{coupon_detail.scan_date | date:\'d MMMM y\'}}</p>\n        <img src="assets/imgs/gift-1.svg">\n        <h2>{{coupon_detail.actual_coupon_point}} Point</h2>\n        <h3>{{coupon_detail.coupon_code}}</h3>\n        <p><strong>Product Code : </strong>{{coupon_detail.product_code ? coupon_detail.product_code : \'N/A\'}}</p>\n        <p><strong>Finish : </strong>{{coupon_detail.finish ? coupon_detail.finish : \'N/A\'}}</p>\n    </div>\n    \n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/points/point-detail/point-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
    ], PointDetailPage);
    return PointDetailPage;
}());

//# sourceMappingURL=point-detail.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        setTimeout(function (resp) {
            _this.closeModel();
        }, 4000);
    }
    AboutPage.prototype.closeModel = function () {
        this.viewCtrl.dismiss();
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/about/about.html"*/'<ion-content padding>\n      <div class="main-modal">\n            <div class="modal-box">\n                  <h1 style="margin-bottom: 16px !important;">{{\'Scan Tips\' | translate}}</h1>\n                  <img src="assets/imgs/scan-bar.png" alt="">\n                  <h2 style="margin: 0 !important;font-weight: 500;color: #ff0000;line-height: 24px;">{{\'Hold your phone according to the shown image while scanning the barcode\' | translate}}.</h2>\n                  <div class="modal-cls" (click)="closeModel()">\n                        <i class="material-icons">cancel</i>\n                  </div>\n            </div>\n      </div>	\n</ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FurnitureIdeasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__furniture_ideasdetail_furniture_ideasdetail__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var FurnitureIdeasPage = /** @class */ (function () {
    function FurnitureIdeasPage(navCtrl, navParams, db, loadingCtrl, translate, constn, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.constn = constn;
        this.storage = storage;
        this.upload_url = '';
        this.tokenInfo = {};
        this.lang = '';
        this.filter = {};
        this.flag = '';
        this.category_list = [];
        this.presentLoading();
    }
    FurnitureIdeasPage.prototype.ionViewDidLoad = function () {
        this.get_user_lang();
        console.log('ionViewDidLoad FurnitureIdeasPage');
        this.upload_url = this.constn.upload_url;
        this.get_category();
    };
    FurnitureIdeasPage.prototype.goOnfurnituredetailPage = function (data) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__furniture_ideasdetail_furniture_ideasdetail__["a" /* FurnitureIdeasdetailPage */], { data: data });
    };
    FurnitureIdeasPage.prototype.get_category = function () {
        var _this = this;
        this.filter.limit = 0;
        this.db.post_rqst({ 'filter': this.filter }, "app_karigar/get_furniture_cat")
            .subscribe(function (resp) {
            console.log(resp);
            _this.category_list = resp['category_list'];
            _this.loading.dismiss();
        });
    };
    FurnitureIdeasPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        console.log('loading');
        this.filter.limit = this.category_list.length;
        this.db.post_rqst({ 'filter': this.filter }, 'app_karigar/get_furniture_cat')
            .subscribe(function (r) {
            console.log(r);
            if (r['category_list'] == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.category_list = _this.category_list.concat(r['category_list']);
                    console.log('Asyn operation has stop');
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    FurnitureIdeasPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    FurnitureIdeasPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    FurnitureIdeasPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_6_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    FurnitureIdeasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-furniture-ideas',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/furniture-ideas/furniture-ideas.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'Design Ideas\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <!-- (click)="goOnfurnituredetailPage(row)" -->\n    <div class="img-container"  *ngFor="let row of category_list">\n        <img src="{{upload_url+row.image_name}}">\n        <div class="content-box">\n            <p>{{row.category}}</p>\n        </div>\n    </div>\n    \n    <div class="image-detail" *ngIf="category_list.length == 0">\n        <img src="assets/imgs/no_found.svg">\n    </div>\n    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)"  *ngIf="flag!=1">\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="{{\'Loading more data...\' | translate}}">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/furniture-ideas/furniture-ideas.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
    ], FurnitureIdeasPage);
    return FurnitureIdeasPage;
}());

//# sourceMappingURL=furniture-ideas.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FurnitureIdeasdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__furniture_ideasshare_furniture_ideasshare__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var FurnitureIdeasdetailPage = /** @class */ (function () {
    function FurnitureIdeasdetailPage(navCtrl, navParams, db, loadingCtrl, translate, constn, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.constn = constn;
        this.storage = storage;
        this.data = {};
        this.upload_url = '';
        this.filter = {};
        this.flag = '';
        this.tokenInfo = {};
        this.lang = '';
        this.sub_cat_list = [];
        this.data = this.navParams.get("data");
        this.presentLoading();
    }
    FurnitureIdeasdetailPage.prototype.ionViewDidLoad = function () {
        this.upload_url = this.constn.upload_url;
        console.log('ionViewDidLoad FurnitureIdeasdetailPage');
        this.get_subFurniture_cat();
    };
    FurnitureIdeasdetailPage.prototype.goOnfurnituresharePage = function (data) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__furniture_ideasshare_furniture_ideasshare__["a" /* FurnitureIdeassharePage */], { data: data, list: this.sub_cat_list });
    };
    FurnitureIdeasdetailPage.prototype.get_subFurniture_cat = function () {
        var _this = this;
        this.filter.limit = 0;
        this.db.post_rqst({ data: this.data, 'filter': this.filter }, "app_karigar/get_subfurniture_cat")
            .subscribe(function (resp) {
            console.log(resp);
            _this.sub_cat_list = resp['sub_cat_list'];
            _this.loading.dismiss();
        });
    };
    FurnitureIdeasdetailPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        console.log('loading');
        this.filter.limit = this.sub_cat_list.length;
        this.db.post_rqst({ data: this.data, 'filter': this.filter }, 'app_karigar/get_subfurniture_cat')
            .subscribe(function (r) {
            console.log(r);
            if (r['sub_cat_list'] == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.sub_cat_list = _this.sub_cat_list.concat(r['sub_cat_list']);
                    console.log('Asyn operation has stop');
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    FurnitureIdeasdetailPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    FurnitureIdeasdetailPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    FurnitureIdeasdetailPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_6_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    FurnitureIdeasdetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-furniture-ideasdetail',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/furniture-ideasdetail/furniture-ideasdetail.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{data.category}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="home-grid transparent multiple-images" >\n        <ul>\n        <li *ngFor="let row of sub_cat_list;let i=index" (click)="goOnfurnituresharePage(i)">\n            <div class="img-view" >\n                <img src="{{upload_url+row.image_name}}">\n            </div>\n        </li>\n        </ul>\n    </div>\n    \n    <div class="image-detail" *ngIf="sub_cat_list.length == 0">\n        <img src="assets/imgs/no_found.svg">\n    </div>\n    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)"  *ngIf="flag!=1">\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="{{\'Loading more data...\' | translate}}">\n        </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/furniture-ideasdetail/furniture-ideasdetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
    ], FurnitureIdeasdetailPage);
    return FurnitureIdeasdetailPage;
}());

//# sourceMappingURL=furniture-ideasdetail.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FurnitureIdeassharePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_constant_constant__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var FurnitureIdeassharePage = /** @class */ (function () {
    function FurnitureIdeassharePage(navCtrl, navParams, socialShar, db, loadingCtrl, translate, constn, transfer, file) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socialShar = socialShar;
        this.db = db;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.constn = constn;
        this.transfer = transfer;
        this.file = file;
        this.data = {};
        this.image_list = [];
        this.upload_url = "";
        this.index = 0;
        this.index = this.navParams.get("data");
        this.image_list = this.navParams.get("list");
        console.log(this.index);
    }
    FurnitureIdeassharePage.prototype.download = function (name, fileUrl) {
        console.log("clicked");
        console.log(this.file.externalRootDirectory);
        console.log(this.file);
        window.open(fileUrl, '_system', 'location=yes');
        // const fileTransfer: FileTransferObject = this.transfer.create();
        // const url = 'http://www.example.com/file.pdf';
        // console.log("after url");
        // fileTransfer.download(fileUrl, this.file.externalRootDirectory+'DCIM/Camera/'+ name)
        // .then((entry) => {
        //     console.log(entry);
        //     console.log('download complete: ' + entry.toURL());
        //     // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));
        // }, (error) => {
        //     // handle error
        // });
    };
    FurnitureIdeassharePage.prototype.ionViewDidLoad = function () {
        this.upload_url = this.constn.upload_url;
        console.log('ionViewDidLoad FurnitureIdeassharePage');
    };
    FurnitureIdeassharePage.prototype.share = function (image) {
        var _this = this;
        this.presentLoading();
        this.socialShar.share("", "", this.upload_url + image, "")
            .then(function (resp) {
            console.log(resp);
            _this.loading.dismiss();
        }).catch(function (err) {
            console.log(err);
            _this.loading.dismiss();
        });
    };
    FurnitureIdeassharePage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    FurnitureIdeassharePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-furniture-ideasshare',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/furniture-ideasshare/furniture-ideasshare.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{data.category}}</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content style="background: #000;">\n    <div class="slide-image">\n        <ion-slides [initialSlide]="index" paginationType="progress" loop="true" zoom="true">\n            <ion-slide *ngFor="let row of image_list; let i=index">\n                <div class="swiper-zoom-container">\n                    <img [src]="upload_url+row.image_name">\n                </div>\n                <div class="two-fields">\n                    <a (click)="share(row.image_name)">Share</a>\n                    <!-- <a target="_parent" href="{{upload_url+row.image_name}}">Download</a> -->\n                    <a (click)="download(row.image_name,upload_url+row.image_name)">Download</a>\n                </div>\n            </ion-slide>\n        </ion-slides>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/furniture-ideasshare/furniture-ideasshare.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */]])
    ], FurnitureIdeassharePage);
    return FurnitureIdeassharePage;
}());

//# sourceMappingURL=furniture-ideasshare.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_subdetail_product_subdetail__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProductDetailPage = /** @class */ (function () {
    function ProductDetailPage(navCtrl, navParams, service, loadingCtrl, app, translate, storage, con) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.translate = translate;
        this.storage = storage;
        this.con = con;
        this.cat_id = '';
        this.filter = {};
        this.prod_list = [];
        this.prod_cat = '';
        this.lang = '';
        this.tokenInfo = {};
        this.upload_url = '';
    }
    ProductDetailPage.prototype.ionViewDidLoad = function () {
        this.cat_id = this.navParams.get('id');
        this.presentLoading();
        this.get_user_lang();
        this.getProductList(this.cat_id, '');
        this.upload_url = this.con.upload_url;
    };
    ProductDetailPage.prototype.goOnProductSubDetailPage = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__product_subdetail_product_subdetail__["a" /* ProductSubdetailPage */], { 'id': id });
    };
    ProductDetailPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    ProductDetailPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_6_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    ProductDetailPage.prototype.getProductList = function (id, search) {
        var _this = this;
        console.log(search);
        this.filter.search = search;
        this.filter.limit = 0;
        this.filter.id = id;
        this.service.post_rqst({ 'filter': this.filter }, 'app_master/productList')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.prod_list = r['products'];
            _this.prod_cat = r['category_name'];
        });
    };
    ProductDetailPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    ProductDetailPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                this.navCtrl.popToRoot();
            }
        }
    };
    ProductDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product-detail',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/product-detail/product-detail.html"*/'\n<ion-header>\n	<ion-navbar>\n		<!-- For hindi -->\n		<!-- {{lang != \'en\' ? prod_cat.hin_category_name : prod_cat.category_name |titlecase}} -->\n		<ion-title>{{prod_cat.category_name |titlecase}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div class="fix" style="margin-top:40px">\n		<div class="search">\n			<ion-searchbar type=\'text\'placeholder="{{\'Search\' | translate}}" name=\'search\' #search="ngModel" [(ngModel)]="filter.search" (ngModelChange)="getProductList(cat_id,filter.search)"></ion-searchbar>\n		</div>\n	</div>\n	<div class="pr-list" (click)="goOnProductSubDetailPage(list.id)" *ngFor="let list of prod_list;let i=index">\n		<button ion-item>\n			\n			<div class="main-bx">\n				<div class="bx-left">\n					\n					<img [src]="upload_url+list.image_name" *ngIf="list.image_name">\n					<!-- <img src={{upload_url+list.image_name}} *ngIf="list.image_name"> -->\n					<img src="assets/imgs/default-image.png" *ngIf="!list.image_name">\n				</div>\n				<div class="bx-right">\n					<!-- For Hindi -->\n					<!-- {{lang != \'en\' ? list.hin_product_name : list.product_name |titlecase}} -->\n					<h2>{{list.product_name |titlecase}}</h2>\n				</div>\n			</div>  \n			<i class="material-icons">trending_flat</i>\n		</button>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/product-detail/product-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__["a" /* ConstantProvider */]])
    ], ProductDetailPage);
    return ProductDetailPage;
}());

//# sourceMappingURL=product-detail.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductSubdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__view_profile_view_profile__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProductSubdetailPage = /** @class */ (function () {
    function ProductSubdetailPage(navCtrl, navParams, service, loadingCtrl, app, translate, storage, modalCtrl, con) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.translate = translate;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.con = con;
        this.prod_id = '';
        this.prod_detail = {};
        this.lang = '';
        this.tokenInfo = {};
        this.upload_url = "";
        this.presentLoading();
    }
    ProductSubdetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductSubdetailPage');
        this.prod_id = this.navParams.get('id');
        this.get_user_lang();
        this.getProductDetail(this.prod_id);
        this.upload_url = this.con.upload_url;
    };
    ProductSubdetailPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    ProductSubdetailPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_5_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    ProductSubdetailPage.prototype.getProductDetail = function (id) {
        var _this = this;
        this.service.post_rqst({ 'product_id': id }, 'app_master/productDetail')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.prod_detail = r['product'];
        });
    };
    ProductSubdetailPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    ProductSubdetailPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    ProductSubdetailPage.prototype.viewDetail = function (image) {
        console.log("clicked");
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": image }).present();
    };
    ProductSubdetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product-subdetail',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/product-subdetail/product-subdetail.html"*/'\n<ion-header>\n    <ion-navbar class="slide-af">\n        <!-- For Hindi -->\n        <!-- <ion-title>{{\'Product Detail\' | translate}} - {{lang !=\'en\' ? prod_detail.hin_category_name : prod_detail.category_name  | titlecase}}</ion-title> -->\n        <ion-title>{{\'Product Detail\' | translate}} - {{prod_detail.category_name  | titlecase}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    \n    <div class="slide-image" style="height: auto;">\n        <!-- zoom="true" -->\n        <ion-slides class="cs-slide"  [initialSlide]="0" >            \n            <ion-slide *ngFor="let row of prod_detail.image; let i=index" (click)="viewDetail(row.image_name)">\n                <div class="swiper-zoom-container">\n                    <img [src]="upload_url+row.image_name">\n                </div>\n            </ion-slide>\n\n             <ion-slide *ngIf="prod_detail.image == \'\' && prod_detail.image.length == 0" >\n                <div class="swiper-zoom-container">\n                    <img src="assets/imgs/default-image.png">\n                </div>\n            </ion-slide>\n        </ion-slides>\n    </div>\n    \n    <!-- <div class="fix">\n        <div class="pr-img">\n            <ion-slides class="cs-slide"  pager autoplay="1000" speed="1000" loop="true" *ngIf="prod_detail.image && prod_detail.image.length" >\n                <ion-slide *ngFor="let row of prod_detail.image; let i=index" (click)="viewDetail(row.image_name)">\n                    <img [src]="upload_url+row.image_name">\n                </ion-slide>\n            </ion-slides>\n        </div>\n    </div> -->\n    \n    \n    <div class="item-table">\n        <table>\n            <tr>\n                <th class="w130">Product Name</th>\n                <td>{{prod_detail.product_name | titlecase}}</td>\n            </tr>\n            <tr>\n                <th class="w130">Code</th>\n                <td>{{prod_detail.product_code | titlecase}}</td>\n            </tr>\n            <tr>\n                <th class="w130">Pack (Ltr/Kg)</th>\n                <td>{{prod_detail.product_size | titlecase}}</td>\n            </tr>\n            <tr>\n                <th class="w130">MRP</th>\n                <td>{{prod_detail.mrp ? prod_detail.mrp:\'--\'}}</td>\n            </tr>\n           \n           \n            <tr *ngIf="prod_detail.desc!=\'\' || prod_detail.hin_desc!=\'\'">\n                <th>Description</th>\n                <td>{{lang !=\'en\' ? prod_detail.hin_desc : prod_detail.desc}}</td>\n            </tr>\n        </table>\n    </div>\n    \n    <!-- <div class="pr-about">\n        For Hindi\n        <h1>{{lang !=\'en\' ? prod_detail.hin_product_name : prod_detail.product_name | titlecase}}</h1>\n        <h1>{{prod_detail.product_name | titlecase}}</h1>\n        <p *ngIf="prod_detail.desc!=\'\' || prod_detail.hin_desc!=\'\'"><strong>{{\'Description\' | translate}}</strong> : {{lang !=\'en\' ? prod_detail.hin_desc : prod_detail.desc}}</p>\n    </div> -->\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/product-subdetail/product-subdetail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__["a" /* ConstantProvider */]])
    ], ProductSubdetailPage);
    return ProductSubdetailPage;
}());

//# sourceMappingURL=product-subdetail.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DescriptionModelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DescriptionModelPage = /** @class */ (function () {
    function DescriptionModelPage(navCtrl, navParams, loadingCtrl, viewCtrl, translate, storage, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.translate = translate;
        this.storage = storage;
        this.service = service;
        this.description = '';
        this.description_id = '';
        this.lang = '';
        this.tokenInfo = {};
    }
    DescriptionModelPage.prototype.ionViewDidLoad = function () {
        this.description = this.navParams.get('description');
        console.log(this.description);
        this.description_id = this.navParams.get('id');
        console.log(this.description_id);
        this.get_user_lang();
    };
    DescriptionModelPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    DescriptionModelPage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    DescriptionModelPage.prototype.ionViewDidLeave = function () {
        console.log('leave');
    };
    DescriptionModelPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    DescriptionModelPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_3_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    DescriptionModelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-description-model',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/description-model/description-model.html"*/'\n\n<ion-content padding class="popup-modal" style="background: rgba(0, 0, 0, 0.5);">\n  \n  <div class="modal-center">\n    <!-- <div class="modal-body">\n      <div class="heading">\n        Description\n        <a (click)="dismiss()" class="close"><i class="material-icons">clear</i></a>	\n      </div>\n      <p>{{description}}</p>\n    </div>\n    \n     -->\n    <div class="modal-content in-modal">\n      <h1> {{\'Description\' | translate}}</h1>\n      <a (click)="dismiss()" class="close"><i class="material-icons">clear</i></a>	\n      <p [innerHTML]="description"></p>\n      \n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/description-model/description-model.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__["a" /* DbserviceProvider */]])
    ], DescriptionModelPage);
    return DescriptionModelPage;
}());

//# sourceMappingURL=description-model.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkingSitePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__site_popover_site_popover__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__view_profile_view_profile__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/**
* Generated class for the WorkingSitePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var WorkingSitePage = /** @class */ (function () {
    function WorkingSitePage(navCtrl, popoverCtrl, navParams, actionSheetController, translate, camera, db, storage, loadingCtrl, transfer, constant, modalCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.popoverCtrl = popoverCtrl;
        this.navParams = navParams;
        this.actionSheetController = actionSheetController;
        this.translate = translate;
        this.camera = camera;
        this.db = db;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.transfer = transfer;
        this.constant = constant;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.lang = "en";
        this.data = {};
        this.karigar_id = '';
        this.tokenInfo = {};
        this.formdata = new FormData();
        this.cam = "";
        this.gal = "";
        this.cancl = "";
        this.ok = "";
        this.upl_file = "";
        this.save_succ = "";
        this.image = '';
        this.image_list = [];
        this.inserted_id = '';
        this.delete_array = [];
        this.action = '';
        this.del_per = false;
        this.get_user_lang();
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        console.log(this.db.tokenInfo);
        this.storage.get('token')
            .then(function (resp) {
            console.log(__WEBPACK_IMPORTED_MODULE_7_jwt_decode__(resp));
            var tokendata = __WEBPACK_IMPORTED_MODULE_7_jwt_decode__(resp);
            _this.karigar_id = tokendata.sub;
            _this.get_siteImages();
        });
    }
    WorkingSitePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad WorkingSitePage');
        this.translate.get("Camera")
            .subscribe(function (resp) {
            _this.cam = resp;
        });
        this.translate.get("Gallery")
            .subscribe(function (resp) {
            _this.gal = resp;
        });
        this.translate.get("Cancel")
            .subscribe(function (resp) {
            _this.cancl = resp;
        });
        this.translate.get("OK")
            .subscribe(function (resp) {
            _this.ok = resp;
        });
        this.translate.get("Upload File")
            .subscribe(function (resp) {
            _this.upl_file = resp;
        });
        this.translate.get("Registered Successfully")
            .subscribe(function (resp) {
            _this.save_succ = resp;
        });
    };
    WorkingSitePage.prototype.get_siteImages = function () {
        var _this = this;
        this.presentLoading();
        this.db.post_rqst({ "karigar_id": this.karigar_id }, "app_karigar/get_site_pics")
            .subscribe(function (resp) {
            console.log(resp);
            _this.loading.dismiss();
            _this.image_list = resp['site_image'];
        });
    };
    WorkingSitePage.prototype.open_camera = function () {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: "Select An Option",
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: this.cam,
                    icon: 'camera',
                    handler: function () {
                        console.log("Camera Clicked");
                        _this.takePhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: this.gal,
                    icon: 'image',
                    handler: function () {
                        console.log("Gallery Clicked");
                        _this.getImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: this.cancl,
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionsheet.present();
    };
    WorkingSitePage.prototype.takePhoto = function () {
        var _this = this;
        console.log("i am in camera function");
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 800,
            targetHeight: 700
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            console.log(imageData);
            _this.image = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.image);
            _this.save_picture();
        });
    };
    WorkingSitePage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            console.log(imageData);
            _this.image = 'data:image/jpeg;base64,' + imageData;
            _this.formdata.append("image", _this.image);
            console.log(_this.image);
            _this.save_picture();
        });
    };
    WorkingSitePage.prototype.save_picture = function () {
        var _this = this;
        this.db.post_rqst({ "karigar_id": this.karigar_id }, "app_karigar/saveSitePicture")
            .subscribe(function (resp) {
            console.log(resp);
            _this.inserted_id = resp['inserted_id'];
            _this.formdata.append("last_id", _this.inserted_id);
            if (_this.formdata) {
                var loader_1 = _this.loadingCtrl.create({
                    content: "Uploading..."
                });
                loader_1.present();
                var fileTransfer = _this.transfer.create();
                var random = Math.floor(Math.random() * 100);
                var options = {
                    fileKey: 'photo',
                    fileName: "myImage_" + random + ".jpg",
                    chunkedMode: false,
                    mimeType: "image/jpeg",
                };
                fileTransfer.upload(_this.image, _this.constant.rootUrl + 'woking_site_pics?id=' + _this.inserted_id, options)
                    .then(function (data) {
                    console.log(data);
                    loader_1.dismiss();
                    _this.get_siteImages();
                });
            }
        });
    };
    WorkingSitePage.prototype.ngOnInit = function () {
    };
    WorkingSitePage.prototype.filter_array = function (args) {
        var _this = this;
        this.delete_array = [];
        this.image_list.forEach(function (element) {
            console.log(element);
            element.site_images.forEach(function (row) {
                if (args == 'selectAll') {
                    row.checked = true;
                }
                if (args == 'delete') {
                    if (row.checked && row.checked == true) {
                        _this.delete_array.push(row);
                    }
                }
            });
        });
        if (args == 'selectAll') {
            this.del_per = true;
        }
    };
    WorkingSitePage.prototype.presentPopover = function () {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_9__site_popover_site_popover__["a" /* SitePopoverPage */], {
            data: this.action,
            delete: this.del_per
        });
        popover.present();
        popover.onDidDismiss(function (data) {
            console.log(data);
            if (data) {
                _this.action = data;
            }
            console.log(_this.action);
            if (_this.action == 'Select All') {
                _this.filter_array('selectAll');
            }
            if (_this.action == 'Deselect') {
                _this.action = '';
                _this.del_per = false;
            }
            if (_this.action == "Delete") {
                _this.filter_array('delete');
                console.log(_this.image_list);
                console.log(_this.delete_array);
                var updateAlert = _this.alertCtrl.create({
                    title: 'Delete',
                    message: 'Are you sure,want to delete this!',
                    buttons: [
                        {
                            text: 'No',
                            handler: function () {
                                _this.action = 'Select';
                            }
                        },
                        {
                            text: 'Yes',
                            handler: function () {
                                console.log(_this.delete_array);
                                _this.db.post_rqst({ "data": _this.delete_array }, "app_karigar/delete_site_pics")
                                    .subscribe(function (resp) {
                                    console.log(resp);
                                    _this.get_siteImages();
                                });
                            }
                        }
                    ]
                });
                updateAlert.present();
            }
        });
    };
    WorkingSitePage.prototype.viewDetail = function (image) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": image }).present();
    };
    WorkingSitePage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    WorkingSitePage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    WorkingSitePage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_7_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    WorkingSitePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-working-site',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/working-site/working-site.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'Working Site\' | translate}}</ion-title>\n        <div class="header-icons">\n            <button *ngIf="image_list.length > 0" ion-button class="cs-hdr-icons mr5" (click)="presentPopover()">\n                <i class="material-icons">more_vert</i>\n            </button>\n        </div>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="main-backgroung">\n    <div class="gal-div" *ngFor="let row of image_list">\n        <div class="border-section">\n            <p>{{row.date_created | date:\'d MMM y\'}}</p>\n        </div>\n        <div class="site-gallery">\n            <label *ngFor="let data of row.site_images;let i=index">\n                <div class="st-box" *ngIf="data.image_name">\n                    <img src="{{db.constant.upload_url+data.image_name}}" (click)="action == \'Select\' || action == \'Select All\' ? \'\' : viewDetail(data.image_name)">\n                    \n                    <input *ngIf="action == \'Select\' || action == \'Select All\'" type="checkbox" (click)="del_per = true" name="checked{{i}}" [(ngModel)]="data.checked">\n                    \n                    <a *ngIf="action == \'Select\' || action == \'Select All\'" class="zoom-image" (click)="viewDetail(data.image_name)"><i class="material-icons">zoom_out_map</i></a>\n                </div>\n            </label>\n        </div>\n    </div>\n    <ion-fab class="fab-btn" bottom right edge>\n        <button ion-fab mini (click)="open_camera()"><i class="material-icons">camera_alt</i></button>\n    </ion-fab>\n    \n    <div class="image-detail" *ngIf="image_list.length == 0">\n        <img src="assets/imgs/no_found.svg">\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/working-site/working-site.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_8__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], WorkingSitePage);
    return WorkingSitePage;
}());

//# sourceMappingURL=working-site.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SitePopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
* Generated class for the SitePopoverPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var SitePopoverPage = /** @class */ (function () {
    function SitePopoverPage(navCtrl, navParams, popoverCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.viewCtrl = viewCtrl;
        this.action = '';
        this.del_per = '';
    }
    SitePopoverPage.prototype.ionViewDidLoad = function () {
        this.action = this.navParams.get('data');
        this.del_per = this.navParams.get('delete');
        console.log(this.action);
        console.log(this.del_per);
        console.log('ionViewDidLoad SitePopoverPage');
    };
    SitePopoverPage.prototype.select_opt = function (args) {
        this.action = args;
        this.viewCtrl.dismiss(this.action);
    };
    SitePopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-site-popover',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/site-popover/site-popover.html"*/'<ion-content>\n  <div class="Selection-delete">\n    <p *ngIf="!action" (click)="select_opt(\'Select\')">Select</p>\n    <p *ngIf="action && !del_per" (click)="select_opt(\'Select All\')">Select All</p>\n    <p *ngIf="del_per" (click)="select_opt(\'Deselect\')">Deselect</p>\n    <p *ngIf="action && del_per" (click)="select_opt(\'Delete\')">Delete</p>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/site-popover/site-popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */]])
    ], SitePopoverPage);
    return SitePopoverPage;
}());

//# sourceMappingURL=site-popover.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KarigarsDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_constant_constant__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__karigar_gallery_karigar_gallery__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__remark_remark__ = __webpack_require__(453);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the KarigarsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var KarigarsDetailPage = /** @class */ (function () {
    function KarigarsDetailPage(navCtrl, navParams, service, modalCtrl, translate, storage, constn) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.storage = storage;
        this.constn = constn;
        this.lang = '';
        this.upload_url = "";
    }
    KarigarsDetailPage.prototype.ionViewDidLoad = function () {
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
    };
    KarigarsDetailPage.prototype.getKarGallery = function () {
        var _this = this;
        this.service.post_rqst({ "id": this.kar_id }, "app_karigar/karigarSiteGallaryDetail").subscribe(function (r) {
            console.log(r);
            _this.karImage = r['stateWiseKarigarsDetail'];
            console.log(_this.karImage);
        });
    };
    KarigarsDetailPage.prototype.sendEnquiry = function () {
        console.log(this.service.karigar_id);
        console.log(this.kar_id);
        var remarkModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__remark_remark__["a" /* RemarkPage */], { "kar_id": this.kar_id });
        remarkModal.present();
        return;
        // this.service.post_rqst({"id":this.kar_id,"customer_id":this.service.karigar_id},
        // "app_karigar/karigarEmail").subscribe(r=>{
        //   console.log(r);
        // })
    };
    KarigarsDetailPage.prototype.goOnGalleryImage = function (id, image) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__karigar_gallery_karigar_gallery__["a" /* KarigarGalleryPage */], { "id": id, "image": image });
    };
    KarigarsDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-karigars-detail',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/karigars-detail/karigars-detail.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'karigars Site Gallery\'|translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <!-- <div class="Product" *ngFor="let list of karImage; let i=index">\n        <div ion-item class="bg-product">\n            <div class="thumbnail">\n                <img [src]="list.image_name">\n            </div>\n        </div>\n    </div> -->\n    <!-- <div>\n        <P *ngIf="sendEmail==\'true\'">Email is Successfully Send</P>\n    </div> -->\n    \n    \n    <div class="home-grid transparent multiple-images">        \n        <ul>  \n            <li *ngFor="let list of karImage; let i=index" (click)="goOnGalleryImage(list.id,list.image_name)">\n                <div class="img-view">\n                    <img [src]="upload_url+list.image_name">\n                    <!-- <img src="assets/imgs/home-icon/profile.png"> -->\n                </div>\n            </li> \n        </ul>\n    </div>\n</ion-content>\n\n<ion-footer>\n    <button ion-button class="cs-btn no-margin" (click)="sendEnquiry()">{{\'Click Here For Send Enquiry\'|translate}}</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/karigars-detail/karigars-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__["a" /* DbserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_constant_constant__["a" /* ConstantProvider */]])
    ], KarigarsDetailPage);
    return KarigarsDetailPage;
}());

//# sourceMappingURL=karigars-detail.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KarigarGalleryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_constant_constant__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the KarigarGalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var KarigarGalleryPage = /** @class */ (function () {
    function KarigarGalleryPage(navCtrl, navParams, constn, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.constn = constn;
        this.translate = translate;
        this.upload_url = "";
    }
    KarigarGalleryPage.prototype.ionViewDidLoad = function () {
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
    };
    KarigarGalleryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-karigar-gallery',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/karigar-gallery/karigar-gallery.html"*/'<!--\n  Generated template for the KarigarGalleryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>{{"karigar Gallery"|translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="background: #000;">\n  <!-- <div class="slide-image">\n            <div class="swiper-zoom-container">\n                <img [src]="upload_url+image">\n            </div>\n  </div> -->\n  <div class="modal-center">\n    <div class="cs-model-body">\n      <div class="img-radius flat-img">\n          <img [src]="upload_url+image">\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/karigar-gallery/karigar-gallery.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_constant_constant__["a" /* ConstantProvider */],
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], KarigarGalleryPage);
    return KarigarGalleryPage;
}());

//# sourceMappingURL=karigar-gallery.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DigitalcatalogPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_constant_constant__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the DigitalcatalogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DigitalcatalogPage = /** @class */ (function () {
    function DigitalcatalogPage(navCtrl, navParams, dbService, cons) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbService = dbService;
        this.cons = cons;
        this.pdf = [];
        this.uploadUrl = '';
        this.uploadUrl = cons.upload_url;
    }
    DigitalcatalogPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DigitalcatalogPage');
        this.getpdflist();
    };
    DigitalcatalogPage.prototype.getpdflist = function () {
        var _this = this;
        this.dbService.post_rqst({}, 'app_karigar/product_catalogue_list').subscribe(function (r) {
            console.log(r);
            _this.pdf = r['pdf'];
        });
    };
    DigitalcatalogPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-digitalcatalog',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/digitalcatalog/digitalcatalog.html"*/'<!--\n  Generated template for the BillhistoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="main-header remove" >\n  <ion-navbar>\n    <ion-title>{{ \'Digital Catalogue\' | translate }}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <div class="container p20" >\n      <div class="main" *ngFor="let list of pdf">\n        <a href="{{uploadUrl + list.pdf}}">\n        <div class="part1">\n          <img  src="assets/imgs/pdf.png" alt="#">\n          <span>{{list.pdf_name}}</span>\n        </div>\n        </a>  \n      </div>\n    </div>\n    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadDataBill($event)" *ngIf="flag!=1">\n      <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">\n      </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/digitalcatalog/digitalcatalog.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_constant_constant__["a" /* ConstantProvider */]])
    ], DigitalcatalogPage);
    return DigitalcatalogPage;
}());

//# sourceMappingURL=digitalcatalog.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvanceTextPageModule", function() { return AdvanceTextPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__advance_text__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AdvanceTextPageModule = /** @class */ (function () {
    function AdvanceTextPageModule() {
    }
    AdvanceTextPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__advance_text__["a" /* AdvanceTextPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__advance_text__["a" /* AdvanceTextPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], AdvanceTextPageModule);
    return AdvanceTextPageModule;
}());

//# sourceMappingURL=advance-text.module.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancelationPolicyPageModule", function() { return CancelationPolicyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cancelation_policy__ = __webpack_require__(252);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CancelationPolicyPageModule = /** @class */ (function () {
    function CancelationPolicyPageModule() {
    }
    CancelationPolicyPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cancelation_policy__["a" /* CancelationPolicyPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cancelation_policy__["a" /* CancelationPolicyPage */]),
            ],
        })
    ], CancelationPolicyPageModule);
    return CancelationPolicyPageModule;
}());

//# sourceMappingURL=cancelation-policy.module.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancelpolicyModalPageModule", function() { return CancelpolicyModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cancelpolicy_modal__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__language_language_module__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var CancelpolicyModalPageModule = /** @class */ (function () {
    function CancelpolicyModalPageModule() {
    }
    CancelpolicyModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__cancelpolicy_modal__["a" /* CancelpolicyModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__cancelpolicy_modal__["a" /* CancelpolicyModalPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: __WEBPACK_IMPORTED_MODULE_5__language_language_module__["createTranslateLoader"],
                        deps: [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], CancelpolicyModalPageModule);
    return CancelpolicyModalPageModule;
}());

//# sourceMappingURL=cancelpolicy-modal.module.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatingPageModule", function() { return ChatingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chating__ = __webpack_require__(349);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatingPageModule = /** @class */ (function () {
    function ChatingPageModule() {
    }
    ChatingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chating__["a" /* ChatingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chating__["a" /* ChatingPage */]),
            ],
        })
    ], ChatingPageModule);
    return ChatingPageModule;
}());

//# sourceMappingURL=chating.module.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactPageModule", function() { return ContactPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var ContactPageModule = /** @class */ (function () {
    function ContactPageModule() {
    }
    ContactPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__contact__["a" /* ContactPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__contact__["a" /* ContactPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], ContactPageModule);
    return ContactPageModule;
}());

//# sourceMappingURL=contact.module.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DescriptionModelPageModule", function() { return DescriptionModelPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__description_model__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var DescriptionModelPageModule = /** @class */ (function () {
    function DescriptionModelPageModule() {
    }
    DescriptionModelPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__description_model__["a" /* DescriptionModelPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__description_model__["a" /* DescriptionModelPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], DescriptionModelPageModule);
    return DescriptionModelPageModule;
}());

//# sourceMappingURL=description-model.module.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DigitalcatalogPageModule", function() { return DigitalcatalogPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__digitalcatalog__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_3__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var DigitalcatalogPageModule = /** @class */ (function () {
    function DigitalcatalogPageModule() {
    }
    DigitalcatalogPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__digitalcatalog__["a" /* DigitalcatalogPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__digitalcatalog__["a" /* DigitalcatalogPage */]),
                __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], DigitalcatalogPageModule);
    return DigitalcatalogPageModule;
}());

//# sourceMappingURL=digitalcatalog.module.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaqAnswerPageModule", function() { return FaqAnswerPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__faq_answer__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var FaqAnswerPageModule = /** @class */ (function () {
    function FaqAnswerPageModule() {
    }
    FaqAnswerPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__faq_answer__["a" /* FaqAnswerPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__faq_answer__["a" /* FaqAnswerPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], FaqAnswerPageModule);
    return FaqAnswerPageModule;
}());

//# sourceMappingURL=faq-answer.module.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaqPageModule", function() { return FaqPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__faq__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var FaqPageModule = /** @class */ (function () {
    function FaqPageModule() {
    }
    FaqPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__faq__["a" /* FaqPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__faq__["a" /* FaqPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], FaqPageModule);
    return FaqPageModule;
}());

//# sourceMappingURL=faq.module.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbackPageModule", function() { return FeedbackPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feedback__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var FeedbackPageModule = /** @class */ (function () {
    function FeedbackPageModule() {
    }
    FeedbackPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__feedback__["a" /* FeedbackPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__feedback__["a" /* FeedbackPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], FeedbackPageModule);
    return FeedbackPageModule;
}());

//# sourceMappingURL=feedback.module.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FurnitureIdeasPageModule", function() { return FurnitureIdeasPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__furniture_ideas__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var FurnitureIdeasPageModule = /** @class */ (function () {
    function FurnitureIdeasPageModule() {
    }
    FurnitureIdeasPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__furniture_ideas__["a" /* FurnitureIdeasPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__furniture_ideas__["a" /* FurnitureIdeasPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], FurnitureIdeasPageModule);
    return FurnitureIdeasPageModule;
}());

//# sourceMappingURL=furniture-ideas.module.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FurnitureIdeasdetailPageModule", function() { return FurnitureIdeasdetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__furniture_ideasdetail__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var FurnitureIdeasdetailPageModule = /** @class */ (function () {
    function FurnitureIdeasdetailPageModule() {
    }
    FurnitureIdeasdetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__furniture_ideasdetail__["a" /* FurnitureIdeasdetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__furniture_ideasdetail__["a" /* FurnitureIdeasdetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], FurnitureIdeasdetailPageModule);
    return FurnitureIdeasdetailPageModule;
}());

//# sourceMappingURL=furniture-ideasdetail.module.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FurnitureIdeassharePageModule", function() { return FurnitureIdeassharePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__furniture_ideasshare__ = __webpack_require__(356);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FurnitureIdeassharePageModule = /** @class */ (function () {
    function FurnitureIdeassharePageModule() {
    }
    FurnitureIdeassharePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__furniture_ideasshare__["a" /* FurnitureIdeassharePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__furniture_ideasshare__["a" /* FurnitureIdeassharePage */]),
            ],
        })
    ], FurnitureIdeassharePageModule);
    return FurnitureIdeassharePageModule;
}());

//# sourceMappingURL=furniture-ideasshare.module.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GiftDetailPageModule", function() { return GiftDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gift_detail__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var GiftDetailPageModule = /** @class */ (function () {
    function GiftDetailPageModule() {
    }
    GiftDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__gift_detail__["a" /* GiftDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__gift_detail__["a" /* GiftDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], GiftDetailPageModule);
    return GiftDetailPageModule;
}());

//# sourceMappingURL=gift-detail.module.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scane_pages_scan_scan__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__offer_list_offer_list__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__points_point_list_point_list__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__offers_offers__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_barcode_scanner__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__gift_gallery_gift_list_gift_list__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__view_profile_view_profile__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_push__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__scane_pages_coupan_code_coupan_code__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__profile_profile__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__terms_terms__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__aboutus_modal_aboutus_modal__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_constant_constant__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__about_about__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__furniture_ideas_furniture_ideas__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__products_products__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__working_site_working_site__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__feedback_feedback__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__news_news__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__video_video__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__contact_contact__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__faq_faq__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__transaction_transaction__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__advance_text_advance_text__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_social_sharing__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__notification_notification__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__language_language__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__karigars_karigars__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__digitalcatalog_digitalcatalog__ = __webpack_require__(365);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



































var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, service, loadingCtrl, storage, barcodeScanner, alertCtrl, modalCtrl, push, translate, constant, socialSharing) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.barcodeScanner = barcodeScanner;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.push = push;
        this.translate = translate;
        this.constant = constant;
        this.socialSharing = socialSharing;
        this.offer_list = [];
        this.karigar_detail = {};
        this.last_point = '';
        this.today_point = '';
        this.qr_code = '';
        this.coupon_value = '';
        this.uploadUrl = '';
        this.tokenInfo = {};
        this.lang = "";
        this.active = true;
        this.offer_detail = {};
        this.language = [];
        this.appbanner = [];
        this.sharepoint = 0;
        this.notify_cn = 0;
        this.testRadioOpen = '';
        this.value = '';
        this.qr_count = 0;
        this.qr_limit = 0;
        this.presentLoading();
        this.initPushNotification();
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.uploadUrl = this.constant.upload_url;
        console.log('ionViewDidLoad HomePage');
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        this.getData();
        this.get_user_lang();
        this.getofferBannerList();
    };
    HomePage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getData();
        refresher.complete();
    };
    HomePage.prototype.getData = function () {
        var _this = this;
        console.log("Check");
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id }, 'app_karigar/karigarHome')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.language = r['language'];
            _this.karigar_detail = r['karigar'];
            console.log(_this.karigar_detail);
            localStorage.setItem('karigar_info', JSON.stringify(r['karigar']));
            // this.storage.set('karigar_info',r['karigar']);
            _this.appbanner = r['appbanner'];
            console.log(_this.appbanner);
            _this.offer_detail = r['offer'];
            _this.last_point = r['last_point'];
            _this.notify_cn = r['notifications'];
            _this.today_point = r['today_point'];
            _this.total_balance_point = parseInt(_this.karigar_detail.balance_point) + parseInt(_this.karigar_detail.referal_point_balance);
            _this.sharepoint = r['points']['owner_ref_point'];
        });
    };
    HomePage.prototype.getofferBannerList = function () {
        var _this = this;
        console.log(this.service.karigar_id);
        console.log('offerbanner');
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id }, 'app_karigar/offerList')
            .subscribe(function (r) {
            console.log(r);
            _this.offer_list = r['offer'];
            console.log(_this.offer_list);
        });
    };
    HomePage.prototype.scan_tips = function () {
        var _this = this;
        if (this.karigar_detail.status == 'Pending') {
            this.showAlert("You Are Not verified");
        }
        else {
            var contactModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_19__about_about__["a" /* AboutPage */]);
            contactModal.present();
            contactModal.onDidDismiss(function (resp) {
                console.log(resp);
                _this.scan();
            });
        }
        // let contactModal = this.modalCtrl.create(AboutPage);
        // contactModal.present();
        // contactModal.onDidDismiss(resp=>{
        //     console.log(resp);
        //     this.scan();
        // })
    };
    HomePage.prototype.EnterCouponCode = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__scane_pages_coupan_code_coupan_code__["a" /* CoupanCodePage */]);
    };
    // qr_count:any=0;
    // qr_limit:any=0;
    HomePage.prototype.scan = function () {
        var _this = this;
        if (this.karigar_detail.manual_permission == 1) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__scane_pages_coupan_code_coupan_code__["a" /* CoupanCodePage */]);
        }
        else {
            this.service.post_rqst({ 'karigar_id': this.service.karigar_id }, "app_karigar/get_qr_permission")
                .subscribe(function (resp) {
                console.log(resp);
                _this.qr_count = resp['karigar_daily_count'];
                _this.qr_limit = resp['qr_limit'];
                console.log(_this.qr_count);
                console.log(_this.qr_limit);
                if (parseInt(_this.qr_count) <= parseInt(_this.qr_limit)) {
                    var options = {
                        prompt: ""
                    };
                    _this.barcodeScanner.scan(options).then(function (resp) {
                        console.log(resp);
                        _this.qr_code = resp.text;
                        console.log(_this.qr_code);
                        if (resp.text != '') {
                            _this.service.post_rqst({ 'karigar_id': _this.service.karigar_id, 'qr_code': _this.qr_code }, 'app_karigar/karigarCoupon')
                                .subscribe(function (r) {
                                console.log(r);
                                if (r['status'] == 'INVALID') {
                                    _this.translate.get("Invalid Coupon Code")
                                        .subscribe(function (resp) {
                                        _this.showAlert(resp);
                                    });
                                    return;
                                }
                                else if (r['status'] == 'USED') {
                                    _this.translate.get("Coupon Already Used")
                                        .subscribe(function (resp) {
                                        _this.showAlert(resp);
                                    });
                                    return;
                                }
                                else if (r['status'] == 'UNASSIGNED OFFER') {
                                    _this.translate.get("This Coupon Code is not applicable in your Area")
                                        .subscribe(function (resp) {
                                        _this.showAlert(resp);
                                    });
                                    return;
                                }
                                _this.translate.get("points has been added into your wallet")
                                    .subscribe(function (resp) {
                                    _this.showSuccess(r['coupon_value'] + resp);
                                });
                                _this.getData();
                            });
                        }
                        else {
                            console.log('not scanned anything');
                        }
                    });
                }
                else {
                    _this.translate.get("You have exceed the daily QR scan limit")
                        .subscribe(function (resp) {
                        _this.showAlert(resp);
                    });
                }
            });
        }
    };
    HomePage.prototype.viewProfiePic = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": this.karigar_detail.profile, type: "base_64" }).present();
    };
    HomePage.prototype.viewProfie = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__profile_profile__["a" /* ProfilePage */]);
    };
    HomePage.prototype.goOnScanePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__scane_pages_scan_scan__["a" /* ScanPage */]);
    };
    HomePage.prototype.goOnOffersListPage = function () {
        if (this.karigar_detail.status == 'Pending') {
            // alert("You Are Not Verified!!");
            this.showAlert("You Are Not verified");
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__offer_list_offer_list__["a" /* OfferListPage */]);
        }
    };
    HomePage.prototype.goOnOffersPage = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__offers_offers__["a" /* OffersPage */], { 'id': id });
    };
    HomePage.prototype.goOnKarigarsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_33__karigars_karigars__["a" /* KarigarsPage */]);
    };
    HomePage.prototype.goOnPointeListPage = function (id) {
        // this.navCtrl.push(PointListPage,{'id':id});
        if (this.karigar_detail.status == 'Pending') {
            this.showAlert("You Are Not verified");
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__points_point_list_point_list__["a" /* PointListPage */], { 'id': id });
        }
    };
    HomePage.prototype.goOnWorkingSitePage = function () {
        // this.navCtrl.push(WorkingSitePage);
        if (this.karigar_detail.status == 'Pending') {
            this.showAlert("You Are Not verified");
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_22__working_site_working_site__["a" /* WorkingSitePage */]);
        }
    };
    HomePage.prototype.goOntermsPage = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__terms_terms__["a" /* TermsPage */], { 'id': id });
    };
    HomePage.prototype.goOnFeedbackPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_23__feedback_feedback__["a" /* FeedbackPage */]);
    };
    HomePage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    HomePage.prototype.goOnGiftListPage = function () {
        // this.navCtrl.push(GiftListPage,{'mode':'home'});
        if (this.karigar_detail.status == 'Pending') {
            this.showAlert("You Are Not verified");
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__gift_gallery_gift_list_gift_list__["a" /* GiftListPage */], { 'mode': 'home' });
        }
    };
    HomePage.prototype.goOnFurniturePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_20__furniture_ideas_furniture_ideas__["a" /* FurnitureIdeasPage */]);
    };
    HomePage.prototype.goOnProductsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_21__products_products__["a" /* ProductsPage */]);
    };
    HomePage.prototype.viewDetail = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": this.lang != 'en' ? this.offer_detail.hin_term_image : this.offer_detail.term_image }).present();
    };
    HomePage.prototype.gotoHistory = function () {
        // this.navCtrl.push(TransactionPage)
        if (this.karigar_detail.status == 'Pending') {
            this.showAlert("You Are Not verified");
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_28__transaction_transaction__["a" /* TransactionPage */]);
        }
    };
    HomePage.prototype.goOnGiftGallary = function () {
        // this.navCtrl.push(GiftListPage)
        if (this.karigar_detail.status == 'Pending') {
            this.showAlert("You Are Not verified");
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__gift_gallery_gift_list_gift_list__["a" /* GiftListPage */]);
        }
    };
    HomePage.prototype.goOnNewsPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_24__news_news__["a" /* NewsPage */]);
    };
    HomePage.prototype.goOnVideoPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_25__video_video__["a" /* VideoPage */]);
    };
    HomePage.prototype.goOnContactPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_26__contact_contact__["a" /* ContactPage */]);
    };
    HomePage.prototype.goOnfaqPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_27__faq_faq__["a" /* FaqPage */]);
    };
    HomePage.prototype.goOnAdvanceTextPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_29__advance_text_advance_text__["a" /* AdvanceTextPage */]);
    };
    HomePage.prototype.gotoNotification = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_31__notification_notification__["a" /* NotificationPage */]);
    };
    HomePage.prototype.gotoChangeLang = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_32__language_language__["a" /* LanguagePage */], { "come_from": "homepage" });
    };
    HomePage.prototype.goOnDigitallist = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_34__digitalcatalog_digitalcatalog__["a" /* DigitalcatalogPage */]);
    };
    HomePage.prototype.share = function () {
        var image = "";
        var app_url = "https://apps.apple.com/us/app/unicrete-bandhan/id6444175248";
        this.socialSharing.share("Hey there join me (" + this.karigar_detail.full_name + "-" + this.karigar_detail.mobile_no + ") on Unicrete Bandhan, a Manufacturer of Gypsum Plasters app. Enter my code *" + this.karigar_detail.referral_code + "* to earn points back in your wallet!", "Karigar Reffral", image, app_url)
            .then(function (resp) {
            console.log(resp);
        }).catch(function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.showAlert = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Alert!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.openModal = function () {
        var contactModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_15__aboutus_modal_aboutus_modal__["a" /* AboutusModalPage */]);
        contactModal.present();
        return;
    };
    HomePage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                console.log(_this.lang);
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                console.log(_this.lang);
                _this.translate.use(_this.lang);
            });
        });
    };
    HomePage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_16_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    HomePage.prototype.initPushNotification = function () {
        // this.push.init({
        //     android: {
        //         forceShow: "true",
        //         titleKey: "hello",
        //         sound: "true",
        //         vibrate:"true"
        //     }
        // });
        var _this = this;
        this.push.hasPermission().then(function (res) {
            if (res.isEnabled) {
                console.log('We have permission to send push notifications');
            }
            else {
                console.log('We don\'t have permission to send push notifications');
            }
        });
        var options = {
            android: {
                senderID: '158421422619',
                icon: './assets/imgs/logo_small',
                forceShow: true
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) {
            console.log('Received a notification', notification);
            console.log("error1", notification.additionalData.type);
            console.log("error1", notification.additionalData);
            _this.notifications = notification.additionalData.type;
            if (notification.additionalData.type == "message") {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_23__feedback_feedback__["a" /* FeedbackPage */]);
            }
            else if (notification.additionalData.type == 'offer') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__offer_list_offer_list__["a" /* OfferListPage */]);
            }
            else if (notification.additionalData.type == 'redeem') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_28__transaction_transaction__["a" /* TransactionPage */]);
            }
            else if (notification.additionalData.type == 'gift') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__gift_gallery_gift_list_gift_list__["a" /* GiftListPage */]);
            }
            else if (notification.additionalData.type == 'catalogue') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_21__products_products__["a" /* ProductsPage */]);
            }
            else if (notification.additionalData.type == 'product') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_21__products_products__["a" /* ProductsPage */]);
            }
            else if (notification.additionalData.type == 'video') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_25__video_video__["a" /* VideoPage */]);
            }
            else if (notification.additionalData.type == 'profile') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_13__profile_profile__["a" /* ProfilePage */]);
            }
        });
        pushObject.on('registration')
            .subscribe(function (registration) {
            console.log('Device registered', registration);
            console.log('Device Token', registration.registrationId);
            _this.storage.set('fcmId', registration);
            console.log(_this.tokenInfo);
            console.log(_this.storage);
            _this.storage.get('user_type').then(function (user_type) {
                _this.user_type = user_type;
                console.log(_this.user_type);
                console.log(user_type);
            });
            _this.storage.get('userId').then(function (userId) {
                _this.idlogin = userId;
                console.log(_this.idlogin);
                console.log(userId);
            });
            _this.registration = registration.registrationId;
            _this.registrationid(registration.registrationId);
        });
        pushObject.on('error')
            .subscribe(function (error) {
            return console.error('Error with Push plugin', error);
        });
    };
    HomePage.prototype.registrationid = function (registrationId) {
        var _this = this;
        console.log(" enter registration");
        console.log(registrationId);
        this.storage.get('user_type').then(function (user_type) {
            _this.user_type = user_type;
            console.log(_this.user_type);
            console.log(user_type);
            console.log("user_type");
        });
        this.storage.get('userId').then(function (userId) {
            _this.idlogin = userId;
            console.log(_this.idlogin, _this.idlogin);
            console.log("userId");
            console.log(userId);
        });
        setTimeout(function () {
            _this.service.post_rqst({ 'registration_id': registrationId, 'karigar_id': _this.idlogin }, 'app_karigar/add_registration_id')
                .subscribe(function (r) {
                console.log("success");
                console.log(r);
            });
        }, 5000);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/home/home.html"*/'\n<ion-header  no-border class="af-none">\n    <ion-toolbar class="ios-coustom-height">\n        <ion-title class="coustom-header-ios">\n            <div class="company-logo">\n                <img src="assets/imgs/logo.png">\n            </div>\n        </ion-title>\n        \n        <!-- <ion-buttons end>\n            <button ion-button icon-only  (click)="gotoNotification()">\n                <ion-icon name="notifications" color="secondary"></ion-icon>\n                <span *ngIf="notify_cn > 0" class="custom-point notification-count">{{notify_cn}}</span>\n            </button>\n        </ion-buttons> -->\n        \n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content  pullingIcon="arrow-dropdown" pullingText="{{\'Pull to refresh\' | translate}}" refreshingSpinner="circles" refreshingText="{{\'Refreshing...\'| translate}}">\n        </ion-refresher-content>\n    </ion-refresher>\n\n\n    \n    <!-- *ngIf="appbanner.length == 0 "  -->\n    <ion-slides >\n        <ion-slide *ngFor="let row of appbanner">\n            <img src="{{uploadUrl+row.banner}}">\n        </ion-slide>\n    </ion-slides>\n    \n    \n    \n    \n\n    \n    <div class="home-grid" [ngClass]="{\'list-view\': active}">        \n        <div class="pr-grid">\n            <div class="le-ft" (click)="viewProfiePic()">\n                <!-- <i class="material-icons">person</i> -->\n                <img src="{{karigar_detail.profile}}">\n            </div>\n            <div class="ri-ght">\n                <div class="align-ri">\n                    <h1>{{karigar_detail.first_name | titlecase}} {{karigar_detail.last_name | titlecase}}</h1>\n                    <p>{{karigar_detail.city | titlecase}}\n                        <span *ngIf="karigar_detail.status ==\'Pending\'" class="pending">\n                            <i class="material-icons" >hourglass_full</i>{{\'Pending\' | translate}}\n                        </span>\n                        <span *ngIf="karigar_detail.status ==\'Verified\'" class="verified">\n                            <i class="material-icons" >check_circle</i>{{\'Verified\' | translate}}\n                        </span>\n                        <span *ngIf="karigar_detail.status ==\'Suspect\'" class="suspect">\n                            <i class="material-icons" >info</i>{{\'Suspected\' | translate}}\n                        </span>\n                        <span *ngIf="karigar_detail.status ==\'Reject\'" class="reject">\n                            <i class="material-icons" >cancel</i>{{\'Rejected\' | translate}}\n                        </span>\n                    </p>\n                </div>\n            </div>\n\n            <div class="share-app-btn">\n                <button class="grid-indication" [ngClass]="{\'active\': active}" (click)="active =! active;"><i class="material-icons">drag_indicator</i></button>\n            </div>\n        </div>\n        \n        <div class="count-info">\n            <div class="left-count">\n                <p>{{\'LAST 7 DAYS\' | translate}}</p>\n                <h1>{{last_point}}</h1>\n                <p>{{\'POINTS\' | translate}}</p>\n            </div>\n            <div class="left-count" (click)="update_lang()">\n                <p>{{\'TOTAL\' | translate}}</p>\n                <h1>{{total_balance_point}}</h1>\n                <p>{{\'POINTS\' | translate}}</p>\n            </div>\n        </div>\n        \n        <ul>  \n            <li (click)="viewProfie()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/profile.png">\n                </div>\n                <p>{{\'My Profile\' | translate}}</p>\n            </li>          \n            <li (click)="gotoChangeLang()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/language_icon.svg">\n                </div>\n                <p>{{\'Change Language\' | translate}}</p>\n            </li>\n            <li (click)="goOnOffersListPage()" *ngIf="karigar_detail.user_type!=\'3\'">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/offer.svg">\n                </div>\n                <p>{{\'Offers\' | translate}}</p>\n            </li>\n            <li (click)="gotoNotification()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/notify.svg">\n                    <span *ngIf="notify_cn" class="custom-point notification-count">{{notify_cn}}</span>\n                </div>\n                <p>{{\'Notification\' | translate}}</p>\n            </li>\n            <li  (click)="scan()" *ngIf="karigar_detail.user_type!=\'3\' && karigar_detail.status ==\'Verified\'">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/scane.svg" >\n                </div>\n                <p>{{\'Scan\' | translate}}</p>\n            </li>\n            \n            <li (click)="EnterCouponCode()" *ngIf="karigar_detail.user_type!=3 && karigar_detail.status ==\'Verified\'">\n                <div class="img-view">\n                    <img src="assets/imgs/scan.svg">\n                </div>\n                <p>{{\'Enter Coupon Code\' | translate}}</p>\n            </li>\n            \n            <li (click)="goOnPointeListPage()"  *ngIf="karigar_detail.user_type!=\'3\'">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/payment.svg">\n                </div>\n                <p>{{\'Scan History\' | translate}}</p>\n            </li>\n            <!-- <li (click)="viewDetail()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/gift-point.svg">\n                </div>\n                <p>{{\'Advance Point Detail\' | translate}}</p>\n            </li> -->\n            <li (click)="goOnGiftGallary()" *ngIf="karigar_detail.user_type!=\'3\'">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/gift.svg">\n                </div>\n                <p>{{\'Gift Gallery\' | translate}}</p>\n            </li>\n            <li (click)="goOnGiftListPage()" *ngIf="karigar_detail.user_type!=\'3\'">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/wallet.svg">\n                </div>\n                <p>{{\'Redeem My Points\' | translate}}</p>\n            </li>\n            <li (click)="gotoHistory()" *ngIf="karigar_detail.user_type!=\'3\'">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/history.svg">\n                </div>\n                <p>{{\'Gift Tracker\' | translate}}</p>\n            </li>\n            <!-- <li (click)="goOnProductsPage()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/product.svg">\n                </div>\n                <p>{{\'Digital catalogues\' | translate}}</p>\n            </li> -->\n            <li (click)="goOnDigitallist()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/product.svg">\n                </div>\n                <p>{{\'Digital catalogues\' | translate}}</p>\n            </li>\n            <!-- <li (click)="share()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/gift-new.svg">\n                    <span class="custom-point">₹ {{sharepoint}}</span>\n                </div>\n                <p>{{\'Share App\' | translate}}</p>\n            </li> -->\n            <li (click)="share()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/gift-new.svg">\n                    <span class="custom-point">{{sharepoint}}</span>\n                </div>\n                <p>{{\'Share App\' | translate}}</p>\n            </li>\n            <!-- <li (click)="goOnFurniturePage()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/furniture.svg">\n                </div>\n                <p>{{\'Design Ideas\' | translate}}</p>\n            </li> -->\n            <!-- <li (click)="goOnWorkingSitePage()" *ngIf="karigar_detail.user_type!=\'3\'">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/pics.svg">\n                </div>\n                <p>{{\'Site Pics\' | translate}}</p>\n            </li> -->\n            <!-- <li (click)="goOnKarigarsPage()" *ngIf="karigar_detail.user_type==\'3\'">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/mechanic.svg">\n                </div>\n                <p>{{\'Karigars\' | translate}}</p>\n            </li> -->\n            <li (click)="goOnFeedbackPage()" *ngIf="karigar_detail.user_type!=\'3\'">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/feedback.svg">\n                </div>\n                <p>{{\'Chat with us\' | translate}}</p>\n            </li>\n            <li (click)="goOnVideoPage()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/video-call.svg">\n                </div>\n                <p>{{\'Videos\' | translate}}</p>\n            </li>\n            <!-- <li (click)="goOnNewsPage()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/news.svg">\n                </div>\n                <p>{{\'Latest News\' | translate}}</p>\n            </li> -->\n            <li (click)="goOnfaqPage()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/faq.svg">\n                </div>\n                <p>{{\'FAQ\' | translate}}</p>\n            </li>\n            <li (click)="goOnContactPage()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/contact.svg">\n                </div>\n                <p>{{\'Contact Us\' | translate}}</p>\n            </li>\n            \n            <li (click)="goOnAdvanceTextPage()">\n                <div class="img-view">\n                    <img src="assets/imgs/home-icon/company.svg">\n                </div>\n                <p>{{\'About Us\' | translate}}</p>\n            </li> \n            \n        </ul>\n        <!-- <div class="radio-fixed">\n            <div class="heading line mt1">\n                <p>{{\'Change Language\' | translate}}</p>\n            </div>\n            <div class="radio-section">\n                <ion-list class="choose" radio-group name="language" [(ngModel)]="karigar_detail.language" > \n                    <ion-item *ngFor="let row of language">\n                        <ion-radio (click)="update_lang()" checked="{{row.prefix == karigar_detail.language}}" value="{{row.prefix}}"></ion-radio>\n                        <ion-label>{{karigar_detail.language != \'en\' ? row.hin_language_name : row.language_name}}</ion-label>\n                    </ion-item>\n                </ion-list>\n            </div> \n        </div> -->\n    </div>\n    \n</ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_push__["a" /* Push */], __WEBPACK_IMPORTED_MODULE_17__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_18__providers_constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_30__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GiftListPageModule", function() { return GiftListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gift_list__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var GiftListPageModule = /** @class */ (function () {
    function GiftListPageModule() {
    }
    GiftListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__gift_list__["a" /* GiftListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__gift_list__["a" /* GiftListPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], GiftListPageModule);
    return GiftListPageModule;
}());

//# sourceMappingURL=gift-list.module.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KarigarGalleryPageModule", function() { return KarigarGalleryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__karigar_gallery__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var KarigarGalleryPageModule = /** @class */ (function () {
    function KarigarGalleryPageModule() {
    }
    KarigarGalleryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__karigar_gallery__["a" /* KarigarGalleryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__karigar_gallery__["a" /* KarigarGalleryPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], KarigarGalleryPageModule);
    return KarigarGalleryPageModule;
}());

//# sourceMappingURL=karigar-gallery.module.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KarigarsDetailPageModule", function() { return KarigarsDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__karigars_detail__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var KarigarsDetailPageModule = /** @class */ (function () {
    function KarigarsDetailPageModule() {
    }
    KarigarsDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__karigars_detail__["a" /* KarigarsDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__karigars_detail__["a" /* KarigarsDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], KarigarsDetailPageModule);
    return KarigarsDetailPageModule;
}());

//# sourceMappingURL=karigars-detail.module.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginScreenPageModule", function() { return LoginScreenPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_screen__ = __webpack_require__(768);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginScreenPageModule = /** @class */ (function () {
    function LoginScreenPageModule() {
    }
    LoginScreenPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login_screen__["a" /* LoginScreenPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login_screen__["a" /* LoginScreenPage */]),
            ],
        })
    ], LoginScreenPageModule);
    return LoginScreenPageModule;
}());

//# sourceMappingURL=login-screen.module.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileLoginPageModule", function() { return MobileLoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mobile_login__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var MobileLoginPageModule = /** @class */ (function () {
    function MobileLoginPageModule() {
    }
    MobileLoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__mobile_login__["a" /* MobileLoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mobile_login__["a" /* MobileLoginPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], MobileLoginPageModule);
    return MobileLoginPageModule;
}());

//# sourceMappingURL=mobile-login.module.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationPageModule", function() { return RegistrationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registration__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var RegistrationPageModule = /** @class */ (function () {
    function RegistrationPageModule() {
    }
    RegistrationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__registration__["a" /* RegistrationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__registration__["a" /* RegistrationPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], RegistrationPageModule);
    return RegistrationPageModule;
}());

//# sourceMappingURL=registration.module.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OtpPageModule", function() { return OtpPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__otp__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var OtpPageModule = /** @class */ (function () {
    function OtpPageModule() {
    }
    OtpPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__otp__["a" /* OtpPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__otp__["a" /* OtpPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], OtpPageModule);
    return OtpPageModule;
}());

//# sourceMappingURL=otp.module.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainHomePageModule", function() { return MainHomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_home__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var MainHomePageModule = /** @class */ (function () {
    function MainHomePageModule() {
    }
    MainHomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__main_home__["a" /* MainHomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__main_home__["a" /* MainHomePage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], MainHomePageModule);
    return MainHomePageModule;
}());

//# sourceMappingURL=main-home.module.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsDetailPageModule", function() { return NewsDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news_detail__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var NewsDetailPageModule = /** @class */ (function () {
    function NewsDetailPageModule() {
    }
    NewsDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__news_detail__["a" /* NewsDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__news_detail__["a" /* NewsDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], NewsDetailPageModule);
    return NewsDetailPageModule;
}());

//# sourceMappingURL=news-detail.module.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsPageModule", function() { return NewsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var NewsPageModule = /** @class */ (function () {
    function NewsPageModule() {
    }
    NewsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__news__["a" /* NewsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__news__["a" /* NewsPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], NewsPageModule);
    return NewsPageModule;
}());

//# sourceMappingURL=news.module.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPageModule", function() { return NotificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var NotificationPageModule = /** @class */ (function () {
    function NotificationPageModule() {
    }
    NotificationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__notification__["a" /* NotificationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notification__["a" /* NotificationPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], NotificationPageModule);
    return NotificationPageModule;
}());

//# sourceMappingURL=notification.module.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfferListPageModule", function() { return OfferListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offer_list__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var OfferListPageModule = /** @class */ (function () {
    function OfferListPageModule() {
    }
    OfferListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__offer_list__["a" /* OfferListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__offer_list__["a" /* OfferListPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], OfferListPageModule);
    return OfferListPageModule;
}());

//# sourceMappingURL=offer-list.module.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OffersPageModule", function() { return OffersPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offers__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var OffersPageModule = /** @class */ (function () {
    function OffersPageModule() {
    }
    OffersPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__offers__["a" /* OffersPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__offers__["a" /* OffersPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], OffersPageModule);
    return OffersPageModule;
}());

//# sourceMappingURL=offers.module.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointDetailPageModule", function() { return PointDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__point_detail__ = __webpack_require__(352);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PointDetailPageModule = /** @class */ (function () {
    function PointDetailPageModule() {
    }
    PointDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__point_detail__["a" /* PointDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__point_detail__["a" /* PointDetailPage */]),
            ],
        })
    ], PointDetailPageModule);
    return PointDetailPageModule;
}());

//# sourceMappingURL=point-detail.module.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointListPageModule", function() { return PointListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__point_list__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var PointListPageModule = /** @class */ (function () {
    function PointListPageModule() {
    }
    PointListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__point_list__["a" /* PointListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__point_list__["a" /* PointListPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], PointListPageModule);
    return PointListPageModule;
}());

//# sourceMappingURL=point-list.module.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDetailPageModule", function() { return ProductDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_detail__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var ProductDetailPageModule = /** @class */ (function () {
    function ProductDetailPageModule() {
    }
    ProductDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__product_detail__["a" /* ProductDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__product_detail__["a" /* ProductDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], ProductDetailPageModule);
    return ProductDetailPageModule;
}());

//# sourceMappingURL=product-detail.module.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductSubdetailPageModule", function() { return ProductSubdetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_subdetail__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var ProductSubdetailPageModule = /** @class */ (function () {
    function ProductSubdetailPageModule() {
    }
    ProductSubdetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__product_subdetail__["a" /* ProductSubdetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__product_subdetail__["a" /* ProductSubdetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], ProductSubdetailPageModule);
    return ProductSubdetailPageModule;
}());

//# sourceMappingURL=product-subdetail.module.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsPageModule", function() { return ProductsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__products__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var ProductsPageModule = /** @class */ (function () {
    function ProductsPageModule() {
    }
    ProductsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__products__["a" /* ProductsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__products__["a" /* ProductsPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], ProductsPageModule);
    return ProductsPageModule;
}());

//# sourceMappingURL=products.module.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceiveRemarkModalPageModule", function() { return ReceiveRemarkModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__receive_remark_modal__ = __webpack_require__(350);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ReceiveRemarkModalPageModule = /** @class */ (function () {
    function ReceiveRemarkModalPageModule() {
    }
    ReceiveRemarkModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__receive_remark_modal__["a" /* ReceiveRemarkModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__receive_remark_modal__["a" /* ReceiveRemarkModalPage */]),
            ],
        })
    ], ReceiveRemarkModalPageModule);
    return ReceiveRemarkModalPageModule;
}());

//# sourceMappingURL=receive-remark-modal.module.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoupanCodePageModule", function() { return CoupanCodePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__language_language_module__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__coupan_code__ = __webpack_require__(147);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var CoupanCodePageModule = /** @class */ (function () {
    function CoupanCodePageModule() {
    }
    CoupanCodePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__coupan_code__["a" /* CoupanCodePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__coupan_code__["a" /* CoupanCodePage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: __WEBPACK_IMPORTED_MODULE_4__language_language_module__["createTranslateLoader"],
                        deps: [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], CoupanCodePageModule);
    return CoupanCodePageModule;
}());

//# sourceMappingURL=coupan-code.module.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShippingDetailPageModule", function() { return ShippingDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__language_language_module__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shipping_detail__ = __webpack_require__(260);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ShippingDetailPageModule = /** @class */ (function () {
    function ShippingDetailPageModule() {
    }
    ShippingDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__shipping_detail__["a" /* ShippingDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__shipping_detail__["a" /* ShippingDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: __WEBPACK_IMPORTED_MODULE_4__language_language_module__["createTranslateLoader"],
                        deps: [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], ShippingDetailPageModule);
    return ShippingDetailPageModule;
}());

//# sourceMappingURL=shipping-detail.module.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScanPageModule", function() { return ScanPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scan__ = __webpack_require__(250);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ScanPageModule = /** @class */ (function () {
    function ScanPageModule() {
    }
    ScanPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__scan__["a" /* ScanPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__scan__["a" /* ScanPage */]),
            ],
        })
    ], ScanPageModule);
    return ScanPageModule;
}());

//# sourceMappingURL=scan.module.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SitePopoverPageModule", function() { return SitePopoverPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__site_popover__ = __webpack_require__(362);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SitePopoverPageModule = /** @class */ (function () {
    function SitePopoverPageModule() {
    }
    SitePopoverPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__site_popover__["a" /* SitePopoverPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__site_popover__["a" /* SitePopoverPage */]),
            ],
        })
    ], SitePopoverPageModule);
    return SitePopoverPageModule;
}());

//# sourceMappingURL=site-popover.module.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsPageModule", function() { return TermsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__terms__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var TermsPageModule = /** @class */ (function () {
    function TermsPageModule() {
    }
    TermsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__terms__["a" /* TermsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__terms__["a" /* TermsPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], TermsPageModule);
    return TermsPageModule;
}());

//# sourceMappingURL=terms.module.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionPageModule", function() { return TransactionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transaction__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var TransactionPageModule = /** @class */ (function () {
    function TransactionPageModule() {
    }
    TransactionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__transaction__["a" /* TransactionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transaction__["a" /* TransactionPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], TransactionPageModule);
    return TransactionPageModule;
}());

//# sourceMappingURL=transaction.module.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoPageModule", function() { return VideoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__video__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var VideoPageModule = /** @class */ (function () {
    function VideoPageModule() {
    }
    VideoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__video__["a" /* VideoPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__video__["a" /* VideoPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], VideoPageModule);
    return VideoPageModule;
}());

//# sourceMappingURL=video.module.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewProfilePageModule", function() { return ViewProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_profile__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_pinch_zoom__ = __webpack_require__(408);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ViewProfilePageModule = /** @class */ (function () {
    function ViewProfilePageModule() {
    }
    ViewProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__view_profile__["a" /* ViewProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ngx_pinch_zoom__["a" /* PinchZoomModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__view_profile__["a" /* ViewProfilePage */]),
            ],
        })
    ], ViewProfilePageModule);
    return ViewProfilePageModule;
}());

//# sourceMappingURL=view-profile.module.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkingSitePageModule", function() { return WorkingSitePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__working_site__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var WorkingSitePageModule = /** @class */ (function () {
    function WorkingSitePageModule() {
    }
    WorkingSitePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__working_site__["a" /* WorkingSitePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__working_site__["a" /* WorkingSitePage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], WorkingSitePageModule);
    return WorkingSitePageModule;
}());

//# sourceMappingURL=working-site.module.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KarigarsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__karigars_detail_karigars_detail__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jwt_decode__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the KarigarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var KarigarsPage = /** @class */ (function () {
    function KarigarsPage(navCtrl, navParams, service, loadingCtrl, translate, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.storage = storage;
        this.lang = '';
        this.tokenInfo = {};
    }
    KarigarsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad KarigarsPage');
        this.kar_id = this.navParams.get('id');
        console.log(this.kar_id);
        this.presentLoading();
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        this.service.post_rqst({ 'filter': this.filter, 'karigar_id': this.service.karigar_id }, 'app_karigar/karigarHome').subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.kar_detail = r['karigar'];
            console.log(_this.kar_detail);
            console.log(_this.kar_detail.state);
            _this.kar_state = _this.kar_detail.state;
            _this.getKarigarList();
        });
    };
    KarigarsPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_6_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    KarigarsPage.prototype.getKarigarList = function () {
        var _this = this;
        console.log('hello');
        this.service.post_rqst({ "state": this.kar_state }, 'app_karigar/karigarSiteGallary').
            subscribe(function (r) {
            console.log(r);
            _this.kar_list = r['stateWiseKarigars'];
            console.log(_this.kar_list);
        });
    };
    KarigarsPage.prototype.goToKarigarGallery = function (id) {
        console.log("karigar is : " + id);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__karigars_detail_karigars_detail__["a" /* KarigarsDetailPage */], { 'id': id });
    };
    KarigarsPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    KarigarsPage.prototype.searchKarigar = function (e) {
        var _this = this;
        console.log(e);
        this.service.post_rqst({ "search": e, "state": this.kar_state }, 'app_karigar/karigarSiteGallary').
            subscribe(function (r) {
            console.log(r);
            _this.kar_list = r['stateWiseKarigars'];
            console.log(_this.kar_list);
        });
    };
    KarigarsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-karigars',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/karigars/karigars.html"*/'<!--\n	Generated template for the KarigarsPage page.\n	\n	See http://ionicframework.com/docs/components/#navigation for more info on\n	Ionic pages and navigation.\n-->\n<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'Karigars\'|translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div class="fix" style="margin-top:35px">\n		<div class="search">\n			<ion-searchbar type=\'text\'placeholder="{{\'Search\'}}" (keyup)="searchKarigar($event.target.value)"></ion-searchbar>\n		</div>\n	</div>\n	<div class="pr-list" *ngFor="let list of kar_list;let i=index">\n		<button ion-item (click)="list.image_name?goToKarigarGallery(list.id):\'\' " >\n			<div class="main-bx">\n				<div class="bx-right">\n					<h2>{{list.full_name|titlecase}}</h2>\n					<p>{{list.district|titlecase}} - {{list.state|titlecase}}</p>\n				</div>\n			</div>  \n			<div class="link-text" *ngIf="list.image_name">\n				<a>{{\'View Site Gallery\' | translate}}</a>\n			</div>\n			<!-- <i class="material-icons">trending_flat</i> -->\n		</button>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/karigars/karigars.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], KarigarsPage);
    return KarigarsPage;
}());

//# sourceMappingURL=karigars.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemarkPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the RemarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RemarkPage = /** @class */ (function () {
    function RemarkPage(navCtrl, navParams, service, modalCtrl, viewCtrl, translate, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.translate = translate;
        this.storage = storage;
        this.lang = '';
        this.data = { 'foo': 'bar' };
    }
    RemarkPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RemarkPage');
        this.id = this.service.karigar_id;
        console.log(this.id);
        this.kar_id = this.navParams.get('kar_id');
        console.log(this.kar_id);
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
    };
    RemarkPage.prototype.enterRemark = function (e) {
        console.log("you type: " + e);
        this.remark = e;
    };
    RemarkPage.prototype.saveRemark = function () {
        var _this = this;
        console.log("save remark clicked");
        this.service.post_rqst({ "id": this.kar_id, "customer_id": this.id, 'remark': this.remark }, "app_karigar/karigarEmail")
            .subscribe(function (r) {
            console.log(r);
            // localStorage.setItem('sendEmail','true');
            _this.viewCtrl.dismiss(_this.data);
        });
    };
    RemarkPage.prototype.gotoPreviousPage = function () {
        // this.navCtrl.push(KarigarsDetailPage,{"id":this.kar_id});
        this.viewCtrl.dismiss(this.data);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* Nav */])
    ], RemarkPage.prototype, "nav", void 0);
    RemarkPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-remark',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/remark/remark.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <ion-title>RemarkPage</ion-title>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content padding style="background-color: rgb(126, 117, 117);">\n  <div class="main-modal">\n    <div class="modal-box">\n      <h2 class="mb10">{{\'Remark\'|translate}}</h2>\n      \n      <div class="cs-form">\n        <ion-list>\n          <ion-item class="cs-input h100">\n            <!-- <ion-label floating>Enter Remark</ion-label> -->\n            <ion-textarea style="padding: 10px;" type="text" placeholder="Enter Remark" (keyup)="enterRemark($event.target.value)"></ion-textarea>\n          </ion-item>\n        </ion-list>\n      </div>\n      \n      <div class="modal-cls" (click)="gotoPreviousPage()">\n        <i class="material-icons">cancel</i>\n      </div>\n      \n      <div class="model-btn mt15">\n        <button (click)="saveRemark()">{{\'Send\'|translate}}</button>\n      </div>\n    </div>\n  </div>	\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/remark/remark.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], RemarkPage);
    return RemarkPage;
}());

//# sourceMappingURL=remark.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(459);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(786);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_pinch_zoom__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_scane_pages_coupan_code_coupan_code_module__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_scane_pages_scan_scan_module__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_gift_gallery_gift_detail_gift_detail_module__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_gift_gallery_gift_list_gift_list_module__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_offers_offers_module__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_cancelpolicy_modal_cancelpolicy_modal_module__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_points_point_list_point_list_module__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_points_point_detail_point_detail_module__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile_module__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_main_home_main_home_module__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_products_products_module__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_terms_terms_module__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_advance_text_advance_text_module__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_product_detail_product_detail_module__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_product_subdetail_product_subdetail_module__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_transaction_transaction_module__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_shipping_detail_shipping_detail_module__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_notification_notification_module__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_contact_contact_module__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_video_video_module__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_news_news_module__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_news_detail_news_detail_module__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_feedback_feedback_module__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_chating_chating_module__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_aboutus_modal_aboutus_modal_module__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__angular_common_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_constant_constant__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__angular_http__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_camera__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_offer_list_offer_list_module__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pipes_safe_safe__ = __webpack_require__(787);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_barcode_scanner__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_view_profile_view_profile_module__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ionic_native_push__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_in_app_browser_ngx__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_description_model_description_model_module__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_receive_remark_modal_receive_remark_modal_module__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_app_version__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_native_social_sharing__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__ionic_native_device_orientation__ = __webpack_require__(788);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_working_site_working_site_module__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_furniture_ideas_furniture_ideas_module__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_faq_faq_module__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_faq_answer_faq_answer_module__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__pages_furniture_ideasdetail_furniture_ideasdetail_module__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_furniture_ideasshare_furniture_ideasshare_module__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__ionic_native_file_transfer__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__ionic_native_file__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pages_karigar_gallery_karigar_gallery_module__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__pages_language_language_module__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__pages_login_section_otp_otp_module__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__pages_login_section_registration_registration_module__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__pages_karigars_detail_karigars_detail_module__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__pages_login_section_login_screen_login_screen_module__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__pages_login_section_mobile_login_mobile_login_module__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__pages_site_popover_site_popover_module__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__pages_digitalcatalog_digitalcatalog_module__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__pages_cancelation_policy_cancelation_policy_module__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__ionic_native_market__ = __webpack_require__(451);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









































































function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_51__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                // MobileLoginPage,
                // OtpPage,
                // RegistrationPage,
                // KarigarsPage,
                // KarigarsDetailPage,
                // KarigarGalleryPage,
                // RemarkPage,
                // LoginScreenPage,
                __WEBPACK_IMPORTED_MODULE_42__pipes_safe_safe__["a" /* SafePipe */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_63__pages_language_language_module__["LanguagePageModule"],
                __WEBPACK_IMPORTED_MODULE_64__pages_login_section_otp_otp_module__["OtpPageModule"],
                __WEBPACK_IMPORTED_MODULE_65__pages_login_section_registration_registration_module__["RegistrationPageModule"],
                __WEBPACK_IMPORTED_MODULE_66__pages_karigars_detail_karigars_detail_module__["KarigarsDetailPageModule"],
                __WEBPACK_IMPORTED_MODULE_62__pages_karigar_gallery_karigar_gallery_module__["KarigarGalleryPageModule"],
                __WEBPACK_IMPORTED_MODULE_63__pages_language_language_module__["LanguagePageModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/aboutus-modal/aboutus-modal.module#AboutusModalPageModule', name: 'AboutusModalPage', segment: 'aboutus-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/advance-text/advance-text.module#AdvanceTextPageModule', name: 'AdvanceTextPage', segment: 'advance-text', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cancelation-policy/cancelation-policy.module#CancelationPolicyPageModule', name: 'CancelationPolicyPage', segment: 'cancelation-policy', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cancelpolicy-modal/cancelpolicy-modal.module#CancelpolicyModalPageModule', name: 'CancelpolicyModalPage', segment: 'cancelpolicy-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chating/chating.module#ChatingPageModule', name: 'ChatingPage', segment: 'chating', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contact/contact.module#ContactPageModule', name: 'ContactPage', segment: 'contact', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/description-model/description-model.module#DescriptionModelPageModule', name: 'DescriptionModelPage', segment: 'description-model', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/digitalcatalog/digitalcatalog.module#DigitalcatalogPageModule', name: 'DigitalcatalogPage', segment: 'digitalcatalog', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/faq-answer/faq-answer.module#FaqAnswerPageModule', name: 'FaqAnswerPage', segment: 'faq-answer', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/faq/faq.module#FaqPageModule', name: 'FaqPage', segment: 'faq', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/feedback/feedback.module#FeedbackPageModule', name: 'FeedbackPage', segment: 'feedback', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/furniture-ideas/furniture-ideas.module#FurnitureIdeasPageModule', name: 'FurnitureIdeasPage', segment: 'furniture-ideas', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/furniture-ideasdetail/furniture-ideasdetail.module#FurnitureIdeasdetailPageModule', name: 'FurnitureIdeasdetailPage', segment: 'furniture-ideasdetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/furniture-ideasshare/furniture-ideasshare.module#FurnitureIdeassharePageModule', name: 'FurnitureIdeassharePage', segment: 'furniture-ideasshare', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/gift-gallery/gift-detail/gift-detail.module#GiftDetailPageModule', name: 'GiftDetailPage', segment: 'gift-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/gift-gallery/gift-list/gift-list.module#GiftListPageModule', name: 'GiftListPage', segment: 'gift-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/karigar-gallery/karigar-gallery.module#KarigarGalleryPageModule', name: 'KarigarGalleryPage', segment: 'karigar-gallery', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/karigars-detail/karigars-detail.module#KarigarsDetailPageModule', name: 'KarigarsDetailPage', segment: 'karigars-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/karigars/karigars.module#KarigarsPageModule', name: 'KarigarsPage', segment: 'karigars', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/language/language.module#LanguagePageModule', name: 'LanguagePage', segment: 'language', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login-section/login-screen/login-screen.module#LoginScreenPageModule', name: 'LoginScreenPage', segment: 'login-screen', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login-section/mobile-login/mobile-login.module#MobileLoginPageModule', name: 'MobileLoginPage', segment: 'mobile-login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login-section/registration/registration.module#RegistrationPageModule', name: 'RegistrationPage', segment: 'registration', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login-section/otp/otp.module#OtpPageModule', name: 'OtpPage', segment: 'otp', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/main-home/main-home.module#MainHomePageModule', name: 'MainHomePage', segment: 'main-home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/news-detail/news-detail.module#NewsDetailPageModule', name: 'NewsDetailPage', segment: 'news-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/news/news.module#NewsPageModule', name: 'NewsPage', segment: 'news', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notification/notification.module#NotificationPageModule', name: 'NotificationPage', segment: 'notification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/offer-list/offer-list.module#OfferListPageModule', name: 'OfferListPage', segment: 'offer-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/offers/offers.module#OffersPageModule', name: 'OffersPage', segment: 'offers', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/points/point-detail/point-detail.module#PointDetailPageModule', name: 'PointDetailPage', segment: 'point-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/points/point-list/point-list.module#PointListPageModule', name: 'PointListPage', segment: 'point-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/product-detail/product-detail.module#ProductDetailPageModule', name: 'ProductDetailPage', segment: 'product-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/product-subdetail/product-subdetail.module#ProductSubdetailPageModule', name: 'ProductSubdetailPage', segment: 'product-subdetail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/products/products.module#ProductsPageModule', name: 'ProductsPage', segment: 'products', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/receive-remark-modal/receive-remark-modal.module#ReceiveRemarkModalPageModule', name: 'ReceiveRemarkModalPage', segment: 'receive-remark-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/remark/remark.module#RemarkPageModule', name: 'RemarkPage', segment: 'remark', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/scane-pages/coupan-code/coupan-code.module#CoupanCodePageModule', name: 'CoupanCodePage', segment: 'coupan-code', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/shipping-detail/shipping-detail.module#ShippingDetailPageModule', name: 'ShippingDetailPage', segment: 'shipping-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/scane-pages/scan/scan.module#ScanPageModule', name: 'ScanPage', segment: 'scan', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/site-popover/site-popover.module#SitePopoverPageModule', name: 'SitePopoverPage', segment: 'site-popover', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/terms/terms.module#TermsPageModule', name: 'TermsPage', segment: 'terms', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/transaction/transaction.module#TransactionPageModule', name: 'TransactionPage', segment: 'transaction', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/video/video.module#VideoPageModule', name: 'VideoPage', segment: 'video', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/view-profile/view-profile.module#ViewProfilePageModule', name: 'ViewProfilePage', segment: 'view-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/working-site/working-site.module#WorkingSitePageModule', name: 'WorkingSitePage', segment: 'working-site', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_11__pages_scane_pages_scan_scan_module__["ScanPageModule"],
                __WEBPACK_IMPORTED_MODULE_69__pages_site_popover_site_popover_module__["SitePopoverPageModule"],
                __WEBPACK_IMPORTED_MODULE_10__pages_scane_pages_coupan_code_coupan_code_module__["CoupanCodePageModule"],
                __WEBPACK_IMPORTED_MODULE_12__pages_gift_gallery_gift_detail_gift_detail_module__["GiftDetailPageModule"],
                __WEBPACK_IMPORTED_MODULE_13__pages_gift_gallery_gift_list_gift_list_module__["GiftListPageModule"],
                __WEBPACK_IMPORTED_MODULE_68__pages_login_section_mobile_login_mobile_login_module__["MobileLoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_14__pages_offers_offers_module__["OffersPageModule"],
                __WEBPACK_IMPORTED_MODULE_15__pages_cancelpolicy_modal_cancelpolicy_modal_module__["CancelpolicyModalPageModule"],
                __WEBPACK_IMPORTED_MODULE_44__pages_view_profile_view_profile_module__["ViewProfilePageModule"],
                __WEBPACK_IMPORTED_MODULE_16__pages_points_point_list_point_list_module__["PointListPageModule"],
                __WEBPACK_IMPORTED_MODULE_17__pages_points_point_detail_point_detail_module__["PointDetailPageModule"],
                __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile_module__["ProfilePageModule"],
                __WEBPACK_IMPORTED_MODULE_19__pages_main_home_main_home_module__["MainHomePageModule"],
                __WEBPACK_IMPORTED_MODULE_20__pages_products_products_module__["ProductsPageModule"],
                __WEBPACK_IMPORTED_MODULE_21__pages_terms_terms_module__["TermsPageModule"],
                __WEBPACK_IMPORTED_MODULE_22__pages_advance_text_advance_text_module__["AdvanceTextPageModule"],
                __WEBPACK_IMPORTED_MODULE_23__pages_product_detail_product_detail_module__["ProductDetailPageModule"],
                __WEBPACK_IMPORTED_MODULE_24__pages_product_subdetail_product_subdetail_module__["ProductSubdetailPageModule"],
                __WEBPACK_IMPORTED_MODULE_25__pages_transaction_transaction_module__["TransactionPageModule"],
                __WEBPACK_IMPORTED_MODULE_26__pages_shipping_detail_shipping_detail_module__["ShippingDetailPageModule"],
                __WEBPACK_IMPORTED_MODULE_27__pages_notification_notification_module__["NotificationPageModule"],
                __WEBPACK_IMPORTED_MODULE_28__pages_contact_contact_module__["ContactPageModule"],
                __WEBPACK_IMPORTED_MODULE_70__pages_digitalcatalog_digitalcatalog_module__["DigitalcatalogPageModule"],
                // LanguagePageModule,
                __WEBPACK_IMPORTED_MODULE_29__pages_video_video_module__["VideoPageModule"],
                __WEBPACK_IMPORTED_MODULE_30__pages_news_news_module__["NewsPageModule"],
                __WEBPACK_IMPORTED_MODULE_8_ngx_pinch_zoom__["a" /* PinchZoomModule */],
                __WEBPACK_IMPORTED_MODULE_31__pages_news_detail_news_detail_module__["NewsDetailPageModule"],
                __WEBPACK_IMPORTED_MODULE_32__pages_feedback_feedback_module__["FeedbackPageModule"],
                __WEBPACK_IMPORTED_MODULE_33__pages_chating_chating_module__["ChatingPageModule"],
                __WEBPACK_IMPORTED_MODULE_36__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_38__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_34__pages_aboutus_modal_aboutus_modal_module__["AboutusModalPageModule"],
                __WEBPACK_IMPORTED_MODULE_41__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_40__pages_offer_list_offer_list_module__["OfferListPageModule"],
                __WEBPACK_IMPORTED_MODULE_47__pages_description_model_description_model_module__["DescriptionModelPageModule"],
                __WEBPACK_IMPORTED_MODULE_48__pages_receive_remark_modal_receive_remark_modal_module__["ReceiveRemarkModalPageModule"],
                __WEBPACK_IMPORTED_MODULE_54__pages_working_site_working_site_module__["WorkingSitePageModule"],
                __WEBPACK_IMPORTED_MODULE_55__pages_furniture_ideas_furniture_ideas_module__["FurnitureIdeasPageModule"],
                __WEBPACK_IMPORTED_MODULE_56__pages_faq_faq_module__["FaqPageModule"],
                __WEBPACK_IMPORTED_MODULE_57__pages_faq_answer_faq_answer_module__["FaqAnswerPageModule"],
                __WEBPACK_IMPORTED_MODULE_58__pages_furniture_ideasdetail_furniture_ideasdetail_module__["FurnitureIdeasdetailPageModule"],
                __WEBPACK_IMPORTED_MODULE_59__pages_furniture_ideasshare_furniture_ideasshare_module__["FurnitureIdeassharePageModule"],
                __WEBPACK_IMPORTED_MODULE_71__pages_cancelation_policy_cancelation_policy_module__["CancelationPolicyPageModule"],
                // KarigarGalleryPageModule,
                // KarigarsDetailPageModule,
                // RemarkPageModule,
                __WEBPACK_IMPORTED_MODULE_67__pages_login_section_login_screen_login_screen_module__["LoginScreenPageModule"],
                __WEBPACK_IMPORTED_MODULE_50__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_50__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_36__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_35__providers_dbservice_dbservice__["a" /* DbserviceProvider */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_37__providers_constant_constant__["a" /* ConstantProvider */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_43__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_60__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_45__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_46__ionic_native_in_app_browser_ngx__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_53__ionic_native_device_orientation__["a" /* DeviceOrientation */],
                __WEBPACK_IMPORTED_MODULE_49__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_52__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_60__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_61__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_72__ionic_native_market__["a" /* Market */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutusModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AboutusModalPage = /** @class */ (function () {
    function AboutusModalPage(navCtrl, navParams, viewCtrl, platform, db, storage, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.platform = platform;
        this.db = db;
        this.storage = storage;
        this.translate = translate;
        this.tokenInfo = {};
        this.lang = '';
    }
    AboutusModalPage.prototype.ionViewDidLoad = function () {
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        console.log(this.translate.get("if you any question"));
        this.translate.get("if you any question")
            .subscribe(function (resp) {
            console.log(resp);
        });
        this.get_user_lang();
    };
    AboutusModalPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    AboutusModalPage.prototype.exitapp = function () {
        console.log('exit');
        this.platform.exitApp();
    };
    AboutusModalPage.prototype.gotoHomePage = function () {
        // this.navCtrl.setRoot(TabsPage,{index:'0'});
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
    };
    AboutusModalPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    AboutusModalPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_4_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], AboutusModalPage.prototype, "nav", void 0);
    AboutusModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-aboutus-modal',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/aboutus-modal/aboutus-modal.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>aboutus-modal</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div class="main-modal">\n        <div class="modal-box">\n            <h1>{{\'Unicrete Bandhan\' | translate}}</h1>\n            <h2>{{\'Your request to access the Unicrete Bandhan is under review. You will be able to log in as soon as the overseeing dealer acknowledges your application.\' | translate}}</h2>\n            <p>{{\'Meanwhile, you can contact us\' | translate}} <a href="tel: 18005720908">1800-572-0908</a> \n                {{\'or mail us\' | translate}} <span> <a href="mailto:cc@unicrete.in">cc@unicrete.in</a></span> {{\'if you any question\' | translate}}.</p>\n            <div class="modal-cls" (click)="gotoHomePage()">\n                <i class="material-icons">cancel</i>\n            </div>\n        </div>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/aboutus-modal/aboutus-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
    ], AboutusModalPage);
    return AboutusModalPage;
}());

//# sourceMappingURL=aboutus-modal.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_constant_constant__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ViewProfilePage = /** @class */ (function () {
    function ViewProfilePage(navCtrl, navParams, viewCtrl, storage, db, translate, constant) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.db = db;
        this.translate = translate;
        this.constant = constant;
        this.lang = '';
        this.tokenInfo = {};
        this.profile_pic = '';
        this.type = '';
        this.uploadUrl = '';
    }
    ViewProfilePage.prototype.ionViewDidLoad = function () {
        this.uploadUrl = this.constant.upload_url;
        this.get_user_lang();
        this.profile_pic = this.navParams.get("Image");
        this.type = this.navParams.get("type");
    };
    ViewProfilePage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    ViewProfilePage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.setDefaultLang(_this.lang);
                _this.translate.use(_this.lang);
            });
        });
    };
    ViewProfilePage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_5_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    ViewProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-view-profile',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/view-profile/view-profile.html"*/'\n\n\n<ion-header>\n  <ion-navbar (click)="closeModal()">\n      <ion-title ><i class="material-icons" style="padding-top: 6px;">arrow_back</i></ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding style="background: #000;">\n  <div class="modal-center">\n    <div class="cs-model-body">\n      <!-- <div class="heading-section">\n        <p></p>\n        <a (click)="closeModal()" class="cs-close"><i class="material-icons">clear</i></a>	\n      </div> -->\n      <div class="img-radius flat-img">\n        <pinch-zoom *ngIf="type != \'base_64\'" class="pinch-big_zoom">\n          <img  [src]="uploadUrl+profile_pic">\n        </pinch-zoom>\n        <pinch-zoom *ngIf="type == \'base_64\'" class="zoom-img">\n          <img  [src]="profile_pic">\n        </pinch-zoom>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/view-profile/view-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_6__providers_constant_constant__["a" /* ConstantProvider */]])
    ], ViewProfilePage);
    return ViewProfilePage;
}());

//# sourceMappingURL=view-profile.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OffersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__terms_terms__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gift_gallery_gift_detail_gift_detail__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__view_profile_view_profile__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_constant_constant__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var OffersPage = /** @class */ (function () {
    function OffersPage(navCtrl, navParams, service, loadingCtrl, app, modalCtrl, storage, translate, db, constant) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.translate = translate;
        this.db = db;
        this.constant = constant;
        this.offer_id = '';
        this.offer_detail = {};
        this.gift_list = '';
        this.balance_point = '';
        this.offer_balance = '';
        this.tokenInfo = {};
        this.lang = '';
        this.filter = {};
        this.uploadUrl = '';
        this.flag = '';
        this.uploadUrl = this.constant.upload_url;
        this.karigar_info = JSON.parse(localStorage.getItem('karigar_info'));
    }
    OffersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OffersPage');
        this.presentLoading();
        this.offer_id = this.navParams.get('id');
        console.log(this.offer_id);
        this.getofferDetail(this.offer_id);
        this.get_user_lang();
    };
    OffersPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getofferDetail(this.offer_id);
        refresher.complete();
    };
    OffersPage.prototype.goOntermsPage = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__terms_terms__["a" /* TermsPage */], { 'id': id });
    };
    OffersPage.prototype.goOnGiftDetail = function (id) {
        console.log(id);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__gift_gallery_gift_detail_gift_detail__["a" /* GiftDetailPage */], { 'id': id });
    };
    OffersPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    OffersPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_8_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    OffersPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        this.filter.limit = this.gift_list.length;
        this.service.post_rqst({ 'filter': this.filter, 'offer_id': this.offer_id, 'karigar_id': this.service.karigar_id }, 'app_karigar/offerDetail')
            .subscribe(function (r) {
            console.log(r);
            if (r == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.gift_list = _this.gift_list.concat(r['gift']);
                    console.log('Asyn operation has stop');
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    OffersPage.prototype.getofferDetail = function (offer_id) {
        var _this = this;
        this.filter.limit = 0;
        console.log(offer_id);
        this.service.post_rqst({ 'filter': this.filter, 'offer_id': offer_id, 'karigar_id': this.service.karigar_id }, 'app_karigar/offerDetail')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.offer_detail = r['offer'];
            _this.gift_list = r['gift'];
            var referral_per = r['referral_percentage'];
            var referral_per_amt = ((_this.karigar_info.referal_point_balance * referral_per.one_time_percentage) / 100);
            console.log(_this.karigar_info.balance_point);
            _this.balance_point = parseInt(_this.karigar_info.balance_point) + (referral_per_amt);
            // for gift active class
            console.log(_this.balance_point);
            for (var i = 0; i < _this.gift_list.length; i++) {
                _this.gift_list[i].coupon_points = parseInt(_this.gift_list[i].coupon_points);
                if (_this.intVal(_this.gift_list[i].coupon_points) <= _this.intVal(_this.balance_point)) {
                    console.log(_this.gift_list[i].coupon_points);
                }
            }
            // end
        });
    };
    OffersPage.prototype.intVal = function (arsg) {
        return parseInt(arsg);
    };
    OffersPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    OffersPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                this.navCtrl.popToRoot();
            }
        }
    };
    OffersPage.prototype.viewDetail = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": this.lang != 'en' ? this.offer_detail.hin_term_image : this.offer_detail.term_image }).present();
    };
    OffersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-offers',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/offers/offers.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{offer_detail.title| titlecase}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    \n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content  pullingIcon="arrow-dropdown" pullingText="{{\'Pull to refresh\' | translate}}" refreshingSpinner="circles" refreshingText="{{\'Refreshing...\' | translate}}">\n        </ion-refresher-content>\n    </ion-refresher>\n    \n    <!-- <div class="fix"></div> -->\n    <div class="bg-banner">\n        <img src="{{offer_detail.offer_banner}}">\n    </div>\n    <div class="content-padding">\n        <div class="offer">\n            <div class="offer-detail">\n                <h1>{{lang != \'en\' ? offer_detail.hin_title :offer_detail.title| titlecase}} \n                </h1>\n                <p><span>{{\'Balance Points\' | translate}} : </span>{{balance_point || 0}}</p>\n                <p><span>{{\'Valid Upto\' | translate}} :</span> {{offer_detail.end_date | date:\'d MMMM y\'}}</p>\n            </div>\n            <!-- <div class="terms" *ngIf="offer_detail.term_image!=\'\' || offer_detail.hin_term_image!=\'\'"  (click)="viewDetail()">\n                <a>{{\'A D Detail\' | translate}}</a>\n            </div> -->\n            <div class="terms" (click)="goOntermsPage(offer_detail.id)">\n                <a>{{\'Terms & Condition\' | translate}}</a>\n            </div>\n            \n        </div>\n    </div>\n    \n    <div class="listing mt0">\n        <!-- <div class="profile-detail point-detail" *ngIf="offer_detail.term_image!=\'\' || offer_detail.hin_term_image!=\'\'"  (click)="viewDetail()">\n            <div class="deflex">\n                <ul>\n                    <li class="refcode">\n                        <h1>{{\'A D Detail\' | translate}}</h1>\n                        <i class="material-icons">arrow_right_alt</i>\n                    </li>\n                </ul>\n            </div>\n        </div> -->\n        <button ion-item [ngClass]="{\'verified\' :  intVal(list.coupon_points) <= intVal(balance_point) }"   *ngFor="let list of gift_list;let i=index" (click)="goOnGiftDetail(list.id)">\n            <div class="head-detail">\n                <div class="head">\n                    <h1>{{list.coupon_points}}</h1>\n                    <p>{{\'Points\' | translate}}</p>\n                </div>\n                <div class="detail">\n                    <h1>{{lang !=\'en\' ? list.hin_gift_title : list.gift_title | titlecase}}</h1>\n                    <p><span>{{\'Reward Points\' | translate}}:</span>{{list.reward_points  || 0  }}</p>\n                </div>\n            </div>  \n            <div class="product-img">\n                <img src="{{list.image}}"  >\n                <img [src]="uploadUrl + list.gift_image">\n            </div>\n        </button>\n        <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)"  *ngIf="flag!=1">\n            <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="{{\'Loading more data...\' | translate}}">\n            </ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n    </div>	 \n    \n    \n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/offers/offers.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_9__providers_constant_constant__["a" /* ConstantProvider */]])
    ], OffersPage);
    return OffersPage;
}());

//# sourceMappingURL=offers.js.map

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DbserviceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constant_constant__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DbserviceProvider = /** @class */ (function () {
    function DbserviceProvider(http, constant, http1, storage) {
        this.http = http;
        this.constant = constant;
        this.http1 = http1;
        this.storage = storage;
        this.token_value = "";
        this.karigar_id = '';
        this.karigar_status = '';
        this.karigar_info = '';
        this.headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        console.log('Hello DbserviceProvider Provider');
        this.token();
    }
    DbserviceProvider.prototype.set_token_value = function (value) {
        this.token_data = value;
    };
    DbserviceProvider.prototype.get_token_data = function () {
        return this.token_data;
    };
    DbserviceProvider.prototype.token = function () {
        var _this = this;
        console.log('token');
        this.storage.get('token').then(function (val) {
            _this.token_value = val;
            _this.tokenInfo = _this.getDecodedAccessToken(_this.token_value);
            if (_this.tokenInfo) {
                _this.karigar_id = _this.tokenInfo.sub;
                console.log(_this.karigar_id);
            }
        });
    };
    DbserviceProvider.prototype.get_rqst = function (fn) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        headers = headers.set('Token', 'Bearer ' + this.token_value);
        return this.http.get(this.constant.rootUrl + fn, { headers: headers });
    };
    DbserviceProvider.prototype.post_rqst = function (request_data, fn) {
        this.token_value = this.get_token_data();
        this.tokenInfo = this.getDecodedAccessToken(this.token_value); // decode token
        if (this.tokenInfo) {
            this.karigar_id = this.tokenInfo.sub;
            console.log(this.karigar_id);
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        headers = headers.set('Token', 'Bearer ' + this.token_value);
        return this.http.post(this.constant.rootUrl + fn, JSON.stringify(request_data), { headers: headers });
    };
    DbserviceProvider.prototype.fileData = function (request_data, fn) {
        this.headers.append('Content-Type', undefined);
        return this.http.post(this.constant.rootUrl + fn, request_data, { headers: this.headers });
    };
    DbserviceProvider.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_3_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    DbserviceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__constant_constant__["a" /* ConstantProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], DbserviceProvider);
    return DbserviceProvider;
}());

//# sourceMappingURL=dbservice.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_section_mobile_login_mobile_login__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LanguagePage = /** @class */ (function () {
    function LanguagePage(navCtrl, navParams, db, storage, translate, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.storage = storage;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.come_from = "";
        this.karigar_id = "";
        this.lang = 'en';
        this.inputs = [];
        this.tokenInfo = {};
        this.karigar_detail = {};
        this.chs_lng = "";
        this.no = "";
        this.yes = "";
        this.sure = "";
    }
    LanguagePage.prototype.ionViewDidLoad = function () {
        // commented
        // this.presentLoading();
        // this.change_language();
        var _this = this;
        this.storage.get('token')
            .then(function (resp) {
            console.log(__WEBPACK_IMPORTED_MODULE_5_jwt_decode__(resp));
            var tokendata = __WEBPACK_IMPORTED_MODULE_5_jwt_decode__(resp);
            console.log(tokendata);
            _this.karigar_id = tokendata.sub;
            _this.get_user_lang();
        });
        this.come_from = this.navParams.get("come_from");
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        console.log('ionViewDidLoad LanguagePage');
    };
    LanguagePage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    LanguagePage.prototype.change_language = function () {
        var _this = this;
        this.inputs = [];
        this.db.get_rqst("app_karigar/get_languages")
            .subscribe(function (resp) {
            console.log(resp);
            _this.inputs = resp;
            _this.loading.dismiss();
            console.log(_this.inputs);
        });
    };
    LanguagePage.prototype.continue = function () {
        console.log(this.lang);
        console.log(this.come_from);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_section_mobile_login_mobile_login__["a" /* MobileLoginPage */], { "lang": this.lang });
    };
    LanguagePage.prototype.set_lang = function () {
        this.translate.use(this.lang);
    };
    LanguagePage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_5_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    LanguagePage.prototype.update_lang = function () {
        var _this = this;
        this.translate.get("Change Language")
            .subscribe(function (resp) {
            _this.chs_lng = resp;
        });
        this.translate.get("No")
            .subscribe(function (resp) {
            _this.no = resp;
        });
        this.translate.get("Yes")
            .subscribe(function (resp) {
            _this.yes = resp;
        });
        this.translate.get("Are you sure")
            .subscribe(function (resp) {
            _this.chs_lng = resp;
        });
        var updateAlert = this.alertCtrl.create({
            title: this.chs_lng,
            message: this.sure,
            buttons: [
                {
                    text: this.no,
                },
                {
                    text: this.yes,
                    handler: function () {
                        _this.karigar_detail.language = _this.lang;
                        _this.karigar_detail.id = _this.karigar_id;
                        _this.db.post_rqst({ "data": _this.karigar_detail }, "app_karigar/update_language")
                            .subscribe(function (resp) {
                            console.log(resp);
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
                        });
                    }
                }
            ]
        });
        updateAlert.present();
    };
    LanguagePage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.karigar_id }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    LanguagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-language',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/language/language.html"*/'<ion-content padding>\n  <div class="logo" (click)="change_language()">\n    <img src="assets/imgs/logo.png">\n  </div>\n  <div class="heading line mt70 mb16">\n    <p class="font16">भाषा चुनिए / Choose Your Language</p>\n  </div>\n  <ion-list radio-group class="mt15" name="lang" [(ngModel)]="lang">\n    <!-- <ion-item *ngFor="let row of inputs">\n      <ion-label>{{row.hin_language_name}} ({{row.language_name}})</ion-label>\n      <ion-radio (click)="set_lang()" checked="{{row.prefix == lang}}" value="{{row.prefix}}"></ion-radio>\n    </ion-item> -->\n\n    <ion-item>\n      <ion-label>अंग्रेज़ी (English)</ion-label>\n      <ion-radio (click)="set_lang()" checked="{{\'en\' == lang}}" value="en"></ion-radio>\n    </ion-item>    \n    \n    \n    <ion-item>\n      <ion-label> हिंदी (Hindi)</ion-label>\n      <ion-radio (click)="set_lang()" checked="{{\'hin\' == lang}}" value="hin"></ion-radio>\n    </ion-item>\n    \n    \n  </ion-list>\n</ion-content>\n<ion-footer>\n  <button ion-button class="cs-btn" *ngIf="lang!=\'\'" (click)="karigar_id ? update_lang() : continue()">{{\'Continue\' | translate}}</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/language/language.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], LanguagePage);
    return LanguagePage;
}());

//# sourceMappingURL=language.js.map

/***/ }),

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginScreenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginScreenPage = /** @class */ (function () {
    function LoginScreenPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LoginScreenPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginScreenPage');
    };
    LoginScreenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login-screen',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/login-section/login-screen/login-screen.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>login-screen</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  \n\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/login-section/login-screen/login-screen.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], LoginScreenPage);
    return LoginScreenPage;
}());

//# sourceMappingURL=login-screen.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguagePageModule", function() { return LanguagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__language__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var LanguagePageModule = /** @class */ (function () {
    function LanguagePageModule() {
    }
    LanguagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__language__["a" /* LanguagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__language__["a" /* LanguagePage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
        })
    ], LanguagePageModule);
    return LanguagePageModule;
}());

//# sourceMappingURL=language.module.js.map

/***/ }),

/***/ 786:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_aboutus_modal_aboutus_modal__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_version__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_language_language__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_push__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_feedback_feedback__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_offer_list_offer_list__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_transaction_transaction__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_gift_gallery_gift_list_gift_list__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_products_products__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_video_video__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_profile_profile__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_market__ = __webpack_require__(451);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};























var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, modalCtrl, storage, events, constant, app, toastCtrl, service, alertCtrl, app_version, translate, push, market) {
        var _this = this;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.events = events;
        this.constant = constant;
        this.app = app;
        this.toastCtrl = toastCtrl;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.app_version = app_version;
        this.translate = translate;
        this.push = push;
        this.market = market;
        this.tokenInfo = '';
        this.lang = 'en';
        this.version = '';
        this.db_app_version = '';
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        // uncomment for logout
        // this.storage.set('token','');
        storage.get('token').then(function (val) {
            if (val == '' || val == null || val == undefined) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_language_language__["a" /* LanguagePage */];
            }
            else if (val) {
                _this.tokenInfo = _this.getDecodedAccessToken(val);
                _this.service.post_rqst({ 'karigar_id': _this.tokenInfo.sub }, 'app_karigar/profile')
                    .subscribe(function (r) {
                    console.log(r);
                    if (r['status'] == "SUCCESS") {
                        _this.service.karigar_info = r['karigar'];
                        if (_this.service.karigar_info.del == '1') {
                            _this.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_language_language__["a" /* LanguagePage */];
                            _this.translate.get('Your Account has been suspended')
                                .subscribe(function (resp) {
                                _this.RequiredAlert(resp);
                            });
                            _this.storage.set('token', '');
                            _this.events.publish('data', '1', Date.now());
                            return;
                        }
                        else if (_this.service.karigar_info.status == 'Verified') {
                            // this.rootPage=HomePage;
                            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */]);
                            setTimeout(function () {
                                _this.initPushNotification();
                            }, 2000);
                            // this.rootPage=TabsPage;
                        }
                        else if (_this.service.karigar_info.status != 'Verified') {
                            var contactModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__pages_aboutus_modal_aboutus_modal__["a" /* AboutusModalPage */]);
                            contactModal.present();
                            return;
                        }
                    }
                    else {
                        _this.storage.set('token', '');
                        _this.events.publish('data', '1', Date.now());
                        return;
                    }
                });
            }
        });
        events.subscribe('data', function (data) {
            if (data == 1) {
                storage.get('token')
                    .then(function (val) {
                    console.log(val);
                    if (val == '' || val == null || val == undefined) {
                        console.log('if');
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_language_language__["a" /* LanguagePage */]);
                    }
                    else {
                        console.log('else');
                        // this.nav.setRoot(TabsPage);
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */]);
                        setTimeout(function () {
                            _this.initPushNotification();
                        }, 2000);
                    }
                });
            }
            console.log(data);
        });
        platform.ready().then(function () {
            statusBar.overlaysWebView(false);
            splashScreen.hide();
            statusBar.backgroundColorByHexString('#1a3c59');
            _this.get_user_lang();
        });
        platform.registerBackButtonAction(function () {
            var overlayView = _this.app._appRoot._overlayPortal._views[0];
            if (overlayView && overlayView.dismiss) {
                overlayView.dismiss();
                return;
            }
            var nav = app.getActiveNav();
            var activeView = nav.getActive().name;
            console.log(activeView);
            console.log(nav.canGoBack());
            if (activeView == 'HomePage' || activeView == 'MobileLoginPage' || activeView == 'OtpPage') {
                if (_this.constant.backButton == 0) {
                    console.log('hello2');
                    _this.constant.backButton = 1;
                    var toast = _this.toastCtrl.create({
                        message: 'Press again to exit!',
                        duration: 2000
                    });
                    toast.present();
                    setTimeout(function () {
                        _this.constant.backButton = 0;
                    }, 2500);
                }
                else {
                    console.log('hello1');
                    _this.platform.exitApp();
                }
            }
            else if (nav.canGoBack()) {
                console.log('ok');
                nav.pop();
            }
            else if (activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') {
                nav.parent.select(0);
            }
            else if (nav.canGoBack() == false) {
                console.log('ok');
                var alert_1 = _this.alertCtrl.create({
                    title: 'App termination',
                    message: 'Are you sure you want Exit?',
                    buttons: [
                        {
                            text: 'Stay',
                            handler: function () {
                                console.log('Cancel clicked');
                                // this.d.('Action Cancelled!')
                            }
                        },
                        {
                            text: 'Exit',
                            handler: function () {
                                _this.platform.exitApp();
                            }
                        }
                    ]
                });
                alert_1.present();
                // nav.pop();
            }
            else {
                // this.platform.exitApp();
            }
        });
    }
    MyApp.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_8_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    MyApp.prototype.RequiredAlert = function (text) {
        var _this = this;
        this.translate.get("Alert")
            .subscribe(function (resp) {
            var alert = _this.alertCtrl.create({
                title: resp + '!',
                cssClass: 'action-close',
                subTitle: text,
                buttons: [_this.ok]
            });
            alert.present();
        });
    };
    MyApp.prototype.check_version = function () {
        var _this = this;
        this.app_version.getVersionNumber()
            .then(function (resp) {
            console.log(resp);
            _this.version = resp;
            _this.service.post_rqst("", "app_karigar/get_version")
                .subscribe(function (resp) {
                console.log(resp);
                _this.db_app_version = resp.version.ios_version;
                console.log(_this.db_app_version);
                if (_this.version != _this.db_app_version) {
                    _this.translate.get("OK")
                        .subscribe(function (resp) {
                        _this.ok = resp;
                    });
                    _this.translate.get("Update Available")
                        .subscribe(function (resp) {
                        _this.avl_upd = resp;
                    });
                    _this.translate.get('Cancel')
                        .subscribe(function (resp) {
                        _this.cancl = resp;
                    });
                    _this.translate.get('Update Now')
                        .subscribe(function (resp) {
                        _this.upd_now = resp;
                    });
                    _this.translate.get("A newer version of this app is available for download. Please update it from AppStore")
                        .subscribe(function (resp) {
                        var updateAlert = _this.alertCtrl.create({
                            title: _this.avl_upd,
                            message: resp + '!',
                            buttons: [
                                { text: _this.cancl, },
                                { text: _this.upd_now,
                                    handler: function () {
                                        _this.market.open("id6444175248");
                                    }
                                }
                            ]
                        });
                        updateAlert.present();
                    });
                }
            });
        });
    };
    MyApp.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                _this.translate.use(_this.lang);
                // commented
                _this.check_version();
            });
        });
    };
    MyApp.prototype.initPushNotification = function () {
        // this.push.init({
        //     android: {
        //         forceShow: "true",
        //         titleKey: "hello",
        //         sound: "true",
        //         vibrate:"true"
        //     }
        // });
        var _this = this;
        this.push.hasPermission().then(function (res) {
            if (res.isEnabled) {
                console.log('We have permission to send push notifications');
            }
            else {
                console.log('We don\'t have permission to send push notifications');
            }
        });
        var options = {
            android: {
                senderID: '158421422619',
                icon: './assets/imgs/logo_small',
                forceShow: true
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) {
            console.log('Received a notification', notification);
            console.log("error1", notification.additionalData.type);
            console.log("error1", notification.additionalData);
            _this.notifications = notification.additionalData.type;
            if (notification.additionalData.type == "message") {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_14__pages_feedback_feedback__["a" /* FeedbackPage */]);
            }
            else if (notification.additionalData.type == 'offer') {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_15__pages_offer_list_offer_list__["a" /* OfferListPage */]);
            }
            else if (notification.additionalData.type == 'redeem') {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_16__pages_transaction_transaction__["a" /* TransactionPage */]);
            }
            else if (notification.additionalData.type == 'gift') {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_17__pages_gift_gallery_gift_list_gift_list__["a" /* GiftListPage */]);
            }
            else if (notification.additionalData.type == 'catalogue') {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_18__pages_products_products__["a" /* ProductsPage */]);
            }
            else if (notification.additionalData.type == 'product') {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_18__pages_products_products__["a" /* ProductsPage */]);
            }
            else if (notification.additionalData.type == 'video') {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_19__pages_video_video__["a" /* VideoPage */]);
            }
            else if (notification.additionalData.type == 'profile') {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_20__pages_profile_profile__["a" /* ProfilePage */]);
            }
        });
        pushObject.on('registration')
            .subscribe(function (registration) {
            console.log('Device registered', registration);
            console.log('Device Token', registration.registrationId);
            _this.storage.set('fcmId', registration);
            console.log(_this.tokenInfo);
            console.log(_this.storage);
            _this.storage.get('user_type').then(function (user_type) {
                _this.user_type = user_type;
                console.log(_this.user_type);
                console.log(user_type);
            });
            _this.storage.get('userId').then(function (userId) {
                _this.idlogin = userId;
                console.log(_this.idlogin);
                console.log(userId);
            });
            _this.registration = registration.registrationId;
            _this.registrationid(registration.registrationId);
        });
        pushObject.on('error')
            .subscribe(function (error) {
            return console.error('Error with Push plugin', error);
        });
    };
    MyApp.prototype.registrationid = function (registrationId) {
        var _this = this;
        console.log(" enter registration");
        console.log(registrationId);
        this.storage.get('user_type').then(function (user_type) {
            _this.user_type = user_type;
            console.log(_this.user_type);
            console.log(user_type);
            console.log("user_type");
        });
        this.storage.get('userId').then(function (userId) {
            _this.idlogin = userId;
            console.log(_this.idlogin, _this.idlogin);
            console.log("userId");
            console.log(userId);
        });
        setTimeout(function () {
            _this.service.post_rqst({ 'registration_id': registrationId, 'karigar_id': _this.idlogin }, 'app_karigar/add_registration_id')
                .subscribe(function (r) {
                console.log("success");
                console.log(r);
            });
        }, 5000);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5__providers_constant_constant__["a" /* ConstantProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_dbservice_dbservice__["a" /* DbserviceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_version__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_21__ionic_native_market__["a" /* Market */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 787:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipe = /** @class */ (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'safe',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], SafePipe);
    return SafePipe;
}());

//# sourceMappingURL=safe.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GiftListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gift_detail_gift_detail__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var GiftListPage = /** @class */ (function () {
    function GiftListPage(navCtrl, navParams, service, loadingCtrl, app, storage, translate, db, constant) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.storage = storage;
        this.translate = translate;
        this.db = db;
        this.constant = constant;
        this.filter = {};
        this.id = '';
        this.gift_list = [];
        this.balance_point = '';
        this.mode = '';
        this.tokenInfo = {};
        this.lang = '';
        this.uploadUrl = '';
        this.total_balance_point = 0;
        this.flag = '';
        this.mode = this.navParams.get('mode');
        if (this.mode) {
            this.mode = this.mode;
            console.log(this.mode);
        }
        else {
            this.mode = '';
            console.log(this.mode);
        }
    }
    GiftListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GiftListPage');
        this.uploadUrl = this.constant.upload_url;
        this.get_user_lang();
        this.presentLoading();
    };
    GiftListPage.prototype.ionViewWillEnter = function () {
        this.get_user_lang();
        this.getGiftList('');
    };
    GiftListPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    GiftListPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_6_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    GiftListPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getGiftList('');
        refresher.complete();
    };
    GiftListPage.prototype.goOnGiftDetail = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__gift_detail_gift_detail__["a" /* GiftDetailPage */], { 'id': id });
    };
    GiftListPage.prototype.getGiftList = function (search) {
        var _this = this;
        this.filter.limit = 0;
        this.filter.search = search;
        this.filter.redeemable = this.mode;
        console.log(this.filter.search);
        this.service.post_rqst({ 'filter': this.filter, 'karigar_id': this.service.karigar_id }, 'app_karigar/giftList')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.gift_list = r['gift'];
            _this.balance_point = parseInt(r['karigar'].balance_point);
            _this.total_balance_point = parseInt(r['karigar'].balance_point) + parseInt(r['karigar'].referal_point_balance);
            var referral_per = r['referral_point_per'].one_time_percentage;
            var referral_amount = ((r['karigar'].referal_point_balance * referral_per) / 100);
            console.log(referral_amount);
            // var offer_balance = this.balance_point;
            // console.log(offer_balance);
            // for gift active class
            for (var i = 0; i < _this.gift_list.length; i++) {
                _this.gift_list[i].coupon_points = parseInt(_this.gift_list[i].coupon_points);
                _this.gift_list[i].offer_balance = _this.balance_point + (referral_amount);
            }
            // end
            console.log(_this.gift_list);
        });
    };
    GiftListPage.prototype.intVal = function (arsg) {
        return parseInt(arsg);
    };
    GiftListPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    GiftListPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        this.filter.limit = this.gift_list.length;
        this.service.post_rqst({ 'filter': this.filter, 'karigar_id': this.service.karigar_id }, 'app_karigar/giftList')
            .subscribe(function (r) {
            console.log(r);
            if (r == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.gift_list = _this.gift_list.concat(r['gift']);
                    var referral_per = r['referral_point_per'].one_time_percentage;
                    var referral_amount = ((r['karigar'].referal_point_balance * referral_per) / 100);
                    for (var i = 0; i < _this.gift_list.length; i++) {
                        _this.gift_list[i].coupon_points = parseInt(_this.gift_list[i].coupon_points);
                        _this.gift_list[i].offer_balance = _this.balance_point + (referral_amount);
                    }
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    GiftListPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    GiftListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-gift-list',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/gift-gallery/gift-list/gift-list.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'Gift Gallery\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    \n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content  pullingIcon="arrow-dropdown"\n        pullingText="{{\'Pull to refresh\' | translate}}"\n        refreshingSpinner="circles"\n        refreshingText="{{\'Refreshing...\' | translate}}">\n    </ion-refresher-content>\n</ion-refresher>\n\n<div class="fix">\n    <div class="top-nav">\n        <p>{{\'Balance Points\' | translate}}</p>\n        <h1>{{total_balance_point}}</h1>\n    </div>\n    <div class="search">\n        <ion-searchbar type=\'text\' placeholder="{{\'Search\' | translate}}" name=\'search\' #search="ngModel" [(ngModel)]="filter.search" (ngModelChange)="getGiftList(filter.search)"></ion-searchbar>\n    </div>\n</div>\n<div class="listing " >\n    <button ion-item [ngClass]="{\'verified\' : intVal(list.coupon_points) <= intVal(list.offer_balance)  }" *ngFor="let list of gift_list; let i=index" (click)="goOnGiftDetail(list.id)">\n        <div class="head-detail" >\n            <div class="head">\n                <h1>{{list.coupon_points}}</h1>\n                <p>{{\'Points\' | translate}}</p>\n            </div>\n            <div class="detail">\n                <h1>{{lang !=\'en\' ? list.hin_gift_title : list.gift_title | titlecase}}</h1>\n                <p><span>{{\'Reward Points\' | translate}}:</span>{{list.reward_points  || 0  }}</p>\n                <p>{{lang != \'en\' ? list.hin_title : list.title | titlecase}} | {{list.end_date | date:\'d MMMM y\'}}</p>\n            </div>\n        </div>  \n        <div class="product-img">\n            <img [src]="uploadUrl + list.gift_image">\n        </div>\n    </button>\n    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)"  *ngIf="flag!=1">\n        <ion-infinite-scroll-content\n        loadingSpinner="bubbles"\n        loadingText="{{\'Loading more data...\' | translate}}">\n    </ion-infinite-scroll-content>\n</ion-infinite-scroll>\n</div>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/gift-gallery/gift-list/gift-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_7__providers_constant_constant__["a" /* ConstantProvider */]])
    ], GiftListPage);
    return GiftListPage;
}());

//# sourceMappingURL=gift-list.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__view_profile_view_profile__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__language_language__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_section_registration_registration__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__ = __webpack_require__(152);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { MobileLoginPage } from '../login-section/mobile-login/mobile-login';


// import { LanguagePage } from '../language/language';




var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, app_version, app, navParams, service, loadingCtrl, storage, events, actionSheetController, camera, alertCtrl, modalCtrl, db, translate, platform, socialSharing) {
        this.navCtrl = navCtrl;
        this.app_version = app_version;
        this.app = app;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.events = events;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.db = db;
        this.translate = translate;
        this.platform = platform;
        this.socialSharing = socialSharing;
        this.karigar_detail = {};
        this.edit = '';
        this.edit1 = '';
        this.lang = '';
        this.tokenInfo = {};
        this.title = "";
        this.no = "";
        this.yes = "";
        this.content = "";
        this.cam = "";
        this.gal = "";
        this.cancl = "";
        this.ok = "";
        this.upl_file = "";
        this.save_succ = "";
        this.version = '';
        this.appVersion = '';
        this.data = {};
        this.flag = true;
        this.presentLoading();
        this.check_version();
        this.lang = this.navParams.get("lang");
        this.getKarigarDetail();
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.translate.get("Camera")
            .subscribe(function (resp) {
            _this.cam = resp;
        });
        this.translate.get("Gallery")
            .subscribe(function (resp) {
            _this.gal = resp;
        });
        this.translate.get("Cancel")
            .subscribe(function (resp) {
            _this.cancl = resp;
        });
        this.translate.get("OK")
            .subscribe(function (resp) {
            _this.ok = resp;
        });
        this.translate.get("Upload File")
            .subscribe(function (resp) {
            _this.upl_file = resp;
        });
        this.translate.get("Registered Successfully")
            .subscribe(function (resp) {
            _this.save_succ = resp;
        });
    };
    ProfilePage.prototype.ionViewWillEnter = function () {
    };
    ProfilePage.prototype.logout = function () {
        var _this = this;
        this.translate.get("Logout")
            .subscribe(function (resp) {
            _this.title = resp;
        });
        this.translate.get("No")
            .subscribe(function (resp) {
            _this.no = resp;
        });
        this.translate.get("Yes")
            .subscribe(function (resp) {
            _this.yes = resp;
        });
        this.translate.get("Are you sure you want Logout?")
            .subscribe(function (resp) {
            _this.content = resp;
        });
        var alert = this.alertCtrl.create({
            title: this.title,
            message: this.content,
            buttons: [
                {
                    text: this.no,
                    handler: function () {
                        console.log('Cancel clicked');
                        // this.d.('Action Cancelled!')
                    }
                },
                {
                    text: this.yes,
                    handler: function () {
                        _this.storage.set('token', '');
                        _this.service.karigar_info = '';
                        _this.storage.get("token")
                            .then(function (resp) {
                            console.log(resp);
                        });
                        var alert2 = _this.alertCtrl.create({
                            title: 'Success!',
                            subTitle: 'Logout Successfully',
                            buttons: [{
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        });
                        alert2.present();
                        // this.platform.exitApp();
                        // this.navCtrl.setRoot(LanguagePage);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__language_language__["a" /* LanguagePage */]);
                    }
                }
            ]
        });
        alert.present();
    };
    // language:any=[];
    ProfilePage.prototype.getKarigarDetail = function () {
        var _this = this;
        console.log('karigar');
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id }, 'app_karigar/profile')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.karigar_detail = r['karigar'];
            _this.appVersion = r['version'];
        });
    };
    ProfilePage.prototype.openeditprofile = function () {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: "Profile photo",
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: this.cam,
                    icon: 'camera',
                    handler: function () {
                        _this.takePhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: this.gal,
                    icon: 'image',
                    handler: function () {
                        _this.getImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: this.cancl,
                    role: 'cancel',
                    handler: function () {
                    }
                }]
        });
        actionsheet.present();
    };
    ProfilePage.prototype.takePhoto = function () {
        var _this = this;
        console.log("i am in camera function");
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 400,
            cameraDirection: 1,
            correctOrientation: true
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.karigar_detail.profile = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.karigar_detail.profile);
            if (_this.karigar_detail.profile) {
                _this.uploadImage(_this.karigar_detail.profile);
            }
        }, function (err) {
        });
    };
    ProfilePage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.karigar_detail.profile = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.karigar_detail.profile);
            if (_this.karigar_detail.profile) {
                _this.uploadImage(_this.karigar_detail.profile);
            }
        }, function (err) {
        });
    };
    ProfilePage.prototype.uploadImage = function (profile) {
        var _this = this;
        console.log(profile);
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id, 'profile': profile }, 'app_karigar/updateProfilePic')
            .subscribe(function (r) {
            console.log(r);
            _this.showSuccess("Profile Photo Updated");
        });
    };
    ProfilePage.prototype.viewProfiePic = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__view_profile_view_profile__["a" /* ViewProfilePage */], { "Image": this.karigar_detail.profile, "type": "base_64" }).present();
    };
    ProfilePage.prototype.showSuccess = function (text) {
        var _this = this;
        this.translate.get("Success")
            .subscribe(function (resp) {
            var alert = _this.alertCtrl.create({
                title: resp + '!',
                subTitle: text,
                buttons: [_this.ok]
            });
            alert.present();
        });
    };
    ProfilePage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get('Please wait...')
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    ProfilePage.prototype.editDealer = function () {
        var _this = this;
        console.log(this.karigar_detail);
        this.service.post_rqst({ 'karigar_detail': this.karigar_detail }, 'app_karigar/editKarigarDealer')
            .subscribe(function (result) {
            console.log(result);
            _this.edit = '';
            _this.translate.get("Dealer Information Updated")
                .subscribe(function (resp) {
                _this.showSuccess(resp);
                return;
            });
        });
    };
    ProfilePage.prototype.MobileNumber = function (event) {
        var pattern = /[0-9]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    ProfilePage.prototype.showAlert = function (text) {
        var _this = this;
        this.translate.get("Alert")
            .subscribe(function (resp) {
            var alert = _this.alertCtrl.create({
                title: resp + '!',
                cssClass: 'action-close',
                subTitle: text,
                buttons: [_this.ok]
            });
            alert.present();
        });
    };
    // get_user_lang()
    // {
    //     this.storage.get("token")
    //     .then(resp=>{
    //         this.tokenInfo = this.getDecodedAccessToken(resp );
    //         this.db.post_rqst({"login_id":this.tokenInfo.sub},"app_karigar/get_user_lang")
    //         .subscribe(resp=>{
    //             console.log(resp);
    //             this.lang = resp['language'];
    //             this.translate.setDefaultLang(this.lang)
    //             if(this.lang == "")
    //             {
    //                 this.lang = "en";
    //             }
    //             this.translate.use(this.lang);
    //         })
    //     })
    // }
    ProfilePage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_7_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    ProfilePage.prototype.share_code = function () {
        var image = "";
        var app_url = "https://apps.apple.com/us/app/unicrete-bandhan/id6444175248";
        this.socialSharing.share("Hey there join me (" + this.karigar_detail.full_name + "-" + this.karigar_detail.mobile_no + ") on Unicrete Bandhan, a Manufacturer of Gypsum Plasters app. Enter my code *" + this.karigar_detail.referral_code + "* to earn points back in your wallet!", "Karigar Reffral", image, app_url)
            .then(function (resp) {
            console.log(resp);
        }).catch(function (err) {
            console.log(err);
        });
    };
    ProfilePage.prototype.onUploadChange = function (evt) {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: this.upl_file,
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: this.cam,
                    icon: 'camera',
                    handler: function () {
                        console.log("Camera Clicked");
                        _this.takeDocPhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: this.gal,
                    icon: 'image',
                    handler: function () {
                        console.log("Gallery Clicked");
                        _this.getDocImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: this.cancl,
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }]
        });
        actionsheet.present();
    };
    ProfilePage.prototype.takeDocPhoto = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 400,
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.karigar_detail.document_image = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.karigar_detail.document_image);
            if (_this.karigar_detail.document_image) {
                _this.uploadDocImage(_this.karigar_detail.document_image, _this.karigar_detail.document_no);
            }
        }, function (err) {
        });
    };
    ProfilePage.prototype.getDocImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.karigar_detail.document_image = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.karigar_detail.document_image);
            if (_this.karigar_detail.document_image) {
                _this.uploadDocImage(_this.karigar_detail.document_image, _this.karigar_detail.document_no);
            }
        }, function (err) {
        });
    };
    ProfilePage.prototype.uploadDocImage = function (doc_image, doc_num) {
        var _this = this;
        console.log(doc_image);
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id, 'doc_image': doc_image, 'doc_no': doc_num }, 'app_karigar/updateDocumnet')
            .subscribe(function (r) {
            _this.edit1 = '';
            _this.showSuccess("Document Updated");
        });
    };
    ProfilePage.prototype.updateProfile = function () {
        this.karigar_detail.edit_profile = 'edit_profile';
        console.log(this.karigar_detail);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__login_section_registration_registration__["a" /* RegistrationPage */], { 'data': this.karigar_detail, "mode": 'edit_page' });
    };
    ProfilePage.prototype.check_version = function () {
        var _this = this;
        this.app_version.getVersionNumber()
            .then(function (resp) {
            console.log(resp, 'app version');
            _this.version = resp;
        });
    };
    ProfilePage.prototype.deleteAccount = function () {
        var _this = this;
        this.translate.get("Alert!")
            .subscribe(function (resp) {
            _this.title = resp;
        });
        this.translate.get("No")
            .subscribe(function (resp) {
            _this.no = resp;
        });
        this.translate.get("Yes")
            .subscribe(function (resp) {
            _this.yes = resp;
        });
        this.translate.get("Are you sure you want permanent delete account?")
            .subscribe(function (resp) {
            _this.content = resp;
        });
        var alert = this.alertCtrl.create({
            title: this.title,
            message: this.content,
            buttons: [
                {
                    text: this.no,
                    handler: function () {
                        console.log('Cancel clicked');
                        // this.d.('Action Cancelled!')
                    }
                },
                {
                    text: this.yes,
                    handler: function () {
                        _this.db.post_rqst({ 'id': _this.karigar_detail.id }, 'app_master/delete_karigar_app')
                            .subscribe(function (resp) {
                            if (resp.status == 'success') {
                                _this.storage.set('token', '');
                                _this.service.karigar_info = '';
                                _this.storage.get("token")
                                    .then(function (resp) {
                                    console.log(resp);
                                });
                                var alert2 = _this.alertCtrl.create({
                                    title: 'Success!',
                                    subTitle: 'Delete Successfully',
                                    buttons: [{
                                            text: 'Ok',
                                            handler: function () {
                                                console.log('Cancel clicked');
                                            }
                                        }]
                                });
                                alert2.present();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__language_language__["a" /* LanguagePage */]);
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], ProfilePage.prototype, "nav", void 0);
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/profile/profile.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'Profile\' | translate}}</ion-title>\n        <div class="header-icons">\n            <button ion-button class="cs-hdr-icons mr16" (click)="logout()">\n                <i class="material-icons">power_settings_new</i>\n            </button>\n        </div>\n    </ion-navbar>\n</ion-header>\n<ion-content padding class="main-backgroung">\n    <div class="pr-after">\n        <div class="profile-detail">\n            <div class="pr-align">\n                <div class="pr-circle">\n                    <img src="assets/imgs/man.svg" *ngIf="karigar_detail.profile ==\'\'">\n                    <img [src]="karigar_detail.profile" *ngIf="karigar_detail.profile" (click)="viewProfiePic()">\n                    <label> \n                        <i class="material-icons" (click)="openeditprofile()">camera_alt</i>\n                    </label>\n                </div>\n                <div class="pr-tags {{karigar_detail.status}}">\n                    <button class="edit_profile" (click)="updateProfile()"> <i class="material-icons">edit</i></button>\n                    <h2>{{!karigar_detail.first_name ? \'N/A\' : karigar_detail.first_name |titlecase}} {{karigar_detail.last_name |titlecase}}</h2>\n                    <div class="left-right mt10">\n                        <i class="material-icons" *ngIf="karigar_detail.status ==\'Verified\'">check_circle</i>\n                        <i class="material-icons" *ngIf="karigar_detail.status ==\'Pending\'">hourglass_full</i>\n                        <i class="material-icons" *ngIf="karigar_detail.status ==\'Suspect\'">info</i>\n                        <i class="material-icons" *ngIf="karigar_detail.status ==\'Reject\'">cancel</i>\n                        <p>{{karigar_detail.status==\'Pending\'? \'Pending For Verification\':karigar_detail.status}}</p>\n                    </div>\n                </div>\n            </div>\n                <div class="deflex mt10">\n                    <ul>\n                        <li class="wp100 bdr-bottom" *ngIf="karigar_detail.user_type!=1">\n                            <p>{{\'Company Name\' | translate}}</p>\n                            <h1>{{karigar_detail.company_name |titlecase}}</h1>\n                        </li>\n                        <li>\n                            <p>{{\'Mobile No\' | translate}}.</p>\n                            <h1><a href="tel:{{karigar_detail.mobile_no}}">+91 {{karigar_detail.mobile_no ? karigar_detail.mobile_no : \'N/A\'}}</a> </h1>\n                        </li>\n                        <li >\n                            <p>{{\'Date of Birth\' | translate}}</p>\n                            <h1>{{(karigar_detail.dob !=\'\') ? (karigar_detail.dob| date:\'d MMM,y\'):(\'N/A\')}} </h1>\n                        </li>\n                        <li class="bdr-top wp100" *ngIf="karigar_detail.email">\n                            <p>{{\'Email ID\' | translate}}</p>\n                            <h1>{{karigar_detail.email}}\n                            </h1>\n                        </li>\n                        <li class="bdr-top wp100">\n                            <p>{{\'Address\' | translate}}</p>\n                            <h1>{{karigar_detail.address |titlecase}} {{!karigar_detail.state ? \'N/A\' :karigar_detail.state |titlecase}} {{!karigar_detail.district ? \'N/A\' : \', \'+karigar_detail.district |titlecase}} {{!karigar_detail.city ? \'N/A\' : \', \'+karigar_detail.city\n                                |titlecase}}\n                            </h1>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n        \n        <div class="heading line mt32">\n            <p>{{\'Document Information\' | translate}}</p>\n        </div>\n        <div class="adhar">\n            <img src="{{karigar_detail.document_image ? karigar_detail.document_image : \'assets/imgs/adhar.png\'}}">\n            <img src="{{karigar_detail.document_image_back ? karigar_detail.document_image_back : \'assets/imgs/adhar.png\'}}" *ngIf="karigar_detail.document_type==\'Aadhaar Card\'">\n            <p>{{karigar_detail.document_type}}</p>\n            <h1>{{karigar_detail.document_no}}</h1>\n        </div>\n\n\n        <div class="heading line mt32">\n            <p>{{\'Pan Card Information\' | translate}}</p>\n        </div>\n        <div class="adhar">\n            <img src="{{karigar_detail.pan_img ? karigar_detail.pan_img : \'assets/imgs/adhar.png\'}}">\n            <p>{{\'Pan Card Number\' | translate}}</p>\n            <h1>{{karigar_detail.pan_no}}</h1>\n        </div>\n        \n        <div class="heading line mt18">\n            <p>{{\'Dealer Information\' | translate}}</p>\n        </div>\n        <div class="data">\n            <table>\n                <tr>\n                    <td>{{\'Counter Name\' | translate}}</td>\n                    <th>{{karigar_detail.dealer_counter_name}}</th>\n                </tr>\n                <tr>\n                    <td>{{\'Contact Person\' | translate}}</td>\n                    <th>{{karigar_detail.dealer_contact_person}}</th>\n                </tr>\n                <tr>\n                    <td>{{\'Mobile No\' | translate}}.</td>\n                    <th>{{karigar_detail.dealer_mobile}}</th>\n                </tr>\n                \n                \n            </table>     \n        </div>\n        \n        <div class="heading line mt18">\n            <p>{{\'Bank Information\' | translate}}</p>\n            \n        </div>\n        \n        <div class="data">\n            <table>\n                <tr>\n                    <td class="w150">{{\'Account Holder Name\' | translate}}</td>\n                    <th>{{karigar_detail.account_holder_name}}</th>\n                </tr>\n                <tr>\n                    <td>{{\'Bank Name\' | translate}}</td>\n                    <th>{{karigar_detail.bank_name}}</th>\n                </tr>\n                <tr>\n                    <td>{{\'Account No.\' | translate}}</td>\n                    <th>{{karigar_detail.account_number}}</th>\n                </tr>\n                <tr>\n                    <td>{{\'IFSC Code\' | translate}}</td>\n                    <th>{{karigar_detail.ifsc_code}}</th>\n                </tr>\n                \n                <tr *ngIf="karigar_detail.cheque_image != \'\'">\n                    <td colspan="2">\n                        <img src="{{karigar_detail.cheque_image}}" (click)="viewImage(karigar_detail.cheque_image)">\n                    </td>\n                </tr>\n                \n            </table>     \n        </div>\n        \n        \n        \n        \n        \n        \n        <div class="heading line mt16" *ngIf="karigar_detail.referral_code" (click)="share_code()">\n            <p>{{\'Referral Code Information\' | translate}}</p>\n            <div class="little-edit">\n                <a><i class="material-icons">share</i></a>\n            </div>\n        </div>\n        <div class="pr-after" (click)="share_code()" *ngIf="karigar_detail.referral_code">\n            <div class="profile-detail bdr-none p0 mb9">\n                <div class="deflex m0">\n                    <ul>\n                        <li class="refcode">\n                            <p>{{\'Referral Code\' | translate}}</p>\n                            <h1>{{karigar_detail.referral_code ? karigar_detail.referral_code : \'N/A\'}}</h1>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n\n\n        <div class="pl16 pr16 mb24" *ngIf="appVersion.ios_version != version">\n            <button class="capitalize" (click)="deleteAccount()" ion-button color="secondary" block round>Permanent Delete Account</button>\n        </div>\n        \n    </ion-content>'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MobileLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__otp_otp__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__registration_registration__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__language_language__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MobileLoginPage = /** @class */ (function () {
    function MobileLoginPage(navCtrl, navParams, service, alertCtrl, db, translate, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.data = {};
        this.otp = '';
        this.lang = 'en';
        this.maxtime = 30;
        this.maxTime = 0;
        this.hidevalue = false;
        this.lang = this.navParams.get("lang");
    }
    MobileLoginPage.prototype.ionViewDidLoad = function () {
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
    };
    MobileLoginPage.prototype.StartTimer = function () {
        var _this = this;
        this.timer = setTimeout(function (x) {
            if (_this.maxtime <= 0) { }
            _this.maxTime -= 1;
            if (_this.maxTime > 0) {
                _this.hidevalue = true;
                _this.StartTimer();
            }
            else {
                _this.maxtime = 30;
                _this.hidevalue = false;
            }
        }, 1000);
    };
    MobileLoginPage.prototype.submit = function () {
        var _this = this;
        this.maxTime = 30;
        this.StartTimer();
        console.log(this.data);
        this.service.post_rqst({ 'mobile_no': this.data.mobile_no }, 'app_karigar/karigarLoginOtp')
            .subscribe(function (r) {
            console.log(r);
            if (r['status'] == "SUCCESS") {
                _this.otp = r['otp'];
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__otp_otp__["a" /* OtpPage */], { 'otp': _this.otp, 'mobile_no': _this.data.mobile_no, "lang": _this.lang });
            }
            if (r['status'] == 'REQUIRED MOBILE NO') {
                _this.RequiredAlert("Please enter Mobile No to continue.");
                return false;
            }
        });
    };
    MobileLoginPage.prototype.showAlert = function (text) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Alert!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Register',
                    cssClass: 'close-action-sheet',
                    handler: function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__registration_registration__["a" /* RegistrationPage */], { 'mobile_no': _this.data.mobile_no });
                    }
                }]
        });
        alert.present();
    };
    MobileLoginPage.prototype.RequiredAlert = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Alert!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    MobileLoginPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    MobileLoginPage.prototype.back = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__language_language__["a" /* LanguagePage */]);
    };
    MobileLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mobile-login',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/login-section/mobile-login/mobile-login.html"*/'<ion-header no-border>\n	<ion-navbar color="white"  class="ios-coustom-height nav-bar-back">\n		<ion-title class="coustom-header-ios">\n			<div class="logo no-margin" >\n				<img src="assets/imgs/logo.png">\n			</div>\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n\n<ion-content>\n	\n	<form #f="ngForm"  class="hp100">\n		<div class="center-block">\n			<div class="mobile-login" >\n				<div class="text">\n					<p>{{\'Enter your mobile number to get started\' | translate}}!</p>\n				</div>\n				<div class="input-section">\n					<div class="input-adjust" >\n						<input type="tel" name="" placeholder="{{\'Mobile number\' | translate}}" name="mobile_no" #mobile_no="ngModel" [(ngModel)]="data.mobile_no" [ngClass]="{\'is-invalid\':f.submitted && mobile_no?.invalid}" required min="0" maxlength="10" minlength="10"> \n						<div class="fixed-number">\n							<p>+91</p>\n						</div>\n					</div>\n					<i class="material-icons">local_phone</i>\n				</div>\n				<div *ngIf="data.mobile_no!=\'\'">\n					<div class="otp-error" *ngIf="!mobile_no.valid && mobile_no.touched">\n						<p>{{\'Enter valid Mobile No.\' | translate}} </p>\n					</div>\n				</div>\n				<div class="login-btn"  >\n					<button (click)="f.valid && submit()" [disabled]="hidevalue">{{\'Continue\' | translate}} {{maxTime ? \'(\'+maxTime+\')\' : \'\'}}</button>\n				</div>\n			</div>\n		</div>\n	</form>\n	\n</ion-content>\n\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/login-section/mobile-login/mobile-login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], MobileLoginPage);
    return MobileLoginPage;
}());

//# sourceMappingURL=mobile-login.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__aboutus_modal_aboutus_modal__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { FileTransfer, } from '@ionic-native/file-transfer';
// import { TabsPage } from './../../../pages/tabs/tabs';







var RegistrationPage = /** @class */ (function () {
    // defaultSelectedRadio = "data.user_type=1";
    function RegistrationPage(navCtrl, toastCtrl, navParams, service, alertCtrl, actionSheetController, camera, loadingCtrl, modalCtrl, storage, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.translate = translate;
        this.data = {};
        this.state_list = [];
        this.district_list = [];
        this.city_list = [];
        this.pincode_list = [];
        this.selectedFile = [];
        this.file_name = [];
        this.karigar_id = '';
        this.formData = new FormData();
        this.profile_data = '';
        this.lang = 'en';
        this.whatsapp_mobile_no = '';
        this.mode = '';
        this.cam = "";
        this.gal = "";
        this.cancl = "";
        this.ok = "";
        this.upl_file = "";
        this.save_succ = "";
        this.save_update = "";
        this.flag = true;
        this.account = {};
        this.addSpace = function (value) {
            if (value.length == 4 || value.length == 9) {
                _this.data.document_no = value.concat('-');
                console.log("add space===>", _this.data.document_no);
            }
        };
        this.data.mobile_no = this.navParams.get('mobile_no');
        console.log(this.data.mobile_no);
        this.data.document_type = 'Aadhaar Card';
        this.mode = navParams.get('mode');
        this.data.profile = '';
        this.data.document_image = '';
        this.data.document_image_back = '';
        this.data.cheque_image = '';
        this.data.user_type = 1;
        this.getstatelist();
        this.today_date = new Date().toISOString().slice(0, 10);
        if (navParams.data.data) {
            this.data = navParams.data.data;
            this.data.karigar_edit_id = this.data.id;
        }
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        if (this.data.state) {
            this.getDistrictList(this.data.state);
        }
        this.translate.get("Camera")
            .subscribe(function (resp) {
            _this.cam = resp;
        });
        this.translate.get("Gallery")
            .subscribe(function (resp) {
            _this.gal = resp;
        });
        this.translate.get("Cancel")
            .subscribe(function (resp) {
            _this.cancl = resp;
        });
        this.translate.get("OK")
            .subscribe(function (resp) {
            _this.ok = resp;
        });
        this.translate.get("Upload File")
            .subscribe(function (resp) {
            _this.upl_file = resp;
        });
        this.translate.get("Registered Successfully")
            .subscribe(function (resp) {
            _this.save_succ = resp;
        });
        this.translate.get("Profile updated Successfully")
            .subscribe(function (resp) {
            _this.save_update = resp;
        });
    }
    RegistrationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
        if (this.data.state) {
            this.getDistrictList(this.data.state);
        }
        this.translate.get("Camera")
            .subscribe(function (resp) {
            _this.cam = resp;
        });
        this.translate.get("Gallery")
            .subscribe(function (resp) {
            _this.gal = resp;
        });
        this.translate.get("Cancel")
            .subscribe(function (resp) {
            _this.cancl = resp;
        });
        this.translate.get("OK")
            .subscribe(function (resp) {
            _this.ok = resp;
        });
        this.translate.get("Upload File")
            .subscribe(function (resp) {
            _this.upl_file = resp;
        });
        this.translate.get("Registered Successfully")
            .subscribe(function (resp) {
            _this.save_succ = resp;
        });
        this.translate.get("Profile updated Successfully")
            .subscribe(function (resp) {
            _this.save_update = resp;
        });
    };
    RegistrationPage.prototype.getstatelist = function () {
        var _this = this;
        this.service.get_rqst('app_master/getStates').subscribe(function (r) {
            console.log(r);
            _this.state_list = r['states'];
            _this.karigar_id = r['id'];
            console.log(_this.state_list);
        });
    };
    RegistrationPage.prototype.getDistrictList = function (state_name) {
        var _this = this;
        console.log(state_name);
        this.service.post_rqst({ 'state_name': state_name }, 'app_master/getDistrict')
            .subscribe(function (r) {
            console.log(r);
            _this.district_list = r['districts'];
            console.log(_this.state_list);
        });
    };
    RegistrationPage.prototype.getCityList = function (district_name) {
        var _this = this;
        console.log(district_name);
        this.service.post_rqst({ 'district_name': district_name }, 'app_master/getCity')
            .subscribe(function (r) {
            console.log(r);
            _this.city_list = r['cities'];
            _this.pincode_list = r['pins'];
            console.log(_this.pincode_list);
        });
    };
    RegistrationPage.prototype.getaddress = function (pincode) {
        var _this = this;
        if (this.data.pincode.length == '6') {
            this.service.post_rqst({ 'pincode': pincode }, 'app_karigar/getAddress')
                .subscribe(function (result) {
                console.log(result);
                var address = result.address;
                if (address != null) {
                    _this.data.state = result.address.state_name;
                    _this.getDistrictList(_this.data.state);
                    _this.data.district = result.address.district_name;
                    _this.data.city = result.address.city;
                    console.log(_this.data);
                }
            });
        }
    };
    RegistrationPage.prototype.scrollUp = function () {
        this.content.scrollToTop();
    };
    RegistrationPage.prototype.presentToast = function (msg) {
        console.log(msg);
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    RegistrationPage.prototype.submit = function () {
        var _this = this;
        if (this.data.document_type == 'Aadhaar Card') {
            if (!this.data.document_image) {
                this.presentToast('Document front side image required');
                return;
            }
            if (!this.data.document_image_back) {
                this.presentToast('Document back side image required');
                return;
            }
        }
        else {
        }
        this.data.lang = this.lang;
        this.data.created_by = '0';
        this.presentLoading();
        this.service.post_rqst({ 'karigar': this.data }, 'app_karigar/addKarigar')
            .subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.karigar_id = r['id'];
            console.log(_this.karigar_id);
            if (r['status'] == 'UPDATED') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
            }
            if (r['status'] == "SUCCESS") {
                if (_this.data.id) {
                    _this.showSuccess(_this.save_update + "!");
                }
                else {
                    _this.showSuccess(_this.save_succ + "!");
                }
                _this.service.post_rqst({ 'mobile_no': _this.data.mobile_no, 'mode': 'App' }, 'auth/login')
                    .subscribe(function (r) {
                    console.log(r);
                    if (r['status'] == 'NOT FOUND') {
                        return;
                    }
                    else if (r['status'] == 'ACCOUNT SUSPENDED') {
                        _this.translate.get("Your account has been suspended")
                            .subscribe(function (resp) {
                            _this.showAlert(resp);
                        });
                        return;
                    }
                    else if (r['status'] == 'SUCCESS') {
                        _this.storage.set('token', r['token']);
                        _this.service.karigar_id = r['user'].id;
                        _this.service.karigar_status = r['user'].status;
                        console.log(_this.service.karigar_id);
                        if (r['user'].status != 'Verified' && r['user'].user_type != 3) {
                            var contactModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__aboutus_modal_aboutus_modal__["a" /* AboutusModalPage */]);
                            contactModal.present();
                            return;
                        }
                    }
                    // this.navCtrl.push(TabsPage);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
                });
            }
            else if (r['status'] == "EXIST") {
                _this.translate.get("Already Registered")
                    .subscribe(function (resp) {
                    _this.showAlert(resp + "!");
                });
            }
        });
    };
    RegistrationPage.prototype.namecheck = function (event) {
        console.log("called");
        var pattern = /[A-Z\+\-\a-z ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    RegistrationPage.prototype.MobileNumber = function (event) {
        var pattern = /[0-9]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    RegistrationPage.prototype.caps_add = function (add) {
        this.data.address = add.replace(/\b\w/g, function (l) { return l.toUpperCase(); });
    };
    RegistrationPage.prototype.showSuccess = function (text) {
        var _this = this;
        this.translate.get("Success")
            .subscribe(function (resp) {
            var alert = _this.alertCtrl.create({
                title: resp + '!',
                cssClass: 'action-close',
                subTitle: text,
                buttons: [_this.ok]
            });
            alert.present();
        });
    };
    RegistrationPage.prototype.showAlert = function (text) {
        var _this = this;
        this.translate.get("Alert")
            .subscribe(function (resp) {
            var alert = _this.alertCtrl.create({
                title: resp + '!',
                cssClass: 'action-close',
                subTitle: text,
                buttons: [_this.ok]
            });
            alert.present();
        });
    };
    RegistrationPage.prototype.openeditprofile = function () {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: "Profile photo",
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: this.cam,
                    icon: 'camera',
                    handler: function () {
                        console.log("Camera Clicked");
                        _this.takePhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: this.gal,
                    icon: 'image',
                    handler: function () {
                        console.log("Gallery Clicked");
                        _this.getImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: this.cancl,
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionsheet.present();
    };
    RegistrationPage.prototype.takePhoto = function () {
        var _this = this;
        console.log("i am in camera function");
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 400,
            cameraDirection: 1,
            correctOrientation: true
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.data.profile = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.data.profile);
        }, function (err) {
        });
    };
    RegistrationPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.data.profile = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.data.profile);
        }, function (err) {
        });
    };
    RegistrationPage.prototype.onUploadChange = function (evt) {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: this.upl_file,
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: this.cam,
                    icon: 'camera',
                    handler: function () {
                        _this.takeDocPhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: this.gal,
                    icon: 'image',
                    handler: function () {
                        _this.getDocImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: this.cancl,
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionsheet.present();
    };
    RegistrationPage.prototype.takeDocPhoto = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 400
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.data.document_image = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.data.document_image);
        }, function (err) {
        });
    };
    RegistrationPage.prototype.getDocImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.data.document_image = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.data.document_image);
        }, function (err) {
        });
    };
    RegistrationPage.prototype.onUploadBackChange = function (evt) {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: this.upl_file,
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: this.cam,
                    icon: 'camera',
                    handler: function () {
                        _this.backDocPhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: this.gal,
                    icon: 'image',
                    handler: function () {
                        _this.backDocImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: this.cancl,
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionsheet.present();
    };
    RegistrationPage.prototype.backDocPhoto = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 400
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.data.document_image_back = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.data.document_image_back);
        }, function (err) {
        });
    };
    RegistrationPage.prototype.backDocImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.data.document_image_back = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.data.document_image_back);
        }, function (err) {
        });
    };
    RegistrationPage.prototype.onUploadPancard = function (evt) {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: this.upl_file,
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: this.cam,
                    icon: 'camera',
                    handler: function () {
                        _this.panPhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: this.gal,
                    icon: 'image',
                    handler: function () {
                        _this.panImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: this.cancl,
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionsheet.present();
    };
    RegistrationPage.prototype.panPhoto = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 400
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.data.pan_img = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
        });
    };
    RegistrationPage.prototype.panImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.data.pan_img = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
        });
    };
    RegistrationPage.prototype.onUploadCheque = function (evt) {
        var _this = this;
        var actionsheet = this.actionSheetController.create({
            title: this.upl_file,
            cssClass: 'cs-actionsheet',
            buttons: [{
                    cssClass: 'sheet-m',
                    text: this.cam,
                    icon: 'camera',
                    handler: function () {
                        _this.chequePhoto();
                    }
                },
                {
                    cssClass: 'sheet-m1',
                    text: this.gal,
                    icon: 'image',
                    handler: function () {
                        _this.chequeImage();
                    }
                },
                {
                    cssClass: 'cs-cancel',
                    text: this.cancl,
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionsheet.present();
    };
    RegistrationPage.prototype.chequePhoto = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 400
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.data.cheque_image = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.data.cheque_image);
        }, function (err) {
        });
    };
    RegistrationPage.prototype.chequeImage = function () {
        var _this = this;
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        console.log(options);
        this.camera.getPicture(options).then(function (imageData) {
            _this.flag = false;
            _this.data.cheque_image = 'data:image/jpeg;base64,' + imageData;
            console.log(_this.data.cheque_image);
        }, function (err) {
        });
    };
    RegistrationPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    RegistrationPage.prototype.check_bank_account = function (account_no) {
        var _this = this;
        this.service.post_rqst({ 'account_no': account_no }, 'app_karigar/checkAccount')
            .subscribe(function (r) {
            console.log(r);
            if (r.status == "exist") {
                _this.presentToast('Account no. already exist');
                return;
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], RegistrationPage.prototype, "content", void 0);
    RegistrationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registration',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/login-section/registration/registration.html"*/'\n<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'Registration\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="main-backgroung">\n    <form #f="ngForm" (ngSubmit)="f.form.valid ? submit() : scrollUp()">\n        <!-- <div class="ragistration-fields pt10">\n            <div class="heading line" style="margin: 0px 0px 10px -15px;">\n                <p>Choose Type</p>\n            </div>\n            \n            <div class="radio-section">\n                <ion-list radio-group name="user_type" [(ngModel)]="data.user_type" #user_type="ngModel" required>\n                    <ion-item>\n                        <ion-radio value="1"></ion-radio>\n                        <ion-label>{{\'Karigar\'|translate}}</ion-label>\n                    </ion-item>\n                    \n                    <ion-item>\n                        <ion-label>{{\'Customer\'|translate}}</ion-label>\n                        <ion-radio value="3"></ion-radio>\n                    </ion-item>\n                </ion-list>\n            </div>\n        </div> -->\n        <div class="heading line">\n            <p>{{\'Basic Information\' | translate}}</p>\n        </div>\n        <!-- <div class="ragistration-fields">\n            <div class="left-right">\n                <div class="left-part">\n                    <p class="cls-circle" (click)="openeditprofile()">\n                        <i class="material-icons" *ngIf ="data.profile == \'\'">camera_alt</i>\n                        <img [src]="data.profile" *ngIf ="data.profile">\n                    </p>\n                </div>\n                <div class="right-part cs-form">\n                    <ion-list>\n                        <ion-item class="cs-input"  [ngClass]="{\'error\':f.submitted && first_name?.invalid}">\n                            <ion-label floating>{{\'First Name\' | translate}}*</ion-label>\n                            <ion-input type="text" name="first_name" #first_name="ngModel" [(ngModel)]="data.first_name" (ngModelChange)="(data.first_name!=null)?data.first_name[0] = data.first_name[0].toUpperCase():\'\'" (keypress)="namecheck($event)" required></ion-input>\n                        </ion-item>\n                        <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && last_name?.invalid}">\n                            <ion-label floating>{{\'Last Name\' | translate}}*</ion-label>\n                            <ion-input type="text"  name="last_name" #last_name="ngModel" [(ngModel)]="data.last_name" (ngModelChange)="(data.last_name!=null)?data.last_name[0] = data.last_name[0].toUpperCase():\'\'" (keypress)="namecheck($event)" required [ngClass]="{\'error\':f.submitted && last_name?.invalid}"  maxlength="10" ></ion-input>\n                        </ion-item>\n                    </ion-list>\n                </div>\n            </div>\n            \n            \n            <div class="cs-form">\n                <ion-list>\n                    <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && mobile_no?.invalid}"  >\n                        <ion-label floating>{{\'Mobile No\' | translate}}.*</ion-label>\n                        <ion-input type="text" name="mobile_no" #mobile_no="ngModel" [(ngModel)]="data.mobile_no" required  (keypress)="MobileNumber($event)" readonly ></ion-input>\n                    </ion-item>\n                    \n                    \n                    <ion-item class="cs-date" [ngClass]="{\'error\':f.submitted && dob?.invalid}">\n                        <ion-label>{{\'Date of Birth\' | translate}}*</ion-label>\n                        <ion-datetime displayFormat="DD/MM/YYYY" max={{today_date}} type="text"  name="dob" #dob="ngModel" [(ngModel)]="data.dob" required >\n                        </ion-datetime>\n                    </ion-item>\n                </ion-list>\n            </div>\n        </div> -->\n        \n        <div class="ragistration-fields">\n            <div class="left-right">\n                <div class="left-part align-in-center wp100">\n                    <p class="cls-circle" (click)="openeditprofile()">\n                        <i class="material-icons" *ngIf="data.profile == \'\'">camera_alt</i>\n                        <img [src]="data.profile" *ngIf="data.profile" required>\n                    </p>\n                </div>\n            </div>\n            \n            <div class=" cs-form mt10">\n                <ion-list>\n                    <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && first_name?.invalid}">\n                        <ion-label floating>{{\'First Name\' | translate}}*</ion-label>\n                        <ion-input type="text" name="first_name" #first_name="ngModel" [(ngModel)]="data.first_name" (ngModelChange)="(data.first_name!=null)?data.first_name[0] = data.first_name[0].toUpperCase():\'\'" (keypress)="namecheck($event)" required></ion-input>\n                    </ion-item>\n                    <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && last_name?.invalid}">\n                        <ion-label floating>{{\'Last Name\' | translate}}</ion-label>\n                        <ion-input type="text" name="last_name" #last_name="ngModel" [(ngModel)]="data.last_name" (ngModelChange)="(data.last_name!=null)?data.last_name[0] = data.last_name[0].toUpperCase():\'\'" (keypress)="namecheck($event)"></ion-input>\n                    </ion-item>\n                    \n                    <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && mobile_no?.invalid}">\n                        <ion-label floating>{{\'Mobile No\' | translate}}.*</ion-label>\n                        <ion-input type="number" name="mobile_no" #mobile_no="ngModel" [(ngModel)]="data.mobile_no" required readonly></ion-input>\n                    </ion-item>\n                    \n                    <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && whatsapp_mobile_no\n                    ?.invalid}">\n                    <ion-label floating>{{\'Whatsapp No\' | translate}}.</ion-label>\n                    <ion-input type="tel" name="whatsapp_mobile_no\n                    " #whatsapp_mobile_no="ngModel" [(ngModel)]="data.whatsapp_mobile_no\n                    " maxlength="10" minlength="10" min="0"></ion-input>\n                </ion-item>\n                \n                <ion-item class="cs-input" [ngClass]="{\'error\':(f.submitted && email?.invalid) || (f.submitted && !email.valid)}">\n                    <ion-label floating>{{\'Email ID\' | translate}}</ion-label>\n                    <ion-input type="email" name="email" #email="ngModel" [(ngModel)]="data.email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"></ion-input>\n                </ion-item>\n                \n                <ion-item class="cs-date mb0" [ngClass]="{\'error\':f.submitted && dob?.invalid}">\n                    <ion-label>{{\'Date of Birth\' | translate}}*</ion-label>\n                    <ion-datetime displayFormat="DD/MM/YYYY" max={{today_date}} type="text" name="dob" #dob="ngModel" [(ngModel)]="data.dob" required>\n                    </ion-datetime>\n                </ion-item>\n            </ion-list>\n        </div>\n    </div>\n    \n    <div class="heading line">\n        <p>{{\'Address Information\' | translate}}</p>\n    </div>\n    \n    <div class="ragistration-fields">\n        <div class="cs-form">\n            <ion-list>\n                <ion-item class="cs-input" [ngClass]="{\'error\':(f.address && address?.invalid) || (f.submitted && !address.valid)}">\n                    <ion-label floating>{{\'Address\' | translate}}</ion-label>\n                    \n                    <ion-input type="text"  name="address" #address="ngModel" [(ngModel)]="data.address" (ngModelChange)="caps_add(data.address)"></ion-input>\n                </ion-item>\n                \n                <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && pincode?.invalid}">\n                    <ion-label floating>{{\'Pincode\' | translate}}*</ion-label>\n                    <ion-input type="tel" name="pincode" [(ngModel)]="data.pincode" #pincode="ngModel" required maxlength="6" minlength="6" (input)="getaddress(data.pincode)"></ion-input>\n                </ion-item>\n                \n                \n                <ion-item class="cs-select" [ngClass]="{\'error\':f.submitted && state?.invalid}">\n                    <ion-label>{{\'State\' | translate}}*</ion-label>\n                    <ion-select name="state" [(ngModel)]="data.state" #state="ngModel" (ngModelChange)="getDistrictList(data.state)" required>\n                        <ion-option *ngFor="let row of state_list" value="{{row.state_name}}">{{row.state_name}}</ion-option>\n                    </ion-select>\n                </ion-item>\n                \n                <ion-item class="cs-select" [ngClass]="{\'error\':f.submitted && state?.invalid}">\n                    <ion-label >{{\'District\' | translate}}*</ion-label>\n                    <ion-select name="district" [(ngModel)]="data.district" #district="ngModel" (ngModelChange)="getCityList(data.district)" required>\n                        <ion-option *ngFor="let row of district_list" value="{{row.district_name}}">{{row.district_name}}</ion-option>\n                    </ion-select>\n                </ion-item>\n                \n                <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && city?.invalid}">\n                    <ion-label floating >{{\'City\' | translate}}*</ion-label>\n                    <ion-input type="text"   name="city" [(ngModel)]="data.city" #city="ngModel" required ></ion-input>\n                </ion-item>\n                \n            </ion-list>\n        </div>\n    </div>\n    \n    \n    <div class="heading line">\n        <p>{{\'Document Information\' | translate}}</p>\n    </div>\n    \n    <div class="ragistration-fields">\n        <div class="cs-form">\n            <ion-list>\n                <ion-item class="cs-select" [ngClass]="{\'error\':f.submitted && document_type?.invalid}">\n                    <ion-label>{{\'Select Document\' | translate}}</ion-label>\n                    <ion-select name="document_type" [(ngModel)]="data.document_type" #document_type="ngModel" required>\n                        <ion-option value="Aadhaar Card">{{\'Aadhaar card\' | translate}}</ion-option>\n                        <ion-option value="Voter Card">{{\'Voter Card\' | translate}}</ion-option>\n                    </ion-select>\n                </ion-item>\n                \n                \n                <div class="upload-document" (click)="onUploadChange()">\n                    <p *ngIf="data.document_image==\'\'">\n                        <i class="material-icons">add_circle</i>\n                        <br>\n                        {{ data.document_type==\'Aadhaar Card\' ? (\'Upload Front Side\' | translate ) : (\'Upload Document\' | translate)}}\n                    </p>\n                    <img *ngIf="data.document_image != \'\'"[src]="data.document_image" alt="">\n                </div>\n                \n                <div class="upload-document" *ngIf="data.document_type==\'Aadhaar Card\'" (click)="backDocPhoto()">\n                    <p *ngIf="data.document_image_back==\'\'"><i class="material-icons">add_circle</i><br>{{\'Upload Back Side\' | translate}}</p>\n                    <img *ngIf="data.document_image_back != \'\'"[src]="data.document_image_back" alt="">\n                </div>\n                \n                \n                \n                <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && document_no?.invalid}" *ngIf="data.document_type==\'Aadhaar Card\'" >\n                    <ion-label floating>{{\'Aadhaar Card Number\' | translate}}*</ion-label>\n                    <ion-input type="tel" name="document_no" #document_no="ngModel" [(ngModel)]="data.document_no" maxlength="12" minlength="12"  required></ion-input>\n                </ion-item>		\n                <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && document_no?.invalid}" *ngIf="data.document_type==\'Voter Card\'">\n                    <ion-label floating>{{\'Voter Card Number\' | translate}}*</ion-label>\n                    <ion-input type="text" name="document_no" #document_no="ngModel" [(ngModel)]="data.document_no" required></ion-input>\n                </ion-item>				\n            </ion-list>\n        </div>\n    </div>\n\n\n    <div class="heading line">\n        <p>{{\'Pan Card Information\' | translate}}</p>\n    </div>\n    \n    <div class="ragistration-fields">\n        <div class="cs-form">\n            <ion-list>\n                <div class="upload-document" (click)="onUploadPancard()">\n                    <p *ngIf="data.pan_img==\'\'">\n                        <i class="material-icons">add_circle</i>\n                        <br>\n                        {{\'Upload Pan Card Image\' | translate}}\n                    </p>\n                    <img *ngIf="data.pan_img != \'\'"[src]="data.pan_img" alt="">\n                </div>\n                \n                <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && pan_no?.invalid}">\n                    <ion-label floating>{{\'Pan Card Number\' | translate}}*</ion-label>\n                    <ion-input type="text" name="pan_no" #pan_no="ngModel" [(ngModel)]="data.pan_no" pattern="[A-z]{5}[0-9]{4}[A-z]{1}"></ion-input>\n                </ion-item>	\n                <div *ngIf="pan_no.errors?.pattern" class="invalid-feedback">\n                    <div>{{\'Invaild Pan Card Number\' | translate}}</div>\n                </div>	\n            </ion-list>\n        </div>\n    </div>\n    \n    \n    \n    <div class="heading line">\n        <p>{{\'Dealer Information\' | translate}}</p>\n    </div>\n    \n    <div class="ragistration-fields">\n        <div class="cs-form">\n            <ion-list>\n                <ion-item class="cs-input">\n                    <ion-label floating>{{\'Counter Name\' | translate}}</ion-label>\n                    <ion-input type="text"  name="dealer_counter_name " pattern="[a-zA-Z ]+" ng-pattern-restrict #dealer_counter_name ="ngModel" [(ngModel)]="data.dealer_counter_name " ></ion-input>\n                </ion-item>\n                \n                <ion-item class="cs-input">\n                    <ion-label floating>{{\'Contact Person\' | translate}}</ion-label>\n                    <ion-input type="text" name="dealer_contact_person " #dealer_contact_person ="ngModel" [(ngModel)]="data.dealer_contact_person" ></ion-input>\n                </ion-item>\n                <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && dealer_mobile?.invalid}">\n                    <ion-label floating>{{\'Mobile No\' | translate}}.</ion-label>\n                    <ion-input type="tel"  name="dealer_mobile " #dealer_mobile ="ngModel" [(ngModel)]="data.dealer_mobile"  maxlength="10" minlength="10"></ion-input>\n                </ion-item>	\n                <!-- <ion-item class="cs-input">\n                    <ion-label floating>{{\'Address\' | translate}}</ion-label>\n                    <ion-input type="text" name="dealer_address " #dealer_address ="ngModel" [(ngModel)]="data.dealer_address" ></ion-input>\n                </ion-item>				 -->\n            </ion-list>\n        </div>\n    </div>\n    \n    \n    <div class="heading line">\n        <p>{{\'Bank Information\' | translate}}</p>\n    </div>\n    \n    <div class="ragistration-fields">\n        <div class="cs-form">\n            <ion-list>\n                <ion-item  class="cs-input"  [ngClass]="{\'error\':f.submitted && account_holder_name?.invalid}">\n                    <ion-label floating>{{\'Account Holder Name\' | translate}}</ion-label>\n                    <ion-input type="text"  name="account_holder_name"  ng-pattern-restrict #account_holder_name ="ngModel" [(ngModel)]="data.account_holder_name "></ion-input>\n                </ion-item>\n                \n                <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && bank_name?.invalid}">\n                    <ion-label floating>{{\'Bank Name\' | translate}}</ion-label>\n                    <ion-input type="text"  name="bank_name " pattern="[\x00-\x7F]+" ng-pattern-restrict #bank_name ="ngModel" [(ngModel)]="data.bank_name "></ion-input>\n                </ion-item> \n                \n                \n                <ion-item class="cs-input" >\n                    <ion-label floating>{{\'Account Number\' | translate}}</ion-label>\n                    <ion-input type="tel" name="account_number " #account_number ="ngModel" [(ngModel)]="data.account_number"  minlength="9" maxlength="18"></ion-input>\n                </ion-item>\n                \n                <ion-item class="cs-input" [ngClass]="{\'error\':f.submitted && ifsc_code?.invalid}">\n                    <ion-label floating>{{\'IFSC Code\' | translate}}</ion-label>\n                    <ion-input type="text"  name="ifsc_code " #ifsc_code ="ngModel" [(ngModel)]="data.ifsc_code"  pattern="^[A-Z]{4}[0][A-Z0-9]{6}$"></ion-input>\n                </ion-item>	\n                <div class="eror" *ngIf="ifsc_code.errors?.pattern">\n                    <p> {{ \'Invalid IFSC code\' | translate}}</p>\n                </div>\n\n\n                <div class="upload-document" (click)="onUploadCheque()">\n                    <p *ngIf="data.cheque_image==\'\'">\n                        <i class="material-icons">add_circle</i>\n                        <br>\n                        {{\'Upload Cheque/ Passbook\' | translate}}\n                    </p>\n                    <img *ngIf="data.cheque_image != \'\'"[src]="data.cheque_image" alt="">\n                </div>\n            </ion-list>\n        </div>\n    </div>\n    \n    \n    \n    <ng-container *ngIf="!data.id">\n        <div class="heading line">\n            <p>{{\'Referral Code\' | translate}}</p>\n        </div>\n        <div class="ragistration-fields">\n            <div class="cs-form">\n                <ion-list>\n                    <ion-item class="cs-input">\n                        <ion-label floating>{{\'Referral Code\' | translate}}</ion-label>\n                        <ion-input type="text"  name="referral_code " #referral_code ="ngModel" [(ngModel)]="data.referral_code " ></ion-input>\n                    </ion-item>\n                </ion-list>\n            </div>\n        </div>\n    </ng-container>\n    <button ion-button class="cs-btn m0">{{ data.id ? (\'Update\' |  translate) : (\'Continue\' | translate)}}</button>\n</form>\n</ion-content>\n\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/login-section/registration/registration.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]])
    ], RegistrationPage);
    return RegistrationPage;
}());

//# sourceMappingURL=registration.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var VideoPage = /** @class */ (function () {
    function VideoPage(navCtrl, navParams, service, loadingCtrl, dom, app, storage, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.dom = dom;
        this.app = app;
        this.storage = storage;
        this.translate = translate;
        this.filter = {};
        this.video_list = [];
        this.tokenInfo = {};
        this.lang = '';
        this.ok = "";
        this.flag = '';
    }
    VideoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VideoPage');
        this.get_user_lang();
        this.getVideoList();
        this.presentLoading();
    };
    VideoPage.prototype.getVideoList = function () {
        var _this = this;
        this.filter.limit = 0;
        this.service.post_rqst({ 'filter': this.filter }, 'app_master/videoList').subscribe(function (r) {
            console.log(r);
            _this.loading.dismiss();
            _this.video_list = r['video'];
            for (var i = 0; i < _this.video_list.length; i++) {
                _this.video_list[i].url = _this.dom.bypassSecurityTrustResourceUrl(_this.video_list[i].url);
            }
        });
    };
    VideoPage.prototype.presentLoading = function () {
        var _this = this;
        this.translate.get("Please wait...")
            .subscribe(function (resp) {
            _this.loading = _this.loadingCtrl.create({
                content: resp,
                dismissOnPageChange: false
            });
            _this.loading.present();
        });
    };
    VideoPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.service.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    VideoPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_4_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    VideoPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        console.log('loading');
        this.filter.limit = this.video_list.length;
        this.service.post_rqst({ 'filter': this.filter }, 'app_master/videoList').subscribe(function (r) {
            console.log(r);
            if (r['video'] == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    for (var i = 0; i < _this.video_list.length; i++) {
                        _this.video_list[i].url = _this.dom.bypassSecurityTrustResourceUrl(_this.video_list[i].url);
                    }
                    _this.video_list = _this.video_list.concat(r['video']);
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    VideoPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage' && previuosView != 'MainHomePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    VideoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-video',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/video/video.html"*/'\n<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'Videos\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding  >\n    <div class="image-detail" *ngIf="video_list.length == 0">\n        <img src="assets/imgs/no_found.svg">\n    </div>\n    <div class="pr16 pl16">\n        <div  class="video" *ngFor="let list of video_list;let i=index">\n            <iframe [src]="list.url" width="100%" height="180" rameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n            <div class="video-text" *ngIf="list.desc">\n                {{list.desc}}\n            </div>\n        </div>\n    </div>\n    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)"  *ngIf="flag!=1">\n        <ion-infinite-scroll-content\n        loadingSpinner="bubbles"\n        loadingText="{{\'Loading more data...\' | translate}}">\n    </ion-infinite-scroll-content>\n</ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/video/video.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
    ], VideoPage);
    return VideoPage;
}());

//# sourceMappingURL=video.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shipping_detail_shipping_detail__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chating_chating__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__receive_remark_modal_receive_remark_modal__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jwt_decode__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jwt_decode__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TransactionPage = /** @class */ (function () {
    function TransactionPage(navCtrl, navParams, service, loadingCtrl, app, alertCtrl, modalCtrl, storage, translate, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.translate = translate;
        this.db = db;
        this.transaction_detail = [];
        this.balance_point = '';
        this.filter = {};
        this.tokenInfo = {};
        this.lang = '';
        this.flag = '';
        // this.presentLoading();
    }
    TransactionPage.prototype.ionViewWillEnter = function () {
        this.get_user_lang();
        console.log('ionViewDidLoad TransactionPage');
        this.getTransactionDetail();
    };
    TransactionPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.getTransactionDetail();
        refresher.complete();
    };
    TransactionPage.prototype.get_user_lang = function () {
        var _this = this;
        this.storage.get("token")
            .then(function (resp) {
            _this.tokenInfo = _this.getDecodedAccessToken(resp);
            _this.db.post_rqst({ "login_id": _this.tokenInfo.sub }, "app_karigar/get_user_lang")
                .subscribe(function (resp) {
                console.log(resp);
                _this.lang = resp['language'];
                if (_this.lang == "") {
                    _this.lang = "en";
                }
                _this.translate.use(_this.lang);
            });
        });
    };
    TransactionPage.prototype.getDecodedAccessToken = function (token) {
        try {
            return __WEBPACK_IMPORTED_MODULE_8_jwt_decode__(token);
        }
        catch (Error) {
            return null;
        }
    };
    TransactionPage.prototype.goOnShippingPage = function (id, gift_id) {
        console.log('shipping');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__shipping_detail_shipping_detail__["a" /* ShippingDetailPage */], { 'id': id, 'gift_id': gift_id });
    };
    TransactionPage.prototype.goOnChatingPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__chating_chating__["a" /* ChatingPage */]);
    };
    TransactionPage.prototype.getTransactionDetail = function () {
        var _this = this;
        this.presentLoading();
        this.filter.limit = 0;
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id, 'filter': this.filter }, 'app_karigar/transaction')
            .subscribe(function (r) {
            console.log(r);
            if (r) {
                _this.loading.dismiss();
                _this.transaction_detail = r['transaction'];
                _this.balance_point = r['karigar'].balance_point;
                _this.total_balance_point = parseInt(r['karigar'].balance_point) + parseInt(r['karigar'].referal_point_balance);
            }
        });
    };
    TransactionPage.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: false
        });
        this.loading.present();
    };
    TransactionPage.prototype.recvConfirmation = function (gift_id) {
        var ReceiveModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__receive_remark_modal_receive_remark_modal__["a" /* ReceiveRemarkModalPage */], { 'gift_id': gift_id });
        ReceiveModal.present();
    };
    TransactionPage.prototype.showSuccess = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            cssClass: 'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    TransactionPage.prototype.loadData = function (infiniteScroll) {
        var _this = this;
        console.log('loading');
        this.filter.limit = this.transaction_detail.length;
        this.service.post_rqst({ 'karigar_id': this.service.karigar_id, 'filter': this.filter }, 'app_karigar/transaction')
            .subscribe(function (r) {
            console.log(r);
            if (r['transaction'] == '') {
                _this.flag = 1;
            }
            else {
                setTimeout(function () {
                    _this.transaction_detail = _this.transaction_detail.concat(r['transaction']);
                    console.log('Asyn operation has stop');
                    infiniteScroll.complete();
                }, 1000);
            }
        });
    };
    TransactionPage.prototype.ionViewDidLeave = function () {
        var nav = this.app.getActiveNav();
        if (nav && nav.getActive()) {
            var activeView = nav.getActive().name;
            var previuosView = '';
            if (nav.getPrevious() && nav.getPrevious().name) {
                previuosView = nav.getPrevious().name;
            }
            console.log(previuosView);
            console.log(activeView);
            console.log('its leaving');
            if ((activeView == 'HomePage' || activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage') && (previuosView != 'HomePage' && previuosView != 'GiftListPage' && previuosView != 'TransactionPage' && previuosView != 'ProfilePage')) {
                console.log(previuosView);
                this.navCtrl.popToRoot();
            }
        }
    };
    TransactionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-transaction',template:/*ion-inline-start:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/transaction/transaction.html"*/'\n<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'Transaction\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    \n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content  pullingIcon="arrow-dropdown"\n        pullingText="{{\'Pull to refresh\' | translate}}"\n        refreshingSpinner="circles"\n        refreshingText="{{\'Refreshing...\' | translate}}">\n    </ion-refresher-content>\n</ion-refresher>\n\n<div class="top-nav nav-adjust">\n    <p>{{\'Balance Points\' | translate}}</p>\n    <h1>{{total_balance_point}}</h1>\n</div>\n<div class="transaction-list"  >\n    <div class="his-listing" *ngFor="let list of transaction_detail; let i=index">\n        <button ion-item class="main-list" (click)=" goOnShippingPage(list.id,list.offer_gift_id) " >\n            <div class="tr-content">\n                <div class="inner">\n                    <div class="tr-cicle">\n                        <i class="material-icons">call_made</i>\n                    </div>\n                    <div class="tr-tags">\n                        <h2>{{\'Request Send\' | translate}}</h2>\n                        <h1>{{list.gift_title | titlecase}}</h1>\n                        <p> {{\'Req Id\' | translate}} : {{list.invoice_id }}</p>\n                        <span *ngIf="list.gift_status==\'Reject\' && receive_status != \'\'">{{list.reject_reason | titlecase}}</span>\n                    </div>\n                </div>			\n                <div class="tr-points"  >\n                    <h2>{{list.coupon_points}}</h2>\n                    <p>{{\'Points\' | translate}}</p>\n                    <span class="refund" *ngIf="list.gift_status==\'Reject\' && receive_status != \'\'">{{\'Refunded\' | translate}}</span>\n                </div>\n            </div>\n        </button>\n        \n        <div class="tr-status" *ngIf="list.gift_status==\'Pending\' && list.receive_status==\'\'" >\n            <div class="tag">\n                <h1>{{list.date_created |date:\'d MMMM y\'}}</h1>\n            </div>\n            <div class="pending">\n                <p>{{list.gift_status}}</p>\n            </div>\n        </div>\n        <div class="tr-status" *ngIf="list.gift_status==\'Reject\' && list.receive_status==\'\' " >\n            <div class="tag">\n                <h1>{{list.date_created |date:\'d MMMM y\'}}</h1>\n            </div>\n            <div class="reject">\n                <p>{{list.gift_status}}</p>\n            </div>\n        </div>\n        <div class="tr-status" *ngIf="list.gift_status==\'Approved\' && list.receive_status==\'\'">\n            <div class="tag">\n                <h1>{{list.date_created |date:\'d MMMM y\'}}</h1>\n            </div>\n            <div class="approved">\n                <p>{{list.gift_status}}</p>\n            </div>\n        </div> \n        <div class="tr-status" *ngIf="list.receive_status==\'Shipped\'" >\n            <div class="tag btn-received">\n                <button (click)="recvConfirmation(list.id)">{{\'Receive\' | translate}}</button>\n            </div>\n            <div class="shipped" >\n                <p>{{\'Shipped\' | translate}}</p>\n            </div>\n        </div>\n        <div class="tr-status"  *ngIf="list.receive_status==\'Received\'">\n            <div class="tag">\n                <h1>{{\'Receive on\' | translate}} : {{list.received_date | date:\'d MMMM y\'}}</h1>\n            </div>\n            <div class="received">\n                <p>{{\'Receive\' | translate}}</p>\n            </div>\n        </div>\n    </div>\n    <ion-infinite-scroll threshold="100px" (ionInfinite)="loadData($event)"  *ngIf="flag!=1">\n        <ion-infinite-scroll-content\n        loadingSpinner="bubbles"\n        loadingText="{{\'Loading more data...\' | translate}}">\n    </ion-infinite-scroll-content>\n</ion-infinite-scroll>\n<div class="h100"></div>\n</div>		\n</ion-content>\n'/*ion-inline-end:"/Users/abacus/Downloads/Mohit_singh/Unicrete/src/pages/transaction/transaction.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4__providers_dbservice_dbservice__["a" /* DbserviceProvider */]])
    ], TransactionPage);
    return TransactionPage;
}());

//# sourceMappingURL=transaction.js.map

/***/ })

},[454]);
//# sourceMappingURL=main.js.map