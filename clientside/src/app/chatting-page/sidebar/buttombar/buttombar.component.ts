import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttombar',
  templateUrl: './buttombar.component.html',
  styleUrls: ['./buttombar.component.scss'],
})
export class ButtombarComponent implements OnInit {
  selectedToggle: string | null = 'Groups';

  @Output() toggleSelected = new EventEmitter<string>();

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  onToggleChange(value: string) {
    this.selectedToggle = value;
    this.toggleSelected.emit(value);
  }

  onNewGroupClick() {
    this.router.navigate(['/new-group']);
  }
}
