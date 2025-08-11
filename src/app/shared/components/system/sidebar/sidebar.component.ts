import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
  LayoutDashboard,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
       LayoutDashboard,
       Settings,
       HelpCircle,
       LogOut
      })
    }
  ],
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
