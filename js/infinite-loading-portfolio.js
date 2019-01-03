var count = 1;
jQuery(document).ready(function() {
    if (parseInt(ajax_var.posts_per_page) < parseInt(ajax_var.total)) {
        jQuery('.more-posts-portfolio').css('visibility', 'visible');
        jQuery('.more-posts-portfolio').animate({opacity: 1}, 1500);
    }
    else {
        jQuery('.more-posts-portfolio').css('visibility', 'hidden');
        jQuery('.more-posts-portfolio').animate({opacity: 0}, 1500);
    }


    jQuery('.more-posts-portfolio:visible').click(function() {
        jQuery('.more-posts-portfolio img').animate({opacity: 0.7}, 500);
        count++;
        loadArticlePortfolio(count);
        if (count == ajax_var.num_pages)
        {
            jQuery('.more-posts-portfolio').animate({opacity: 0}, 500,
                    function() {
                        jQuery('.more-posts-portfolio').css('visibility', 'hidden');
                    });
        }
    });
});

function loadArticlePortfolio(pageNumber) {
    jQuery.ajax({
        url: ajax_var.url,
        type: 'POST',
        data: "action=infinite_scroll&page_no=" + pageNumber + '&loop_file=loop-portfolio',
        success: function(html) {
            $container = jQuery('.grid');

            var $newItems = jQuery(html);

            //Add new items to the gallery
            $container.isotope('insert', $newItems);
            // initialize Isotope after all images have loaded
            $container.imagesLoaded(function() {
                $container.isotope({
                    animationOptions: {
                        duration: 7500,
                        easing: 'elasin',
                        queue: false
                    }
                });
                //Fix for gallery item text
                //Fix for portfolio item text
                jQuery('.portfolio-text-holder').each(function() {
                    jQuery(this).find('p.portfolio-text').css('margin-top', jQuery(this).height() / 2 - 20);
                });

                //PrettyPhoto initial
                jQuery('a[data-rel]').each(function() {
                    jQuery(this).attr('rel', jQuery(this).data('rel'));
                });

                jQuery("a[rel^='prettyPhoto']").prettyPhoto({
                    animation_speed: 'fast', /* fast/slow/normal */
                    slideshow: false, /* false OR interval time in ms */
                    autoplay_slideshow: false, /* true/false */
                    opacity: 0.80, /* Value between 0 and 1 */
                    show_title: true, /* true/false */
                    allow_resize: true, /* Resize the photos bigger than viewport. true/false */
                    default_width: 500,
                    default_height: 344,
                    counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
                    theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
                    hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
                    wmode: 'opaque', /* Set the flash wmode attribute */
                    autoplay: true, /* Automatically start videos: True/False */
                    modal: false, /* If set to true, only the close button will close the window */
                    overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
                    keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
                    deeplinking: false,
                    social_tools: false,
                    markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous"><img src="' + ajax_var.base_url + '/images/nav_left.svg" alt=""></a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next"><img src="' + ajax_var.base_url + '/images/nav_right.svg" alt=""></a> \
											</div> \
											<p class="pp_description"></p> \
											{pp_social} \
											<a class="pp_close" href="#"><img src="' + ajax_var.base_url + '/images/close.svg" alt=""></a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
                    iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
                    changepicturecallback: function() {
                        if (!is_touch_device()) {
                            var ua = navigator.userAgent.toLowerCase();
                            if (!(ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1))
                            {
                                jQuery("html").getNiceScroll().remove();
                                jQuery("html").css("cssText", "overflow: hidden !important");
                            }
                        }
                    },
                    callback: function() {
                        if (!is_touch_device()) {
                            var ua = navigator.userAgent.toLowerCase();
                            if (!(ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1))
                            {
                                jQuery("html").niceScroll({cursorcolor: "#b1b1b1", scrollspeed: 100, mousescrollstep: 80, cursorwidth: "12px", cursorborder: "none", cursorborderradius: "0px"});
                            }
                        }
                    }
                });


                var $videoDefaultWidth = Math.ceil(jQuery('body').width() * 0.7);
                var $videoDefaultHeight = Math.ceil($videoDefaultWidth * 0.5625);

                jQuery("a[rel^='prettyPhoto']").each(function() {

                    var str = jQuery(this).attr('href');
                    if ((str.indexOf("youtube") >= 0 || (str.indexOf("vimeo")) >= 0))
                    {
                        jQuery(this).attr("href", str + "&width=" + $videoDefaultWidth + "&height=" + $videoDefaultHeight);
                    }
                });


            });

            //Fix for portfolio hover text fade in/out
            jQuery('.grid-item a').hover(function() {
                jQuery(this).find('.portfolio-text-holder').fadeIn('fast');
            }, function() {
                jQuery(this).find('.portfolio-text-holder').fadeOut('fast');
            });

            jQuery(".more-posts-portfolio img").animate({opacity: 1}, 500);
        }
    });
    return false;
}  