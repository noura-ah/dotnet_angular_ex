import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ApiProjectService } from 'src/app/services/api-project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {

  project! : Project 
  constructor(private activatedRouter:ActivatedRoute, private apiProject:ApiProjectService){}

  ngOnInit():void{
    this.activatedRouter.params.subscribe(val => {
      this.getProject(val['id'])
    })
  }

  getProject(id:number){
    this.apiProject.getProjectById(id)
    .subscribe((res)=>{
      this.project = res
    })
  }

}
