// ----
// Galeria View Model
// ----

var GaleriaViewModel;

function GaleriaViewModel(data) {
    var model = this;

    model.Id = ko.observable(data.Id);
    model.Title = ko.observable(data.Title);
    model.Subtitle = ko.observable(data.Subtitle);
    model.Content = ko.observable(data.Content);
    model.Albuns = ko.observable(data.Albuns);
    model.Videos = ko.observable(data.Videos);
    model.Page = ko.observable(data.Page);
}