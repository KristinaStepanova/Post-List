import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import { Post } from "src/app/models/Post";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit {
  post: Post = {
    userId: 1,
    title: "",
    body: "",
  };
  posts: Post[];
  isAdmin = true;

  constructor(
    public postService: PostService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      (error) => {
        this.toastr.error(error.message, "Error");
      }
    );
  }

  onDelete(id: number) {
    this.spinner.show();
    this.postService.deletePost(id).subscribe(
      (data: Object) => {
        this.posts = this.posts.filter((post) => post.id !== id);

        this.spinner.hide();
        this.toastr.success("Post deleted success!", "Message");
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.message, "Error");
      }
    );
  }

  onAddNewPost(newPost) {
    this.spinner.show();

    if (newPost.id) {
      this.onUpdateNewPost(newPost);
    } else {
      this.postService.postPost(newPost).subscribe(
        (post: Post) => {
          this.posts.unshift(post);

          this.spinner.hide();
          this.toastr.success("Post added success!", "Message");
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error.message, "Error");
        }
      );
    }
  }

  onUpdateNewPost(newPost) {
    this.postService.updatePost(newPost).subscribe((updtPost: Post) => {
      let editedPostIndex = this.posts.findIndex(
        (post: Post) => post.id === updtPost.id
      );
      this.posts[editedPostIndex] = updtPost;
      this.postService.emitEditEvent({ userId: 1, title: "", body: "" });
      
      this.spinner.hide();
    });
  }

  onEdit(post: Post) {
    this.postService.emitEditEvent(post);
  }
}
