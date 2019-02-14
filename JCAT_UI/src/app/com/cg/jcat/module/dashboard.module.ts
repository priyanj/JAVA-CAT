import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DashboardRoutingModule } from '../router/dashboard-routing.module';
import { StatModule } from '../../../../shared';
import { DashboardComponent } from '../component/dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        TranslateModule.forChild(),
        DashboardRoutingModule,
        StatModule,
        YoutubePlayerModule,
        VgCoreModule,
       VgControlsModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {}
