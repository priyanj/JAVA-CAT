import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../utility/localStorage.service';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  
  constructor(private http:HttpClient,private myStorage:LocalStorageService) { }

   getAllAplication(): Observable<Object>{
      return this.http.get(this.myStorage.getdomainURL()+`/application/getAll`);
    }

    getApplicationByApplicationId(applicationId: string): Observable<Object>{
      return this.http.get(this.myStorage.getdomainURL()+`/application/getApplication/`+applicationId);
    }

    saveApplication(application: Object): Observable<Object> {
      return this.http.post(this.myStorage.getdomainURL() + `/application/create`, application);
    }

    deleteApplicationById(aid: number): Observable<any> {
      return this.http.delete(this.myStorage.getdomainURL()+`/application/delete/`+aid, { responseType: 'text' });
    }

    deactivate(aid: number): Observable<any> {
      return this.http.put(this.myStorage.getdomainURL()+`/application/deactivate/`+aid,  { responseType: 'text' });
    }

    updateApplication(value: any): Observable<Object> {
      return this.http.put(this.myStorage.getdomainURL()+`/application/update`,value);
    }

    import(value: any): Observable<Object> {
      return this.http.post(this.myStorage.getdomainURL() + `/application/import`, value);
    }

    private comptransfer = new BehaviorSubject("default");
    applicationData= this.comptransfer.asObservable();
  
    sendMsgtoOtherComponent(messsage){
        this.comptransfer.next(messsage);
    } 

}
