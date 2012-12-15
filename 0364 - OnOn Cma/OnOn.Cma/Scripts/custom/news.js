var resizeContent = function () {
    $('#news-content').width($(window).width() - 556);
}

// init
$(function () {
    updateEditables();

    $(window).off('resize').on('resize', function () {
        resizeContent();
    });

    resizeContent();

    $('#btn-news-image').on('click', function () {
        fileUpload(200, 100, function (url) {
            newsViewModel.Image(url);
        });
    });

    navigationViewModel.Title(newsViewModel.Title());
});