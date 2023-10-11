import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  file: File | null = null;
  public file_paths = [];
  constructor(private http: HttpClient){

  }
  ngOnInit(){
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if ((inputElement.files) && (inputElement.files.length > 0)) {
      const file = inputElement.files[0];
      this.file = file;
    }
  }

  onUpload(){
    const local = 'http://localhost/users/uploadfile/';
    const ec2_i1 = 'http://18.219.240.57/users/uploadfile/';
    const formData = new FormData();
    if (this.file !== null) {
      formData.append('file', this.file);
      this.http.post(ec2_i1, formData)
        .subscribe(res => {
          alert('Solicitud exitosa '+res);
        })
      console.log(this.file);
    }else {
      alert('No se seleccionó ningún archivo.');
    }
  }

  findPaths (){
    const local = 'http://localhost/users/findpaths/';
    const ec2_i1 = 'http://18.219.240.57/users/findpaths/';
    this.http.get(ec2_i1).subscribe((data:any) => {
      this.file_paths = data
      console.log(this.file_paths);
    })
  }
  
}
