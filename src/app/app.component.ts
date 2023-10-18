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
  public file_paths: any;
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
    const local = 'http://localhost/files/uploadfile/';
    const ec2_i1 = 'http://Alb-aplication-1951690844.us-east-2.elb.amazonaws.com/files/uploadfile/';
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
    const listaDeFilePaths: string[] = [];
    const local = 'http://localhost/files/findpaths/';
    const ec2_i1 = 'http://Alb-aplication-1951690844.us-east-2.elb.amazonaws.com/files/findpaths/';
    this.http.get(ec2_i1).subscribe((data:any) => {
      for (const objeto of data) {
        listaDeFilePaths.push(objeto.file_path);
      }
      this.file_paths = listaDeFilePaths;
      console.log(this.file_paths);
    })
  }
  
}
