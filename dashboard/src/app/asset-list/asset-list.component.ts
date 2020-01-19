import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import '@enplug/dashboard-sdk';

const enplug = window.enplug;

@Component({
  selector: 'ep-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  public assets: Array<any>;

  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.assets = this.route.snapshot.data.assets;

    // Initialization of Dashboard items localted outside of the App
    this.zone.run(() => {
      this.setHeader();
    });
  }

  setHeader() {
    var self = this;
    enplug.dashboard.setHeaderTitle('Assets');
    enplug.dashboard.setHeaderButtons([
      {
        text: 'Upload',
        action: () => this.zone.run(() => {
          self.uploadAsset();
        }),
        class: 'btn-primary'
      },
    ]);
  }

  uploadAsset() {
    console.log("AAAAAAAAAAAAAAAAA");
    enplug.dashboard.loadingIndicator("Processing Uploading Assets.");
    enplug.dashboard.upload({}, (obj) => this.uploadAssetSuccess(obj), this.uploadAssetFail())
  }


  uploadAssetSuccess(obj) {
    enplug.dashboard.sucessIndicator("Success In Uploading Assets.");
  }

  
  uploadAssetFail() {
    enplug.dashboard.errorIndicator("Fail In Uploading Assets.");
  }
}
