//Boostrap-table
$.fn.bootstrapTable.defaults.pageSize = 10;
$.fn.bootstrapTable.defaults.classes = 'table table-bordered table-striped table-hover';
$.fn.bootstrapTable.defaults.showRefresh = true;
$.fn.bootstrapTable.defaults.showColumns = true;
//$.fn.bootstrapTable.defaults.keyEvents = true;
$.fn.bootstrapTable.defaults.pagination=true;
$.fn.bootstrapTable.defaults.resizable=true;
$.fn.bootstrapTable.defaults.responseHandler='defaultResponseHandler';
$.fn.bootstrapTable.defaults.sidePagination='server';
$.fn.bootstrapTable.defaults.method='POST';
$.fn.bootstrapTable.defaults.icons.refresh = 'glyphicon-search icon-search';
$.fn.bootstrapTable.defaults.iconsPrefix= 'glyphicon mv-color-green';
$.fn.bootstrapTable.defaults.ajaxOptions = {
	beforeSend: function( xhr ) {
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		xhr.setRequestHeader(header, token);
 	},
 	headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
//Date-picker
$.fn.datepicker.defaults.todayHighlight = true;
$.fn.datepicker.defaults.format = 'dd/mm/yyyy';
$.fn.datepicker.defaults.autoclose = true;
$.fn.datepicker.defaults.language = 'pt-BR';