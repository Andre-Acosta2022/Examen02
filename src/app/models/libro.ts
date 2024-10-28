export class Libro {
    idlibro: number;
    titulo: string; 
    paginas:number;
    edicion:string;
    estado:string;
     constructor(idlibro: number,titulo: string, paginas:number,edicion:string,estado:string){
        this.idlibro=0;
        this.titulo='';
        this.paginas=0;
        this.edicion='';
        this.estado='';
     }
}
