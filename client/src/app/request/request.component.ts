import { HttpClient } from '@angular/common/http';

import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

export interface Address {
  host: string;
  count: number;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  constructor(private http: HttpClient) { }

  displayedColumns: string[] = ['host', 'count'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataToDisplay: Address[] = [];
  dataSource = new ExampleDataSource(this.dataToDisplay);

  host: string = "http://api.localhost"

  checked: boolean = false;

  error: string = ""

  requesting: boolean = false;

  async requestBackendHost() {
    if (!this.requesting) {
      this.requesting = true;
  
      // Request address from server
      let response: null | Address = await this.http.get<Address>(this.host).toPromise().then(res => {
        this.error = "";
        return res;
      }).catch(error => {
        this.error = error.message;
        return null;
      });
  
      if (response != null) {
        if (!this.dataToDisplay.map(e => e.host).includes(response.host)) {
          // Add address to table
          this.dataToDisplay.push(response);

          // Sort by host name
          this.dataToDisplay.sort((a, b) => (a.host > b.host) ? 1 : ((b.host > a.host) ? -1 : 0))
        } else {
          // Update Address
          this.dataToDisplay[this.dataToDisplay.map(e => e.host).indexOf(response.host)] = response;
        }
  
        this.dataSource.setData(this.dataToDisplay);
      }
  
      this.requesting = false;
    }
  }

  async asyncRequest($event: MatSlideToggleChange) {
    this.checked = $event.checked;
    while (this.checked) {
      await this.requestBackendHost();
    }
  }
}

class ExampleDataSource extends DataSource<Address> {
  private _dataStream = new ReplaySubject<Address[]>();

  constructor(initialData: Address[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Address[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: Address[]) {
    this._dataStream.next(data);
  }
}