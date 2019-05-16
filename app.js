/* eslint import/no-extraneous-dependencies:
["off", {"devDependencies": false}] */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import jsonServer from 'json-server';

import data from './server';
import config from './webpack.config';
import handleAds from './server/handle-ads';
import handleDelays from './server/handle-delay';

const apiServer = jsonServer.create();
const router = jsonServer.router(data());

apiServer.use('/api/', router);
apiServer.use(
  handleDelays,
  handleAds,
);

apiServer.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});

const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
};

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(3001, 'localhost', (err, result) => {
  if (err) {
    console.log(err);
  }

  console.log('Running on 3001');
});
