// ----
// Issue View Model
// ----

var issueViewModel;

function IssueViewModel(data) {
    data = ko.toJS(data);

    var model = this;

    model.Sections = ko.observableArray();

    model.Id = ko.observable(data.Id);
    model.Title = ko.observable(data.Title);
    model.Subtitle = ko.observable(data.Subtitle);
    model.MinVersion = ko.observable(data.MinVersion);
    model.Published = ko.observable(toDatetime(data.Published));
    model.Image = ko.observable(data.Image);
    model.Logo = ko.observable(data.Logo);
    model.FeaturedImage = ko.observable(data.FeaturedImage);
    model.Background = ko.observable(data.Background);
    model.Type = ko.observable(data.Type);
    model.Done = ko.observable(false);

    model.addSection = function (item, track) {
        model.Sections.push(new SectionViewModel(item, track || true));
    }

    model.getSection = function (id) {
        return ko.utils.arrayFirst(model.Sections(), function (item) {
            return item.Id() === id;
        });
    }    

    if (data.Id <= 0) {
        // changesViewModel.addChange('/Issues/Edit', model);
    }

    model.Background.subscribe(function (newValue) {
        $('#bg img').attr('src', newValue);
    });

    model.Id.subscribe(function (newValue) {
        $(model.Sections()).each(function (i, item) {
            item.IssueId(newValue);
            item.Issue(model);
        });
    });

    //track a single change
    model.trackChange = function (prop, source) {
        if (prop === 'Done') return;
        var value = source[prop];
        if (ko.isObservable(value)) {
            value.subscribe(function (newValue) {                
                if (newValue instanceof Array) return;
                changesViewModel.addChange('/Issues/Edit', model);
            });
        }
    }

    trackChanges(model);
}