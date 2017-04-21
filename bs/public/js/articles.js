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
    //切断内容主体部分
    function message_cut(message, length) {
        return message.substring(0, length);
    }
    //每页显示多少条
    var limit_num = 5;

    var category = parseInt(get_query("category")) || 0;
    var skip_num = parseInt(get_query("skip_num")) || 0;
    $.get("/findPublish", { "articles": category ? { "category": category } : {}, "limit_num": limit_num, "skip_num": skip_num }, function(result) {
        var result2 = JSON.stringify(result);
        result2 = JSON.parse(result2);
        if (result2 == "-1") {
            return;
        }
        for (var i = 0, length = result2.invitation.length; i < length; ++i) {

            var message_length = result2.invitation[i].message.length;
            var compiled = _.template('\
                    <article class="format-standard type-post hentry clearfix">\
                        <header class="clearfix">\
                            <h3 class="post-title">\
                                <a href="single?_id={{=_id}}">{{=title}}</a>\
                            </h3>\
                            <div class="post-meta clearfix">\
                                <span class="date">{{=date}}</span>\
                                <span class="category"><a href="articles?category={{=category}}&skip_num=0" title="View all posts in Server &amp; Database">{{=category_formit}}</a></span>\
                                <span class="comments"><a href="#" title="Comment on Integrating WordPress with Your Website">{{=reply_num}}</a></span>\
                                <span class="like-count">{{=all_praise}}</span>\
                            </div>\
                        </header>\
                        <p>' + '{{=message_part}}' + (message_length > 80 ? "......" : "") + (message_length > 80 ? '<a class="readmore-link" href="single?_id={{=_id}}" style="color:blue">查看完整内容</a>' : "") + '</p>\
                    </article>\
            ');
            result2.invitation[i].category_formit = get_category(result2.invitation[i].category);
            result2.invitation[i].date = get_localTime(result2.invitation[i].date);
            result2.invitation[i].message_part = message_cut(result2.invitation[i].message, 80);
            var compiled = compiled(result2.invitation[i]);
            $("#articles").append(compiled);
        }
    })

    //底部的分页功能
    $.get("/get_invitation_num", { "condition": category ? { "category": category } : {} }, function(result) {
        var page_num = Math.ceil(result / parseFloat(limit_num));

        //最多同时显示7页
        var max_show_num = 7;

        //如果页数大于1
        if (page_num > 1) {
            // 显示当前页
            var template = '<a href="articles?category=' + category + '&skip_num=' + skip_num + '" class="btn" id="btn' + (skip_num + 1) + '">' + (skip_num + 1) + '</a>';
            $("#pagination").append(template);
            //根据当前所在的页数，向前遍历3页
            var pre_num = 0;
            while (((skip_num - pre_num) != 0) && (pre_num != parseInt(max_show_num / 2))) {
                var template = '<a href="articles?category=' + category + '&skip_num=' + (skip_num - pre_num - 1) + '" class="btn" id="btn' + (skip_num - pre_num) + '">' + (skip_num - pre_num) + '</a>';
                $("#pagination").prepend(template);
                ++pre_num;
            }
            //向后遍历3页
            var next_num = 0;
            while (((skip_num + next_num) != page_num - 1) && (next_num != parseInt(max_show_num - pre_num - 1))) {
                var template = '<a href="articles?category=' + category + '&skip_num=' + (skip_num + next_num + 1) + '" class="btn" id="btn' + skip_num + next_num + 2 + '">' + (skip_num + next_num + 2) + '</a>';
                $("#pagination").append(template);
                ++next_num;
            }
            //如果两次遍历都没有遍历完成max_show_num页，则则需要再次补全到max_show_num页
            if ((pre_num + next_num + 1) < max_show_num) {
                //向前便利
                while (((skip_num - pre_num) != 0) && (pre_num != parseInt(max_show_num - next_num - 1))) {
                    var template = '<a href="articles?category=' + category + '&skip_num=' + (skip_num - pre_num - 1) + '" class="btn" id="btn' + (skip_num - pre_num) + '">' + (skip_num - pre_num) + '</a>';
                    $("#pagination").prepend(template);
                    ++pre_num;
                }
            }

            // 控制分页按钮的颜色，并且控制何时出现上一页下一页按钮
            $("#btn" + (skip_num + 1)).addClass("active");
            //如果点击的是第一页，让分页栏显示尾页和下一页
            if (skip_num == 0) {
                //显示下一页
                var template = '<a href="articles?category=' + category + '&skip_num=' + (skip_num + 1) + '" class="btn" id="next">下一页>></a>';
                $("#pagination").append(template);
                // 显示尾页
                var template = '<a href="articles?category=' + category + '&skip_num=' + (page_num - 1) + '" class="btn" id="end">尾页</a>';
                $("#pagination").append(template);

            } else if ((skip_num + 1) == page_num) { //如果点击的是最后一页
                //显示不是尾页
                var template = '<a href="articles?category=' + category + '&skip_num=' + (skip_num - 1) + '" class="btn" id="pre"><<上一页</a>';
                $("#pagination").prepend(template);
                var template = '<a href="articles?category=' + category + '&skip_num=0" class="btn" id="start">首页</a>';
                $("#pagination").prepend(template);
            } else { //如果是中间页
                //显示下一页
                var template = '<a href="articles?category=' + category + '&skip_num=' + (skip_num + 1) + '" class="btn" id="next">下一页>></a>';
                $("#pagination").append(template);
                // 显示尾页
                var template = '<a href="articles?category=' + category + '&skip_num=' + (page_num - 1) + '" class="btn" id="end">尾页</a>';
                $("#pagination").append(template);
                //显示不是尾页
                var template = '<a href="articles?category=' + category + '&skip_num=' + (skip_num - 1) + '" class="btn" id="pre"><<上一页</a>';
                $("#pagination").prepend(template);
                var template = '<a href="articles?category=' + category + '&skip_num=0" class="btn" id="start">首页</a>';
                $("#pagination").prepend(template);
            }
        } else { //如果只有一页
            var template = '<a class="btn active">1</a>';
            $("#pagination").append(template);
        }
    })
})