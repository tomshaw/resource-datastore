var DataGrid = function() {

    var tableOptions;
    var dataTable;
    var table;
    var ajaxParams = {};
    var that;

    return {

        init: function(options) {

            if (!$().dataTable) return;

            that = this;

            options = $.extend(true, {
                src: "", 
                filterApplyAction: "filter",
                filterCancelAction: "filter_cancel",
                resetGroupActionInputOnSuccess: true,
                loadingMessage: 'Loading...',
                dataTable: {
                    "columnDefs": [{ 
                        'orderable': false,
                        'targets': [4]
                    }],
                    "ajax": {
                        "url": "",
                        "type": "post", 
                        "data": function(data) { 
                            $.each(ajaxParams, function(key, value) {
                                data[key] = value;
                            });
                        }
                    }
                }
            }, options);

            tableOptions = options;

            table = $(options.src);

            dataTable = table.DataTable(options.dataTable);

            table.on('click', '.filter-submit', function(e) {
                e.preventDefault();
                $(this).pulsate({repeat: false});
                that.submitFilter();
            });

            table.on('click', '.filter-cancel', function(e) {
                e.preventDefault();
                that.resetFilter();
            });
            
            table.on('click', '.btn-view', function(e) {
            	var id = $(this).data('id');
                var promise = $.post('/views', { id: id });
                promise.done(function (resp) {
                	console.log(resp);
                });
            });
            
            /*var elements = ['.id_from','.id_to'];
            table.on('click', elements.join(', '), function(e) {
                console.log('here');
            });*/
            
        },

        submitFilter: function() {
        	
            that.setAjaxParam("action", tableOptions.filterApplyAction);

            $('textarea.form-filter, select.form-filter, input.form-filter:not([type="radio"],[type="checkbox"])', table).each(function() {
                that.setAjaxParam($(this).attr("name"), $(this).val());
            });

            $('input.form-filter[type="checkbox"]:checked', table).each(function() {
                that.addAjaxParam($(this).attr("name"), $(this).val());
            });

            $('input.form-filter[type="radio"]:checked', table).each(function() {
                that.setAjaxParam($(this).attr("name"), $(this).val());
            });

            dataTable.ajax.reload();
        },

        resetFilter: function() {
            $('textarea.form-filter, select.form-filter, input.form-filter', table).each(function() {
                $(this).val("");
            });
            $('input.form-filter[type="checkbox"]', table).each(function() {
                $(this).attr("checked", false);
            });
            that.clearAjaxParams();
            that.addAjaxParam("action", tableOptions.filterCancelAction);
            dataTable.ajax.reload();
        },

        setAjaxParam: function(name, value) {
            ajaxParams[name] = value;
        },

        addAjaxParam: function(name, value) {
            if (!ajaxParams[name]) {
                ajaxParams[name] = [];
            }
            skip = false;
            for (var i = 0; i < (ajaxParams[name]).length; i++) {
                if (ajaxParams[name][i] === value) {
                    skip = true;
                }
            }
            if (skip === false) {
                ajaxParams[name].push(value);
            }
        },
        clearAjaxParams: function(name, value) {
            ajaxParams = {};
        },
        getDataTable: function() {
            return dataTable;
        },
        getTable: function() {
            return table;
        }
    };
};

var GridAjax = function () {

    var initPickers = function () {
        $('.date-picker').datepicker({autoclose: true});
    }

    var initDatatable = function () {
        var grid = new DataGrid();
        grid.init({
            src: $("#datatable"),
            dataTable: {
                "lengthMenu": [
                    [10, 20, 50, 100, 150],
                    [10, 20, 50, 100, 150]
                ],
                "pageLength": 10,
                "bStateSave": true, // save cookie.
                "orderCellsTop": true,
                "pagingType": "full", // numbers, simple, simple_numbers, full, full_numbers
                "autoWidth": false, // use responsive
                "processing": true, 
                "serverSide": true,
                "searching": false, // show hide search input
                "ajax": {
                    "url": "/data",
                },
                "order": [
                    [0, "asc"]
                ]
            }
        });
    }

    return {
        init: function () {
            initPickers();
            initDatatable();
        }
    };
}();

jQuery(document).ready(function() {
	App.init();
    GridAjax.init();
});

var App = function () {

    var isRTL = false;
    var isIE8 = false;
    var isIE9 = false;
    var isIE10 = false;

    var handleInit = function () {

        if ($('body').css('direction') === 'rtl') {
            isRTL = true;
        }

        isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
        isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
        isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);

        if (isIE10) {
            jQuery('html').addClass('ie10');
        }
        
        if (isIE10 || isIE9 || isIE8) {
            jQuery('html').addClass('ie');
        }
        
    }
    
    var handleTags = function () {
    	$('#tags').tagsInput();
    }

    return {

        init: function () {
            handleInit();
            handleTags();
        },

        isIE8: function () {
            return isIE8;
        },

        isIE9: function () {
            return isIE9;
        },

        isRTL: function () {
            return isRTL;
        }

    };

}();
