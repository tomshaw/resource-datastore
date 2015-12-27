/**
 * Admin Application
 */
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
        
        if ($('#resources').length) {
            $('.table').on('click', '.btn-view', function(e) {
        	    var id = $(this).data('id');
                var promise = $.post('/views', { id: id });
                promise.done(function (resp) {
            	    console.log(resp);
                });
            });
        }
        
    }
    
    var handleMenu = function () {

        function setCurrentClass(all, url) {
            all.each(function (index) {
                var href = $(this).attr('href');
                if (href == url) {
                    $(this).parent().addClass('active');
                }
            });
        }
        
        var pathName = window.location.pathname,
            mainNav = $('.navbar').find('ul.side-nav>li>a'),
            parts = window.location.pathname.split('/');
        
        $('.navbar ul.side-nav>li').removeClass('active');
        
        if (parts.length>2) {
        	pathName = '/' + parts[1] + '/' + parts[2];
        } else {
        	pathName = '/' + parts[1];
        }
        
        console.log(parts);
        console.log(pathName);
        
        setCurrentClass(mainNav, pathName);      
    }
    
    var handleTags = function () {
    	$('#tags').tagsInput();
    }
    
    var handleTree = function () {
        $('#tree').jstree({
            'plugins': ["wholerow", "checkbox", "types"],
            'core': {
                "themes" : {
                    "responsive": false
                },    
                'data': [{
                        "text": "Same but with checkboxes",
                        "children": [{
                            "text": "initially selected",
                            "state": {
                                "selected": true
                            }
                        }, {
                            "text": "custom icon",
                            "icon": "fa fa-warning icon-state-danger"
                        }, {
                            "text": "initially open",
                            "icon" : "fa fa-folder icon-state-default",
                            "state": {
                                "opened": true
                            },
                            "children": ["Another node"]
                        }, {
                            "text": "custom icon",
                            "icon": "fa fa-warning icon-state-warning"
                        }, {
                            "text": "disabled node",
                            "icon": "fa fa-check icon-state-success",
                            "state": {
                                "disabled": true
                            }
                        }]
                    },
                    "And wholerow selection"
                ]
            },
            "types" : {
                "default" : {
                    "icon" : "fa fa-folder icon-state-warning icon-lg"
                },
                "file" : {
                    "icon" : "fa fa-file icon-state-warning icon-lg"
                }
            }
        });
    }

    return {

        init: function () {
            handleInit();
            handleMenu();
            handleTags();
            handleTree();
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

jQuery(document).ready(function() {    
    App.init(); 
});
