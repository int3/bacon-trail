// adapted from Marvin
// jquery's $.get and $.post don't seem to work
function ajax(type, url, args, f) {
    var xhr = new XMLHttpRequest();
    var a = [];
    try {
        xhr.onreadystatechange = function(state) {
            if (xhr.readyState === 4) {
                if (f) {
                    var text = xhr.responseText;
                    f(text, xhr.status);
                }
            }
        };
        xhr.onerror = function(err) {
            console.log('xhr error:', err);
        };
        for(var k in args)
            a.push(k+'='+encodeURIComponent(args[k]));
        a = a.join('&');
        if (type === 'POST') {
            xhr.open(type, url);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(a);
        } else {
            url += '?' + a;
            xhr.open(type, url);
            xhr.send({});
        }
    } catch(e) {
        console.log('exception:', e);
    }
}
