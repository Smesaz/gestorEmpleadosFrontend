import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  //esta url obtiene la lista de todos los empleados desde el backend
  private baseURL = "http://localhost:9090/api/v1/empleados";

  constructor(private httpClient: HttpClient) { }

  //Este metodo nos sirve para obtener los empleados
  obtenerListaDeEmpleados():Observable<Empleado[]>{ //Observable es un patron de diseño igual que el patron DAO
    return this.httpClient.get<Empleado[]>(`${this.baseURL}`);
  }

  obtenerEmpleadoPorId(id:number): Observable<Empleado>{
    return this.httpClient.get<Empleado>(`${this.baseURL}/${id}`);
  }

  //este método sirve para actualizar el empleado
  actualizarEmpleado(id:number,empleado:Empleado): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,empleado);
  }

  //Este método sirve para registrar un nuevo empleado
  registrarEmpleado(empleado:Empleado):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, empleado);
  }

  eliminarEmpleado(id:Number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

}
