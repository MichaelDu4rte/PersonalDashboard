import { Component } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.scss'
})

export class PomodoroComponent {

  pomodoroTime: string = '25:00'
  shortTime: string = '5:00'
  pomodoroTimeSave =  this.pomodoroTime;
  timer: any; 
  timerRunning: boolean = false; 
  

  updatePomodoroTime(event: any) {
    const value = event.target.value;
    
    if (value !== '' ) {
      this.pomodoroTime = value;

    } else {
      this.pomodoroTime = this.pomodoroTime;
    }   
  }

  // start timer
  startTimer() {
    let timeArray = this.pomodoroTime.split(":");
    let minutes = parseInt(timeArray[0]);
    let seconds = parseInt(timeArray[1]);

    this.timerRunning = true;

    this.timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          this.playSound();
          clearInterval(this.timer);
          this.timerRunning = false; 
          this.pomodoroTime = this.pomodoroTimeSave;
          this.shortBreakButton();
          return;
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      this.pomodoroTime = this.formatTime(minutes) + ":" + this.formatTime(seconds);
    }, 1000);

    // hide and show buttons
    if(this.timerRunning == true) {
      let startButton = document.querySelector('.btn-start') as HTMLButtonElement;
      let pauseButton = document.querySelector('.btn-pause') as HTMLButtonElement;
      let resetButton = document.querySelector('.btn-reset') as HTMLButtonElement;
      let pomodoroConfig = document.querySelector('.pomodoro-config') as HTMLButtonElement;
      
      startButton.classList.remove('show')

      pauseButton.classList.remove('hide')
      pomodoroConfig.classList.add('hide')
      pomodoroConfig.classList.remove('showFlex')
      pauseButton.classList.add('show')
      resetButton.classList.remove('hide')
      resetButton.classList.add('show')
    }
  }

  // pause timer
  pauseTimer() {

    // stop timer
    clearInterval(this.timer); 
    this.timerRunning = false;
    
    // buttons
    let startButton = document.querySelector('.btn-start') as HTMLButtonElement;
    let pauseButton = document.querySelector('.btn-pause') as HTMLButtonElement;
    let resetButton = document.querySelector('.btn-reset') as HTMLButtonElement;
  
    startButton.classList.remove('hide');
    startButton.classList.add('show');
  
    pauseButton.classList.remove('show');
    pauseButton.classList.add('hide');
  }

  resetTimer() {

    // stop timer
    clearInterval(this.timer); 
    this.timerRunning = false;

    // reset timer 
    this.pomodoroTime = this.pomodoroTimeSave; 
    
    // buttons
    let startButton = document.querySelector('.btn-start') as HTMLButtonElement;
    let pauseButton = document.querySelector('.btn-pause') as HTMLButtonElement;
    let resetButton = document.querySelector('.btn-reset') as HTMLButtonElement;
    let pomodoroConfig = document.querySelector('.pomodoro-config') as HTMLButtonElement;

  
    startButton.classList.remove('hide');
    startButton.classList.add('show');
    
    pomodoroConfig.classList.remove('hide');
    pomodoroConfig.classList.add('showFlex');

    pauseButton.classList.remove('show');
    pauseButton.classList.add('hide');
  
    resetButton.classList.remove('show');
    resetButton.classList.add('hide');

    this.focusButton()

  }

  shortBreakButton() {
    
    // break timer
    this.pomodoroTime = "5:00";

    //butons
    let focusBtn = document.getElementById('focus') as HTMLButtonElement;
    let breakBtn = document.getElementById('break') as HTMLButtonElement;

    let startButton = document.querySelector('.btn-start') as HTMLButtonElement;
    let pauseButton = document.querySelector('.btn-pause') as HTMLButtonElement;
    let resetButton = document.querySelector('.btn-reset') as HTMLButtonElement;

  
    startButton.classList.remove('hide');
    startButton.classList.add('show');
  
    pauseButton.classList.remove('show');
    pauseButton.classList.add('hide');

    resetButton.classList.remove('show');
    resetButton.classList.add('hide');
   
    focusBtn.classList.remove('btn-focus');
    breakBtn.classList.add('btn-focus');

  }

  // change focus buttons
  focusButton() {
    let focusBtn = document.getElementById('focus') as HTMLButtonElement;
    let breakBtn = document.getElementById('break') as HTMLButtonElement;

    this.pomodoroTime = this.pomodoroTimeSave;

    breakBtn.classList.remove('btn-focus');
    focusBtn.classList.add('btn-focus');

  }

  // sound effect
  playSound() {
    
    let audio = new Audio('../../../assets/sounds/pomodoAlarm.mp3');
    
    audio.play();
  }
  

  // format time
  formatTime(time: number): string {
    return time < 10 ? "0" + time : "" + time;
  }
}
