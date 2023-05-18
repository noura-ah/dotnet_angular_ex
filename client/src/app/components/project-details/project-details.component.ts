import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Project } from 'src/app/models/project';
import { ApiProjectService } from 'src/app/services/api-project.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {

  project!: Project
  constructor(
    private activatedRouter: ActivatedRoute,
    private apiProject: ApiProjectService,
    private notify: NotifierService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(val => {
      this.getProject(val['id'])
    })
  }

  getProject(id: number) {
    this.apiProject.getProjectById(id)
      .subscribe({
        next: (res) => {
          this.project = res
        },
        error: err => {
          //TODO after editing backend: if err.status == 403 
          this.notify.notify('error', 'Please login again')
          this.auth.signOut()
        }
      })
  }

}
