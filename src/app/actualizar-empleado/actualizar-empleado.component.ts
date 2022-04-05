import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent implements OnInit {

  id:number;
  empleado:Empleado = new Empleado();
  
  constructor(private empleadoService: EmpleadoService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.empleadoService.obtenerEmpleadoPorId(this.id).subscribe(data =>{
      this.empleado = data;
    }, error => console.log(error));
  }

  irAListaDeEmpleados(){
    this.router.navigate(['/empleados']);
    Swal.fire({
      title: 'Empleado actualizado',
      text: `El empleado ${this.empleado.nombre} ha sido actualizado con éxito`,
      icon: 'success',
    });


  }

  onSubmit(){
    this.empleadoService.actualizarEmpleado(this.id, this.empleado).subscribe(data => {
      this.irAListaDeEmpleados();
    }, error => console.log(error));
  }

}
