const http = require("http")
const { postgraphile } = require("postgraphile")
const { makeExtendSchemaPlugin, gql } = require("graphile-utils")

const PORT = process.env.PORT || 8080
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://ubikma%40bikma:Abcabc123@bikma.postgres.database.azure.com:5432/dbbikma"

const MyRandomUserPlugin = makeExtendSchemaPlugin((build) => {
  const { pgSql: sql } = build
  return {
    typeDefs: gql`
      extend type Query {
        test: String
      }
    `,
    resolvers: {
      Query: {
        test: async (_query, args, context, resolveInfo) => {
          return "test"
        },
      },
    },
  }
})
// enableCors: Enables some generous CORS settings for the GraphQL endpoint. There are some costs associated when enabling this, if at all possible try to put your API behind a reverse proxy.
http
  .createServer(
    postgraphile(DATABASE_URL, "public", {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      appendPlugins: [MyRandomUserPlugin],
      enableCors: true,
    })
  )
  .listen(PORT, () => {
    console.log(`postgraphile is running on port ${PORT}! # ` + Date())
  })
