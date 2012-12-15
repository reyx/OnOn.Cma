// ----
// Video View Model
// ----

var VideoViewModel;

function VideoViewModel(data) {
    var model = this;

    model.Id = ko.observable(data.Id);
    model.Title = ko.observable(data.Title);
    model.Subtitle = ko.observable(data.Subtitle);
    model.Position = ko.observable(data.Position);
    model.Url = ko.observable(data.Url);
    model.Galeria = ko.observable(data.Galeria);
    model.Page = ko.observable(data.Page);
}