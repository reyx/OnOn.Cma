// ----
// Album View Model
// ----

var AlbumViewModel;

function AlbumViewModel(data) {
    var model = this;

    model.Id = ko.observable(data.Id);
    model.Title = ko.observable(data.Title);
    model.Subtitle = ko.observable(data.Subtitle);
    model.Position = ko.observable(data.Position);

}