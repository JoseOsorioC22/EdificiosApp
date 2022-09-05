import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'; 
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Edificio } from './edificio';
@Injectable({
  providedIn: 'root'
})
export class EdificioService {

  readonly apiEdificios: string = "http://localhost:8080/api/v1/edificio"; 

  constructor(private http: HttpClient ) { 

  }

public obtenerEdificios(): Observable<Edificio[]>{
  let header = new HttpHeaders().set("Type-content", "aplication/json"); 
  return this.http.get<Edificio[]>(this.apiEdificios + '/listar', {headers: header}); 
}

public guardarEdificio(edificio: any):  Observable<any>
{
  return this.http.post(this.apiEdificios + '/agregar', edificio); 
}

public editarEdificio(edificio: any):  Observable<any>
{
  return this.http.put(this.apiEdificios + '/editar', edificio); 
}

public eliminarEdificio(id: number):  Observable<any>
{
  return this.http.delete(this.apiEdificios + '/eliminar/'+id,  {responseType: 'text'}).pipe(tap(),
  catchError(err => { return this.errorHandler(err)})); 
}




  errorHandler(error: HttpErrorResponse): any {
    return new Error(error.message || "server error.");
  }


}
