// import { Injectable } from '@nestjs/common';
// import * as fs from 'fs/promises';
// import * as path from 'path';
// import * as Handlebars from 'handlebars';
// import * as puppeteer from 'puppeteer';

// @Injectable()
// export class PdfService {
//   async generatePdfFromTemplate(
//     templateName: string,
//     data: any,
//   ): Promise<Buffer> {
//     const html = await this.renderTemplate(templateName, data);
//     return this.generatePdfFromHtml(html);
//   }

//   private async renderTemplate(
//     templateName: string,
//     context: any,
//   ): Promise<string> {
//     const filePath = path.resolve(
//       process.cwd(),
//       'src',
//       'common',
//       'services',
//       'pdf',
//       'templates',
//       templateName,
//     );
//     const templateContent = await fs.readFile(filePath, 'utf-8');
//     const compiled = Handlebars.compile(templateContent);
//     return compiled(context);
//   }

//   private async generatePdfFromHtml(html: string): Promise<Buffer> {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.setContent(html, { waitUntil: 'domcontentloaded' });

//     const pdfData = await page.pdf({
//       format: 'A4',
//       printBackground: true,
//     });

//     await browser.close();
//     return Buffer.from(pdfData);
//   }
// }
