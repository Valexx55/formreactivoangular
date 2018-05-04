import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:      [ BrowserModule, ReactiveFormsModule ],
    }).compileComponents();
  }));
  it('La app se ha creado', async(() => {
    let calse_componente_Raiz = TestBed.createComponent(AppComponent);
    let instancia_componente = calse_componente_Raiz.debugElement.componentInstance;
    expect(instancia_componente).toBeTruthy();
  }));
  it(`El componente tiene enviado a false`, async(() => {
    let calse_componente_Raiz = TestBed.createComponent(AppComponent);
    let instancia_componente = calse_componente_Raiz.debugElement.componentInstance;
    expect(instancia_componente.enviado).toEqual(false);
  }));
  it('El contenido de la tag h1 es Nuevo Usuario', async(() => {
    let componente = TestBed.createComponent(AppComponent);
    let elemento_raiz = componente.debugElement.nativeElement;
    expect(elemento_raiz.querySelector('h1').textContent).toContain('Nuevo usuario');
  }));
});
