$(function() {



    $.get("/findPublish", function(result) {
        for (var i = 0, length = result.invitation.length; i < length; ++i) {
            var compiled = _.template('\
                <li class="article-entry standard">\
                    <h4><a href="single.html">{{=tittle}}</a></h4>\
                    <span class="article-meta">{{=date}} in <a href="#" title="View all posts in Server &amp; Database">{{=category}}</a></span>\
                    <span class="like-count">{{=category}}</span>\
                </li>\
            ');
            var compiled = compiled(result.invitation[i]);
            $(".featured").append(compiled);
        }
    })
})