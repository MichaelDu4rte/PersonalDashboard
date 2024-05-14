import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import {CdkDrag, CdkDragHandle, DragDropModule, CdkDropList, CdkDropListGroup, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [FormsModule, CdkDrag, CdkDragHandle,DragDropModule, CdkDropList, CdkDropListGroup, CommonModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss'
})

export class FinanceComponent {

  //variables
  totalAmount: number = 0.00;
  amount: number = 0.00;
  balance: number = 0.00;

  newItemTitle: string = '';
  newItemAmount: number = 0.00;

  lists: { id: number, title: string, amount: number }[] = [];

  // init
  ngOnInit(): void {
    const savedLists = localStorage.getItem('financeLists');
    if (savedLists) {
      this.lists = JSON.parse(savedLists);
      this.updateBalance();
    }
    
  }

  // drag and drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }

  //add
  addItem(): void {

    let errorMessage = document.getElementById('product-title-error')!;

    if (this.newItemTitle.trim() !== '' && !isNaN(this.newItemAmount) && this.newItemAmount > 0) {

      //create item
      this.lists.push({
        id: Date.now(), 
        title: this.newItemTitle,
        amount: this.newItemAmount
      });

      // save
      localStorage.setItem('financeLists', JSON.stringify(this.lists));

      this.updateBalance();

      // reset input
      this.newItemTitle = '';
      this.newItemAmount = 0.00;
      errorMessage.classList.add('hide');

    } else {
      errorMessage.classList.remove('hide');

    }
  }

  // delete
  deleteItem(id: number) {
    this.lists = this.lists.filter(item => item.id !== id);
    this.updateBalance();
    localStorage.setItem('financeLists', JSON.stringify(this.lists));
  }

 
  // update amount
  updateAmount() : void {

    let errorMessage = document.getElementById('budget-error')!;

    if(this.totalAmount >= 0 && this.totalAmount != null) {
      this.amount += this.totalAmount;
      this.balance += this.totalAmount;
      this.updateBalance();
      errorMessage.classList.add('hide');

      
    } else {
      errorMessage.classList.remove('hide');
    }
  }

 
  // update balance
  updateBalance(): void {
    this.balance = this.amount - this.lists.reduce((total, item) => total + item.amount, 0);
  }

  // total expense for array
  getTotalExpense(): number {
    return this.lists.reduce((total, item) => total + item.amount, 0);
  }

  //get item by id
  trackById(index: number, item: any) {
    return item.id; 
  }

  
}
