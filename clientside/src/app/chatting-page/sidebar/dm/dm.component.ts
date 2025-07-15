import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dm',
  templateUrl: './dm.component.html',
})
export class DmComponent implements OnInit {
  @Input()
  contactName: string = '';

  @Output()
  onOpenDm: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onClickDm() {
    console.log('Opening DM with:', this.contactName);
    this.onOpenDm.emit(this.contactName);
  }
}
