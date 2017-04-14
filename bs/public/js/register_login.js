$(function() {


    $("#switch_qlogin").click(function() {
        $(this).css({ "color": "black" });
        $(this).siblings().css({ "color": "#999" });

        $(".web_qr_login").css({ "display": "block" });
        $(".qlogin").css({ "display": "none" });
    });
    $("#switch_login").click(function() {
        $(this).css({ "color": "black" });
        $(this).siblings().css({ "color": "#999" });


        $(".web_qr_login").css({ "display": "none" });
        $(".qlogin").css({ "display": "block" });
    })


    // 表单获取焦点事件
    $("input").focus(function() {
        $(".alert-danger").fadeOut();
    })

    //登录的ajax
    $("#do_login").click(function() {
        var username = $("#u").val();
        var password = $("#p").val();

        $.post("/doLogin", { "username": username, "password": password }, function(result) {
            if (result == "1") {
                //登录成功
                location.href = "/";
            } else if (result == "-1") {
                //用户名或密码错误
                $("#login_danger").html("用户名或密码错误");
                $("#login_danger").fadeIn();
            } else if (result == "-2") {
                //服务器端发生错误
                $("#login_danger").html("服务器端发生错误");
                $("#login_danger").fadeIn();
            }
        })
    })

    // //注册的ajax
    $("#reg").click(function() {
        var username = $("#user").val();
        var password = $("#passwd").val();
        var affirm_password = $("#passwd2").val();

        // 首先确保3个输入框不能为空
        if (username == "") {
            $("#register_danger").html("用户名不能为空");
            $("#register_danger").fadeIn();
            return;
        } else if (password == "") {
            $("#register_danger").html("密码不能为空");
            $("#register_danger").fadeIn();
            return;
        } else if (affirm_password == "") {
            $("#register_danger").html("请再次确认密码");
            $("#register_danger").fadeIn();
            return;
        }
        //确保账号密码格式是否正确

        //账号由6-15 位，字母、数字、下划线
        var reg = /^[a-zA-Z0-9_]{6,15}$/;
        if (!reg.test(username)) {
            $("#register_danger").html("用户名由6-15位字母、数字、下划线组成");
            $("#register_danger").fadeIn();
            return;
        }
        //密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
        var reg = /^[a-zA-Z]\w{5,15}$/
        if (!reg.test(password)) {
            $("#register_danger").html("密码由字母开头的6-16位字母、数字、下划线组成");
            $("#register_danger").fadeIn();
            return;
        }
        //判断两次输入的密码是否一致
        if (password != affirm_password) {
            $("#register_danger").html("两次输入的密码不一致");
            $("#register_danger").fadeIn();
            return;
        }

        $.post("/doRegister", { "username": username, "password": password }, function(result) {
            if (result == "1") {
                // 注册成功
                location.href = "/";
            } else if (result == "-1") {
                //用户名已存在
                $("#register_danger").html("用户名已存在");
                $("#register_danger").fadeIn();
            } else if (result == "-2") {
                //服务器端发生错误
                $("#register_danger").html("服务器端发生错误");
                $("#register_danger").fadeIn();
            }
        })
    })
})