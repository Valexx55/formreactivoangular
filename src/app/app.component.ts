import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Usuario } from './user.interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
    formulario: FormGroup;
    enviado: boolean;
    eventos: any[] = [];

    //constructor(private _fb: FormBuilder) { }//forma ocpionnal, con From Builder
    constructor() {
        this.enviado = false;

        this.formulario = new FormGroup({
            nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
            direccion: new FormGroup({
                calle: new FormControl('', Validators.required),
                numero: new FormControl('')
            }),
            telefonos: new FormArray ([])
        });
     }

    aniadirTelefono ()
    {
      let form_array_telefonos = <FormArray>this.formulario.get('telefonos');
      form_array_telefonos.push(new FormControl('', [Validators.required,Validators.pattern("[0-9]{5}")]))
       /* let fatelefonos = <FormArray>this.formulario.controls['telefonos'];
        let fatelefonos2 = <FormArray>this.formulario.get('telefonos');
        let fatelefonos1 = this.formulario.controls['telefonos'] as FormArray*/
    
    }

    eliminaTelf (n : number)
    {
        console.log ('Toco eliminar '+ n);
        let fat = this.formulario.controls['telefonos'] as FormArray;
        fat.removeAt(n);
    }
    ngOnInit() {
        //Instanciando los objetos con new
        /*this.formulario = new FormGroup({
             nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
             direccion: new FormGroup({
                 calle: new FormControl('', Validators.required),
                 numero: new FormControl('')
             }),
             telefonos: new FormArray ([])
         });*///para test

        // Otra alernativa, con FormBuilder
       /* this.formulario = this._fb.group({
            nombre: ['', [Validators.required, Validators.minLength(5)]],
            direccion: this._fb.group({
                calle: ['', Validators.required],
                numero: ['8000']
            })
        });
*/
        //seteo Obsevadores para los Observables statusChanges y valueChanges del formulario  
        this.formulario.statusChanges.subscribe(x => this.escucharValidaciones(x));
        this.formulario.valueChanges.subscribe(x => this.escucharCambiosFormulario(x));

    }

    escucharValidaciones (x:any)
    {
        this.eventos.push({ event: 'Validación recalculada', object: x })
        console.log ("Formulario Validado " + x);
    }

    escucharCambiosFormulario (x:any)
    {
        this.eventos.push({ event: 'Atributo modificado', object: x })
        console.log ("Formulario Alterado " + x);
    }

    mostrarFormulario (user: Usuario)
    {
        console.log("Nombre = " + user.nombre);
        console.log("Dirección = " + user.direccion.calle + " " +  user.direccion.numero);
        console.log("Teléfonos");
        for (let tel of user.telefonos) {
            console.log(tel);
        }

        console.log("Teléfonos f");
        user.telefonos.forEach(ntel => console.log(ntel));
    }

    limpiarArrayTelefonos ()
    {
        let fat = <FormArray>this.formulario.controls.telefonos;
        while (fat.length !== 0) {
            fat.removeAt(0)
        }
        //o también
        //fat.controls = [];
    }
    limpiarFormulario ()
    {
        console.log ("Tocó resetear");
        this.formulario.reset();
        this.enviado = false;
        this.limpiarArrayTelefonos();
    }
    guardar(model: Usuario, valid: boolean) {
        this.enviado = true;
        //this.mostrarFormulario (model);
        let resultado : string = valid ? "Válido" : "No válido";
        console.log("Válido? = "+ resultado);
    }
}