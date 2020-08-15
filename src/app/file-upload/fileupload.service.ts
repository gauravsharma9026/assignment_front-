import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private httpClient: HttpClient, private router: Router) { }

/*
  to post csv file 
*/
postFile(fileToUpload: File): Observable<object> {
  const formData: FormData = new FormData();

 // console.log(fileToUpload);
  //formData.append('file', fileToUpload, fileToUpload.name);
  console.log(fileToUpload);
  let headers = new HttpHeaders({
    //"content-length": fileToUpload.size.toString(),
    "content-type": 'text/csv',
  });

  return this.httpClient.post('http://localhost:3000/api/users/csvupload',fileToUpload,{
    headers: headers,
  });


  /*return this.httpClient.post('http://localhost:3000/api/users/csvupload', formData,{
    headers: 
    reportProgress: true,
    observe: 'events'
  })*/
}

}
