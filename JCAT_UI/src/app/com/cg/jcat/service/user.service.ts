import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../utility/localStorage.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  ipAddress: string;
  constructor(private http: HttpClient, private myStorage: LocalStorageService) { }

  ngOnInit() {
  }

  getUsers(): Observable<Object> {
    return  this.http.get(this.myStorage.getdomainURL() + `/user/getAll`);
  }

  addUser(user: Object): Observable<Object> {
    return this.http.post(this.myStorage.getdomainURL() + `/user/create`, user);
  }

  getUserByUserNamePassword(username: string, password: string): Observable<any> {
    return this.http.get(this.myStorage.getdomainURL() + `/login/` + username + `/` + password);
  }

  updateUser(user: Object): Observable<Object> {
    return this.http.put(this.myStorage.getdomainURL() + `/user/update`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(this.myStorage.getdomainURL() + `/user/delete/` + userId, { responseType: 'text' });
  }

  private comptransfer = new BehaviorSubject("login");
  userData = this.comptransfer.asObservable();

  sendMsgtoOtherComponent(messsage) {
    this.comptransfer.next(messsage);
  }

  sendIpAddresstoOtherComponent(messsage) {
    this.comptransfer.next(messsage);
  }

  countNumberOfUsers() {
    return this.http.get(this.myStorage.getdomainURL() + `/user/getUserCount`);
  }

  changePassword(userName: String, password: String, newPassword: String) {
    return this.http.get(this.myStorage.getdomainURL() + `/user/changePassword/` + userName + `/` + password + `/` + newPassword);
  }

  getIpAddress(): Observable<any> {
    const headers = new HttpHeaders({ "Access-Control-Allow-Origin": "*" });
    return this.http.get('http://ipinfo.io');
  }

  private handleError(error: HttpErrorResponse):
    Observable<any> {
    console.error('observable error: ', error);
    return Observable.throw(error);
  }

}
