import 'zone.js';

import {
    NgModule,
    Component,
    ViewChild,
    ViewContainerRef,
    Input,
    ChangeDetectorRef,
    createNgModule,
    Injector,
    Type,
    NgModuleRef,
    ComponentRef,
} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import './app.css';
import { LoadChildrenCallback } from '@angular/router';

interface ModuleExtension {
    ngModule: LoadChildrenCallback;
    component: LoadChildrenCallback;
}

interface StandaloneExtension {
    component: LoadChildrenCallback;
}

@Component({
    selector: 'view-component-host',
    template: ` <ng-container #viewContainer /> `,
})
export class ViewComponentHost {
    @ViewChild('viewContainer')
    viewContainer: ViewContainerRef;

    private componentRef: ComponentRef<any>;

    private viewInitialized = false;
    private extension: ModuleExtension | StandaloneExtension;

    public constructor(
        private cdr: ChangeDetectorRef,
        private injector: Injector
    ) {}

    @Input() setExtension(val: ModuleExtension | StandaloneExtension) {
        this.extension = val;
        this.renderExtension();
    }

    @Input() data: any;

    ngViewAfterInit() {
        this.viewInitialized = true;
        this.renderExtension();
    }

    private async renderExtension() {
        if (!(this.viewInitialized && this.extension)) return;
        if (this.componentRef) this.componentRef.destroy();

        const componentClass = await this.extension.component();
        let ngModuleRef!: NgModuleRef<any>;
        if ('ngModule' in this.extension) {
            // this NgModule extension
            const moduleClass = await this.extension.ngModule();
            ngModuleRef = createNgModule(
                moduleClass as Type<any>,
                this.injector
            );
        }
        this.componentRef = this.viewContainer.createComponent(
            componentClass as Type<any>,
            {
                ngModuleRef,
            }
        );
        this.setData();
        this.cdr.detectChanges();
    }

    private setData() {
        if (this.data && this.componentRef && 'data' in this.componentRef) {
            this.componentRef.data = this.data;
        }
    }
}

@Component({
    selector: 'app-component',
    template: `<div>Helloworld</div>`,
})
export class AppComponent {
    constructor() {}
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
