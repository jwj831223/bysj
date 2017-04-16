$(function() {
    function get_query(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var classify = parseInt(get_query("classify")) || 0;
    var skip_num = parseInt(get_query("skip_num")) || 0;

    $.get("/findPublish", {})

})