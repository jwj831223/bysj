$(function() {
    //得到类别
    function get_category(category) {
        switch (category) {
            case "1":
                return "机械";
            case "2":
                return "制造";
            case "3":
                return "自动化";
            default:
                return "其他";
        }
    }
    //格式化时间戳
    function get_localTime(nS) {
        return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }

    function get_query(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    //得到传入的_id;
    var _id = get_query("_id");
    console.log(_id);
    //文章详情页
    $.get("/findPublishOne", { "articles": { "_id": _id } }, function(result) {
        var result2 = JSON.stringify(result[0]);
        result2 = JSON.parse(result2);
        console.log(result2);
    })
})