

var mainPage = {//local page class
	$show_video: null,
	init: function(completeCallback) {
		var p = mainPage;
		
		p.lb_gallery.init();
		p.accordian.init();
				
	},
	
	lb_gallery: { fixedNav: false,
		init: function() {
			var fNav = mainPage.lb_gallery.fixedNav;
			$('a[rel=lb_minion]').lightBox({ containerResizeSpeed: 250, fixedNavigation: fNav });
			$('a[rel=lb_frozen]').lightBox({ containerResizeSpeed: 250, fixedNavigation: fNav });
			$('a[rel=lb_rapunzel]').lightBox({ containerResizeSpeed: 250, fixedNavigation: fNav });
			
			var p = mainPage;
			p.lb_gallery.type();
		},
		type: function() {
			var g = mainPage.lb_gallery;

			var $a = $('.gallery .type a');
			$a.each(function() {
				if ($(this).attr('class') == 'current') { $('#' + $(this).attr('rel')).addClass('gcurr'); g.photos.show($(this).attr('rel')); }
				$(this).click(function() {
					if ($(this).attr('class') != 'current') {
						$('.gallery .type a.current').attr('class', '');
						$(this).attr('class', 'current');
						g.photos.show($(this).attr('rel'));
					}
				});
			});
		},
		photos: {
			show: function(id) {
				$('.gcurr').fadeOut('fast', function() {
					$(this).removeClass('gcurr');
					$('#' + id).fadeIn('fast', function() {
						$('#' + id).addClass('gcurr');
					});
				});

			}
		}
	},
	accordian: { $tabid: null,
		init: function(onComplete) {
			var p = mainPage;
			//show default tab
			p.showTab(p.accordian.$tabid);
			//
			var imgPath = 'image/';
			var $ddItem = $('.act_collapse');

			$ddItem.click(function() {
				$('.act-selected').slideUp('fast', function() { $('.act-selected').attr('class', 'act_cnt hide') });
				if ($('.icon-selected').attr('class') != null) {
					var prevId = $('.icon-selected').attr('id');
					$('#' + prevId + ' img').attr('src', imgPath + 'icon_collapsed.png');
					$('#' + prevId).attr('class', 'act_collapse');
				}
				//				
				var $icon = $('img', this);
				var $cnt = $('#' + $(this).next().attr('id'));
				var chkVis = $cnt.attr('class').split(' ')[1];
				//
				if (chkVis == 'hide') {
					$(this).attr('class', 'act_collapse icon-selected');
					$cnt.slideDown(400, function() { $cnt.attr('class', 'act_cnt show act-selected') });
					$icon.attr('src', imgPath + 'icon_expanded.png');
				} else {
					$(this).attr('class', 'act_collapse');
					$cnt.slideUp('fast', function() { $cnt.attr('class', 'act_cnt hide') });
					$icon.attr('src', imgPath + 'icon_collapsed.png');
				}
				//
			});
			if (onComplete) { onComplete() }
		}
	},
	showTab: function(tabid, onComplete) {
		var imgPath = 'image/';
		var $tab = $('#' + tabid);
		var $tabicon = $('img', $tab);
		var $tabcnt = $('#' + $tab.attr('rel'));

		$tab.attr('class', 'act_collapse icon-selected');
		$tabcnt.attr('class', 'act_cnt show act-selected');
		$tabicon.attr('src', imgPath + 'icon_expanded.png');
	}
}

//------------------------
//---- document ready ----
//------------------------

$(document).ready(function() {
	//init main page
	mainPage.init();
});
