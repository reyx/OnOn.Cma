var filesViewModel = new FilesViewModel();

function FilesViewModel() {
    var model = this;

    model.Files = ko.observableArray();

    model.addFile = function (item) {
        model.Files.push(new FileInfoViewModel(item));
    }

    model.max = ko.observable(false);
    model.pendingRequest = ko.observable(false);

    model.Elements = [];

    model.fileAdded = function (el) {
        //var $container = $('.thumbnails');
        //if (!$container.hasClass('.isotope')) {
        //    $container.isotope({ itemSelector: 'li' });
        //}
        //$container.isotope('appended', $(el));
    }
}

function getImages(cnt) {
    if (!filesViewModel.pendingRequest()) {

        filesViewModel.pendingRequest(true);

        var start = filesViewModel.Files().length,
            total = cnt;

        $.ajax({
            url: rootPath + '/Upload/UploadHandler.ashx',
            data: {
                start: start,
                total: total
            },
            success: function (data) {
                filesViewModel.max(data.max <= (start + total));
                
                ko.utils.arrayForEach(data.entries, function (item) {
                    filesViewModel.addFile(item);
                });

                //var $container = $('.thumbnails');

                //$container.imagesLoaded(function () {
                    //$container.isotope();
                //});

                filesViewModel.pendingRequest(false);
            },
            error: function () {
                filesViewModel.pendingRequest(false);
            }
        });
    }
}