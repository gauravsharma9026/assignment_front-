import { Component, OnInit, Input } from '@angular/core';
import { FileuploadService } from './fileupload.service';
import { UserlistService } from '../userslist/userlist.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileToUpload: File = null;

  @Input() usersPerPage;
  @Input() currentPage;
  constructor(private fileUploadService: FileuploadService,private userlistService: UserlistService) { }

  ngOnInit(): void {
  }

  // LOAD CSV FILE FROM INPUT
  uploadfile(files: FileList): void {
    this.fileToUpload = files.item(0);
    this.fileUploadService.postFile(this.fileToUpload).subscribe((a) => {
       
      this.userlistService.getUsers(this.usersPerPage,this.currentPage);
    },
    error => {
          console.log(error);
    });
  }


}
