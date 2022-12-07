module.exports.http = {
  middleware: {
    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

    bodyParser: (function () {
      const opts = {limit:10000000, parameterLimit:10000};
      let fn;

      // Default to built-in bodyParser:
      fn = require('skipper');
      return fn(opts);
    })()
  }
}
