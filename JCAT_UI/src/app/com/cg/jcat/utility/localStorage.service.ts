import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../entity/user';
import { AssessmentQuestions } from '../entity/AssessmentQuestion';
import { Application } from '../entity/application';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private http:HttpClient) { }

  setLoggedInTrue(isLoggedin : string){
    localStorage.setItem('isLoggedin',isLoggedin);
  }

  getdomainURL(){
    localStorage.setItem('domainURL','http://localhost:8099');
    return localStorage.getItem('domainURL');
  }
  
  getreportURL(){
    localStorage.setItem('domainURL','http://localhost:8099');
    return localStorage.getItem('domainURL');
  }

  setCurrentUserObject(user : Object){
    localStorage.setItem('user',JSON.stringify(user));
  }

  setCurrentApplicationObject(application : Object)
  {
    localStorage.setItem('application',JSON.stringify(application));
  }

  getCurrentApplicationObject() : Application
  {
    return JSON.parse(localStorage.getItem('application'));
  }

  getCurrentUserObject() : User{
    return JSON.parse(localStorage.getItem('user'));
  }
  
  setCurrentEditQuestionObject(question : Object)
  {
    localStorage.setItem('question',JSON.stringify(question));
  }

  getCurrentEditQuestionObject() : AssessmentQuestions{
    return JSON.parse(localStorage.getItem('question'));
  }

  setIpAddress(ip : string){
    localStorage.setItem('ip',ip);
  }
  setComponent(componentName: string){
    localStorage.setItem('component', componentName); 
  }

  getIpAddress(){
    return localStorage.getItem('ip');
  } 

  getLoggedInTrue(){
    return localStorage.getItem('isLoggedin');
  }

  clearLoggedIn(){
    return localStorage.removeItem('isLoggedin');
  }

  clearCurrentUser(){
    return localStorage.removeItem('user');
  }
  setMigrationId(id:any){
    localStorage.setItem('migrationId',id);
  }

  getMigrationId(){
    return localStorage.getItem('migrationId');
  }

  setProviderId(id:any){
    localStorage.setItem('providerId',id);
  }

  getProviderId(){
    return localStorage.getItem('providerId');
  }

}
