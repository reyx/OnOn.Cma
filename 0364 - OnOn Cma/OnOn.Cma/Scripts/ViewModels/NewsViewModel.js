// ----
// News View Model
// ----

var newsViewModel;

function NewsViewModel(data) {
    data = ko.toJS(data);

    var model = this;

    model.Id = ko.observable(data.Id);
    model.Title = ko.observable(data.Title);
    model.Position = ko.observable(data.Position);
    model.Active = ko.observable(data.Active);
    model.Subtitle = ko.observable(data.Subtitle);
    model.Content = ko.observable(data.Content);
    model.Published = ko.observable(toDatetime(data.Published));
    model.Image = ko.observable(data.Image);
    model.Thumbnail = ko.observable(data.Thumbnail);

    if (data.Id <= 0)
        changesViewModel.addChange('/News/Edit', model);

    //track a single change
    model.trackChange = function (prop, source) {
        var value = source[prop];
        if (ko.isObservable(value)) {
            value.subscribe(function () {
                changesViewModel.addChange('/News/Edit', model);
            });
        }
    }

    trackChanges(model);
}