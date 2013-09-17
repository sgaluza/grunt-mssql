# grunt-mssql

> A wrapper around tedious for executing query against Microsoft Sql Server.  This is not meant to be used in a 
production enviroment but more for E2E testing where there is a need to take database snapshot and restoring the snapshot.

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mssql');
```

## The "mssql" task

### Overview
In your project's Gruntfile, add a section named `mssql` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mssql: {
    options: {
      server: '',
      userName: '',
      password: ''
    },
    restore: {
      query: ''
    },
  },
})
```

### Options

#### server
Type: `String`
Default value: `''`

Location of the MS Sql Server.

#### userName
Type: `String`
Default value: `'.'`

Account to log in to the server

#### password
Type: `String`
Default value: `'.'`

Password for the account

#### query
Type: `String`
Default value: `'.'`

Sql statement to be executed

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
    mssql:{
        options: {
            server: '127.0.0.1',
            userName: 'user',
            password: 'password'
        },
        snapshot: {
            query: "EXECUTE SomeStoreProcedueToTakeSnapshot;"
        },
        restore: {
            query: "RESTORE DATABASE MyDatabase FROM DATABASE_SNAPSHOT = 'MyDatabaseSnapShot';"
        }
    }
})
```