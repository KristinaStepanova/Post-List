import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import { Post } from "src/app/models/Post";

@Component({
  selector: "app-manage-post-form",
  templateUrl: "./manage-post-form.component.html",
  styleUrls: ["./manage-post-form.component.scss"],
})
export class ManagePostFormComponent implements OnInit {
  @Output() onAddNewPost: EventEmitter<Post> = new EventEmitter();

  post: Post = {
    userId: 1,
    title: "",
    body: "",
  };

  editedPostId: number;

  constructor(public postService: PostService) {}

  ngOnInit() {
    this.postService.editTaskEvent.subscribe((post: Post) => {
      this.post = post;
      this.editedPostId = post.id;
    });
  }

  onSubmit(form) {
    const newPost: Post = {
      userId: 1,
      id: this.editedPostId,
      title: this.post.title,
      body: this.post.body,
    };
    console.log(form)
    this.onAddNewPost.emit(newPost);
    //this.post.id = 0;

    form.reset();
  }

  onCancel() {
    this.postService.emitEditEvent({ userId: 1, title: "", body: "" });
  }
}
