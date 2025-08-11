import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/system/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,SidebarComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {

}
