ko.components.register('date-field', {
    viewModel: function(params) {
        this.label = params.label;
        this.id = params.id;
        this.idLabel = params.id + 'Label';
        this.idIcon = params.id + 'Icon';
        this.required = params.required;
        this.field = params.field;
        this.options = params.options || {};
        this.disabled = params.disabled;
    },
    template:
    	'<div class="date-field form-group">\
    		<label-field params = "idLabel : idLabel, label : label, idField : id, required : required "></label-field>\
	        <div class="input-group date ui-datepicker date-field">\
    			<input type="text" id="dtfNascimento" data-bind="datepicker: options, value: field, attr: {disabled : disabled}" class="form-control"/>\
		    	<span data-bind="attr : {id : idIcon, disabled : disabled}" class="input-group-addon btn">\
		    		<span class="glyphicon glyphicon-calendar"></span>\
		    	</span>\
	        </div>\
    	</div>'
});

ko.components.register('label-field', {
    viewModel: function(params) {
        this.label = params.label;
        this.id = params.idLabel;
        this.idField = params.idField;
        var cssClass = 'control-label';
        cssClass = params.required ? cssClass + ' required' : cssClass;
        this.cssClass = cssClass; 
    },	
    template:
    	'<label data-bind="css: cssClass, id : idLabel, attr: { for : idField }, text: label"><span ></span></label>'	    
});