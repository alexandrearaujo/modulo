/**
 * Number-Field
 */

function initNumberField(){
	if($('#' + [[${idField}]]).attr('onchange') !== undefined){
		$('#' + [[${idField}]]).off("onchange");
		$('#' + [[${idField}]]).removeAttr("onchange");
	}
	$('#' + [[${idField}]]).on('change', function(){
		var currentValue = $(this).val();
  	    var previousValue = $('#previous-value-' + [[${idField}]]).val(); 
  	    if(currentValue != previousValue){
  	    	var f = new Function([[${onchange}]]);
			f.call();
  	    }
	});	
}