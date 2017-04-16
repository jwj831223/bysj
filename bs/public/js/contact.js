$(function() {
    //点击登录按钮实现跳转
    $("#doLogin").click(function() {
        location.href = "/register_login";
        sessionStorage.setItem("address", "/contact");
    })

    //获取焦点时警告框消失
    $("input,textarea,select").focus(function() {
        $("#danger").fadeOut();
    })

    //点击发表按钮进行帖子的发表
    $("#publish").click(function() {


        //确保标题不能为空
        var title = $.trim($("#title").val());
        if (title == "") {
            $("#title").focus();
            $("#danger").html("标题不能为空");
            $("#danger").fadeIn();
            return;
        }
        //确保已经选择类别
        var category = $("#category").val();
        if (category == "0") {
            $("#category").focus();
            $("#danger").html("请选择帖子的类别");
            $("#danger").fadeIn();
            return;
        }

        //确保发的帖子不为空
        if ($.trim($("#message").val()) == "") {
            $("#message").focus();
            $("#danger").html("帖子内容不能为空");
            $("#danger").fadeIn();
            return;
        }


        //确保帖子标题不能大于30字
        if (title.length > 30) {
            $("#title").focus();
            $("#danger").html("标题不能大于30字");
            $("#danger").fadeIn();
            return;
        }
        //确保帖子内容不得大于10000字
        var message = $("#message").val();
        if (message.length > 10000) {
            $("#message").focus();
            $("#danger").html("帖子内容不能超过10000字");
            $("#danger").fadeIn();
            return;
        }

        //一切正常可以进行ajax提交了
        $.post("/doPublish", { "title": title, "category": category, "message": message }, function(result) {
            if (result == "1") {
                //发帖成功
                location.href = "/";
            } else if (result == "-1") {
                //发帖失败
            }
        })
    })
})