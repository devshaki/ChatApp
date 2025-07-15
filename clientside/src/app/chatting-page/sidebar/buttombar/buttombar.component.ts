import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttombar',
  templateUrl: './buttombar.component.html',
  styleUrls: ['./buttombar.component.scss'],
})
export class ButtombarComponent implements OnInit {
  selectedToggle: string | null = null;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  onNewGroupClick() {
    this.router.navigate(['/new-group']);
  }
}
