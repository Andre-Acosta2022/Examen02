import { Component } from '@angular/core';

import { HomeComponent } from "../home/home.component";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Libro } from '../models/libro';
import { LibroService } from '../services/libro.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [HomeComponent,TableModule,ButtonModule,ButtonGroupModule,DialogModule,InputTextModule,ReactiveFormsModule,NgIf, NgFor ],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
    libros:Libro[]=[];
    visible: boolean = false;
    formLibro:FormGroup = new FormGroup({});
    isUpdate:boolean = false;
    
    constructor(
      private libroService:LibroService,
      private messageService:MessageService
    ){}
  
    ngOnInit():void{
      this.getAllLibros();
      this.formLibro = new FormGroup({
        idLibro: new FormControl(''),
        titulo:new FormControl(''),
        paginas:new FormControl(''),
        edicion:new FormControl(''),
        estado:new FormControl(''),
      });
    }
  
  
    getAllLibros(){
      this.libroService.getLibros().subscribe((data)=>{
        this.libros=data;
        console.log(this.libros);
      });
    }
  
    showDialog() {
      this.visible = true;
      this.isUpdate=false;
  }
  
  resetFormLibros(){
    this.formLibro.reset();
  }
  
  selectLibros(libro: any){
    this.isUpdate=true;
    this.visible = true;
    this.formLibro.controls['idLibro'].setValue(libro.idLibro);
    this.formLibro.controls['titulo'].setValue(libro.titulo);
    this.formLibro.controls['paginas'].setValue(libro.paginas);
    this.formLibro.controls['edicion'].setValue(libro.edicion);
    this.formLibro.controls['estado'].setValue(libro.estado);
  }
  
    CrearLibros() {    
      this.libroService.crearLibro(this.formLibro.value).subscribe({
        next: (resp) => {
          if (resp) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              background: '#fff', 
              didOpen: (Toast) => {
                Toast.onmouseenter = Swal.stopTimer;
                Toast.onmouseleave = Swal.resumeTimer;
              },
              customClass: {
                popup: 'custom-toast-popup'
              }
            });
            Toast.fire({
              icon: 'success',
              title: 'Libro creado'
            });
            this.getAllLibros();
            this.formLibro.reset();
            this.visible=false;
          }
        },
        error: (err) => {
          console.error('Error creando el libro', err);
        }
      }
      );
    }
  
    actualizarLibro() {
      const libro = this.formLibro.value;
      if (!libro.idLibro) {
        this.visible=false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El producto no tiene un ID válido para actualizar.',
          background: '#fff',
          customClass: {
            popup: 'custom-toast-popup'
          }
        });
        return;
      }
    
      this.libroService.editarLibro(libro).subscribe({
        next: (resp) => {
          if (resp) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              background: '#fff',
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
              customClass: {
                popup: 'custom-toast-popup'
              }
            });
            
            Toast.fire({
              icon: 'success',
              title: 'Libro actualizado'
            });
            this.getAllLibros();
            this.formLibro.reset();
            this.visible=false;
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'Ocurrió un error al intentar actualizar el producto. Intenta de nuevo más tarde.',
            background: '#fff',
            customClass: {
              popup: 'custom-toast-popup'
            }
          });
          console.error('Error al actualizar el producto:', err);
        }
      });
    }
    
    eliminarLibro(idlibro: number){
      Swal.fire({
        title: "¿Estás seguro de borrar este Libro?",
        text: "¡No serás capaz de reveritrlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#19e212",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borralo!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Borrado!",
            text: "El dato ha sido borrado",
            icon: "success"
          });
          this.libroService.deleteLibro(idlibro).subscribe(resp=>{this.getAllLibros();});
        }
      });
    }
}
