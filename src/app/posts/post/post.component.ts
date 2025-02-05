import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { Article } from '../../interfaces/article';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  article? : Article;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      map(paramMap => paramMap.get('id') || ''),
      switchMap(id => this.postService.getArticle(id))
    ).subscribe((result) => {
      this.article = result.article
    });
  }

}
