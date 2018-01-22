import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Type } from '@angular/compiler/src/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DtoService {

  constructor(protected url: string, protected http: HttpClient) { }

  /**
   * Alle Objekte auf der DB abfragen
   * @returns {Observable<any[]>} 
   */
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url)
      .pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getAll', []))
      );
  }

  /**
   * Ein Objekt anhand der ID abfragen
   * @returns {Observable<any>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID des gesuchten Objekts
   */
  getById(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Object id=${id}`);
        }),
        catchError(this.handleError<Object>(`getById id=${id}`))
      );
  }

  /**
   * Objekt erstellen
   * Objekt wird ohne ID an den Server geschickt (ID wird einfach ignoriert)
   * @param {resource} Objekt
   * @returns {Observable<any>}
   */
  create(resource): Observable<any> {
    return this.http.post(this.url, resource, httpOptions)
      .pipe(
      tap((resource) => this.log(`added Object w/ id=${resource.toString()}`)),
      catchError(this.handleError<Object>('create'))
      );
  }

  /**
   * Objekt bearbeiten
   * Das Objekt in der DB mit der gleichen ID wird durch das gesendete Objekt ersetzt.
   * Existiert kein Objekt mit dieser ID in der DB, wird ein neues erstellt.
   * @param {resource} Objekt
   * @returns {Observable<any>}
   */
  update(resource): Observable<any> {
    return this.http.put(this.url, resource, httpOptions)
      .pipe(
      tap((resource) => this.log(`updated Object w/ id=${resource.toString()}`)),
      catchError(this.handleError<Object>('update'))
      );
  }
  
  /**
   * Ein Objekt anhand der ID löschen
   * @returns {Observable<any>} 
   * @param id ID des zu löschenden Objekts
   */
  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url, httpOptions)
      .pipe(
      tap(_ => this.log(`deleted Object id=${id}`)),
      catchError(this.handleError<Object>('delete'))
      );
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log("an Error occured:");
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  protected log(message: string) {
    console.log(message);
  }
}
