import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import {CdkDrag, DragDropModule} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { GalleryComponent } from './components/gallery/gallery.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabsComponent, CdkDrag, DragDropModule, CommonModule, GalleryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  //date
  dateTime?: Date;

  // update date 1000 milliseconds
  ngOnInit(): void {
   this.dateTime = new Date();

   timer(0, 1000).subscribe(() => {
    this.dateTime = new Date();
   });
  }

  
}
