import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { Usuario } from './user.interface';

describe('ContactComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance; // AppComponent test instance
    });
  }));


  it(`Enviado a true después de guardar`, async(() => {
    let usuario : Usuario;
    comp.guardar( usuario, true);
    expect(comp.enviado).toBeTruthy();
  }));

  //TODO : TEST DE QUE EL NÚMERO DE MIEMBROS DEL ARRAY ES CERO
  //DESPUÉS DE VACIAR LOS TELÉFONOS

 it(`El formulario debería ser incorrecto`, async(() => {
    comp.formulario.controls['nombre'].setValue('');
    expect(comp.formulario.valid).toBeFalsy();
  }));

  it(`El formulario debería ser correcto`, async(() => {
    comp.formulario.controls['nombre'].setValue('valentino');
    (<FormGroup>comp.formulario.controls.direccion).controls['calle'].setValue('Fuentecilla');
    (<FormArray>comp.formulario.controls.telefonos).push(new FormControl('12345'));
    expect(comp.formulario.valid).toBeTruthy();
  }));
});