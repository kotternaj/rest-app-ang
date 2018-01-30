import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular,
              private processHttpmsgService : ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]>{
    return this.restangular.all('PROMOTIONS').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('PROMOTIONS', id).get();    
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('PROMOTIONS').getList({featured: true})
      .map(PROMOTIONS => PROMOTIONS[0]);
  }

}
