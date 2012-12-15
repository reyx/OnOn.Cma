// ----
// Editorial View Model
// ----

var EditorialViewModel;

function EditorialViewModel(data) {
    var model = this;

    model.Id = ko.observable(data.Id);
    model.Photos = ko.observable(data.Photos);
    model.Page = ko.observable(data.Page);
}