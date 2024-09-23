import 'zone.js';

import { NgModule, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import './app.css';

const DATA = {
    India: 'Delhi',
    China: 'Beijing',
    Russia: 'Moscow',
    Afghanistan: 'Kabul',
    France: 'Paris',
    Germany: 'Berlin',
    England: 'London',
};

enum SelectionResult {
    none,
    correct,
    incorrect,
}

@Component({
    selector: 'app-component',
    styles: [
        '.container { display:flex; direction: row; gap: 10px;}',
        '.item {border: 1px solid black; padding: 0.2rem ; margin: 0.2rem; cursor:pointer}',
        '.item-selected { border-color: blue}',
        '.item-result-success { border-color: #66cc99}',
        '.item-result-error { border-color: red}',
    ],
    template: `
        <div class="container">
            <span
                *ngFor="let item of getList()"
                class="item"
                [class.item-selected]="isSelected(item)"
                [class.item-result-success]="
                    isSelected(item) && result === SelectionResult.correct
                "
                [class.item-result-error]="
                    isSelected(item) && result === SelectionResult.incorrect
                "
                (click)="itemClicked(item)"
            >
                {{ item }}</span
            >
            <span *ngIf="getList().length === 0">Congratulations....</span>
        </div>
    `,
})
export class AppComponent {
    SelectionResult = SelectionResult;
    selected: string[] = [];
    result: SelectionResult = SelectionResult.none;
    list: string[] = [...Object.keys(DATA), ...Object.values(DATA)];
    removedList: string[] = [];
    constructor() {}

    public getList() {
        return this.list.filter((item) => !this.removedList.includes(item));
    }
    public itemClicked(item: string) {
        if (this.selected.length >= 2) {
            // do not allow more than 2 selections
            return;
        }
        if (!this.selected.includes(item)) this.selected.push(item);

        if (this.selected.length === 2) {
            // now check if there is a match
            const match =
                DATA[this.selected[0]] === this.selected[1] ||
                DATA[this.selected[1]] === this.selected[0];

            this.result = match
                ? SelectionResult.correct
                : SelectionResult.incorrect;

            setTimeout(() => {
                if (this.result === SelectionResult.correct) {
                    this.removedList = [...this.removedList, ...this.selected];
                }
                this.selected = [];
            }, 2000);
        }
    }

    public isSelected(item: string): boolean {
        return this.selected.includes(item);
    }
}

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {}
}

platformBrowserDynamic().bootstrapModule(AppModule);
