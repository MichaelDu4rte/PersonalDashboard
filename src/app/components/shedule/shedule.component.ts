import { Component, ElementRef, ViewChild } from '@angular/core';
import {CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem,CdkDragHandle } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-shedule',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CdkDragHandle],
  templateUrl: './shedule.component.html',
  styleUrl: './shedule.component.scss'
})
export class SheduleComponent {

  mondayItem = ['Get to work', 'Pick up groceries'];
  tuesdayItem = ['Go home', 'Fall asleep'];
  wednesdayItem = ['Sleep'];
  thursdayItem = ['Take a shower', 'Check e-mail', 'Walk dog'];
  fridayItem = ['Walk cat'];
  
  @ViewChild('newItemInput') newItemInput!: ElementRef<HTMLInputElement>;

  
  ngOnInit() {
    this.loadItemsFromLocalStorage();
  }

  // load and save local storage
  loadItemsFromLocalStorage() {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    daysOfWeek.forEach(day => {
      const savedItems = localStorage.getItem(day);
      if (savedItems) {
        (this as any)[`${day}Item`] = JSON.parse(savedItems);
      }
    });
  }

  saveItemsToLocalStorage() {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    daysOfWeek.forEach(day => {
      const items = (this as any)[`${day}Item`];
      localStorage.setItem(day, JSON.stringify(items));
    });
  }

  // dragging drop
  drop(event: CdkDragDrop<string[]>) {

    if (event.container.data.length >= 5) {
      alert('maximum items for 5')
      return; 
    }

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

    this.saveItemsToLocalStorage();

  }

  // addd item
  addItem(newItemValue: string, itemList: string[], newItemInput: HTMLInputElement) {
    newItemInput.parentElement?.classList.remove('hide'); // Hide the input container
    newItemInput.focus();

   
    if (newItemValue.trim() !== '') {
      itemList.push(newItemValue);
  
      // Reset and save
      newItemInput.value = '';
      newItemInput.parentElement?.classList.add('hide'); // Hide the input container
      this.saveItemsToLocalStorage();
    } 

  }
  
  // remove item and double click event
  removeItem(item: string, itemList: string[]) {
    const index = itemList.indexOf(item);
    if (index !== -1) {
      itemList.splice(index, 1);
      this.saveItemsToLocalStorage();
    }
  }
 
}
