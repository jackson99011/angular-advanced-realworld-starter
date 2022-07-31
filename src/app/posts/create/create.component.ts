import { Article } from './../../interfaces/article';
import { CreateArticle } from './../../interfaces/create-article';
import { Router } from '@angular/router';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  post = this.formBuilder.group({
    title: this.formBuilder.control('',Validators.required),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
    tags: this.formBuilder.array([
      this.formBuilder.control('Angular'),
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS'),
    ])
  });
  constructor(private formBuilder: FormBuilder,
    private postService:PostService,
    private router:Router) { }

  ngOnInit(): void {
  }

  addTags(tsg:string):void{
    this.post.controls.tags.push(this.formBuilder.control(tsg));
  }

  removeTags(index:number):void{
    this.post.controls.tags.removeAt(index);
  }

  createPost():void{
    console.log(this.post.value);
    const createArticle:CreateArticle = {
      title: this.post.value.title || '' ,
      description: this.post.value.description || '',
      body: this.post.value.body || '',
      tagList: <Array<string>>(this.post.value.tags || []).filter(tag => !!tag)
    };

    this.postService.createArticle(createArticle).subscribe(() => {
      this.router.navigate(['/']);
    });

  }

}
