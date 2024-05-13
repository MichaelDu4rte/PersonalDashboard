import { Routes } from '@angular/router';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { TodoComponent } from './components/todo/todo.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PomodoroComponent } from './components/pomodoro/pomodoro.component';

export const routes: Routes = [
    {path: 'bookmarks', component: BookmarksComponent},
    {path: 'todo', component: TodoComponent},
    {path: 'pomodoro', component: PomodoroComponent},
    {path: 'gallery', component: GalleryComponent},
];
