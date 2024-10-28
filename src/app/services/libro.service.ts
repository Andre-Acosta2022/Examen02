import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro } from '../models/libro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl="http://localhost:8080/api/Libros"
  constructor(private http: HttpClient) { }

  getLibros():Observable<Libro[]>{
    return this.http.get<Libro[]>(this.apiUrl);
  }
  getLibroById(idLibro:number):Observable<Libro>{
    return this.http.get<Libro>(`${this.apiUrl}/${idLibro}`);
  }
  crearLibro(libro: Libro):Observable<Libro>{
    return this.http.post<Libro>(this.apiUrl,libro);
  }
  editarLibro(libro: Libro):Observable<Libro>{
    return this.http.post<Libro>(this.apiUrl,libro);
  }
  deleteLibro(idLibro:number){
    return this.http.delete(`${this.apiUrl}/${idLibro}`);
  }
}
