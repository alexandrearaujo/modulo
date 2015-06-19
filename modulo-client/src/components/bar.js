/**
 * PaginationBar
 */
function initPaginationBar() {
	$('body').on( "click", ".pagination a", function() {
		var page;
		var jQueryPaginationContainer = $(this).parents('.paginationbar nav');
		var isAjax = JSON.parse(jQueryPaginationContainer.attr('data-ajax'));
		var totalPages = jQueryPaginationContainer.attr('data-totalPages');
		var size = jQueryPaginationContainer.attr('data-size');
		var idToRender = jQueryPaginationContainer.attr('data-idToRender');
		var method = jQueryPaginationContainer.attr('data-method');
		var activeNumber = new Number(jQueryPaginationContainer.find('.active').attr('data-activeNumber'));
		var jQuerySelf = $(this);
		var number = Number(jQuerySelf.attr('data-number'));
		
		if (jQuerySelf != null && jQuerySelf.children().hasClass('glyphicon-forward')) {
			page = totalPages - 1;
		} else if (jQuerySelf != null && jQuerySelf.children().hasClass('glyphicon-play inverted-icon')) {
			page = activeNumber - 2;
		} else if (jQuerySelf != null && jQuerySelf.children().hasClass('glyphicon-play')) {
			page = activeNumber;
		} else {
			if (number > 0) {
				number = number - 1;
			} else {
				number = 0;
			}
			
			page = number;
		}
		var url = method + '?page='+page+'&size='+size+'&idToRender='+idToRender;
		
		if(isAjax) {
			$('#' + idToRender).load(url);
		} else {
			window.location.href = window.location.origin+url;
		}
	});
}