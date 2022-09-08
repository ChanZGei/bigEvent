$.ajaxPrefilter(function(options) {
    options.url = 'http://127.0.0.1:255' + options.url
})