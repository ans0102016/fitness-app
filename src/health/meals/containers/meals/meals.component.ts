import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MealsService, Meal } from '../../../shared/services/meals/meals.service';
import { Store } from 'store';

@Component({
    selector: 'meals',
    styleUrls: ['meals.component.scss'],
    template: `
        <div class="meals">
            <div class="meals__title">
                <h1>
                    <img src="/img/food.svg">
                    Your Meals
                </h1>
                <a 
                    class="btn__add"
                    [routerLink]="['../meals/new']">
                    <img src="/img/add-white.svg">
                    New Meal
                </a>
            </div>
            <div *ngIf="meal$ | async as meals; else loading;">
                
                <div class="message" *ngIf="!meals.length">
                    <img src="/img/face.svg">
                    No meals, add a new meal to start
                </div>
                <list-item
                    *ngFor="let meal of meals"
                    [item]="meal"
                    (remove)="removeMeal($event)">
                </list-item>
            </div>
            <ng-template #loading>
                <div class="message">
                    <img src="/img/loading.svg">
                    Fetching meals...
                </div>
            </ng-template>
        </div>
    `
})
export class MealsComponent implements OnInit, OnDestroy{

    meal$: Observable<Meal[]>;
    subscription: Subscription;

    constructor(
        private store: Store,
        private mealsService: MealsService
    ) {}

    ngOnInit() {
        this.meal$ = this.store.select<Meal[]>('meals');
        this.subscription = this.mealsService.meals$.subscribe();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    removeMeal(event: Meal) {
        this.mealsService.removeMeal(event.$key);
    }
}