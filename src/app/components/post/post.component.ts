import { Component, OnInit ,Input} from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { PostService } from 'src/app/services/api/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Input() onDelete: Function;
  numOfLikes:number;
  hasLiked:boolean

  constructor(
    private sessionService:SessionService,
    private postService:PostService
    ) { }

  ngOnInit() {
    this.numOfLikes = (this.post.likes && this.post.likes.length) || 0;
    this.hasLiked = this.post.likes && this.post.likes.includes(+this.sessionService.getUser().id)
    console.log(this.hasLiked)
  }

  handlePostLike(){
    if(this.hasLiked) return;
    this.postService.likePost(this.post.id)
    .then(()=>{
      // handle success
      this.hasLiked = true;
      this.numOfLikes++;
      }
    )
    .catch(()=>{
      // handle error
      })
  }
}
