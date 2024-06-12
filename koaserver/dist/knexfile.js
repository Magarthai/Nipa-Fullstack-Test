module.exports = {
    development: {
        client: "postgresql",
        connection: {
            database: "nipa-ticket",
            user: "postgres",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
//# sourceMappingURL=knexfile.js.map