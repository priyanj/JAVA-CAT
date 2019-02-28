import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../utility/localStorage.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: '../view/sidebar.component.html',
    styleUrls: ['../view/sidebar.component.scss']
})
export class SidebarComponent {
    col:boolean=true;
    isUser : string;
    adminActive : boolean;
    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private translate: TranslateService, public router: Router, private myStorage:LocalStorageService) {

        const browserLang = this.translate.getBrowserLang();

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        if(this.myStorage.getCurrentUserObject())
        {
            this.adminActive=true;
        }
        else{
            this.adminActive=false;
        }

    }

    

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.col=true;
            this.showMenu = '0';
        } else {
            this.col=false;
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }
}
