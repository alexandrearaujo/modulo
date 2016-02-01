//Elemento adicionado ao html da pagina para que se possa obter o tamanho da string na tela.
jQuery('<span id="visualLength"></span>').appendTo('form'); 

function defaultResponseHandler(page){
    return {
        rows:  page.content,
        total: page.totalElements
    }
}

function Pagination(params, data){
	return JSON.stringify({
		currentPage :  (Number(params.offset) / params.limit),
		totalPages : params.limit,
		order : params.order,
		sortColumn : params.sort,
		search : params.search,
		data : data
	});
}


function initPopoverTableCell(){
	$('.table').on({
	    'mouseenter': function(e) {
	        var $cell = $(e.currentTarget);
	        var cellText = $cell.text();
	        if (cellText.visualLength() > $cell.width()) {
	            $cell.popover({
                    container: 'body',
                    html: true,
                    trigger: 'manual',
                    placement:'top',
                    title :function(){
                    	return "Mensagem";
                    },
                    content: function() {
                        return e.currentTarget.textContent;
                    },
                    template:'<div class="popover" role="popover">'
                        +'<div class="arrow"></div><h3 class="popover-title"></h3>'
                        +'<div class="popover-content" style="max-width:350px; word-wrap: break-word"></div>'
                        +'</div>'
                });
	        }
	        
	        $cell.popover('show');
	    },
	    'mouseleave': function(e) {
	    	$(e.currentTarget).popover('hide');
	    }
	},'tbody > tr > td');	
}