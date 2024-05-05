const StyleDictionary = require("style-dictionary");
const minifyDictionary = require('style-dictionary/lib/common/formatHelpers/minifyDictionary.js');
const fileHeader = require('style-dictionary/lib/common/formatHelpers/fileHeader.js');

StyleDictionary.registerFormat({
  name: 'customJSFormat',
  formatter: function({ dictionary, file }) {
    return fileHeader({file}) +
      'module.exports = ' +
      JSON.stringify(minifyDictionary(dictionary.tokens), null, 2);
      // module.exports['json/nested']({dictionary}) + ';';
  }
});

module.exports = {
  source: ["tokens/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
        }
      ]
    },
    scss: {
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
          destination: "tokens.scss",
          format: "scss/variables",
        }
      ]
    },
    // json: {
    //   transformGroup: "json",
    //   buildPath: "build/json/",
    //   files: [
    //     {
    //       destination: "tokens.json",
    //       format: "json/nested", 
    //     },
    //   ],
    // },
    js: {
      transformGroup: "js",
      // transforms: ["color/hex8"],
      buildPath: "build/js/",
      files: [
        {
          destination: "tokens.js",
          format: "customJSFormat"
        },
      ]
    }
  },
};
