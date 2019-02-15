import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../utility/localStorage.service';


@Injectable({
  providedIn: 'root'
})
export class DTCloudableRuleService {


  constructor(private http: HttpClient, private myStorage: LocalStorageService) { }

  ngOnInit() {
  }

  getCloudableRule() {
    return this.http.get(this.myStorage.getdomainURL() + `/dtcloudableRule/getAll`);
  }

  getAllCloudableQuestions(){
    return this.http.get(this.myStorage.getdomainURL()+`/dtcloudableRule/getCloudableQuestion`);
  }

  saveCloudableRule(dTCloudableRuleModelList: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.myStorage.getdomainURL() + `/dtcloudableRule/create`, dTCloudableRuleModelList);
  }

}