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
    var category = parseInt(get_query("category")) || 0;
    var skip_num = parseInt(get_query("skip_num")) || 0;
    $.get("/findPublish", { "articles": category ? { "category": category } : {}, "limit": 10, "skip_num": skip_num }, function(result) {
        if (result == "-1") {
            return;
        }
        for (var i = 0, length = result.invitation.length; i < length; ++i) {
            var compiled = _.template('\
                    <article class="format-standard type-post hentry clearfix">\
                        <header class="clearfix">\
                            <h3 class="post-title">\
                                <a href="single.html">{{=title}}</a>\
                            </h3>\
                            <div class="post-meta clearfix">\
                                <span class="date">{{=date}}</span>\
                                <span class="category"><a href="#" title="View all posts in Server &amp; Database">{{=category}}</a></span>\
                                <span class="comments"><a href="#" title="Comment on Integrating WordPress with Your Website">{{=reply_num}}</a></span>\
                                <span class="like-count">{{=all_praise}}</span>\
                            </div>\
                        </header>\
                        <p>{{message}}<a class="readmore-link" href="">Read more</a></p>\
                    </article>\
            ');
            result.invitation[i].category = get_category(result.invitation[i].category);
            result.invitation[i].date = get_localTime(result.invitation[i].date);
            var compiled = compiled(result.invitation[i]);
            $("#articles").append(compiled);
        }
    })
})