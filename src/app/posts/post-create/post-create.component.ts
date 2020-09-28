import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostsService} from '../posts.service';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
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
  private form: FormGroup;
  private isLoading: boolean = false;

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null,
        {validators: [Validators.required]}),
      'content': new FormControl(null, {validators: Validators.required})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = true;
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId)
          .subscribe(response => {
            this.isLoading = false;
            this.post = response;
          });
        this.form.setValue({
          title: this.post.title,
          content: this.post.content
        })
      } else {
        this.mode = false;
        this.postId = null;
      }
    })
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode) {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    } else {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    }
    this.router.navigate(['/']);
    this.form.reset();
  }
}
