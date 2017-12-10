import {Constants} from '../../app/app.constants';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {BaseService} from '../../app/services/base.service';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {
  url: string;
  error: string;
  msg: string;
  label:string="Tester";
  constructor(public navCtrl: NavController, private storage: Storage,
    private baseService: BaseService) {
    this.storage.ready().then(() => {
      this.storage.get('url').then((val) => {
        this.url = val;
      });

    });
  }

  save() {
    this.error = "";
    this.msg = "";
    try {

      this.storage.ready().then(() => {
        this.storage.set('url', this.url);
        Constants.apiServer = this.url;
        this.msg = Constants.saveSuccess;
      });
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
    }
  }

  test() {
    this.error = "";
    this.msg = "";
    this.label="Test en cours. Patientez...";
    try {
      this.baseService.ping(this.url)
        .subscribe((data: string) => {
          if (data.endsWith("Success")) {
            this.msg = "Success";
          } else {
            this.error = Constants.ERROR_OCCURRED;
          };
          this.label="Tester";
        },
        error => {
          this.error = Constants.ERROR_OCCURRED;
          console.log(error);
         this.label="Tester";
        
        },
        () => console.log('Get All SchoolYears Complete'));
    }
    catch (e) {
      this.error = Constants.ERROR_OCCURRED;
      this.label="Tester";
    }
  }

}
