/**
 * In this question, we need to implement a functionality that can be used to show
 * different features to different users.
 * It is commonly known as A/B testing. We need to build a common utility on frontend that
 * can be used by the entire web-app to get the status of a feature flag.
 * Assume that the BE is pre-built and a mock function is provided for it.
 *
 * Functional Requirements
 *
 * getFeatureState should return the value of the provided feature flag.
 * In case, flag is missing in the response or there is an error, return the provided default value.
 *
 * getFeatureState should support caching with a ttl and minimize calls to backend APIs.
 *
 */

/**
 * Read FAQs section on the left for more information on how to use the editor
 **/

type FeatureDB = Record<string, boolean>;

const SAMPLE_FEATURES: FeatureDB = {
    show_dialog_box: true,
    enable_new_pricing: true,
};

// returns the state of *all* features for the current user
function fetchAllFeatures(): Promise<FeatureDB> {
    // mocking the fetch API call
    return new Promise((resolve) => {
        setTimeout(() => resolve(SAMPLE_FEATURES), 1000);
    });
}

const getFeatureState = (
    featureName: string,
    defaultValue: boolean
): Promise<boolean> => {
    const readFromCache = (cache: Record<string, boolean>): boolean => {
        if (typeof cache[featureName] === 'boolean') {
            return cache[featureName];
        }
        return defaultValue;
    };

    return new Promise((res) => {
        const featureDbCache: FeatureDB = (getFeatureState as any).features;
        if (!featureDbCache) {
            fetchAllFeatures().then((featuresDb) => {
                (getFeatureState as any).features = featuresDb;
                res(readFromCache(featuresDb));
            });
            return;
        }
        res(readFromCache(featureDbCache));
    });
};

const evaluate = async (
    featureName: string,
    defaultValue: boolean
): Promise<[boolean, number]> => {
    const startTime = Date.now();
    const f1 = await getFeatureState(featureName, defaultValue);
    const endTime = Date.now();
    return [f1, endTime - startTime];
};
(async () => {
    let [f, time] = await evaluate('show_dialog_box', false);
    console.assert(f === true, 'should read from db/cache');
    console.assert(time >= 1000, 'failed to query API');

    [f, time] = await evaluate('show_dialog_box', false);
    console.assert(f === true, 'should read from db/cache');
    console.assert(time === 0, 'failed to read from cache');

    [f, time] = await evaluate('show_dialog_boxxx', false);
    console.assert(f === false, 'default value should be returned');
    console.assert(time === 0, 'failed to read from cache');

    console.log('all tests passed');
})();
