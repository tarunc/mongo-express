module.exports = function createConfig(options) {
  options = options || {};
  options.mongoDbUrl = options.mongoDbUrl || 'mongodb://localhost:27017/test';
  
  var mongoUrl = options.mongoDbUrl;
  var url = require('url').parse(mongoUrl);
  var auth = url.auth && url.auth.split(':');

  var config = {
    mongodb: {
      server: url.hostname || 'localhost',
      port: parseInt(url.port, 10) || 27017,

      //autoReconnect: automatically reconnect if connection is lost
      autoReconnect: true,
      //poolSize: size of connection pool (number of connections to use)
      poolSize: 4,
      //set admin to true if you want to turn on admin features
      //if admin is true, the auth list below will be ignored
      //if admin is true, you will need to enter an admin username/password below (if it is needed)
      admin: false,


      // >>>>  If you are using regular accounts, fill out auth details in the section below
      // >>>>  If you have admin auth, leave this section empty and skip to the next section
      auth: [
        /*
         * Add the the name, the username, and the password of the databases you want to connect to
         * Add as many databases as you want!
        {
          database: 'test',
          username: 'user',
          password: 'pass'
        }
        */
        {
          database: url.path.substr(1) || 'test'
        }
      ],


      //  >>>>  If you are using an admin mongodb account, or no admin account exists, fill out section below
      //  >>>>  Using an admin account allows you to view and edit all databases, and view stats

      //leave username and password empty if no admin account exists
      adminUsername: '',
      adminPassword: '',
      //whitelist: hide all databases except the ones in this list  (empty list for no whitelist)
      whitelist: [],
      //blacklist: hide databases listed in the blacklist (empty list for no blacklist)
      blacklist: []
    },
    site: {
      //baseUrl: the URL that mongo express will be located at
      //Remember to add the forward slash at the end!
      baseUrl: options.baseUrl || '/',
      // port: 8081,
      // cookieSecret: 'cookiesecret',
      // sessionSecret: 'sessionsecret'
    },
    options: {
      //documentsPerPage: how many documents you want to see at once in collection view
      documentsPerPage: options.documentsPerPage || 10,
      //editorTheme: Name of the theme you want to use for displaying documents
      //See http://codemirror.net/demo/theme.html for all examples
      editorTheme: options.editorTheme || "rubyblue",

      //The options below aren't being used yet

      //cmdType: the type of command line you want mongo express to run
      //values: eval, subprocess
      //  eval - uses db.eval. commands block, so only use this if you have to
      //  subprocess - spawns a mongo command line as a subprocess and pipes output to mongo express
      cmdType: 'eval',
      //subprocessTimeout: number of seconds of non-interaction before a subprocess is shut down
      subprocessTimeout: 300
    }
  };

  if (auth && auth.length) {
    config.mongodb.auth[0].username = auth[0];
    config.mongodb.auth[0].password = auth[1];
  }
  
  return config;
};
