const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: ['@tanstack/react-table']
        }
    }, argv);

    

    // Finally return the new config for the CLI to use.
    return config;
};

