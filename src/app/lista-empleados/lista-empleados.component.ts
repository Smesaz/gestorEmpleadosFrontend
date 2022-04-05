import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { Router } from '@angular/router';
import { EmpleadoService } from '../empleado.service';
import Swal from 'sweetalert2';
// import {Swal} from 'sweetalert2';
@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
  empleados: Empleado[];
  constructor(private empleadoServicio:EmpleadoService, private router:Router) { }

  ngOnInit(): void {
    //Datos harcodeados
  //   this.empleados = [{
  //     "id": 24,
  //     "nombre": "Luis",
  //     "apellido": "---",
  //     "email": "----@gmail.com",
  //   },
  //   {
  //     "id": 22,
  //     "nombre": "Hector",
  //     "apellido": "---",
  //     "email": "hector@gmail.com",
  //   },
  //   {
  //     "id": 20,
  //     "nombre": "-----",
  //     "apellido": "-----",
  //     "email": "-----@gmail.com",
  //   }
  // ]
    this.obtenerEmpleados(); // se suscribe a la lista de empleados suministrada por el server
  }

  actualizarEmpleado(id:Number){
    this.router.navigate(['actualizar-empleado',id]);
  }

  eliminarEmpleado(id:Number){
    Swal.fire({
      title:'Estas seguro de eliminar el empleado',
      text: 'Los cambios no serán revertidos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Empleado ELiminado!',
          '',
          'success'
        )
        this.empleadoServicio.eliminarEmpleado(id).subscribe(data => {
          this.obtenerEmpleados();
    
        });
      }
    })
  }

  private obtenerEmpleados(){
    this.empleadoServicio.obtenerListaDeEmpleados().subscribe(data => {
      this.empleados = data;
    })
  }

  verDetallesDelEmpleado(id:Number){
    this.router.navigate(['empleado-detalles',id])
  }

}
