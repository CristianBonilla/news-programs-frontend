import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'newsBody'
})
export class NewsBodyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(body: string, isClampin = false) {
    const bodyContent = !isClampin ? `<small>${ body }</small>` : `
      <div class="text-line-clampin">
        <p>
          <small>${ body }</small>
        </p>
      </div>
    `;

    return this.sanitizer.bypassSecurityTrustHtml(bodyContent);
  }
}
