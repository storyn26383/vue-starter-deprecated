export default function ({ $axios }) {
  $axios.onRequest(config => {
    //
  })

  $axios.onResponse(response => {
    return response
  })
}
