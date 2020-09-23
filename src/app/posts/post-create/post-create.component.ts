import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostsService} from '../posts.service';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Post} from "../post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  private mode: boolean = false; // false -> create, true -> edit
  private postId: string;
  private post: Post;

  constructor(private postsService: PostsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = true;
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId)
          .subscribe(response => {
            this.post = response;
          });
      } else {
        this.mode = false;
        this.postId = null;
      }
    })
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode) {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    } else {
      this.postsService.addPost(form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
