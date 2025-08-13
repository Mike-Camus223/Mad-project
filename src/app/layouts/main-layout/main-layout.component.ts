import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/system/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { MainbarComponent } from "../../shared/components/system/mainbar/mainbar.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, MainbarComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {

}
