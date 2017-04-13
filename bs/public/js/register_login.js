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

    $("#do_login").click(function() {
        var username = $("#u").val();
        var password = $("#p").val();

        $.post("/doLogin", { "username": username, "password": password }, function(result) {
            if (result == "1") {
                alert("登陆成功了！");
            } else if (result == "-1") {
                $("#danger1").fadeIn();
            } else if (result == "-2") {
                $("#danger2").fadeIn();
            }
        })
    })
})