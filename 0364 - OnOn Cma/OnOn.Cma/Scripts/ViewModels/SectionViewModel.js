// ----
// Section View Model
// ----

function SectionViewModel(data, track) {

    data = ko.toJS(data);

    var model = this;

    model.Pages = ko.observableArray();

    model.Id = ko.observable(data.Id);
    model.Name = ko.observable(data.Name);
    model.Color = ko.observable(data.Color);
    model.Width = ko.observable(data.Width);
    model.Height = ko.observable(data.Height);
    model.ColorClass = ko.computed(function () {
        if (model.Color()) {
            return model.Color().replace(/([a-z])([A-Z])/, "$1 $2").split(' ').join('-').toLowerCase();
        }
        return 'white';
    });
    model.ColorText = ko.computed(function () {
        if (model.Color()) {
            var words = model.Color().replace(/([a-z])([A-Z])/, "$1 $2").split(' ');
            words.splice(0, 0, 'text');
            return words.join('-').toLowerCase();
        }
        return 'white';
    });
    model.Image = ko.observable(data.Image);
    model.IssueId = ko.observable(data.IssueId);

    if (data.Issue) {
        model.Issue = ko.observable(new IssueViewModel(ko.toJS(data.Issue)));
    }

    model.GridSize = ko.computed(function () {
        var col = 0;
        $(model.Pages()).each(function (i, item) {
            if (item.Column() + item.Width() > col) {
                col = item.Column() + item.Width() - 1;
            }
        });

        return (++col * 250) + 'px';
    });

    model.addPage = function (item) {
        if (model.canFit(item)) {
            model.Pages.push(item);
            return true;
        }
        return false;
    }

    model.getPage = function (id) {
        return ko.utils.arrayFirst(model.Pages(), function (item) {
            return item.Id() == id;
        });
    }

    model.removePage = function (item) {
        for (var i = 0; i < model.Pages().length; i++) {
            var _item = model.Pages()[i];
            if (item.Row() === _item.Row() && item.Column() === _item.Column()) {
                model.Pages.remove(_item);
                break;
            }
        }
    }

    model.canFit = function (item) {

        // check if new page overlaps positioned pages
        for (var i = 0; i < model.Pages().length; i++) {
            if (model.Pages()[i].overlapsAny(item)) {
                return false
            }
        }

        return true;
    }

    model.pagesOverlappedByPage = function (overlapper) {
        var _pages = [];

        ko.utils.arrayMap(model.Pages(), function (item) {
            if (item.overlapsAny(overlapper)) {
                _pages.push(item);
            }
        });

        return _pages;
    }

    model.clear = function () {
        model.Page = ko.observableArray();
    }

    if (data.Pages && data.Pages.length > 0) {
        $.each(data.Pages, function (i, item) {
            model.addPage(new PageViewModel(item));
        });
    }

    model.Id.subscribe(function (newValue) {
        $(model.Pages()).each(function (i, item) {
            item.SectionId(newValue);
        });
    });

    if (track) {
        //track a single change
        model.trackChange = function (prop, source) {
            var value = source[prop];
            if (ko.isObservable(value)) {
                value.subscribe(function (newValue) {
                    if (newValue instanceof Array) return;
                    changesViewModel.addChange('/Sections/Edit', model);
                });
            }
        }

        trackChanges(model);
    }
}