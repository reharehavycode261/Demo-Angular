import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
// Importez pdfMake après installation
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ExportDataService {

  constructor() {}

  exportToExcel(data: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportToCSV(data: any[], fileName: string): void {
    const csvArray = XLSX.utils.json_to_sheet(data);
    const csvOutput: string = XLSX.utils.sheet_to_csv(csvArray);
    const blob: Blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, fileName + '.csv');
  }

  exportToPDF(data: any[], fileName: string): void {
    const docDefinition = {
      content: [
        {
          table: {
            body: this.buildPdfTableBody(data),
          }
        }
      ]
    };
    pdfMake.createPdf(docDefinition).download(fileName + '.pdf');
  }

  private buildPdfTableBody(data: any[]): any[] {
    if (!data.length) return [];
    const headers = Object.keys(data[0]);
    const body = [headers];
    data.forEach((row: any) => {
      body.push(headers.map(header => row[header]));
    });
    return body;
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';