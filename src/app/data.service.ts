import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  exportToExcel(data: any[], fileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

  exportToCsv(data: any[], fileName: string) {
    const csvData = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(data));
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.csv`;
    a.click();
  }

  exportToPdf(data: any[], fileName: string) {
    const documentDefinition = { content: JSON.stringify(data, null, 2) };
    pdfMake.createPdf(documentDefinition).download(`${fileName}.pdf`);
  }
}