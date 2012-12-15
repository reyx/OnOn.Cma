/*
 * jQuery File Upload Plugin JS Example 6.5.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global $, window, document */

$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload();

    $('#fileupload').fileupload('option', {
        maxFileSize: 500000000,
        resizeMaxWidth: 1920,
        resizeMaxHeight: 1200
    });

    $('.thumbnails').on('contextmenu', 'li', function () {
        $('.thumbnails li.selected').not($(this)).removeClass('selected');
        $(this).toggleClass('selected');
        return false;
    });

    $('#image-upload-modal-body').on('scroll', function (e) {
        var e = e.target;
        
        if (!filesViewModel.max() && e.scrollTop > (e.scrollHeight - e.offsetHeight - 50)) {
            getImages(30);
        }
    });

    $('a[href="#uploads-tab"]').trigger('click');

    $('a[href="#gallery-tab"]').on('shown', function (e) {
        ko.applyBindings(filesViewModel, document.getElementById('root-gallery'));
        if (filesViewModel.Files().length === 0) {
            getImages(30);
        }
    });
});