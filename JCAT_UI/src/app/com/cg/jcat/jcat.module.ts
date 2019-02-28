import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { JcatRoutingModule } from './jcat-routing.module';
import { JcatComponent } from './jcat.component';
import { SidebarComponent } from './component/component.sidebar';
import { HeaderComponent } from './component/component.header';
import { FooterComponent } from './component/component.footer';

@NgModule({
  imports: [
    CommonModule,
    JcatRoutingModule,
    TranslateModule,
    NgbDropdownModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [JcatComponent, SidebarComponent, HeaderComponent, FooterComponent]
})
export class JcatModule { }
