import { Component, HostListener } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop'; // Corrigido
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CdkDrag, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  // images
  images = [
    { id: 1, url: 'https://images8.alphacoders.com/128/1281520.jpg' },
    { id: 2, url: 'https://images.alphacoders.com/113/1138740.png' },
    { id: 3, url: 'https://images6.alphacoders.com/122/1224149.png' },
    { id: 4, url: 'https://images8.alphacoders.com/105/1055726.png' },
    { id: 5, url: 'https://images7.alphacoders.com/113/1130461.png' },
    { id: 6, url: 'https://giffiles.alphacoders.com/210/210726.gif' },
    { id: 7, url: 'https://giffiles.alphacoders.com/168/168285.gif' },
  ];

  // index image
  currentIndex = 0;

  // next
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  //back
  backImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  selectImage(index: number) {
    // change image
    this.currentIndex = index;
  }

  // key pressed
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.backImage();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    }
  }

 
  // setbackground
  setBackground(event: MouseEvent) {
    event.preventDefault();
    const imageSrc = this.images[this.currentIndex].url;
    const appWrapper = document.querySelector('.app-wrapper') as HTMLElement;
    if (appWrapper) {
      appWrapper.style.backgroundImage = `url('${imageSrc}')`;
    }
  }

 
}
