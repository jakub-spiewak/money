/** @type {import("@rtk-query/codegen-openapi").ConfigFile} */
const config = {
    schemaFile: 'http://localhost:8080/v3/api-docs',
    apiFile: './api.ts',
    outputFile: './generated/redux-api.ts',
    hooks: true,
    tag: true,
}

module.exports = config