import { Component, ElementRef, Renderer2 } from '@angular/core';
import { DataService } from '../data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  myForm!: FormGroup; 

  
  jsonData: any;
  selectedFiles: File[] = [];


  constructor(private dataService: DataService, private fb: FormBuilder){
    this.myForm = this.fb.group({
      jobTitle: [''],
      email: [''],
      requestDate: [''],
      time: [''],
      location: [''],
      quarter: [''],
      state: [''],
      primarySkills: [''],
      educationalRequirements: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.dataService.getJsonData().subscribe((data) => {
      this.jsonData = data;
      this.populateForm();
    });

    
  }


  openFileExplorer(): void {
    const fileInput = document.getElementById("fileInput");
if (fileInput) {
  fileInput.click();
}

  }

  handleFileSelection(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  removeFile(file: File): void {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }
  populateForm() {
    this.myForm.patchValue({
      jobTitle: this.jsonData.jobTitle,
      email: this.jsonData.email,
      requestDate: this.jsonData.requestDate,
      time: this.jsonData.time,
      location: this.jsonData.location,
      quarter: this.jsonData.quarter,
      state: this.jsonData.state,
      primarySkills: this.jsonData.primarySkills,
    });
  
    const educationalRequirements = this.myForm.get('educationalRequirements') as FormArray;
    educationalRequirements.clear(); 
  
    this.jsonData.educationalRequirements.forEach((eduReq: any) => {
      educationalRequirements.push(this.fb.group({
        educational: eduReq.educational,
        fieldOfEducation: eduReq.fieldOfEducation,
      }));
    });

  }

}
