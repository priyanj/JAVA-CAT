import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { JcatComponent } from './com/cg/jcat/jcat.component';

const routes: Routes = [
    { path: '', loadChildren: './com/cg/jcat/jcat.module#JcatModule'},   
    //{ path: '', redirectTo: 'login', pathMatch: 'prefix' },   
    { path: 'login', loadChildren: './com/cg/jcat/module/login.module#LoginModule' },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
    
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

