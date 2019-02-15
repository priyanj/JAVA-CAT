import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../utility/localStorage.service';


@Injectable({
  providedIn: 'root'
})
export class DTMigrationRuleService {


  constructor(private http: HttpClient, private myStorage: LocalStorageService) { }

  ngOnInit() {
  }

  getMigrationRule(migrationId: number) {
    return this.http.get(this.myStorage.getdomainURL() + `/migration/get/rule/` + migrationId);
  }

  saveMigrationRule(dtMigrationRuleModelList: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.myStorage.getdomainURL() + `/migration/create/rule`, dtMigrationRuleModelList);
  }

  getMigration() {
    return this.http.get(this.myStorage.getdomainURL() + `/migration/get/pattern`);
  }

  getMigrationQuestions(){
    return this.http.get(this.myStorage.getdomainURL() + `/migration/get/questions`);
  }

  private  comptransfer  =  new  BehaviorSubject("Wrong Migration Id!!");
  migrationId  =  this.comptransfer.asObservable();

  sendMsgtoOtherComponent(messsage) {
    this.comptransfer.next(messsage);
  }

}