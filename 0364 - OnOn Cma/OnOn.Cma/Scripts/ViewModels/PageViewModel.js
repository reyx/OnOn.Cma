// ----
// Page View Model
// ----

var pageViewModel;

function PageViewModel(data) {
    data = ko.toJS(data);

    var model = this;

    model.EnumType =
    {
        Horizontal: 0,
        Horizontal2: 1,
        Vertical: 2,
        Vertical2: 3,
        Vertical3: 4,
        MiddleText: 5,
        MiddleImage: 6
    }

    model.EnumTemplate =
    {
        Album: 0,
        Carrossel: 1,
        Dimer: 2,
        Editorial: 3,
        Video: 4,
        Galeria: 5
    }

    model.Id = ko.observable(parseInt(data.Id));
    model.Row = ko.observable(data.Row);
    model.Column = ko.observable(data.Column);
    model.Width = ko.observable(data.Width);
    model.Height = ko.observable(data.Height);
    model.Title = ko.observable(data.Title);
    model.Subtitle = ko.observable(data.Subtitle);
    model.Content = ko.observable(data.Content);
    model.Image = ko.observable(data.Image);
    model.Template = ko.observable(data.Template);
    model.OriginalType = ko.observable(data.OriginalType || data.Type);
    if (data.Section) {
        model.Section = new SectionViewModel(ko.toJS(data.Section));
    }
    model.Type = ko.computed(function () {
        if (isNumber(model.OriginalType())) {
            switch (model.OriginalType()) {
                case model.EnumType.Horizontal: model.OriginalType('horizontal'); return 'horizontal';
                case model.EnumType.Horizontal2: model.OriginalType('horizontal-2'); return 'horizontal2';
                case model.EnumType.MiddleImage: model.OriginalType('middle-image'); return 'middleimage';
                case model.EnumType.MiddleText: model.OriginalType('middle-text'); return 'middletext';
                case model.EnumType.Vertical: model.OriginalType('vertical'); return 'vertical';
                case model.EnumType.Vertical2: model.OriginalType('vertical-2'); return 'vertical2';
                case model.EnumType.Vertical3: model.OriginalType('vertical-3'); return 'vertical3';
            }
        }

        return (model.OriginalType() || '').replace('-', '');
    });

    model.SectionId = ko.observable(data.SectionId);
    model.AlbumId = ko.observable(data.AlbumId);
    model.CarrosselId = ko.observable(data.CarrosselId);
    model.DimerId = ko.observable(data.DimerId);
    model.EditorialId = ko.observable(data.EditorialId);
    model.VideoId = ko.observable(data.VideoId);
    model.GaleriaId = ko.observable(data.GaleriaId);

    model.ImageComputed = ko.computed(function () {
        if (model.OriginalType() === 'middle-text') {
            return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        }

        if (model.Image() === null || model.Image() === '') {
            return '/Content/img/templates/' + model.OriginalType() + '.jpg';
        }

        return model.Image();
    });

    model.ImageVisible = ko.computed(function () {
        return model.OriginalType() !== 'middle-text';
    });

    model.positionClass = ko.computed(function () {
        return ['p', model.Row(), 'x', model.Column()].join('');
    });

    model.sizeClass = ko.computed(function () {
        return ['s', model.Width(), 'x', model.Height()].join('');
    });

    model.units = function () {
        var _units = [];
        for (var i = 0; i <= model.Height() - 1; i++) {
            for (var j = 0; j <= model.Width() - 1 ; j++) {
                _units.push({ Row: model.Row() + i, Column: model.Column() + j });
            }
        }
        return _units;
    }

    model.overlapsAny = function (page) {
        if (page) {
            var model_units = model.units();
            var page_units = page.units();

            for (var i = 0; i < model_units.length; i++) {
                for (var j = 0; j < page_units.length; j++) {
                    if (model_units[i].Row === page_units[j].Row && model_units[i].Column === page_units[j].Column) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    model.overlappedFullyBy = function (pages) {
        var other_units = model.getUnitsFromPages(pages);
        var my_units = model.units().slice();

        var _units = [];

        ko.utils.arrayMap(my_units, function (myUnit) {
            ko.utils.arrayMap(other_units, function (otherUnit) {
                if (myUnit.Column == otherUnit.Column && myUnit.Row == otherUnit.Row) {
                    return true;
                }
            });
        });
    }

    model.insideGrid = function (grid) {
        if (grid)
            return model.Row() + model.Height() <= grid.Height() && model.Width() + model.Column() <= grid.Width();
    }

    model.getUnitsFromPages = function (pages) {
        if (pages) {
            if ($.isArray(pages)) {
                var _units = [];
                ko.utils.arrayMap(pages, function (page) {
                    ko.utils.arrayMap(page.units(), function (unit) {
                        _units.push(unit);
                    });
                });

                return _units;
            }

            return pages.units();
        }

        return null;
    }

    model.setPosition = function (row, column) {
        if (row !== undefined && column !== undefined) {
            model.Row(row);
            model.Column(column);
        }
    }

    //track a single change
    model.trackChange = function (prop, source) {
        if (prop) {
            var value = source[prop];
            if (ko.isObservable(value)) {
                value.subscribe(function () {
                    changesViewModel.addChange('/Pages/Edit', model);
                });
            }
        }
    }

    trackChanges(model);
}