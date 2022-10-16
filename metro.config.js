// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
const finalConfig = {
    ...config,
    resolver: {
        extraNodeModules: {
            stream: require.resolve('readable-stream'),
        },
    },
}
module.exports = finalConfig
