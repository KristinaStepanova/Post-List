import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../models/Post';

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiUrl = environment.api_url;
  private editTask: BehaviorSubject<Post> = new BehaviorSubject({title: '', body: '', userId: 1}); //emit event
  public editTaskEvent = this.editTask.asObservable(); //for submit event

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  postPost(body: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, body);
  }

  deletePost(id: number): Observable<Object> {
    return this.http.delete<Object>(`${this.apiUrl}/posts/${id}`);
  }

  updatePost(body: Post): Observable<Object> {
    return this.http.put<Object>(`${this.apiUrl}/posts/${body.id}`, body);
  }

  emitEditEvent(post: Post): void {
    this.editTask.next(post);
  }
}
