function ChangeViewModel(data) {
    data = data ;

    var model = this;

    model.Id = ko.observable(data.Id);
    model.Url = ko.observable(data.Url);
    model.Item = ko.observable(data.Item);
    model.Updated = ko.observable(data.Updated);

    model.Updated.subscribe(function (newValue) {
        if (newValue) {
            changesViewModel.removeChange(model);
        }
    });
}