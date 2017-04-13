$(function() {

    $.ajax({
        type: "GET",
        url: "/ceshi.json",
        dataType: "text",
        success: function(data) {
            var data = JSON.parse(data);
            for (var i = 0, length = data.article_intro.length; i < length; ++i) {
                var compiled = _.template('\
                <li class="article-entry standard">\
                    <h4><a href="single.html">{{=tittle}}</a></h4>\
                    <span class="article-meta">{{=time}} in <a href="#" title="View all posts in Server &amp; Database">{{=category}}</a></span>\
                    <span class="like-count">{{=praise}}</span>\
                </li>\
            ');
                var compiled = compiled(data.article_intro[i]);
                $(".featured").append(compiled);
            }
        }
    })
})