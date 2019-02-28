import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DashboardRoutingModule } from '../router/dashboard-routing.module';
import { StatModule } from '../../../../shared';
import { DashboardComponent } from '../component/dashboard.component';  
import { JcatModule } from '../jcat.module';
// export function AdminTranslateLoader(http: HttpClient) {
//     return new TranslateHttpLoader(http, './assets/i18n/admin/', '.json');
//   }
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        TranslateModule.forChild(),
    //    TranslateModule.forChild({
    //     loader: {
    //       provide: TranslateLoader,
    //       useFactory: (AdminTranslateLoader),
    //       deps: [HttpClient]
    //     },
    //     isolate: true
    //   }),
        DashboardRoutingModule,
        StatModule,
        YoutubePlayerModule,
        VgCoreModule,
       VgControlsModule,
     
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {}
