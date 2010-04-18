// filter out self posts
if (/^http:\/\/www.reddit.com\/?(r\/[^\/]+\/?)?((new|controversial|top|saved)\/?)?(\?.*)?$/.test(window.location.href)) {
    chrome.extension.sendRequest({ 'msg': 'setModhash', 'modhash': $('input[name="uh"]').val() });

    var outbound = {};
    var shiftOn;
    var ctrlOn;

    $('a.title')
        .click(function() {
            if (!ctrlOn && !shiftOn) {
                chrome.extension.sendRequest({ 'msg': 'watchTab', 'linkUrl': this.href });
            }
        })
        .each(function() {
            outbound[this.href] = this.href;
        });
    chrome.extension.sendRequest({ 'msg': 'linkCache', 'outbound': outbound });

    $(document)
        .keydown(function(e) {
            if (e.ctrlKey) ctrlOn = true;
            else if (e.shiftKey) shiftOn = true;
        })
        .keyup(function(e) {
            if (e.ctrlKey) ctrlOn = false;
            else if (e.shiftkey) shiftOn = false;
        });
}
