import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { LocalStorageService } from '../utility/localStorage.service';


@Injectable({
  providedIn: 'root'
})
export class DTProviderRuleService {


constructor(private http: HttpClient,private myStorage:LocalStorageService) { }

ngOnInit() {
  }

  getCloudProviderRules(providerId: number) {
    return this.http.get(this.myStorage.getdomainURL() + `/cloudProvider/getAllRules/` + providerId);
  }

  saveCloudProviderRule(cloudProviderRuleModelList: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.myStorage.getdomainURL() + `/cloudProvider/create`, cloudProviderRuleModelList);
  }

  getCloudProvider() {
    return this.http.get(this.myStorage.getdomainURL() + `/cloudProvider/getAll`);
  }

  getProviderQuestions(){
    return this.http.get(this.myStorage.getdomainURL() + `/cloudProvider/get/questions`);
  }

  private comptransfer = new BehaviorSubject("default");
  providerId= this.comptransfer.asObservable();

  sendProviderIdtoProviderRuleComponent(messsage){
      this.comptransfer.next(messsage);
  } 

}