// ----
// Carrossel View Model
// ----

var CarrosselViewModel;

function CarrosselViewModel(data) {
    var model = this;

    model.Id = ko.observable(data.Id);
    model.Title = ko.observable(data.Title);
    model.TopPhotos = ko.observable(data.TopPhotos);
    model.MiddlePhotos = ko.observable(data.MiddlePhotos);
    model.BottomPhotos = ko.observable(data.BottomPhotos);
    model.Page = ko.observable(data.Page);
}