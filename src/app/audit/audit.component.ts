import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Audit } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit {
  audits = [];
  tempData: any;
  perPage = 10;
  paginationDisplay = [1, 2, 3, 4, 5];
  public searchString: string;
  show12HourFormat = true

  constructor(
    private authenticationService: AuthenticationService,
    private auditService: AuditService
  ) {
  }

  ngOnInit() {
    this.loadAllAudits();
  }

  private loadAllAudits() {
    this.auditService.getAll()
      .pipe(first())
      .subscribe(audits => {
        const data = audits.map(({
          id,
          user,
          loginTime,
          logoutTime,
          ip
        }) => ({
          id,
          user,
          'loginTime': new Date(parseInt(loginTime)),
          'logoutTime': new Date(parseInt(logoutTime)),
          ip
        }))
        this.tempData = data;
        this.audits = data.slice(0, this.perPage);
      })
  }

  paginationChange(value) {
    let first = this.paginationDisplay.find(a => a === this.paginationDisplay[0]);
    let last = this.paginationDisplay.find(a => a === this.paginationDisplay[this.paginationDisplay.length - 1]);
    const paginationArray = [];
    if (value === 'previous') {
      if (first === 1) {
        this.paginationDisplay = [1, 2, 3, 4, 5];
      } else {
        
        for (let i = this.paginationDisplay.length; i > 0; i--) {
          last = first - i
          paginationArray.push(last);
        }
        this.paginationDisplay = paginationArray;
      }
    } else if (value === 'next') {
      for (let i = 0; i < this.paginationDisplay.length; i++) {
        last = last + 1
        paginationArray.push(last);
      }
      this.paginationDisplay = paginationArray;
    } else {
      const lastIndex = value * this.perPage;
      const fisrtIndex = lastIndex - this.perPage;
      this.audits = this.tempData.slice(fisrtIndex, lastIndex)
    }
  }

  filterValue(value) {
    this.searchString = value;
  }

  changeTime() {
    this.show12HourFormat = !this.show12HourFormat;
  }
}