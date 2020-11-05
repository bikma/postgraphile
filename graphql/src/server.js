const express = require("express")
const cors = require("cors")
const { postgraphile } = require("postgraphile")
const { makeExtendSchemaPlugin, gql } = require("graphile-utils")

const PORT = process.env.PORT || 8080
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://ubikma%40bikma:Abcabc123@bikma.postgres.database.azure.com:5432/dbbikma"

const TestPlugin = makeExtendSchemaPlugin((build) => {
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
const app = express()
app.use(cors())
app.use(
  postgraphile(DATABASE_URL, "public", {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    appendPlugins: [TestPlugin],
    enableCors: true,
  })
)

app.listen(PORT, () =>
  console.log(`postgraphile is running on port ${PORT}! # ` + Date())
)
