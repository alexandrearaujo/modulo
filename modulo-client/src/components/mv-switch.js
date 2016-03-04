ko.bindingHandlers.mvswitch = {
	init : function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var $e = $(element);
		
		$e.bootstrapSwitch({onText: valueAccessor().onText, offText: valueAccessor().offText});
		
		$e.on('switchChange.bootstrapSwitch', function (event, state) {
			valueAccessor().checked(state);
		});
	},
	update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		var $e = $(element);
		
		$e.bootstrapSwitch('state', valueAccessor().checked());
	}
};