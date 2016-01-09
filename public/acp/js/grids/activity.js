var TableDatatablesAjax = function () {

    var initPickers = function () {
        $('.date-picker').datepicker({
            autoclose: true
        });
    }

    var handleRecords = function () {

        var grid = new Datatable();

        grid.init({
            src: $("#datatable"),
            onSuccess: function (grid, response) {

            },
            onError: function (grid) {
 
            },
            onDataLoad: function(grid) {

            },
            loadingMessage: 'Loading...',
            dataTable: { 
                
                "bStateSave": true, 

                "lengthMenu": [
                    [10, 20, 50, 100, 150, -1],
                    [10, 20, 50, 100, 150, "All"] 
                ],
                "pageLength": 10,
                "ajax": {
                    "url": "/admin/activity/data", 
                },
                "order": [
                    [1, "asc"]
                ]
            }
        });

        grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
            e.preventDefault();
            var action = $(".table-group-action-input", grid.getTableWrapper());
            if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
                grid.setAjaxParam("action", action.val());
                grid.setAjaxParam("id", grid.getSelectedRows());
                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
            } else if (action.val() == "") {

            } else if (grid.getSelectedRowsCount() === 0) {

            }
        });

        grid.setAjaxParam("customActionType", "group_action");
        grid.getDataTable().ajax.reload();
        grid.clearAjaxParams();
    }

    return {
    	
        init: function () {
            initPickers();
            handleRecords();
        }

    };

}();

jQuery(document).ready(function() {
    TableDatatablesAjax.init();
});