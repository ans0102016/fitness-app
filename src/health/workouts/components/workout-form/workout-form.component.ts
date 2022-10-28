import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
    selector: 'workout-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['workout-form.component.scss'],
    template: `
        <div class="workout-form">
            
            <form [formGroup]="form">

                <div class="workout-form__name">
                    <label>
                        <h3>Meal name</h3>
                        <input
                            type="text"
                            placeholder="e.g. English Breakfast"
                            formControlName="name">
                        <div class="error" *ngIf="required">
                            Meal Name is required!
                        </div>
                    </label>
                </div>

                <div class="workout-form__food">
                    <div class="workout-form__subtitle">
                        <h3>Food</h3>
                        <button 
                            type="button"
                            class="workout-form__add"
                            (click)="addIngredient()">
                            <img src="img/add-white.svg">
                            Add Workout
                        </button>
                    </div>
                    <div formArrayName="ingredients">
                        <label *ngFor="let c of ingredients.controls; index as i">
                            <input [formControlName]="i" placeholder="e.g. Eggs">
                            <span
                                class="workout-form__remove"
                                (click)="removeIngredient(i)">
                            </span>
                        </label>
                    </div>
                </div>

                <div class="workout-form__submit">
                    <div>
                        <button 
                            type="button"
                            class="button"
                            *ngIf="!exists"
                            (click)="createWorkout()">
                            Create Meal
                        </button>
                        <button 
                            type="button"
                            class="button"
                            *ngIf="exists"
                            (click)="updateWorkout()">
                            Save
                        </button>
                        <a 
                            class="button button--cancel"
                            [routerLink]="['../']">
                            Cancel
                        </a>
                    </div>

                    <div class="meal-form__delete" *ngIf="exists">
                        <div *ngIf="toggled">
                            <p>Delete item?</p>
                            <button
                                class="confirm"
                                type="button"
                                (click)="removeItem()">
                                Yes
                            </button>
                            <button
                                class="cancel"
                                type="button"
                                (click)="toggle()">
                                No
                            </button>
                        </div>
                        <button
                            class="button button--delete"
                            type="button"
                            (click)="toggle()">
                            Delete
                        </button>
                    </div>
                </div>
                
            </form>
        </div>
    `
})
export class WorkoutFormComponent implements OnChanges {

    toggled = false;
    exists = false;

    @Input()
    workout: Workout;

    @Output()
    create = new EventEmitter<Workout>();

    @Output()
    update = new EventEmitter<Workout>();

    @Output()
    remove = new EventEmitter<Workout>();

    form = this.fb.group({
        name: ['', Validators.required]
    })
    constructor(
        private fb: FormBuilder
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        // if (changes.meal.currentValue.name) {
        //     this.exists = true;
        //     this.emptyIngredients();

        //     const value = this.meal;
        //     this.form.patchValue(value);

        //     if(value.ingredients) {
        //         for (const item of value.ingredients) {
        //             this.ingredients.push(new FormControl(item));
        //         }
        //     }
            
        //}
    }

    // emptyIngredients() {
    //     while(this.ingredients.controls.length) {
    //         this.ingredients.removeAt(0);
    //     }
    // }

    get required() {
        return (
            this.form.get('name').hasError('required') &&
            this.form.get('name').touched
        )
    }

    // get ingredients() {
    //     return this.form.get('ingredients') as FormArray;
    // }

    // addIngredient() {
    //     this.ingredients.push(new FormControl(''));
    // }

    // removeIngredient(index: number) {
    //     this.ingredients.removeAt(index);
    // }

    createWorkout() {
        if (this.form.valid) {
            this.create.emit(this.form.value);
        }
    }

    updateWorkout() {
        if (this.form.valid) {
            this.update.emit(this.form.value);
        }
    }

    removeWorkout() {
        this.remove.emit(this.form.value);
    }

    toggle() {
        this.toggled = !this.toggled;
    }
}