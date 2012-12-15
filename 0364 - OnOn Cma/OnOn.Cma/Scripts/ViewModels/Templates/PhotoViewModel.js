// ----
// Photo View Model
// ----

var PhotoViewModel;

function PhotoViewModel(data) {
    var model = this;

    model.Id = ko.observable(data.Id);
    model.Title = ko.observable(data.Title);
    model.Subtitle = ko.observable(data.Subtitle);
    model.Image = ko.observable(data.Image);
    model.Thumbnail = ko.observable(data.Thumbnail);
}