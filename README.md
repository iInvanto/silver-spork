## Description

Effective Carnival is great repo to start with nest js.

### Setting up

1. Download and install Node.js
   - Ideally using `fnm` so you can switch Node versions as required in the future
2. Download and install PostgreSQL
   1. Set the root `postgres` user's password to something you can remember, (you'll need it again later on)
   2. Test that PostgreSQL is running on your machine by entering `psql -U postgres` and then entering your password when prompted
   3. Create a carnival database with the following statement `CREATE DATABASE carnival;`
   4. If all went well and the database was created, exit psql shell.
3. Clone the project to your local machine
   - we recommend using VSCode's built in git tools for this
   - we also recommend that the project is cloned to `C:/dev/carnival` (or similar) for ease of access
4. Open the terminal in VSCode and at the root of the project run `npm install`
5. Now create a `.env` file at the root of your project with appropriate key and value (check `.env.example` for reference)
6. Now we can bootstrap the database
   1. In a terminal window, navigate to root of your project
   2. Run `npm run migration:run` (This will modify the database based on the migration files)
7. Now project is good go. Check below commands to run the app.

## Running the app

Development

```bash
npm run start
```

Watch Mode

```bash
npm run start:dev
```

Production

```bash
npm run start:prod
```

## Test

Unit Tests

```bash
npm run test
```

e2e tests

```bash
npm run test:e2e
```

Test Coverage

```bash
npm run test:cov
```

## Database

Creates migration files for changed schema

```bash
npm run migration:generate
```

Creates a new migration file

```bash
npm run migration:create --name=FILE_NAME
```

Runs all migration files

```bash
npm run migration:run
```

## License

Nest is [MIT licensed](LICENSE).
