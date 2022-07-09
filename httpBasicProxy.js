addEventListener("fetch", event => {
        let url = new URL(event.request.url);
        url.hostname = ""; // Enter URL Host Without http or https like for https://google.com, Enter only google.com
        let request = new Request(url, event.request);

        event.respondWith(
            fetch(request, {
            headers: {
                'Origin': url,
                'Referer': url, //and this for referer
                // 'Authorization': 'Basic ', Add Auth of website if required
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36' //change this with your UA
                }
            })
        );
});
