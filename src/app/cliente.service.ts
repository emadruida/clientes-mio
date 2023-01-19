import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private clientesUrl = 'http://localhost:3000/clientes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clientesUrl).pipe(
      tap((_) => console.log('fetched clientes')),
      catchError(this.handleError<Cliente[]>('getClientes', []))
    );
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${this.clientesUrl}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap((_) => console.log(`fetched cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
  }

  updateCliente(cliente: Cliente): Observable<any> {
    const url = `${this.clientesUrl}/${cliente.id}`;
    return this.http.put(url, cliente, this.httpOptions).pipe(
      tap((_) => this.log(`Modificado cliente con id=${cliente.id}`)),
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.clientesUrl, cliente, this.httpOptions)
      .pipe(
        tap((cliente) => this.log(`Guardado cliente con id=${cliente.id}`)),
        catchError(this.handleError<Cliente>('addCliente'))
      );
  }

  deleteCliente(id: number): Observable<Cliente> {
    const url = `${this.clientesUrl}/${id}`;
    return this.http.delete<Cliente>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Se ha borrado el cliente con id=${id}`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

  private log(message: string) {
    console.log(`ClienteService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
