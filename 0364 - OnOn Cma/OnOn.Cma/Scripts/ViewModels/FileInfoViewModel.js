function FileInfoViewModel(data) {
    data = ko.toJS(data);

    var model = this;

    model.name = ko.observable(data.name);
    model.type = ko.observable(data.type);
    model.size = ko.observable(data.size);
    model.computedSize = ko.computed(function () {
        var bytes = model.size();

        if (typeof bytes !== 'number') {
            return '';
        }
        else if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }
        else if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }
        return (bytes / 1000).toFixed(2) + ' KB';
    });
    model.width = ko.observable(data.width);
    model.height = ko.observable(data.height);
    model.dimension = ko.computed(function () {       
        return [model.width(), 'x', model.height()].join('');
    });
    model.progress = ko.observable(data.progress);
    model.url = ko.observable(data.url);
    model.delete_url = ko.observable(data.delete_url);
    model.fileSize = ko.observable(data.fileSize);
    model.thumbnail_url = ko.observable(data.thumbnail_url);
}