import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ApplicationRoutingModule } from '../router/application-routing.module';
import { ApplicationComponent } from '../component/application.component';


@NgModule({
    imports: [CommonModule, ApplicationRoutingModule,DataTablesModule,FormsModule
    ,LoggerModule.forRoot({level: NgxLoggerLevel.LOG,disableConsoleLogging:false,serverLogLevel: NgxLoggerLevel.LOG})],
    declarations: [
        ApplicationComponent
        ]
})

export class ApplicationModule {}
