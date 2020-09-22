import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            // @ts-ignore
            id: post._id
          };
        });
      }))
      .subscribe((postData) => {
        this.posts = postData;
        this.postsUpdated.next([...this.posts]);
      });
    return [...this.posts];
  }

  getPost(id: string) {
    return {
      ...this.posts.find(p => p.id === id)
    };
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title, content};
    return this.http.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', post)
      .subscribe((response) => {

        const newPost = {
          // @ts-ignore
          id: response.post._id,
          title: response.post.title,
          content: response.post.content
        };

        this.posts.push(newPost);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post = {id: id, title: title, content: content};
    console.log(title);
    return this.http.put<any>('http://localhost:3000/api/posts/' + id, post)
      .subscribe((response) => {
        console.log(response);
      });
  }

  deletePost(id: string) {
    return this.http.delete<any>('http://localhost:3000/api/posts/' + id)
      .subscribe(() => {
        // filters out the post that is being updated and returns the list without it
        const updatedPosts = this.posts.filter(post => post.id !== id);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
