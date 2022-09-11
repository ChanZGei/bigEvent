$(function() {
    let layer = layui.layer
  
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
    }
  
    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click',function() {
        $('#file').click()
    })

    $('#file').on('change',function(e) {
        // console.log(e)
        let filelist = e.target.files
        if(filelist.length === 0) {
            return layer.msg('请选择照片！')
        }
        // 拿到用户选择的文件
        let file = e.target.files[0]
        // 将文件转化为路径
        let imgURL = URL.createObjectURL(file)
        // 重新初始化裁剪区域
        $image.cropper('destroy').attr('src', imgURL).cropper(options)
    })
    $('#btnUpload').on('click',function() {
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 100,
          height: 100
        }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('用户更换头像失败！')
                }
                layer.msg('用户更换头像成功！')
                window.parent.getUserInfo()
            }
        })
    })
})