import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Workout, WorkoutsService } from "../../../shared/services/workouts/workouts.service";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'workout',
    styleUrls: ['workout.component.scss'],
    template: `
        <div class="workout">
            <div class="workout__title">
                <h1>
                    <img src="/img/workout.svg">
                    <span *ngIf="workouts$ | async as workout; else title;">
                        {{ workout.name ? 'Edit' : 'Create' }} Workout
                    </span>
                    <ng-template #title>
                        Loading...
                    </ng-template>
                </h1>
            </div>
            <div *ngIf="workout$ | async as workout; else loading;">
                <workout-form
                    [workout]="workout"
                    (create)="addWorkout($event)"
                    (update)="updateWorkout($event)"
                    (remove)="removeWorkout($event)">
                </workout-form>
            </div>
            <ng-template #loading>
                <div class="message">
                    <img src="/img/loading.svg">
                    Fetching workout...
                </div>
            </ng-template>
        </div>
    `
})
export class WorkoutComponent implements OnInit, OnDestroy {

    workouts$: Observable<Workout>;
    subscription: Subscription;

    constructor(
        private workoutsService: WorkoutsService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscription = this.workoutsService.workouts$.subscribe();
        this.workouts$ = this.route.params
            .switchMap(param => {
                return this.workoutsService.getWorkout(param.id);
            })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    async addWorkout(event: Workout) {
        await this.workoutsService.addWorkout(event);
        this.backToWorkouts();
    }

    async updateWorkout(event: Workout) {
        const key = this.route.snapshot.params.id;
        await this.workoutsService.updateWorkout(key, event);
    }

    async removeWorkout(event: Workout) {
        const key = this.route.snapshot.params.id;
        await this.workoutsService.removeWorkout(key);
        this.backToWorkouts();
    }

    backToWorkouts() {
        this.router.navigate(['workouts']);
    }
}