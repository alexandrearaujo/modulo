var $left = $("#left");
var lastWidth = $left.css('width');

$(document).ready(function() {
	activeOptionMenu();
});

/*Monitors side menu to hide the gray border*/
$('nav').on('click','#menu-toggle', function () {
    var body = $('body');
    var rightSide = $('.right-side');
    if(!body.hasClass('sidebar-left-hidden')) {
    	body.addClass('sidebar-left-hidden');
    	rightSide.removeClass('border-left');
    } else {
    	body.removeClass('sidebar-left-hidden');
    	rightSide.addClass('border-left');
    }
    checkForChanges();
});

function checkForChanges() {
	$('table').bootstrapTable('resetView');	
    setTimeout(checkForChanges, 500);
}

function activeOptionMenu() {
	var controller = window.location.pathname.split('/')[2];
	var menu = $("li[data-controller='/" + controller + "']");
	if (menu.length === 0) {
		controller += '/' + window.location.pathname.split('/')[3];
		menu = $("li[data-controller='/" + controller + "']");
	}
	if (menu.length === 0) {
		controller += window.location.hash;
		menu = $("li[data-controller='/" + controller + "']");
	}
	var groupActionUL = menu.parent();
	var menuOptionLi = groupActionUL.parent();
	var groupActionParentUL = menuOptionLi.parent();
	var menuOptionParentLi = groupActionParentUL.parent();
	if(controller !== "") {
		menuOptionParentLi.addClass('active');
		groupActionParentUL.addClass('in');
		groupActionParentUL.attr('aria-expanded', true);
		menuOptionLi.addClass('active');
		groupActionUL.addClass('in');
		groupActionUL.attr('aria-expanded', true);
		menu.addClass('active');
	}
}