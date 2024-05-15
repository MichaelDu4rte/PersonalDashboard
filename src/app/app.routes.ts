import { Routes } from '@angular/router';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { TodoComponent } from './components/todo/todo.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PomodoroComponent } from './components/pomodoro/pomodoro.component';
import { FinanceComponent } from './components/finance/finance.component';
import { SheduleComponent } from './components/shedule/shedule.component';

export const routes: Routes = [
    {path: 'bookmarks', component: BookmarksComponent},
    {path: 'todo', component: TodoComponent},
    {path: 'pomodoro', component: PomodoroComponent},
    {path: 'finance', component: FinanceComponent},
    {path: 'schedule', component: SheduleComponent},
    {path: 'gallery', component: GalleryComponent},
];
