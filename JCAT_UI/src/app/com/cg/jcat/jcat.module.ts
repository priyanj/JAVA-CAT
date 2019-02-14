import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { JcatRoutingModule } from './jcat-routing.module';
import { JcatComponent } from './jcat.component';
import { SidebarComponent } from './component/sidebar.component';
import { HeaderComponent } from './component/header.component';
import { FooterComponent } from './component/footer.component';

@NgModule({
  imports: [
    CommonModule,
    JcatRoutingModule,
    TranslateModule,
    NgbDropdownModule,
    FormsModule
  ],
  declarations: [JcatComponent, SidebarComponent, HeaderComponent, FooterComponent]
})
export class JcatModule { }
