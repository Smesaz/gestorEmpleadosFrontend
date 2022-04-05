import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent implements OnInit {

  empleado: Empleado = new Empleado();

  constructor(private empleadoServicio: EmpleadoService, private router: Router) { }

  ngOnInit(): void {
  }

  guardarEmpleado(){
    this.empleadoServicio.registrarEmpleado(this.empleado).subscribe(data =>{
      console.log(data);
      this.irALaListaDeEmpleados();
    }, error => {
      console.log(error)
      Swal.fire({
        title:'Error al crear nuevo empleado',
        icon: 'error',
      });
    });
  }
  
irALaListaDeEmpleados(){
  this.router.navigate(['/empleados']);
}

  onSubmit(){
    console.log(this.empleado);
    Swal.fire({
      title: 'Empleado creado exitósamente',
      icon: 'success',
    });
    this.guardarEmpleado();
  }

}
