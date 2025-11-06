import { Component } from '@angular/core';
import { CopyService } from './copy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-angular';
  importantText = 'Texte important à copier';

  constructor(private copyService: CopyService) { }

  copyImportantText() {
    this.copyService.copyText(this.importantText);
  }
}