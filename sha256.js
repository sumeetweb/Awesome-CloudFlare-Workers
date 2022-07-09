async function sha256(request) {
  //parse url and get params
  const url = new URL(request.url)
  const { searchParams } = new URL(request.url)
  let query = searchParams.get('q')

  if(query == null){
    return new Response(null, {
      status: 200,
    })
  }

  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(query)

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ("00" + b.toString(16)).slice(-2)).join("")
  
  //return response
  return new Response(hashHex, {
      status: 200,
    })
}

addEventListener("fetch", event => {
  event.respondWith(sha256(event.request))
})
