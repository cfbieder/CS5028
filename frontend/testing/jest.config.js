module.exports = {
    transformIgnorePattern: [
        '<rootDir>/node_modules/(?!axios)/'
    ],
    moduleNameMapper: {
        '^axios$': require.resolve('axios'),
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
    },
}