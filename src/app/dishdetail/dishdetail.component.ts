import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


// import { MdSliderModule } from '@angular/material';
// import { MdInputModule } from '@angular/material';
import 'rxjs/add/operator/switchMap';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
      
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  dish : Dish;
  comment = Comment;
  formErrors = {
    'comment': '',
    'author': ''
  };
  validationMessages = {
    'comment': {
      'required':   'Comments are required.',
      'minlength':  'First Name must be at least 2 characters long.'      
    },
    'author': {
      'required':   'Author info is required.',
      'minlength':  'Name must be at least 2 characters long.'      
    }
  }

  constructor(private dishservice: DishService,
    private route: ActivatedRoute, 
    private location: Location,
    private fb: FormBuilder, 
    @Inject('BaseURL') private BaseURL) { }


  ngOnInit() {
    this.createForm();

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params 
      .switchMap((params : Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish=> {this.dish = dish; this.setPrevNext(dish.id); });
    }
  createForm(){
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2)] ],
      date: ''
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));    
  this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any){
    if (!this.commentForm) { return; }
    const form= this.commentForm;
    for (const field in this.formErrors){
      //clear previous error msg (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] +=messages[key] + '';
        }
      }
    }
}

onSubmit(){
  this.comment = this.commentForm.value;  
  console.log(this.comment);
  this.commentForm.reset({
    rating: '5',
    comment: '',
    author: '',
    
  });
}
  setPrevNext(dishId : number){
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds [(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds [(this.dishIds.length + index + 1)%this.dishIds.length];
    }
  
  goBack(): void{
    this.location.back();
    }
  addComment(){
    
  }

  }

