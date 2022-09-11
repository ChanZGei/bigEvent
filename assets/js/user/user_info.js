$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify (function(value) {
        if(value.length > 6) {
            return '昵称长度必须在1 ~ 6个字符之间'
        }
    })
    initUserInfo()

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if(res.status !== 0) {
                    return  layer.msg('获取用户信息失败！')
                }
                console.log(res)
                // 语法：form.val('filter', object);
                // 用于给指定表单集合的元素赋值和取值。如果 object 参数存在，则为赋值；如果 object 参数不存在，则为取值。
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置
    $('#btnReset').on('click',function(e) {
        e.preventDefault()
        initUserInfo()
    })

    // 提交
    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})