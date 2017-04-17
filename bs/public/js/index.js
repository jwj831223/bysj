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


    //得到帖子
    $.get("/findPublish", { "limit_num": 5 }, function(result) {

        var result2 = JSON.stringify(result);
        result2 = JSON.parse(result2);

        if (result2 == "-1") {
            return;
        }
        for (var i = 0, length = result2.invitation.length; i < length; ++i) {
            var compiled = _.template('\
                <li class="article-entry standard">\
                    <h4><a href="single?_id={{=_id}}">{{=title}}</a></h4>\
                    <span class="article-meta">{{=date}} in <a href="/articles?category={{=category}}&skip_num=0" title="View all posts in Server &amp; Database">{{=category_formit}}</a></span>\
                    <span class="like-count">{{=all_praise}}</span>\
                </li>\
            ');
            result2.invitation[i].category_formit = get_category(result2.invitation[i].category);
            result2.invitation[i].date = get_localTime(result2.invitation[i].date);

            var compiled = compiled(result2.invitation[i]);
            $(".latest_invitation").append(compiled);
        }
    })

    //得到热门帖子
    $.get("/findPublish", { "limit_num": 5, sort_data: { all_praise: -1 } }, function(result) {
        var result2 = JSON.stringify(result);
        result2 = JSON.parse(result2);
        if (result2 == "-1") {
            return;
        }
        for (var i = 0, length = result2.invitation.length; i < length; ++i) {
            var compiled = _.template('\
                <li class="article-entry standard">\
                    <h4><a href="single?_id={{=_id}}">{{=title}}</a></h4>\
                    <span class="article-meta">{{=date}} in <a href="/articles?category={{=category}}&skip_num=0" title="View all posts in Server &amp; Database">{{=category_formit}}</a></span>\
                    <span class="like-count">{{=all_praise}}</span>\
                </li>\
            ');
            result2.invitation[i].category_formit = get_category(result2.invitation[i].category);
            result2.invitation[i].date = get_localTime(result2.invitation[i].date);

            var compiled = compiled(result2.invitation[i]);
            $(".hot_invitation").append(compiled);
        }
    })
})