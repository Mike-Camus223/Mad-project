import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

interface MenuItem {
  link: string;
  icon: string;
  label: string;
}

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
  @Input() expanded: boolean = true;

  menuItems: MenuItem[] = [
    { link: '/general', icon: 'layout-dashboard', label: 'General' },
    { link: '/systems', icon: 'settings', label: 'Configuración' },
    { link: '/support', icon: 'help-circle', label: 'Soporte' },
    // Podés agregar más items aquí si querés
  ];

}
