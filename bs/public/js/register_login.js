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
})