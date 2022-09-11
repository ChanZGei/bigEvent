$(function() {
    getUserInfo()

    // 退出
    let layer = layui.layer
    $('#btnLogout').on('click',function(){
        layer.confirm('是否确认退出？', {icon: 3, title:'提示'}, function(index){
            // 清除本地存储中的token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = './login.html'
            layer.close(index);
          });
    })
})


// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res)
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 渲染用户头像
            renderAvatar (res.data)
        },
        // 无论成功还是失败，最终都会调用complete回调函数
        // complete: function(res) {
        //     // console.log(res)
        //     // 防止不登录直接访问首页
        //     if(res.responseJSON.status === 1 || res.responseJSON.message === '身份验证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = './login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 有昵称用昵称，没昵称用用户名
    const name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 判断有无图片头像
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}