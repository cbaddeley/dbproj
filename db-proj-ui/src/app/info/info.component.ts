import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../api-token';

export interface ITableInfo {
  tupleCount: number;
  table: string;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  private _fetching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public fetching: Observable<boolean> = this._fetching.asObservable();

  public stats: ITableInfo[] = [];
  public displayedColumns: string[] = ['table', 'tupleCount'];

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private baseUrl: string
  ) {}

  public ngOnInit(): void {
    this._fetching.next(true);
    this.http
      .get<ITableInfo[]>(`${this.baseUrl}/stats`)
      .pipe(map((d) => this.mapStats(d)))
      .subscribe((tableData) => {
        this.stats = tableData;
        this._fetching.next(false);
      });
  }

  private mapStats(tableData: ITableInfo[]): ITableInfo[] {
    return tableData.map((d) => {
      return {
        tupleCount: d.tupleCount,
        table: d.table.toUpperCase(),
      };
    });
  }
}
