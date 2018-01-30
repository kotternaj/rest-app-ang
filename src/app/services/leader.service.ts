import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';
import { Restangular, RestangularModule } from 'ngx-restangular';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';


@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
              private processHttpmsgService: ProcessHttpmsgService) { }

  getLeaders(): Observable<Leader[]>{
    return this.restangular.all('LEADERS').getList();
  }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('LEADERS', id).get();  
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('LEADERS').getList({featured: true})
    .map(leaders => leaders[0]);
  }

  
}
