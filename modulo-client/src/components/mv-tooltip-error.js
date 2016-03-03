ko.bindingHandlers.tooltipError = {
    update: function (element, valueAccessor) {
    	var value = valueAccessor().value;
    	if(value.hasOwnProperty('error')){
    		var $e = $(element);
    		var options = valueAccessor() || {};
    		options.title = value.error();
    		options.trigger = 'hover';
    		options.placement = 'top';
    		options.template = '<div class="tooltip tooltip-error" role="tooltip">'
    			+'<div class="tooltip-arrow" style="border-top-color: #F2DEDE"></div>'
    			+'<div class="tooltip-inner error-popover" style="text-align: center;"></div></div>';
    		
    		if(value && value.hasOwnProperty('isModified')){
    			if(value.isModified() && !value.isValid()){
    				$e.tooltip(options);
    			}else{
    				$e.tooltip('destroy');
    			}
    		}
    	}
    }
};