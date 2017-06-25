'use strict';


module.exports = function (grunt) {
  const TYPES = require('tedious').TYPES;
  const typesmap = function(value){
    if(Number.isInteger(value)){
      return TYPES.Int;
    }
    return TYPES.NVarChar;
  }



  grunt.registerMultiTask('mssql', 'query to be excuted against a ms sql server', async function () {
    const done = this.async();
    const Connection = require('tedious').Connection;
    

    const connect = async function (options) {
      return new Promise((res, rej) => {
        const connection = new Connection(options);
        connection.on('connect', () => res(connection));
        connection.on('error', (err) => rej(err));
      })
    }

    const exec = async function (connection, query) {
      const Request = require('tedious').Request;
      return new Promise((res, rej) => {
        const request = new Request(query.sql, function (err, rowCount) {
          if (err) return rej(err);
          res({});
        });
        if (query.params) {
          for (const p of Object.keys(query.params)){
            console.log('PARAMS: ' + p);
            console.log(query.params);
            request.addParameter(p, typesmap(query.params[p]),  query.params[p])
          }
        }
        connection.execSql(request);
      });
    }

    

    const queries = this.data.query.constructor === Array ? this.data.query : [this.data.query];

    try {
      for (const query of queries) {
        const connection = await connect(this.options())
        await exec(connection, query);
        connection.close();
      }
      grunt.log.ok("Queries excuted!");
      done();
    }
    catch (err) {
      grunt.log.error(err);
      done(err);
    }

  });
};
