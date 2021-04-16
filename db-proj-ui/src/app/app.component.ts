import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dialog: MatDialog) { }

  public displayStatistics() {
    this.dialog.open(InfoComponent);
  }
}
