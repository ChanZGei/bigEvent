$(function() {
    // 登录界面链接到注册界面
    $('#link_reg').on('click',function() {
        $('.log-box').hide()
        $('.reg-box').show()
    })
    
    // 注册界面链接到登录界面
    $('#link_log').on('click',function() {
        $('.reg-box').hide()
        $('.log-box').show()
    })

    // 从layui中获取form对象
    let form = layui.form
    // 自定义表单验证
    form.verify({
        // 密码验证
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            // value 为再次输入密码框的值
            let pwd = $('.reg-box [name=password]').val()
            if(value !== pwd) {
                return '两次密码不一致！'
            }
        }
    })

    let layer = layui.layer
    // 点击注册按钮发起post请求
    $('#form_reg').on('submit',function(e) {
        e.preventDefault()
        let data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser', data, function(res) {
            if(res.status !== 0) {
               return layer.msg(res.message)
            }
            layer.msg('注册成功！')
            $('#link_log').click()
        })
    })

    // 点击登录按钮发起post请求
    $('#form_log').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $('#form_log').serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })
})