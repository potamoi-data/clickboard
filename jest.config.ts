import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    moduleNameMapper: {
        '^lodash-es$': 'lodash',
    },
};

export default config;
