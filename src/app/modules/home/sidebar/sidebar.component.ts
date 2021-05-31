import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { WINDOW } from '@core/providers/window.provider';
import { ToggleSidebarService } from '@modules/home/services/toggle-sidebar/toggle-sidebar.service';

@Component({
  selector: 'np-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements AfterViewInit {
  private readonly $body: HTMLElement;
  @ViewChild('sidebar')
  readonly sidebarRef!: ElementRef<HTMLDivElement>;

  constructor(
    @Inject(WINDOW) { document }: Window,
    private toggleSidebar: ToggleSidebarService
  ) {
    this.$body = document.body;
  }

  ngAfterViewInit() {
    this.toggleSidebar.addSidebar(this.sidebarRef.nativeElement);
  }

  minimize() {
    this.$body.classList.toggle('sidebar-mini');
  }
}
