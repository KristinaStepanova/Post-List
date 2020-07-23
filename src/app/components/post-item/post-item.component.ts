import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input('post') postItem: Post;
  @Output() deletePost: EventEmitter<number> = new EventEmitter();
  @Output() editPost: EventEmitter<Post> = new EventEmitter();
  editPostId: number;

  constructor(
    public postService: PostService
  ) { }

  ngOnInit() {
    this.postService.editTaskEvent.subscribe(post => {
      if(post.id === this.postItem.id) {
        this.editPostId = post.id;
      } else {
        this.editPostId = 0;
      }
    })
  }

  onDelete(id: number) {
    this.deletePost.emit(id);
  }

  onEdit(post: Post) {
    const updtPost: Post = {
      userId: 1,
      id: post.id,
      title: post.title,
      body: post.body,
    };
    this.editPost.emit(updtPost);
  }

  onCancel() {
    this.editPost.emit({userId: 1, title: '', body: ''});
  }

}
