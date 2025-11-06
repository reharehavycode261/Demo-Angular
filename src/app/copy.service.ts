import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyService {
  constructor() { }

  copyText(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('Texte copié dans le presse-papier: ', text);
    } catch (err) {
      console.error('Échec de la copie du texte: ', err);
    }
    document.body.removeChild(textarea);
  }
}