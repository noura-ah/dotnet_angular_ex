import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ApiProjectService {

  private baseUrl : string = "https://localhost:7067/api/Project/"
  constructor(private http : HttpClient) { }

  getAllProjects(){
    return this.http.get<Project[]>(this.baseUrl)
  }

  createProject(project: Project){
    return this.http.post<any>(`${this.baseUrl}`, project)
  }

  updateProject(project: Project, id: number){
    project['id'] = id
    return this.http.put<any>(`${this.baseUrl}${id}`,project)
  }

  deleteProject(id: number){
    return this.http.delete<any>(`${this.baseUrl}${id}`)
  }

  getProjectById(id: number){
    return this.http.get<Project>(`${this.baseUrl}${id}`)
  }
}
