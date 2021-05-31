import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ToggleSidebarService } from '@modules/home/services/toggle-sidebar/toggle-sidebar.service';

@Component({
  selector: 'np-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('toggle')
  readonly toggleRef!: ElementRef<HTMLDivElement>;

  constructor(private toggleSidebar: ToggleSidebarService) { }

  ngAfterViewInit() {
    this.toggleSidebar.addToggle(this.toggleRef.nativeElement);
  }
}
