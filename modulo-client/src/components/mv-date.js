/*! knockout-jqueryui - v2.2.2 - 1/20/2015
* https://gvas.github.io/knockout-jqueryui/
* Copyright (c) 2015 Vas Gabor <gvas.munka@gmail.com> Licensed MIT */
/*jslint browser:true*/

window.kojqui = { version: '2.2.2' };

(function (root, factory) {

    'use strict';

    root.kojqui.utils = factory(root.jQuery, root.ko);
}(this,
    function ($, ko) {

        'use strict';

        var match, uiVersion, descendantControllingBindings, createObject, register;

        /*jslint regexp:true*/
        match = ('').match(/^(\d)\.(\d+)/);
        /*jslint regexp:false*/

        if (!match) {
            uiVersion = null;
        } else {
            uiVersion = {
                major: parseInt(match[1], 10),
                minor: parseInt(match[2], 10)
            };
        }

        descendantControllingBindings = ['foreach', 'if', 'ifnot', 'with', 'html', 'text',
            'options'];

        createObject = Object.create || function (prototype) {
            /// <summary>Simple (incomplete) shim for Object.create().</summary>
            /// <param name='prototype' type='Object' mayBeNull='true'></param>
            /// <returns type='Object'></returns>

            function Type() { }
            Type.prototype = prototype;
            return new Type();
        };

        register = function (Constructor) {
            /// <summary>Registers a binding.</summary>
            /// <param name='Constructor' type='BindingHandler'>The binding handler's
            /// constructor function.</param>

            var handler = new Constructor();

            ko.bindingHandlers[handler.widgetName] = {
                after: ko.utils.arrayGetDistinctValues(
                    descendantControllingBindings.concat(handler.after || [])
                ),
                init: handler.init.bind(handler),
                update: handler.update.bind(handler)
            };
        };

        return {
            uiVersion: uiVersion,
            descendantControllingBindings: descendantControllingBindings,
            createObject: createObject,
            register: register
        };
    }
));
(function (root, factory) {

    'use strict';

    root.kojqui.BindingHandler = factory(root.jQuery, root.ko, root.kojqui.utils);
}(this,
    function ($, ko, utils) {

        'use strict';

        var domDataKey, filterAndUnwrapProperties, subscribeToRefreshOn, BindingHandler;

        domDataKey = '__kojqui_options';

        filterAndUnwrapProperties = function (source, properties) {
            /// <summary>Filters and unwraps the properties of an object.</summary>
            /// <param name='source' type='Object'></param>
            /// <param name='properties' type='Array' elementType='String'></param>
            /// <returns type='Object'>A new object with the specified properties copied
            /// and unwrapped from source.</returns>

            var result = {};

            ko.utils.arrayForEach(properties, function (property) {
                if (source[property] !== undefined) {
                    result[property] = ko.utils.unwrapObservable(source[property]);
                }
            });

            return result;
        };

        subscribeToRefreshOn = function (widgetName, element, bindingValue) {
            /// <summary>Creates a subscription to the refreshOn observable.</summary>
            /// <param name='widgetName' type='String'>The widget's name.</param>
            /// <param name='element' type='DOMNode'></param>
            /// <param name='bindingValue' type='Object'></param>

            if (ko.isObservable(bindingValue.refreshOn)) {
                ko.computed({
                    read: function () {
                        bindingValue.refreshOn();
                        $(element)[widgetName]('refresh');
                    },
                    disposeWhenNodeIsRemoved: element
                });
            }
        };

        BindingHandler = function (widgetName) {
            /// <summary>Constructor.</summary>
            /// <param name='widgetName' type='String'>The jQuery UI widget's
            /// name.</param>

            this.widgetName = widgetName;
            this.widgetEventPrefix = widgetName;
            this.options = [];
            this.events = [];
            this.after = [];
            this.hasRefresh = false;
        };

        /*jslint unparam:true*/
        BindingHandler.prototype.init = function (element, valueAccessor,
            allBindingsAccessor, viewModel, bindingContext) {

            var widgetName, value, unwrappedOptions, unwrappedEvents,
                shouldApplyBindingsToDescendants;

            widgetName = this.widgetName;
            value = valueAccessor();
            unwrappedOptions = filterAndUnwrapProperties(value, this.options);
            unwrappedEvents = filterAndUnwrapProperties(value, this.events);

            // There can be control flow- or other bindings on some of the descendant
            // elements which affect the shape of the element-rooted DOM subtree. These
            // should be processed before instantiating the jQuery UI widget, because they
            // can add pages to the tabs widget, menu items to the menu widget, etc.
            shouldApplyBindingsToDescendants = !ko.utils.arrayFirst(
                utils.descendantControllingBindings,
                function (bindingName) {
                    return this.hasOwnProperty(bindingName);
                },
                allBindingsAccessor()
            );
            if (shouldApplyBindingsToDescendants) {
                // process descendant bindings
                ko.applyBindingsToDescendants(bindingContext, element);
            }

            // store the options' values so they can be checked for changes in the
            // update() method
            ko.utils.domData.set(element, domDataKey, unwrappedOptions);

            // bind the widget events to the viewmodel
            $.each(unwrappedEvents, function (key, value) {
                unwrappedEvents[key] = value.bind(viewModel);
            });

            // initialize the widget
            $(element)[widgetName](ko.utils.extend(unwrappedOptions, unwrappedEvents));

            if (this.hasRefresh) {
                subscribeToRefreshOn(widgetName, element, value);
            }

            // store the element in the widget observable
            if (ko.isWriteableObservable(value.widget)) {
                value.widget($(element));
            }

            // handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element)[widgetName]('destroy');
            });

            return { controlsDescendantBindings: shouldApplyBindingsToDescendants };
        };
        /*jslint unparam:false*/

        BindingHandler.prototype.update = function (element, valueAccessor) {

            var widgetName, value, oldOptions, newOptions;

            widgetName = this.widgetName;
            value = valueAccessor();
            oldOptions = ko.utils.domData.get(element, domDataKey);
            newOptions = filterAndUnwrapProperties(value, this.options);

            // set only the changed options
            $.each(newOptions, function (prop, val) {
                if (val !== oldOptions[prop]) {
                    $(element)[widgetName]('option', prop, newOptions[prop]);
                }
            });

            // store the options' values so they can be checked for changes in the next
            // update() method
            ko.utils.domData.set(element, domDataKey, newOptions);
        };

        BindingHandler.prototype.on = function (element, type, callback) {
            /// <summary>Attaches callback to a widget event.</summary>
            /// <param name='element' type='DOMElement'></param>
            /// <param name='type' type='String'></param>
            /// <param name='callback' type='Function'></param>

            var eventName;

            // the same algorithm as in widget._trigger()
            if (type === this.widgetEventPrefix) {
                eventName = type;
            } else {
                eventName = this.widgetEventPrefix + type;
            }
            eventName = [eventName.toLowerCase(), '.', this.widgetName].join('');

            $(element).on(eventName, callback);

            // handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).off(eventName);
            });
        };

        return BindingHandler;
    }
));

(function (root, factory) {

    'use strict';

    root.kojqui.Datepicker = factory(root.jQuery, root.ko, root.kojqui.BindingHandler, root.kojqui.utils);
}(this,
    function ($, ko, BindingHandler, utils) {

        'use strict';

        var Datepicker = function () {
            /// <summary>Constructor.</summary>

            BindingHandler.call(this, 'datepicker');

            this.options = ['autoclose', 'beforeShowDay', 'beforeShowMonth', 'beforeShowYear',
                'beforeShowDecade', 'beforeShowCentury', 'calendarWeeks', 'clearBtn',
                'container', 'datesDisabled', 'daysOfWeekDisabled', 'daysOfWeekHighlighted', 'defaultViewDate',
                'disableTouchKeyboard', 'enableOnReadonly', 'endDate', 'forceParse', 'assumeNearbyYear',
                'format', 'immediateUpdates', 'inputs', 'keyboardNavigation', 'language',
                'maxViewMode', 'minViewMode', 'multidate', 'multidateSeparator',
                'orientation', 'showOnFocus', 'startDate', 'startView',
                'templates', 'title', 'todayBtn', 'todayHighlight',
                'toggleActive', 'weekStart', 'zIndexOffset', 'destroy', 'show',
                'hide', 'update', 'setDate', 'setUTCDate', 'setDates','clearDates',
                'clearDate', 'changeDate', 'changeYear', 'changeMonth', 
                'setUTCDates', 'getDate', 'getUTCDate', 'getDates', 'getUTCDates','getStartDate',
                'getEndDate', 'setStartDate', 'setEndDate', 'setDatesDisabled', 'setDaysOfWeekDisabled',
                'setDaysOfWeekHighlighted'];
            this.hasRefresh = true;
        };

        Datepicker.prototype = utils.createObject(BindingHandler.prototype);
        Datepicker.prototype.constructor = Datepicker;

        Datepicker.prototype.init = function (element, valueAccessor) {
            /// <summary>Keeps the value binding property in sync with the widget's state.
            /// </summary>
            /// <param name='element' type='DOMNode'></param>
            /// <param name='valueAccessor' type='Function'></param>
            /// <returns type='Object'></returns>

            var result, widgetName, options, value, subscription, changeDate;
            var input = document.createElement('input');
            element.appendChild(input)
            result = BindingHandler.prototype.init.apply(this, arguments);

            widgetName = this.widgetName;
            options = valueAccessor();
            value = ko.utils.unwrapObservable(options.value);

            if (value) {
                $(element)[widgetName]('setDate', value);
            }

            if (ko.isObservable(options.value)) {
                subscription = options.value.subscribe(function (newValue) {
                    $(element)[widgetName]('setDate', newValue);
                });

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    subscription.dispose();
                });
            }

            if (ko.isWriteableObservable(options.value)) {
            	changeDate = $(element)[widgetName]('option', 'changeDate');
                $(element)[widgetName]('option', 'changeDate', function (selectedText) {
                    var format, date;

                    format = $(element)[widgetName]('option', 'format');
                    date = $.datepicker.parseDate(format, selectedText);
                    options.value(date);

                    if (typeof origOnSelect === 'function') {
                    	changeDate.apply(this, Array.prototype.slice.call(arguments));
                    }
                });
            }

            return result;
        };

        utils.register(Datepicker);

        return Datepicker;
    }
));