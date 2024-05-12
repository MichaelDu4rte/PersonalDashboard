import { Component } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop'; // Corrigido
import { CommonModule, NgFor } from '@angular/common'; // Importação desnecessária

@Component({
  selector: 'app-todo',
  standalone: true, // A propriedade 'standalone' não é válida em um componente Angular
  imports: [NgFor, CdkDrag, CommonModule], // Importação corrigida
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'] // 'styleUrls' deve ser um array
})

export class TodoComponent {

  // todos list
  todos = [
    { id: 1, text: 'Fazer compras', completed: true, editing: false },
    { id: 2, text: 'Estudar AngularJS', completed: false, editing: false },
    { id: 3, text: 'Fazer exercícios', completed: false, editing: false }
  ];

  constructor() {
    this.loadTodos();
  }

  // get by id
  trackById(index: number, todo: any): number {
    return todo.id;
  }

  // change status completed
  toggleCompleted(todo: any) {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  // editing
  startEditing(todo: any) {
    todo.editing = true;
  }

  finishEditing(todo: any, event: any) {
    todo.text = event.target.value.trim();
    todo.editing = false;
    this.saveTodos();
  }


  // save changes
  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }
}