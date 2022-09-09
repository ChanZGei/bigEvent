$.ajaxPrefilter(function(options) {
    options.url = 'http://127.0.0.1:255' + options.url

    if(options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete= function(res) {
        if(res.responseJSON.status === 1 || res.responseJSON.message === '身份验证失败！') {
            localStorage.removeItem('token')
            location.href = './login.html'
        }
    }
})