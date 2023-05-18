import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApiProjectService } from 'src/app/services/api-project.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {

  projectForm!: FormGroup
  isUpdate: boolean = false
  id!: number

  constructor(
    private fb: FormBuilder,
    private projectService: ApiProjectService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notify: NotifierService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: [''],
      description: ['']
    })

    if (this.activatedRouter.snapshot.params['id']) {
      this.activatedRouter.params.subscribe(val => {
        this.id = val['id']
        this.projectService.getProjectById(this.id)
          .subscribe({
            next: res => {
              this.isUpdate = true
              this.fillForm(res)
            },
            error: err => {
              // if err.status == 403 
              this.notify.notify('error', 'Please login again')
              this.auth.signOut()
            }
          })
      })
    }
  }

  onSubmit() {
    this.projectService.createProject(this.projectForm.value)
      .subscribe({
        next: (res) => {
          this.projectForm.reset()
          this.notify.notify('success', 'Project was created successfully')
          this.router.navigate(['dashboard'])
        },
        error: (err) => {
          console.log(err.error)
          // if err.status == 403 
          this.notify.notify('error', 'Please login again')
          this.auth.signOut()
        }
      })

  }

  onUpdate() {
    console.log(this.projectForm.value)
    this.projectService.updateProject(this.projectForm.value, this.id)
      .subscribe({
        next: (res) => {
          this.projectForm.reset()
          this.notify.notify('success', 'Project was updated successfully')
          this.router.navigate(['dashboard'])
        },
        error: (err) => {
          console.log(err.error)
          // if err.status == 403 
          this.notify.notify('error', 'Please login again')
          this.auth.signOut()
        }
      })
  }

  fillForm(project: any) {
    this.projectForm.setValue({
      name: project.name,
      description: project.description
    })
  }
}
