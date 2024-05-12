import { Routes } from '@angular/router';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { TodoComponent } from './components/todo/todo.component';
import { GalleryComponent } from './components/gallery/gallery.component';

export const routes: Routes = [
    {path: 'bookmarks', component: BookmarksComponent},
    {path: 'todo', component: TodoComponent},
    {path: 'gallery', component: GalleryComponent},
];
