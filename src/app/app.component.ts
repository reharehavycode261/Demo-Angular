import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-angular';

  copyText(textElement: HTMLParagraphElement): void {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(textElement);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      alert('Texte copié dans le presse-papiers!');
    } catch (err) {
      console.error('Unable to copy text', err);
    } finally {
      selection.removeAllRanges();
    }
  }
}