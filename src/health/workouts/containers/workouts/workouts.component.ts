import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { WorkoutsService, Workout } from '../../../shared/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
    selector: 'workouts',
    styleUrls: ['workouts.component.scss'],
    template: `
        <div class="workouts">
            <div class="workouts__title">
                <h1>
                    <img src="/img/workout.svg">
                    Your Workouts
                </h1>
                <a 
                    class="btn__add"
                    [routerLink]="['../workouts/new']">
                    <img src="/img/add-white.svg">
                    New Workout
                </a>
            </div>
            <div *ngIf="workout$ | async as workouts; else loading;">
                
                <div class="message" *ngIf="!workouts.length">
                    <img src="/img/face.svg">
                    No workouts found, add a new workout to start
                </div>
                <list-item
                    *ngFor="let workout of workouts"
                    [item]="workout"
                    (remove)="removeWorkout($event)">
                </list-item>
            </div>
            <ng-template #loading>
                <div class="message">
                    <img src="/img/loading.svg">
                    Fetching workouts...
                </div>
            </ng-template>
        </div>
    `
})
export class WorkoutsComponent implements OnInit, OnDestroy{

    workout$: Observable<Workout[]>;
    subscription: Subscription;

    constructor(
        private store: Store,
        private workoutsService: WorkoutsService
    ) {}

    ngOnInit() {
        this.workout$ = this.store.select<Workout[]>('workouts');
        this.subscription = this.workoutsService.workouts$.subscribe();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    removeMeal(event: Workout) {
        this.workoutsService.removeWorkout(event.$key);
    }
}