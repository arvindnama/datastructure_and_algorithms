import './styles.css';

const container = document.body.querySelector('.harness-container');

if (container) {
    container.innerHTML = `
    <div class="gql-sample">
        <select class="continents-dropdown">
          <option selected hidden> Select A Continent </option>
        </select>

        <div class="country-container"></div>
    </div>
`;
}

interface QueryResult<T> {
    data: T;
}

interface Country {
    name?: string;
    code?: string;
}

interface Continent {
    code?: string;
    name?: string;
    countries: Array<Country>;
}

interface ContinentsQueryResult {
    continents: Array<Continent>;
}

interface ContinentQueryResult {
    continent: {
        name?: string;
        countries?: Array<Continent>;
    };
}

const gqlQuery = <T>(
    query: string,
    variables?: Record<string, unknown>
): Promise<T> => {
    return fetch('https://countries.trevorblades.com/', {
        method: 'POST',
        headers: [['Content-Type', 'application/json']],
        body: JSON.stringify({
            query,
            variables,
        }),
    }).then((res) => res.json());
};

const getContinents = (): Promise<Array<Continent>> => {
    return gqlQuery<QueryResult<ContinentsQueryResult>>(`
        query {
            continents {
                code
                name
            }
        }
    `).then((res) => res.data.continents);
};

const getCountries = (code: string): Promise<Array<Country>> => {
    return gqlQuery<QueryResult<ContinentQueryResult>>(
        `
            query getCountriesForContinentCode($code: ID!) {
                continent (code: $code) {
                    name,
                    countries {
                        code
                        name
                    }
                }
            }
        `,
        {
            code,
        }
    ).then((res) => res.data.continent.countries!);
};

const addContinents = (
    continents: Array<Continent>,
    select: HTMLSelectElement
) => {
    continents
        .map((c) => {
            const option = document.createElement('option');
            option.id = c.code!;
            option.value = c.code!;
            option.innerText = c.name!;
            return option;
        })
        .forEach((o) => select.appendChild(o));
};

const addCountries = (countries: Array<Country>, div: HTMLDivElement) => {
    countries
        .map((c) => {
            const div = document.createElement('div');
            div.id = c.code!;
            div.innerText = c.name!;
            return div;
        })
        .forEach((cDiv) => div.appendChild(cDiv));
};

const main = async () => {
    const continentsSelect = document.querySelector(
        '.continents-dropdown'
    ) as HTMLSelectElement;
    const continents = await getContinents();
    addContinents(continents, continentsSelect);

    const countryContainer = document.querySelector(
        '.country-container'
    )! as HTMLDivElement;
    continentsSelect.addEventListener('change', async (e) => {
        const code = (e.target! as any).value;
        // clear all countries
        countryContainer.innerHTML = '';
        const countries = await getCountries(code);
        addCountries(countries, countryContainer);
    });
};

main();
