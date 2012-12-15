var resizeHub = function () {
    $('.metro-sections').width($(window).width() - 232);
    var w = 80;
    $('.metro-section').each(function (i, row) {
        w += ($(row).width() === 0 ? 250 : $(row).width()) + 80;
    });
    $('.sort-list').width(w);
}

// _init
$(function () {

    // -- eventos --

    $('#bg img').attr('src', issueViewModel.Background()).parent().fadeIn();

    navigationViewModel.Color('white');

    $('#btn-section-add').on('click', function () {
        issueViewModel.addSection({
            Id: weakId(),
            IssueId: issueViewModel.Id(),
            Issue: issueViewModel,
            Name: "Titulo",
            Color: "Blue",
            Image: "/Content/img/placehold/240x240.gif"
        }, true);
    });

    $('#btn-section-edit').on('click', function () {
        var selection = $('.metro-section.selected');
        if (selection.length === 1) {
            var sectionId = parseInt(selection.attr('section'));
            sectionViewModel = issueViewModel.getSection(sectionId);
            navigate('/Sections');
        }
    });

    $('#btn-issue-background').on('click', function () {
        fileUpload(200, 100, function (url) {
            issueViewModel.Background(url);
        });
    });

    $(window).off('contextmenu').on('contextmenu', function (e) {
        if (!e.altKey) {
            toggleAppBar($('#appBar').is(':hidden'));
            return false;
        }
    }).off('click').on('click', function () {
        toggleAppBar(false);
    }).off('resize').on('resize', function () {
        resizeHub();
    }).trigger('resize');

    $('.metro-sections').mousewheel(function (e, delta) {
        this.scrollLeft -= (delta * 50);
        e.preventDefault();
    });

    $('.sort-list').on('contextmenu', '.metro-section', function () {

        $(this).toggleClass('selected');

        var length = $('.metro-section.selected').length;

        toggleSectionBar(length > 0);

        if (length === 1) {
            $('#btn-section-edit').show();
        } else {
            $('#btn-section-edit').hide();
        }

        return false;
    });

    $(".sort-list").sortable();

    issueViewModel.sectionRendered = function (el) {
        $(".sort-list").sortable('refresh');
        updateEditables();
        resizeHub();
    }

    issueViewModel.pageRendered = function (el) {
        $(el).fadeIn();
    }

    // -- UI --

    if (issueViewModel.Sections().length === 0) {
        $.get(rootPath + '/Sections/List', { id: issueViewModel.Id() }, function (data) {
            $.each(data, function (i, item) {
                sectionViewModel = new SectionViewModel(item, false);
                issueViewModel.addSection(sectionViewModel, false);
            });

            issueViewModel.Done(true);
        });
    }

    // ko.applyBindings(issueViewModel);

    navigationViewModel.Title(issueViewModel.Title());
});