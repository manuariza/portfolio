var count = 1;
jQuery(document).ready(function() {
    if (parseInt(ajax_var.posts_per_page_index) < parseInt(ajax_var.total_index)) {
        jQuery('.more-posts-index').css('visibility', 'visible');
        jQuery('.more-posts-index').animate({opacity: 1}, 1500);
    }
    else {
        jQuery('.more-posts-index').css('visibility', 'hidden');
        jQuery('.more-posts-index').animate({opacity: 0}, 1500);
    }


    jQuery('.more-posts-index:visible').click(function() {
        jQuery('.more-posts-index img').animate({opacity: 0.7}, 500);
        count++;
        loadArticleIndex(count);
        if (count == ajax_var.num_pages_index)
        {
            jQuery('.more-posts-index').animate({opacity: 0}, 500,
                    function() {
                        jQuery('.more-posts-index').css('visibility', 'hidden');
                    });
        }
    });
});

function loadArticleIndex(pageNumber) {
    jQuery.ajax({
        url: ajax_var.url,
        type: 'POST',
        data: "action=infinite_scroll_index&page_no_index=" + pageNumber + '&loop_file_index=loop-index',
        success: function(html) {
            jQuery(".blog-holder").append(html);// This will be the div where our content will be loaded  
            jQuery(".more-posts-index img").animate({opacity: 1}, 500);
            jQuery(".blog-item-holder").animate({opacity: 1}, 1500);
        }
    });
    return false;
}


function likePosts(id)
{
    heart = jQuery('[data-post_id=' + id + ']');

    // Retrieve post ID from data attribute  
    post_id = id;

    // Ajax call  
    jQuery.ajax({
        type: "post",
        url: ajax_var.url,
        data: "action=post-like&nonce=" + ajax_var.nonce + "&post_like=&post_id=" + post_id,
        success: function(count) {
            // If vote successful  
            if (count != "already")
            {
                heart.siblings(".count").text(count);
                heart.find('span').addClass('alreadyvoted');
                heart.find('.big-circle, .small-circle').addClass('alreadyvoted');
                heart.contents().unwrap();
            }
        }
    });

    return false;
}