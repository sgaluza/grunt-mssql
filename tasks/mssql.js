'use strict';


module.exports = async function (grunt) {

  grunt.registerMultiTask('mssql', 'query to be excuted against a ms sql server', function () {

    const done = this.async();
    const Connection = require('tedious').Connection;

    const connect = async function (options) {
      return new Promise((res, rej) => {
        const connection = new Connection(this.options);
        connection.on('connect', () => res(connection));
        connection.on('error', (err) => rej(err));
      })
    }

    const exec = async function (connection, query) {
      const Request = require('tedious').Request;
      return new Promise((res, rej) => {
        const request = new Request(query, function (err, rowCount, rows) {
          if (err) return rej(err);
          res(rows);
        });
        connection.execSql(request);
      });
    }

    const queries = this.data.query.constructor === Array ? this.data.query : [this.data.query];

    try {
      const connection = await connect(this.options)
      for (const query of queries)
        await exec(connection, query);
      connection.close();
      grunt.log.ok("Queries excuted!");
      done();
    }
    catch (err) {
      grunt.log.error(err);
      done(err);
    }

  });
};
