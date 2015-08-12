$(function(){
	$('form').off('submit').on('submit', function(){
		$('#progressModal').modal('show');
	});
})