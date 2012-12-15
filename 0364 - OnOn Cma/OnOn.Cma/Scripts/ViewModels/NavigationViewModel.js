var navigationViewModel = new NavigationViewModel();

var rootPath = $('#root-path').val();

function NavigationViewModel() {
    var model = this;

    model.Title = ko.observable("OnOn!");
    model.Color = ko.observable("White");
    model.ColorClass = ko.computed(function () {
        return model.Color().replace(/([a-z])([A-Z])/, "$1 $2").split(' ').join('-').toLowerCase();
    });
    model.ColorText = ko.computed(function () {
        var words = model.Color().replace(/([a-z])([A-Z])/, "$1 $2").split(' ');
        words.splice(0, 0, 'text');
        return words.join('-').toLowerCase();
    });

    model.Links = ko.observableArray();

    model.refresh = function () {
        var url = model.Links()[model.Links().length - 1];
        model.navigate(url, true);
    }

    model.navigate = function (url, self) {
        $('#container').fadeOut('normal', function () {
            $(this).load(rootPath + url, null, function () {
                if (homeViewModel !== undefined)
                    ko.applyBindings();
                updateEditables();
                $(this).fadeIn('normal', function () {
                    $('.isotope').isotope();
                });
            });
        });
        if (!self)
            model.Links().push(url);
    }

    model.goBack = function () {
        _init = null;
        var linksLength = model.Links().length;
        if (linksLength > 1) {
            model.Links().pop();
            var url = model.Links()[linksLength - 2];
            $('#container').fadeOut('fast', function () {
                $(this).load(rootPath + url, null, function () {
                    ko.applyBindings();
                    updateEditables();
                    $(this).fadeIn('normal', function () {
                        $('.isotope').isotope();
                    });
                });
            });
        }
    }

    model.Title.subscribe(function () {
        ko.applyBindings(navigationViewModel, document.getElementById('header-title'));
    });
}