import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DarkmodeService {

  //===== CLAVE DE ALMACENAMIENTO =====//

  // clave que usamos para guardar el tema en localstorage
  // asi cuando recargues la pagina recuerda si estaba oscuro o claro
  private readonly storageKey = 'color-scheme';
  // private significa que solo se puede usar dentro de esta clase
  // readonly significa que no se puede reasignar despues de inicializar, es constante dentro de la clase

  //===== ESTADO ACTUAL (BEHAVIOR SUBJECT osea RXJS) =====//

  // este subject guarda el estado actual del darkmode
  // empieza en false, que significa modo claro
  // otros componentes se pueden suscribir a dark$ para enterarse de cambios
  private readonly _dark$ = new BehaviorSubject<boolean>(false);
  
  // y te preguntaras porque unas variables como dark tiene formas de escribir diferentes como _dark$ o dark$ , es por temas
  // de costumbre entre programadores, segun la tradicion poner un "_" adelante de una variable afirma que esta variable es privada
  // o interna, y en el caso de $ al final como dark$ es para afirmar que es un observable (costumbre de observables con rxjs)
  
  readonly dark$ = this._dark$.asObservable();
  // exponemos un observable público (sin poder emitir) que otros componentes pueden usar
  // y el readonly significa que no pueden reasignar esta propiedad fuera de la clase

  //===== INICIALIZACION DEL DARKMODE =====//

  // este metodo se llama al inicio de la app
  // revisa si hay un valor guardado en localstorage
  // si no hay nada, mira la preferencia del sistema operativo
  // y aplica el tema correspondiente
  init(): void {
    const saved = localStorage.getItem(this.storageKey);
    let isDark = false;

    if (saved === 'dark' || saved === 'light') {
      // si ya habia algo guardado lo usamos
      isDark = saved === 'dark';
    } else if (window.matchMedia) {
      // sino usamos la configuracion que tiene el usuario, osea por si tiene por defecto el modo oscuro en el navegador, o modo
      // claro o normal ,como yo que siempre uso modo oscuro xD
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // aplicamos el estado inicial 
    this.applyTheme(isDark);

    //===== ESCUCHA CAMBIOS DE TEMA DEL SISTEMA =====//

    // si no habia nada guardado, se queda escuchando cambios de preferencia del sistema
    // por ejemplo si el usuario cambia de claro a oscuro en windows o mac
    if (!saved && window.matchMedia) {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => this.applyTheme(e.matches, false); // actualiza tema sin guardar
      media.addEventListener?.('change', handler);
      (media as any).addListener?.(handler); // compatibilidades viejas
    }
  }

  //===== CAMBIAR ENTRE CLARO Y OSCURO =====//

  // invierte el estado actual
  toggle(): void {
    this.applyTheme(!this._dark$.value);
  }

  //===== FIJAR TEMA DIRECTO =====//

  // permite forzar modo oscuro o claro pasando true o false (esto es ma que nada para el boton y que no haya bugs con la eleccion de modo oscuro o claro del propio navegador pro parte del usuarioooo)
  setDark(isDark: boolean): void {
    this.applyTheme(isDark);
  }

  //===== APLICAR EL TEMA =====//

  // agrega o quita la clase dark en el html
  // guarda en localstorage si persist = true
  // actualiza el subject para que todos los que escuchan se enteren, si no efe
  private applyTheme(isDark: boolean, persist: boolean = true): void {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark'); // pone dark
    } else {
      root.classList.remove('dark'); // saca dark
    }
    if (persist) {
      localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light');
    }
    this._dark$.next(isDark); // actualiza estado
  }
}
