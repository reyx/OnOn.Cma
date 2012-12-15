// ----
// Dimer View Model
// ----

var DimerViewModel;

function DimerViewModel(data) {
    var model = this;

    model.Id = ko.observable(data.Id);
    model.AfterImage = ko.observable(data.AfterImage);
    model.BeforeImage = ko.observable(data.BeforeImage);
    model.Images = ko.observable(data.Images);
    model.Page = ko.observable(data.Page);
}