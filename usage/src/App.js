import { gql, useMutation } from "@apollo/client"

const CREATE_THREAD = gql`
  mutation CreateThread($input: CreateThreadInput!) {
    createThread(input: $input) {
      thread {
        objecttype
        objectid
      }
    }
  }
`

function App() {
  // const { loading: queryLoading, error: queryError, data } = useQuery(GET_THREADS)

  const [
    createThread,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_THREAD)

  // if (queryLoading) return <p>Loading...</p>
  // if (queryError) return <p>Error :(</p>
  if (mutationError) console.log("mutationError", mutationError)
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          let input = {
            thread: {
              objecttype: "type-" + Math.random(),
              objectid: "id-" + Math.random(),
            },
          }
          createThread({ variables: { input: input } })
        }}
      >
        <button type="submit">Add Thread</button>
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </div>
  )
}

export default App
