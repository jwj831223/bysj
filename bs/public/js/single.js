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
    //获取网址中的请求参数
    function get_query(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    //得到传入的_id;
    var _id = get_query("_id");
    //文章详情页
    $.get("/findPublishOne", { "articles": { "_id": _id } }, function(result) {
        //如果没有该ID对应的帖子
        if (result == "-1") {
            return;
        }
        var result2 = JSON.stringify(result[0]);
        result2 = JSON.parse(result2);

        var compiled = _.template('\
            <ul class="breadcrumb">\
                <li><a href="/">首页</a><span class="divider">/</span></li>\
                <li><a href="/articles?category={{=category}}&skip_num=0" title="View all posts in Server &amp; Database">{{=category_formit}}</a> <span class="divider">/</span></li>\
                <li class="active">{{=title}}</li>\
            </ul>\
            <article class=" type-post format-standard hentry clearfix">\
                <h1 class="post-title"><a>{{=title}}</a></h1>\
                <div class="post-meta clearfix">\
                    <span class="date">{{=date}}</span>\
                    <span class="category"><a href="/articles?category={{=category}}&skip_num=0">{{=category_formit}}</a></span>\
                    <span class="comments"><a title="Comment on Integrating WordPress with Your Website">{{=reply_num}}条评论</a></span>\
                    <span class="like-count">{{=all_praise}}</span>\
                </div>\
                <p>{{=message}}</p>\
            </article>\
         ');
        result2.category_formit = get_category(result2.category);
        result2.date = get_localTime(result2.date);
        var compiled = compiled(result2);
        $(".page-content").prepend(compiled);
        console.log(result2);
    })
})