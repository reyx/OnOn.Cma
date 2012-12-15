var censor = function (key, value) {
    if (typeof (value) === "function" || value instanceof Array) {
        return undefined;
    }
    return value;
}

function ChangesViewModel() {
    var model = this;

    model.Changes = ko.observableArray();

    model.addChange = function (url, item) {
        if (item) {
            var _item = ko.toJS(item);
            ko.utils.arrayForEach(model.Changes(), function (change) {
                if (change !== undefined) {
                    var changeItem = ko.toJS(change.Item());
                    if (changeItem.Id === _item.Id || ko.toJS(change.Item()) === _item) {
                        change.Url(url);
                        change.Item(item);

                        return true;
                    }
                }
            });
        }

        model.Changes.push(new ChangeViewModel({
            Id: weakId(),
            Url: url,
            Item: item,
            Updated: false
        }));

        return false;
    }

    model.applyChanges = function () {
        if (model.Changes().length > 0) {
            model.postData(model.Changes()[0]);
        }
    }

    model.postData = function (item) {
        var _item = $.extend({}, ko.toJS(item));

        var params = null;
        if (_item.Item !== undefined) {
            if (_item.Item.Id < 0) {
                _item.Item.Id = 0;
            }
            params = _item.Item;
        }

        $.post(rootPath + item.Url(), ko.toJSON(params, censor), function (data) {
            if (data.result) {
                if (typeof item.Item === 'function' && typeof item.Item().Id === 'function') {
                    item.Item().Id(data.item.Id);
                }
                item.Updated(true);

                if (model.Changes().length > 0) {
                    model.postData(model.Changes()[0]);
                }
            } else {
                alert({ message: data.errors.join('<br>') });
            }
        });
    }

    model.removeChange = function (item) {
        model.Changes.remove(item);
    }
}

var changesViewModel = new ChangesViewModel();
ko.applyBindings(changesViewModel);