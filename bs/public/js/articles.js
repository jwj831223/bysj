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
                                <a href="single.html">{{=title}}</a>\
                            </h3>\
                            <div class="post-meta clearfix">\
                                <span class="date">{{=date}}</span>\
                                <span class="category"><a href="articles?category={{=category}}&skip_num=0" title="View all posts in Server &amp; Database">{{=category_formit}}</a></span>\
                                <span class="comments"><a href="#" title="Comment on Integrating WordPress with Your Website">{{=reply_num}}</a></span>\
                                <span class="like-count">{{=all_praise}}</span>\
                            </div>\
                        </header>\
                        <p>' + '{{=message_part}}' + (message_length > 80 ? "......" : "") + (message_length > 80 ? '<a class="readmore-link" href="" style="color:blue">查看完整内容</a>' : "") + '</p>\
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
        for (var i = 1, length = page_num; i < length + 1; ++i) {
            var template = '<a href="articles?category=' + category + '&skip_num=' + (i - 1) + '" class="btn" id="btn' + i + '">' + i + '</a>';
            $("#pagination").append(template);
        }
        if (page_num > 1) {
            var template = '<a href="#" class="btn" id="next">下一页>></a>';
            $("#pagination").append(template);
        }

        //给页数按钮绑定事件
        // for (var i = 1; i <= page_num; ++i) {
        //     (function(i) {
        //         $("#btn" + i).click(function() {
        //             $("#pagination a").removeClass("active");
        //             $(this).addClass("active");
        //             if (i != 1) {
        //                 $("#pre").remove();
        //                 $("#next").remove();
        //                 var pre = '<a href="#" class="btn" id="pre">上一页 <<</a>';
        //                 $("#pagination").prepend(pre);
        //                 var next = '<a href="#" class="btn" id="next">下一页 >></a>';
        //                 $("#pagination").append(next);
        //             }
        //             if (i == 1) {
        //                 $("#pre").remove();
        //                 var next = '<a href="#" class="btn" id="next">下一页 >></a>';
        //                 $("#pagination").append(next);
        //             }
        //             if (i == page_num) {
        //                 $("#next").remove();
        //             }
        //         })
        //     })(i);

        // }

        //给低栏绑定按钮绑定事件，控制分页按钮的颜色，并且控制何时出现上一页下一页按钮
    })
})