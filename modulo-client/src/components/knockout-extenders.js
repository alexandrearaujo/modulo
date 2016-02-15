ko.bindingHandlers.stopBinding = {
    init: function() {
        return { controlsDescendantBindings: true };
    }
};
 
function formattedNumericComputed(field, precision) {
	var defaultPrecision = 1;
	precision = precision() || defaultPrecision;
    var	result = ko.pureComputed({
	    	 read: function () {
	    		 if(field()){
	    			 return Number(field()).toLocaleString('pt-BR', { minimumFractionDigits: precision, maximumFractionDigits: precision });
	    		 }
	    		 return '0';
	         },
	         write: function (value) {
	             value = parseFloat(value.replace(',', "."));
	             field(isNaN(value) ? 0 : value);
	         }
     	});
        
    return result;   
}

ko.extenders.deferValidation = function (target, option) {
	if (option) {
		target.subscribe(function(){
			if(target.hasOwnProperty('isModified'))
				target.isModified(false);
		});
	}
	
	return target;
};

function initValidation(){
	ko.validation.init({
		messagesOnModified: false,
		insertMessages: false,
		decorateInputElement: true,
		grouping: {
			deep: true,
			live: true,
			observable: true
		}
	}, true);
}