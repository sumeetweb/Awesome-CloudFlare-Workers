//https://sub.domain.workers.dev/?host=&user=&pass=

addEventListener("fetch", event => {

    const { searchParams } = new URL(event.request.url);
    let url  = new URL(searchParams.get('host'));;
    let name = searchParams.get('user') || '';
    let pass = searchParams.get('pass') || '';
    let auth = btoa(name+':'+pass);
  
    let request = new Request(url, event.request);

    if(name == '' || pass == ''){
        console.log('Clean');
        event.respondWith(
            fetch(request, {
            headers: {
                'Origin': url,
                'Referer': url, //and this for referer
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36' //change this with your UA
                }
            })
        );
    } else {
        console.log('Authed');
        event.respondWith(
            fetch(request, {
            headers: {
                'Origin': url,
                'Referer': url, //and this for referer
                'Authorization': 'Basic '+auth,
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36' //change this with your UA
                }
            })
        );
    }
});
