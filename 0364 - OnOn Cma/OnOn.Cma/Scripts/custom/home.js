var growIssues = function () {
    $('#issues').css({ 'width': ($('#issues li').length * 250) + 'px' });
}

var growNews = function () {
    $('#news-list').parent().css({ 'width': (Math.ceil($('#news-list li').length / 4) * 400 + 20) + 'px' });
}

var toggleImage = function (el) {
    $('#issues-section').css('overflow-x', 'hidden');
    var image = $(el).find('img.old-image');
    var featuredImage = $(el).find('img.featured-image');
    if ($(el).height() === 490) {
        $(el).animate({ 'height': '240px' }, function () { $('#issues-section').css('overflow-x', 'auto'); }).removeClass('featured');
        image.fadeIn();
        featuredImage.fadeOut();
    } else {
        $(el).animate({ 'height': '490px' }, function () { $('#issues-section').css('overflow-x', 'auto'); }).addClass('featured');
        image.fadeOut();
        featuredImage.fadeIn();
    }
}

var toggleNewslist = function () {
    if ($('#news-list-section').is(":hidden")) {
        $('#issues-section').fadeOut('fast', function () {
            $('#news-list-section').fadeIn()
        });
    } else {
        $('#news-list-section').fadeOut('fast', function () {
            $('#issues-section').fadeIn()
        });
    }
}

var resize = function () {
    $('#issues-section, #news-list-section').width($(window).width() - 728);
}

var toggleControlsBar = function (el) {
    toggleAppBar(false);
    $(el).toggleClass('selected');
    toggleSectionBar($('#issues li.selected, #news li.selected, #news-list li.selected').length > 0);
}

// _init
$(function () {
    $('#bg').fadeOut();

    if (!homeViewModel) {
        homeViewModel = new HomeViewModel(JSON.parse($('#home-data').val()));
    }

    homeViewModel.issueAdded = function (el, index, node) {

        if (el.nodeType === 1) {
            $('#issues').isotope('addItems', $(el)).isotope('updateSortData', $('#issues').children()).isotope();
        }

        if ($('body').is(':hidden'))
            $('body').fadeIn();
    }

    homeViewModel.inactiveNewsAdded = function (el) {
        $('#news-list').isotope('appended', $(el)).isotope();
        growNews();
    }

    homeViewModel.activeNewsAdded = function (el) {
        $('#news').isotope('appended', $(el)).isotope();
        growNews();
    }

    ko.applyBindings(homeViewModel);

    updateEditables();

    $('#news-list').isotope({
        layoutMode: 'fitColumns',
        itemSelector: 'li'
    });

    $('#news').isotope({
        layoutMode: 'straightDown',
        itemSelector: 'li'
    });

    $('#issues').isotope({
        layoutMode: 'straightAcross',
        getSortData: {
            index: function ($item) {
                return $item.index();
            }
        },
        sortBy: 'index'
    });

    growIssues();
    growNews();

    navigationViewModel.Title('OnOn!');

    $('.horizontal-wheel').mousewheel(function (e, delta) {
        this.scrollLeft -= (delta * 50);
        e.preventDefault();
    });

    $('#btn-news-list, #btn-issue-list').on('click', function () {
        toggleNewslist();
    });

    $('#btn-news-add').on('click', function () {
        homeViewModel.addInactiveNews(new NewsViewModel({
            Id: weakId(),
            Title: "",
            Position: 0,
            Active: false,
            Subtitle: "",
            Content: "",
            Published: new Date(),
            Image: "/Content/img/placehold/240x240.gif",
            Thumbnail: "/Content/img/placehold/140x140.gif",
            Col: 0,
            Row: 0
        }));
        growNews();
        updateEditables();
    });

    $('#btn-issue-add').on('click', function () {
        homeViewModel.addIssue({
            Id: weakId(),
            Title: "",
            Subtitle: "",
            Image: "/Content/img/placehold/240x240.gif",
            FeaturedImage: "/Content/img/placehold/240x490.gif",
            Type: "old",
            Published: new Date(),
            Logo: "",
            Background: "",
            MinVersion: "1.0.0.0"
        });
        updateEditables();
        growIssues();
    });

    $('#btn-issue-featured-image').on('click', function () {
        new fileUpload(200, 100, function (url) {
            var selected = $('#issues li.selected');
            if (selected.length === 1) {
                var issueId = parseInt(selected.attr('issue'));
                issueViewModel = homeViewModel.getIssue(issueId);
                issueViewModel.FeaturedImage(url);
            }
        });
    });

    $('#btn-issue-old-image').on('click', function () {
        new fileUpload(200, 100, function (url) {
            var selected = $('#issues li.selected');
            if (selected.length === 1) {
                var issueId = parseInt(selected.attr('issue'));
                issueViewModel = homeViewModel.getIssue(issueId);
                issueViewModel.Image(url);
            }
        });
    });

    $('#btn-issue-edit').on('click', function () {
        var issue = $('#issues li.selected');
        if (issue.length === 1) {
            var issueId = parseInt(issue.attr('issue'));
            issueViewModel = homeViewModel.getIssue(issueId);
            navigate('/Issues');
        } else {

        }
    });

    $('#btn-news-edit').on('click', function () {
        var news = $('#news li.selected, #news-list li.selected');
        if (news.length === 1) {
            var newsId = parseInt(news.attr('news'));
            newsViewModel = homeViewModel.getActiveNews(newsId) || homeViewModel.getInactiveNews(newsId);
            navigate('/News');
        }
    });

    $('#btn-news-delete').on('click', function () {
        confirmDialog({
            title: 'Atenção',
            message: 'Deseja realmente excluir a(s) notícia(s) selecionada(s) do sistema?',
            positiveCallback: function () {
                $('#news li.selected, #news-list li.selected').each(function (i, item) {
                    var newsId = parseInt($(item).attr('news'));
                    $.post('/News/Delete/' + newsId, null, function (data) {
                        if (data.result) {
                            homeViewModel.removeActiveNews(newsId);
                            homeViewModel.removeInactiveNews(newsId);
                        }
                    });
                });
            }
        });
    });

    $('#btn-news-activate').on('click', function () {
        var activeNews = $('#news li').length;
        var selectedNews = $('#news-list li.selected');

        if (activeNews + selectedNews.length > 4) {
            alert({ message: 'A quantidade máxima de notícias ativas foi excedida.' });
        } else {
            selectedNews.each(function (i, item) {
                var newsId = parseInt($(item).attr('news'));

                var news = homeViewModel.getInactiveNews(newsId);

                if (news) {
                    news.Active(true);

                    homeViewModel.removeInactiveNews(news);
                    homeViewModel.addActiveNews(news);

                    growNews();
                }
            });

            $('#news, #news-list').isotope();
        }
    });

    $('#btn-news-inactivate').on('click', function () {
        var selectedNews = $('#news li.selected');

        selectedNews.each(function (i, item) {
            var newsId = parseInt($(item).attr('news'));

            var news = homeViewModel.getActiveNews(newsId);

            if (news) {
                news.Active(false);

                homeViewModel.removeActiveNews(news);
                homeViewModel.addInactiveNews(news);

                growNews();
            }
        });

        $('#news, #news-list').isotope();
    });

    $('#btn-news-thumbnail').on('click', function () {
        fileUpload(200, 100, function (url) {
            var selected = $('#news li.selected, #news-list li.selected');
            if (selected.length === 1) {
                var newsId = parseInt(selected.attr('news'));
                newsViewModel = homeViewModel.getActiveNews(newsId) || homeViewModel.getInactiveNews(newsId);
                newsViewModel.Thumbnail(url);
            }
        });
    });

    $('#btn-issue-size').on('click', function () {
        toggleImage('.selected');
    });

    $(window)
        .off('resize')
        .on('resize', function () {
            resize();
        })
        .trigger('resize')
        .off('contextmenu')
        .on('contextmenu', function (e) {
            if (!e.altKey) {
                $('#issues li.selected, #news li.selected, #news-list  li.selected').removeClass('selected');

                toggleSectionBar(false);
                toggleAppBar($("#appBar").is(':hidden'));

                if ($('#news-list').is(':visible')) {
                    $('#btn-issue-list, #btn-news-add').show();
                    $('#btn-news-list, #btn-issue-add').hide();
                } else {
                    $('#btn-issue-list, #btn-news-add').hide();
                    $('#btn-news-list, #btn-issue-add').show();
                }

                return false;
            }
        });

    $('#issues').on('contextmenu', 'li', function (e) {
        $('#news li.selected, #news-list  li.selected').removeClass('selected');

        toggleControlsBar(this);

        $('#btn-news-edit').hide();
        $('#btn-news-delete').hide();
        $('#btn-news-thumbnail').hide();
        $('#btn-news-activate').hide();
        $('#btn-news-inactivate').hide();

        if ($('#issues').is(':visible')) {
            if ($('#issues li.selected').length === 1) {
                $('#btn-issue-edit').show();
                $('#btn-issue-featured-image').show();
                $('#btn-issue-old-image').show();
            } else {
                $('#btn-issue-edit').hide();
                $('#btn-issue-featured-image').hide();
                $('#btn-issue-old-image').hide();
            }

            $('#btn-issue-size').show();
            $('#btn-issue-public').show();
        } else {
            $('#btn-issue-size').hide();
            $('#btn-issue-public').hide();
        }

        return false;
    });

    $('#news, #news-list').on('contextmenu', 'li', function (e) {
        $('#issues li.selected').removeClass('selected');

        toggleControlsBar(this);

        $('#btn-issue-edit').hide();
        $('#btn-issue-featured-image').hide();
        $('#btn-issue-old-image').hide();
        $('#btn-issue-size').hide();
        $('#btn-issue-public').hide();
        
        if ($('#news li.selected, #news-list li.selected').length === 1) {
            $('#btn-news-edit').show();
            $('#btn-news-thumbnail').show();
        } else {
            $('#btn-news-edit').hide();
            $('#btn-news-thumbnail').hide();
        }

        $('#btn-news-delete').show();
        
        if ($('#news li.selected').length > 0 && $('#news-list li.selected').length > 0) {
            $('#btn-news-activate').hide();
            $('#btn-news-inactivate').hide();
        } else if ($('#news li.selected').length > 0) {
            $('#btn-news-activate').hide();
            $('#btn-news-inactivate').show();
        } else {
            $('#btn-news-activate').show();
            $('#btn-news-inactivate').hide();
        }

        return false;
    });

    //$('#news-list').on('contextmenu', 'li', function (e) {
    //    toggleControlsBar(this);

    //    $('#btn-news-activate').show();
    //    $('#btn-news-inactivate').hide();

    //    return false;
    //});
});