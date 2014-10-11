var path = require('path');
var fs = require('fs');
var webpack = require('webpack');


module.exports = {

  entry: buildEntries(),

  output: {
    path: 'examples/__build__',
    chunkFilename: '[id].chunk.js',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  },

  resolve: {
    alias: {
      'react-router': '../../modules/index'
    }
  },

  plugins: [new webpack.optimize.CommonsChunkPlugin('shared.js')]

};


function buildEntries() {
  return fs.readdirSync('examples').reduce(function(entries, dir) {
    if (dir === 'build')
      return entries;

    var isDraft = dir.charAt(0) === '_';

    if (!isDraft && fs.lstatSync(path.join('examples', dir)).isDirectory())
      entries[dir] = './examples/'+dir+'/'+'app.js';

    return entries;
  }, {});
}

