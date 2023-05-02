import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiProjectService } from 'src/app/services/api-project.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  projects:any = []
  
  constructor(private auth:AuthService, private apiProject:ApiProjectService,private notify:NotifierService){
  }

  ngOnInit(){
    this.getProjects()
  }

  getProjects(){
    this.apiProject.getAllProjects()
    .subscribe(res => this.projects = res)
  }

  deleteProject(id: number){
    this.apiProject.deleteProject(id)
    .subscribe({
      next:(res)=>{
        this.notify.notify('success','Project was deleted successfully')
        this.getProjects()
      },
      error:(err)=> console.log(err)
    })
  }

  
}
