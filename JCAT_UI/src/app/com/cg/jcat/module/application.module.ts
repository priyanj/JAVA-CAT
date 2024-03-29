import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ApplicationRoutingModule } from '../router/application-routing.module';
import { ApplicationComponent } from '../component/application.component';
import { AssesstApplicationComponent } from '../component/assessment.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [CommonModule,
        TranslateModule.forChild(),
         ApplicationRoutingModule,
          DataTablesModule, FormsModule
        , LoggerModule.forRoot({ level: NgxLoggerLevel.LOG, disableConsoleLogging: false, serverLogLevel: NgxLoggerLevel.LOG })],
    declarations: [
        ApplicationComponent, AssesstApplicationComponent
    ]
})

export class ApplicationModule { }
