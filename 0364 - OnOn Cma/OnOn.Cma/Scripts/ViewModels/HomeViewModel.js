var homeViewModel;

function HomeViewModel(data) {
    data = ko.toJS(data);

    var model = this;

    model.Issues = ko.observableArray();
    model.ActiveNews = ko.observableArray();
    model.InactiveNews = ko.observableArray();

    model.getIssue = function (id) {
        return ko.utils.arrayFirst(model.Issues(), function (item) {
            return item.Id() === id;
        });
    }

    model.addIssue = function (item) {
        model.Issues.splice(0, 0, new IssueViewModel(item));
    }.bind(model);

    model.getActiveNews = function (id) {
        return news = ko.utils.arrayFirst(model.ActiveNews(), function (item) {
            return item.Id() === id;
        });
    }

    model.removeActiveNews = function (item) {
        model.ActiveNews.remove(item);
    }

    model.getInactiveNews = function (id) {
        return news = ko.utils.arrayFirst(model.InactiveNews(), function (item) {
            return item.Id() === id;
        });
    }

    model.removeInactiveNews = function (item) {
        model.InactiveNews.remove(item);
    }

    model.addInactiveNews = function (item) {
        model.InactiveNews.splice(0, 0, item);
    }.bind(model);

    model.addActiveNews = function (item) {
        model.ActiveNews.splice(0, 0, item);
    }.bind(model);
    
    if (data) {
        ko.utils.arrayMap(data.Issues, function (item) {
            model.addIssue(item);
        });

        ko.utils.arrayMap(data.ActiveNews, function (item) {
            model.addActiveNews(new NewsViewModel(item));
        });

        ko.utils.arrayMap(data.InactiveNews, function (item) {
            model.addInactiveNews(new NewsViewModel(item));
        });
    }
}