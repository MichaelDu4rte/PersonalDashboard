import { Component, ElementRef, ViewChild } from '@angular/core';
import {CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-shedule',
  standalone: true,
  imports: [CdkDrag, CdkDropList],
  templateUrl: './shedule.component.html',
  styleUrl: './shedule.component.scss'
})
export class SheduleComponent {

  mondayItem = ['Get to work', 'Pick up groceries'];
  tuesdayItem = ['Go home', 'Fall asleep'];
  wednesdayItem = ['Sleep'];
  thursdayItem = ['Take a shower', 'Check e-mail', 'Walk dog'];
  fridayItem = ['games', 'Study'];
  
  @ViewChild('newItemInput') newItemInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.loadItemsFromLocalStorage();
  }

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

  addItem(newItemValue: string, itemList: string[]) {
    const elements = document.querySelector('.shedule-item-new');
    elements?.classList.remove('hide');

    if (newItemValue.trim() !== '') {
      itemList.push(newItemValue);
      // Limpa o input após adicionar o item
      this.newItemInput.nativeElement.value = '';
      elements?.classList.add('hide');
      this.saveItemsToLocalStorage();

    }
  }
  
  removeItem(item: string, itemList: string[]) {
    const index = itemList.indexOf(item);
    if (index !== -1) {
      itemList.splice(index, 1);
      this.saveItemsToLocalStorage();
    }
  }
 
}
