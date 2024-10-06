import 'zone.js';

import { NgModule, Component, inject } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

import './app.css';
import { RouterModule } from '@angular/router';
import { Apollo, APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
    Continent,
    ContinentsDocument,
    Country,
    GetCountriesDocument,
    State,
} from './countries-gql';
import {
    map,
    merge,
    Observable,
    of,
    scan,
    Subject,
    switchMap,
    tap,
} from 'rxjs';

@Component({
    selector: 'app-component',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    constructor() {}
}

interface Country {
    name: string;
    code: string;
    states: Partial<State>[];
    continent: {
        name: string;
    };
}
interface ViewModel {
    continents: Continent[];
    countries: Array<Country>;
    states: Partial<State>[];
}

const DEFAULT_VIEW_MODEL: ViewModel = {
    continents: [],
    countries: [],
    states: [],
};

const createViewModel = <ViewModel>(
    sources: Observable<Partial<ViewModel>>[],
    seed?: ViewModel
): Observable<ViewModel> => {
    const seed$ = of(seed || {});

    return merge(...[seed$, ...sources]).pipe(
        scan((acc: ViewModel, cur: ViewModel) => Object.assign({}, acc, cur))
    );
};

@Component({
    selector: 'continent-dashboard',
    template: `
        <div class="continent" *ngIf="viewModel$ | async as vm">
            <div>
                @if (!vm.continents.length) {
                    <p>loading....</p>
                } @else {
                    <select (change)="selectContinent($event.target.value)">
                        <option hidden selected>Please Select A country</option>
                        @for (cont of vm.continents; track cont.code) {
                            <option value="{{ cont.code }}">
                                {{ cont.name }}
                            </option>
                        }
                    </select>
                }
            </div>

            @if (vm.countries.length) {
                <p>
                    Selected continent :: {{ vm.countries[0].continent.name }}
                </p>
                @for (country of vm.countries; track country.code) {
                    <div (click)="selectCountry(country)">
                        {{ country.name }}
                    </div>
                }
            }

            @if (vm.states.length) {
                <p>Selected Country :: {{ vm.states[0].country.name }}</p>
                @for (state of vm.states; track state.code) {
                    <div>
                        {{ state.name }}
                    </div>
                }
            }
        </div>
    `,
})
export class ContinentsComponent {
    private apollo: Apollo = inject(Apollo);

    private continentChangeSub = new Subject<string>();
    private countryChangeSub = new Subject<Country>();

    public viewModel$: Observable<ViewModel>;

    constructor() {
        const countries$ = this.fetchCountries(this.continentChangeSub).pipe(
            map((countries) => ({
                countries,
            }))
        );
        const continents$ = this.fetchContinents().pipe(
            map(
                (continents) =>
                    ({
                        continents,
                    }) as Partial<ViewModel>
            )
        );

        const state$ = this.countryChangeSub.pipe(
            map((country: Country) => {
                return {
                    states: country.states,
                };
            })
        );

        this.viewModel$ = createViewModel(
            [continents$, countries$, state$],
            DEFAULT_VIEW_MODEL
        ).pipe(tap(console.log));
    }

    public selectContinent(code: string) {
        this.continentChangeSub.next(code);
    }

    public selectCountry(country: Country) {
        this.countryChangeSub.next(country);
    }

    private fetchCountries(code$: Observable<string>): Observable<
        Array<{
            name: string;
            code: string;
            states: Partial<State>[];
        }>
    > {
        return code$.pipe(
            tap(console.log),
            switchMap((code) =>
                this.apollo.query({
                    query: GetCountriesDocument,
                    variables: { code },
                })
            ),
            map((res) => res.data.continent.countries)
        );
    }
    private fetchContinents(): Observable<Omit<Continent, 'countries'>[]> {
        return this.apollo
            .query({ query: ContinentsDocument })
            .pipe(map((res) => res.data.continents));
    }
}

export function createApollo(httpLink: HttpLink) {
    return {
        link: httpLink.create({ uri: 'https://countries.trevorblades.com/' }),
        cache: new InMemoryCache(),
    };
}

@NgModule({
    declarations: [AppComponent, ContinentsComponent],
    imports: [
        ApolloModule,
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: ContinentsComponent,
                },
            ],
            {
                enableTracing: false,
            }
        ),
    ],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {}
}

platformBrowserDynamic().bootstrapModule(AppModule);
