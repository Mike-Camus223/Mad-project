import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, inject, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlignJustify, Bell, BellOff, LifeBuoy, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, Maximize, MessageSquareMore, Minimize, Moon, Search, Settings, SquareUser, Sun } from 'lucide-angular';
import { DarkmodeService } from '../../../../core/services/darkmode/darkmode.service';
import { Subscription } from 'rxjs';

interface DropdownSettingsUser { 
  link: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-mainbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule,RouterModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        AlignJustify,
        Search, // aqui mismo debes importar los iconos de lucide icons, ayudate de la referencia que da el editor de codigo al poner su importacion //
        Moon,
        Maximize,
        Sun,
        Bell,
        SquareUser,
        MessageSquareMore,
        LifeBuoy,
        Settings,
        Minimize,
        BellOff
      })
    }
  ],
  templateUrl: './mainbar.component.html',
  styleUrl: './mainbar.component.scss'
})
export class MainbarComponent implements OnInit, OnDestroy {

  //=========== VARIABLES TOTALES =================//
  @Output() menuToggle = new EventEmitter<void>();
  private _ErefDropdown = inject(ElementRef); // injeccion del elementref //
  // esto se usa para poder detectar si un lick ocurre dentro o fuera del dropdown de usuario //
  // generando evitamiento de cierres accidentales cuando interactuamos con el //
  UserDropdown: boolean = false; // variable del estado actual del dropdown de usuario (true o false) por defecto false //
  ActiveFullscreen: boolean = false; // variable del estado actual del boton fullscreen //
  NotifyState: boolean = false; // variable del estado actual del boton de notificaciones //
  DarkmodeState: boolean = false; // variable del estado actual del icono del boton de modo oscuro //
  private _darkmode = inject(DarkmodeService); // variable con el servicio modo oscuro //
  private _subs = new Subscription(); // variable con la suscripcion del servicio modo oscuro //

  // ========== METODOS Y ARRAY CON INTERFAZ DEL DROPDOWN DE USUARIO ============= //

  // array que se guia de la inferfaz dropdownsettingsuser que sirve para el contenido dinamico del dropdown de la configuracion principal del usuario ok? //
  // si necesitas añadir otra seccion a la configuracion sigue el orden de los objetos del array tal y como indica: primero un link (que es una direccion del routerlink que se usara, ejemplo: /perfil, /settings o /messages), //
  // segundo icon pero no cualquier icono, aca por el momento usamos los iconos de la libreria lucide icons te paso el link: https://lucide.dev/icons/ , una vez elijas un icono tenes que importarlo en los providers de lucide icons que esta arriba ya te lo indico //
  // una vez importado el icono pones su nombre tal y como sale en la pagina (no lo pongas como en la importacion porque a veces tira error, hazlo como en la pagina ejemplo: "arrow-down-z-a" y no ArrowDownZA), //
  // tercero el label, que es el nombre de la seccion ejemplo: configuracion, perfil, Mensajes, etc. //
  DropdownSettingsUser: DropdownSettingsUser[] = [
    {link: '#', icon: "SquareUser", label: 'Perfil'},
    {link: '#', icon: "message-square-more", label: 'Mensajes'},
    {link: '#', icon: "life-buoy", label: 'Ayuda'},
    {link: '#', icon: "settings", label: 'Configuración'},
    // {AQUI AÑADE UN OBJETO SIGUIENDO EL ORDEN DE LOS OBJETOS DEL ARRAY Y SUS PARAMETROS, PARA ASI AÑADIR UNA SECCION MAS AL ARRAY}
  ]

  // a continuacion este es el metodo que alterna los estados true o false del dropdown //
  ToggleDropdownUser() {
    this.UserDropdown = !this.UserDropdown;
  }

  // hostlistener con metodo, esto hace que escuche globalmente los clicks en el html //
  // haciendo como resultado que si el click ocurre fuera del elemento host (usamos aca la referencia con elementreft osea ErefDropdown) //
  // cierra el dropdown automaticamente //
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this._ErefDropdown.nativeElement.contains(event.target)) {
      this.UserDropdown = false;
    }
  }

  // ============ METODO PARA BOTON FULLSCREEN ============ //

  // Metodo para el funcionamiento del efecto de pantalla Fullscreen, se encarga tanto de la entrada y el cierre //

  ToggleFullscreenButton() {
    const ElementFullScreen = document.documentElement; // variable local que refiere al html de la pagina //
  
    if (!this.ActiveFullscreen) {

      // Si se activa activefullscreen se genera el efecto fullscreen (obviamente) //
      ElementFullScreen.requestFullscreen?.() ||
      (ElementFullScreen as any).webkitRequestFullscreen?.() || // compatibilidad con Safari
      (ElementFullScreen as any).msRequestFullscreen?.();      //  compatibilidad con internet explorer (ya nadie usa eso por las dudas viste?)
    } else {

      // en caso de else cerramos el efecto fullscreen //
      document.exitFullscreen?.() ||
      (document as any).webkitExitFullscreen?.() || // compatibilidad para cerrar fullscreen en Safari
      (document as any).msExitFullscreen?.();       // compatibilidad para cerrar fullscreen en internet explorar (por si hay dinosaurios que usan esto)
    }
  
    // y esto alterna el estado //
    this.ActiveFullscreen = !this.ActiveFullscreen;
  }

  // ============ METODO PARA EL DARK MODE ============ //

  DarkmodeToggle(event?: Event) {
    event?.preventDefault(); 
    this._darkmode.toggle();
  }
  
  // ============ METODO PARA LAS NOTIFICACIONES =========== //

  NotifyToggle() {
    this.NotifyState = !this.NotifyState;
  }

  // ============ METODO PARA EL COLLAPSO DEL SIDEBAR ============ //

  onMenuClick() {
    this.menuToggle.emit();
  }

  // ============ CICLO DE VIDA ============ //

  ngOnInit(): void {
    // sincroniza DarkmodeState con el servicio para que el icono cambie al instante
    this._subs.add(
      this._darkmode.dark$.subscribe(isDark => {
        this.DarkmodeState = isDark;
      })
    );
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
