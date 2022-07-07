import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ITasks } from '../model/taskapi';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
todoForm !:FormGroup;
tasks:ITasks[]=[];
inprogress:ITasks[]=[];
done:ITasks[]=[];
updateindex:any;
iseditenabled:boolean=false;
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.todoForm=this.formbuilder.group({
      item: ['', Validators.required]
    });

  }
  drop(event: CdkDragDrop<ITasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  addtask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    })
    this.todoForm.reset();
  }
  deletetask(i:number){
    this.tasks.splice(i,1);
  }
  deleteinprogresstask(i:number){
this.inprogress.splice(i,1);
  }
  deletedonetask(i:number){
    this.done.splice(i,1);
  }
onedit(item:ITasks,i:number){
this.todoForm.controls['item'].setValue(item.description);
this.updateindex=i;
this.iseditenabled=true;
}
updatetask(){
  this.tasks[this.updateindex].description=this.todoForm.value.item;
  this.tasks[this.updateindex].done=false;
  this.todoForm.reset();
  this.updateindex=undefined;
  this.iseditenabled=false;

}
}
