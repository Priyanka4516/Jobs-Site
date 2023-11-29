import { Component, OnInit } from '@angular/core';
import { JobsDetailModel } from '../Modal/job-details';
import { JobDetailsService } from '../services/Job-details.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit{

  desc: JobsDetailModel[] = [];
  myDate = new Date();
  data: any;
  info: any;
  GetJobObserver!:Observer<any>;
  GetJobDetailObserver!:Observer<any>;
  count=0;
  display:boolean=true;

  constructor (private apiService: JobDetailsService) {this.JobIDDescription(); this.JobDescription()}

  ngOnInit(): void {
      this.apiService.GetJobId().subscribe(
          this.GetJobObserver);
}

LoadMoreJobs(){
  this.desc=[];
  for(let i=0;i<=5;i++){
    this.apiService.GetJobDetail(this.data[this.count]).subscribe(
      this.GetJobDetailObserver);
      this.count+=1;
  }
  if (this.count>=this.data.length-1){
    this.display=false;
  }
}
  

  JobIDDescription(){
    this.GetJobObserver={
      next: (result) => {
          this.data=result;

          for(let i=0;i<=5;i++){
            
            this.apiService.GetJobDetail(this.data[this.count]).subscribe(
                  this.GetJobDetailObserver);
                  this.count+=1;
            
          }
        }
      ,
      error: () => { },
      complete: () => {},
    };
  }
  JobDescription(){
    this.GetJobDetailObserver={
      next: (result) => {
        let date = new Date(result.time);
        result.time=date;
        this.desc.push(result)
          
        }
      
    ,
    error: () => { },
    complete: () => {},

    }
  }
  



}
