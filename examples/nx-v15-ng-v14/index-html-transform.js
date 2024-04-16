const { resolveIndexHtml } = require('zephyr-webpack-plugin');

module.exports = (targetOptions, indexHtml) => {
    resolveIndexHtml(indexHtml);

    return indexHtml;
};


