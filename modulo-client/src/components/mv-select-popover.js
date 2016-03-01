ko.bindingHandlers.mvselectpopover = {
	init : function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var $e = $(element);
		
		
		$e.on('change', function (event) {
			var $this = $(this);
			
			if($this.val() == 'novo'){
				$e.attr('data-toggle','popover-select');
				$e.data('toggle','popover-select');
				$('[data-toggle=popover-select]').popover('destroy');
				$this.popover({
					html : true,
					placement: 'bottom',
					template: '<div class="popover" style="width: 100%">\
			        <div class="arrow"></div>\
			        <div class="popover-content">\
			        </div>\
			        </div>',
					content:  function() {
						return '<div>\
						<div class="row">\
						<div class="col-md-12">\
						<label id="labelPopover"></label>\
						<input id="descricaoPopover" class="form-control" type="text" >\
						</div>\
						</div>\
						<div class="row" style="margin-top: 10px">\
						<div class="col-md-12">\
						<button id="btnSavePopover" disabled="true" class="btn btn-default" type="button" >\
						<i class="fa fa-save mv-color-green"></i>\
						</button>\
						<button id="btnCancelPopover" class="btn btn-default" type="button">\
						<i class="fa fa-ban mv-color-green"></i>\
						</button>\
						</div>\
						</div>\
						</div>'
					}
				}).popover('show');
				
				$('body').on('click', function (e) {
				    if ($(e.target).data('toggle') !== 'popover-select'
				        && $(e.target).parents('.popover').length === 0) {
				    	$('[data-toggle=popover-select]').popover('destroy');
				    	if($('[data-toggle=popover-select]').val() == 'novo')
				    		$('[data-toggle=popover-select]').val('');
			    		$('[data-toggle=popover-select]').data('toggle', '');
				    	$('[data-toggle=popover-select]').removeAttr('data-toggle');
				    }
				});
				
				$e.on('shown.bs.popover', function () {
					$('#descricaoPopover').attr('maxlength', valueAccessor().maxlength);
					$('#labelPopover').text(valueAccessor().labelPopover);
					$('#descricaoPopover').focus();
					
					$('#btnCancelPopover').click(function(){
						$this.popover('destroy');
						$this.val('');
					});
					
					$('#btnSavePopover').click(function(){
						$.ajax({
							type : 'GET',
							url : valueAccessor().url + '=' + $('#descricaoPopover').val().toUpperCase(),
							success : function(data) {
								valueAccessor().options.push(data);
								valueAccessor().value(data.id);
								$this.val(data.id);
								$this.popover('destroy');
							},
							error : function(msg) {
								$.alertError($.getGenericMessage(msg));
							}
						});
					});
					
					$('#descricaoPopover').keyup(function(){
						if($('#descricaoPopover').val().length == 0)
							$('#btnSavePopover').attr('disabled', true);
						else
							$('#btnSavePopover').attr('disabled', false);
					});
				})
			}else{
				$e.removeAttr('data-toggle');
				$e.popover('destroy');
				valueAccessor().value($this.val());
			}
		});
		
		$.ajax({
			type : 'POST',
			url : valueAccessor().source,
			success : function(data) {
				if(valueAccessor().options().length == 0){
					valueAccessor().options(data);
					$e.val(valueAccessor().value());
				}
			},
			error : function(msg) {
				$.alertError(msg);
			}
		});
		
	},
	update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		var $e = $(element);
		
		$e.val(valueAccessor().value());
	}
};