addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
  const userip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "null";
  return new Response(userip, {status: 200});
}
