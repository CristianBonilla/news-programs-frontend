import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownSelectComponent } from '@shared/components/dropdown-select/dropdown-select.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ DropdownSelectComponent ],
  imports: [ CommonModule, FormsModule ],
  exports: [ DropdownSelectComponent ]
})
export class DropdownSelectModule { }
