import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {CdkDrag, DragDropModule} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, RouterModule, CdkDrag, DragDropModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  constructor(private router: Router) {}

  // router for home page
  handleTabClick(route: string) {
    const currentUrlTree = this.router.parseUrl(this.router.url);
    const currentRoute = currentUrlTree.root.children['primary'].segments.map(segment => segment.path).join('/');
    
    if (currentRoute === route) {
      this.router.navigateByUrl('/');
    }
  }
}
