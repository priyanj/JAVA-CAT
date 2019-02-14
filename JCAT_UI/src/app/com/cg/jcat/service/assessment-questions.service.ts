import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../utility/localStorage.service';

@Injectable()
export class AssessmentQuestionsService {
  constructor(private http: HttpClient, private myStorage: LocalStorageService) {

  }

  getAllQuestions() {
    return  this.http.get(this.myStorage.getdomainURL()+`/assessmentQuestion/getAll`);
  }

  getQuestionById(questionId: number) {
    return  this.http.get(this.myStorage.getdomainURL()+`/assessmentQuestion/get/question/`+questionId);
  }

  saveQuestions(question: Object): Observable<Object> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8'); 
    return this.http.post(this.myStorage.getdomainURL() + `/assessmentQuestion/createQuestion`,question);
  }

  updateQuestion(value: any): Observable<Object> {
    return this.http.put(this.myStorage.getdomainURL+`/assessmentQuestion/updateQuestion`, value);
  }

  deleteQuestion(questionId: number): Observable<any> {
    return this.http.delete(this.myStorage.getdomainURL()+`/assessmentQuestion/deleteQuestion/`+questionId, {
      responseType: 'text' 
    });
  }

}