import { Component } from '@angular/core';
import { SIDEBAR_ROUTES } from 'src/app/models/routes';
import { DEFAULT_SCROLLBAR_OPTIONS, ScrollbarOptions } from 'src/app/models/scrollbar';

@Component({
  selector: 'np-sidebar-wrapper',
  templateUrl: './sidebar-wrapper.component.html',
  styles: []
})
export class SidebarWrapperComponent {
  readonly scrollbarOptions: ScrollbarOptions = {
    ...DEFAULT_SCROLLBAR_OPTIONS,
    overflowBehavior: {
      x: 'visible-hidden'
    }
  };
  readonly ROUTES = SIDEBAR_ROUTES;
}
