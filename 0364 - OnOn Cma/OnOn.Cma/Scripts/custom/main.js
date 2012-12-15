var updateEditables = function () {
    //$('textarea').TextAreaExpander(0, 240);
    $('textarea').autogrow();
}

var toggleAppBar = function (show) {
    if (show && $("#appBar").is(':hidden')) {
        $("#appBar").show();
    } else if (!show && $("#appBar").is(':visible')) {
        $("#appBar").hide();
    }
}

var toggleSectionBar = function (show) {
    if (show && $("#sectionBar").is(':hidden')) {
        $("#sectionBar").show();
    } else if (!show && $("#sectionBar").is(':visible')) {
        $("#sectionBar").hide();
    }
}

var isDateObject = function (date) {
    return Object.prototype.toString.call(date) === '[object Date]';
}

var navigate = function (url) {
    navigationViewModel.navigate(url);
}

var alert = function (options) {
    var settings = $.extend({
        message: '',
        type: ''
    }, options);

    var $alert = $('<div class="alert">');

    $alert
        .css({
            'width': '260px',
            'position': 'absolute',
            'top': '8px',
            'right': '8px',
            'opacity': '0',
            'min-height': '50px'
        })
        .addClass('alert-' + settings.type)
        .append('<button type="button" class="close" data-dismiss="alert"></button>' + settings.message);

    $('body').append($alert);

    $alert.on('mouseout', function () {
        $alert.stop().animate({ 'opacity': '1' }, 'fast', function () {
            window.setTimeout(function () {
                $alert.fadeOut(4000, function () {
                    $alert.remove();
                });
            }, 4000);
        });
    }).on('mouseover', function () {
        window.clearTimeout(4000);
        $alert.stop().animate({ 'opacity': '1' }, 'fast');
    }).mouseout();
}

var message = function (options) {
    var settings = $.extend({        
        message: '',
        closeCallback: function () { }
    }, options);
    
    $('#message-modal-body').html('<p>' + settings.message + '</p>');

    $('#message-modal').modal({
        backdrop: false
    });
}

var confirmDialog = function (options) {
    var settings = $.extend({
        title: '',
        message: '',
        positiveCallback: function () { },
        negativeCallback: function () { }
    }, options);

    $('#confirm-modal-label').html(settings.title);
    $('#confirm-modal-body').html(settings.message);

    $('#confirm-modal').modal({
        backdrop: 'static',
        keyboard: false
    });

    $('#confirm-modal-yes').on('click', function () {
        settings.positiveCallback();
    });

    $('#confirm-modal-no').on('click', function () {
        settings.negativeCallback();
    });
}

$.ajaxSetup({
    beforeSend: function () {
        $('#ajax-progress').show();
    },
    cache: false,
    complete: function (jqXHR, textStatus) {
        $('#ajax-progress').hide();
        if (jqXHR === "error") {
            alert({ message: textStatus });
        }
    },
    datatype: "JSON",
    contentType: "application/json; charset=utf-8",
    error: function (jqXHR, textStatus, errorThrown) {
        switch (textStatus) {
            case 'parsererror':
                alert({ message: errorThrown.message });
            case 'error':
            default:
                alert({ message: errorThrown });
        }
    }
});

var handleErrors = function (data) {
    if (!data.result) {
        alert({ message: data.errors.join('\n') });
    }
}

var weakId = function () {
    var min = 1000099999, max = 2147483647;
    return -(min + Math.floor(Math.random() * (max - min + 1)));
}

var fileUpload = function (w, h, resultHandler, calcelHandler) {
    $('#image-upload-modal-body').load('/File', null, function () {
        $('#image-upload-modal').modal({
            backdrop: 'static',
            keyboard: false
        });

        if (resultHandler) {
            $('#btn-image-upload-select').off('click').on('click', function (e) {
                var url = $('.thumbnails li.selected').attr('data-url');
                $('.thumbnails li.selected').removeClass('selected');
                resultHandler(url);
            });
        }

        if (calcelHandler) {
            $('#btn-image-upload-return').click(function () {
                calcelHandler();
            });
        }
    });
}

var toDatetime = function (date) {
    if (isDateObject(date))
        return date;
    else
        return new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
}

var trackChanges = function (m) {
    if (m && m.trackChange) {
        for (var prop in m) {
            if (m.hasOwnProperty(prop)) {
                m.trackChange(prop, m);
                var underlying = ko.utils.unwrapObservable(m[prop]);
                if (underlying instanceof Array) {
                    ko.utils.arrayForEach(underlying, function (item) {
                        trackChanges(item);
                    })
                }
                else if (typeof underlying === "object") {
                    trackChanges(underlying);
                }
            }
        }
    }
}

var isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

$(function () {

    navigate('/Home');

    $(window).on('click', function (e) {
        toggleAppBar(false);
    });

});