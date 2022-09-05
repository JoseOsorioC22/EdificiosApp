import { Component, OnInit } from '@angular/core';
import { Edificio } from './edificio';
import { EdificioService } from './edificio.service';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  edificio: Edificio = 
  {
    idEdificio: 0,
    clave: "",
    nombre: "",
    metrosCuadrados: 0,
    altura: 0,
    numeroPisos: 0,
    numeroApartamentos: 0,
    numeroOficinas: 0,
    nombreParqueadero:  "",
    numeroPiscinas: 0,
    pais: "",
    departamento: "",
    ciudad: "",
    tieneAsensor: false,
    valorAdministracion: 0,
    tieneZonaSocial: true
  };


  edificios: Edificio [] = []; 

  constructor(private edificioService: EdificioService)
  {
    
  }

  ngOnInit(): void {
    this.edificioService.obtenerEdificios().subscribe( (edificiosList) => 
    {
      console.log(edificiosList);
      this.edificios = edificiosList; 
    })
  }


  guardar(): void
  {
    console.log("el id del edificio es: " + this.edificio.idEdificio )
        if(this.edificio.idEdificio!=0)
        {
          
          this.edificioService.editarEdificio(this.edificio).subscribe( respuesta => 
            {
                console.log(respuesta); 
            } ); 
        } else
        {
          this.edificioService.guardarEdificio(this.edificio).subscribe( respuesta => 
            {
                this.edificios.push(respuesta); 
                console.log(respuesta); 
            } ); 
        }

        this.limpiar();
     
  }

  editar(id: number): void
  {
      this.edificio = <Edificio> Object.setPrototypeOf(this.edificios.filter( ed => ed.idEdificio === id )[0], Object.prototype);
      console.log(this.edificio); 
  }

  eliminar(id: number): void
  {
          this.edificios.pop(); 
          this.edificioService.eliminarEdificio(id).subscribe(); 
     
  }

  limpiar()
  {
    this.edificio = 
    {
      idEdificio: 0,
      clave: "",
      nombre: "",
      metrosCuadrados: 0,
      altura: 0,
      numeroPisos: 0,
      numeroApartamentos: 0,
      numeroOficinas: 0,
      nombreParqueadero:  "",
      numeroPiscinas: 0,
      pais: "",
      departamento: "",
      ciudad: "",
      tieneAsensor: false,
      valorAdministracion: 0,
      tieneZonaSocial: true
    }
  }



}
