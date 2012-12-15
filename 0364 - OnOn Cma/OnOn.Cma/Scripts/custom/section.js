var prevPage;

var toggleGrid = function () {
    $('#btn-templates-hide, #btn-templates-show').toggle();
    if ($('.metro-sections').css('left') === '0px' || $('.metro-sections').css('left') === 'auto') {
        $('.metro-sections').animate({ left: '-450px' });
        $('.working-area').animate({ 'width': ($(window).width() - 228) + 'px' });
    } else {
        $('.metro-sections').animate({ left: '0px' });
        $('.working-area').animate({ 'width': ($(window).width() - 674) + 'px' });
    }
}

var resizeGrid = function () {
    if ($('.working-area').css('left') === '0px' || $('.working-area').css('left') === 'auto') {
        $('.working-area').width(($(window).width() - 674) + 'px').css('left', '0px');
    } else {
        $('.working-area').width(($(window).width() - 228) + 'px').css('left', '0px');
    }
}

var renderDragHelper = function() {
    var dimensionHash = dimensionFromClass($(this).attr('class'));
    var sizeClass = 's' + dimensionHash.Width + 'x' + dimensionHash.Height;
    var helper = $('<li class="key dragging ' + sizeClass + '"></li>').attr({ 'data-type': $(this).attr('data-type'), 'page': weakId() });

	return helper;
}

var dimensionFromClass = function (classes) {
    var dimensionClass = ko.utils.arrayMap(classes.split(' '), function (item) {
        if (/^p\d/.test(item) || /^s\d/.test(item)) {
            return item;
        }
        return '';
    }).join('');

    var dimension = {};

    if (dimensionClass !== '') {
        var size = dimensionClass.match(/(?:s)(.)(?:x)(.)/);
        var position = dimensionClass.match(/(?:p)(.)(?:x)(.)/);

        if (size) {
            dimension.Width = parseInt(size[1]);
            dimension.Height = parseInt(size[2]);
        }

        if (position) {
            dimension.Row = parseInt(position[1]);
            dimension.Column = parseInt(position[2]);
        }
    }

    return dimension;
}

var getPageElement = function (page, grid) {
    var pClass = ['p', page.Row(), 'x', page.Column()].join('');
    return $('.' + grid + ' .block.' + pClass);
}

var overGridHandler = function (event, ui) {

    // scale key up to grid size
    if (ui.helper.hasClass('key')) {
        ui.helper.removeClass('key').addClass('block');
    }

    // add class to style according to wether piece fits or not
    $('.placeholder-grid').removeClass('canFit cantFit');

    var page = generatePage(ui.helper, $(this));

    if (sectionViewModel.canFit(page) && page.insideGrid(placeHolderSectionViewModel)) {
        $('.placeholder-grid').addClass('canFit');
    } else {
        $('.placeholder-grid').addClass('cantFit');
    }

    showFitWhileDragging(page);
}

var outGridHandler = function() {
  	clearFit();
}

var showFitWhileDragging = function (page) {
    var overlapped = placeHolderSectionViewModel.pagesOverlappedByPage(page);

    $('.placeholder-grid .block').stop().removeClass('draggingOver');

    $(overlapped).each(function (i, item) {
        var element = getPageElement(item, 'placeholder-grid');
        element.addClass('draggingOver');
    });
}

var clearFit = function() {
	$('.dragging.block').removeClass('block').addClass('key');
	$('.draggingOver').removeClass('draggingOver');
}

var dropGridHandler = function (event, ui) {
    var page = generatePage(ui.helper, $(this));
    page = new PageViewModel(ko.toJS(page));

    var success = page.insideGrid(placeHolderSectionViewModel) && sectionViewModel.addPage(page);
    
    clearFit();
    $('.working-grid .block')
		.draggable({
		    //helper: renderDragHelper,
		    cursorAt: {
		        left: 20,
		        top: 20
		    },
		    containment: 'parent',
		    start: function (e, u) {
		        $(this).data("origPosition", $(this).position());
		        var pageId = parseInt($(this).attr('page'));
		        prevPage = sectionViewModel.getPage(pageId);
		    }
		});

    if (success) {
        $(ui.helper).remove();
        if (prevPage) {
            page.Id(prevPage.Id());
            page.Image(prevPage.Image());
            page.Title(prevPage.Title());
            page.Title(prevPage.Title());
            page.Subtitle(prevPage.Subtitle());
            page.Subtitle(prevPage.Subtitle());
            sectionViewModel.removePage(prevPage);
            prevPage = null;
        }
    }
    else {
        ui.draggable.animate(ui.draggable.data().origPosition, "fast");
    }

    ko.applyBindings(sectionViewModel, document.getElementById('working-grid'));

    updateEditables();

    toggleSectionBar($('.working-grid .block.selected').length > 0);
}

var keyTouchHandler = function (event) {
    var dimension = dimensionFromClass($(this).attr('class'));

    page.Width = dimension.Width;
    page.Height = dimension.Height;
    page.Row = dimension.Row;
    page.Column = dimension.Column;

    sectionViewModel.addPage(new PageViewModel(page));
}

var generatePage = function (draggedPage, unit) {
    var size = dimensionFromClass(draggedPage.attr('class'));
    var position = dimensionFromClass(unit.attr('class'));

    var pageId = parseInt(draggedPage.attr('page'));

    var page = sectionViewModel.getPage(pageId);    

    var element = {
        Id: parseInt(draggedPage.attr('page')),
        Row: position.Row,
        Column: position.Column,
        Width: size.Width,
        Height: size.Height,
        Title: draggedPage.find('.title').text(),
        Subtitle: draggedPage.find('.subtitle').text(),
        Content: "",
        Image: draggedPage.find('img').attr('src') || '',
        Type: draggedPage.attr('data-type'),
        Template: '',
        SectionId: sectionViewModel.Id(),
        Section: sectionViewModel
    }

    //if (page) {
    //    page.Row(element.Row);
    //    page.Column(element.Column);
    //    page.Width(element.Width);
    //    page.Height(element.Height);
    //    //page.Title(element.Title);
    //    //page.Subtitle(element.Subtitle);
    //    //page.Image(element.Image);

    //    return page;
    //}

    return new PageViewModel(element);
}

var revertDraggable = function revertDraggable($selector) {
    $selector.each(function() {
        var $this = $(this),
            position = $this.data("originalPosition");

        if (position) {
            $this.animate({
                left: position.left,
                top: position.top
            }, 500, function() {
                $this.data("originalPosition", null);
            });
        }
    });
}

// _init
$(function () {

    $(window).off('resize').on('resize', function () {
        resizeGrid();
    }).trigger('resize');

    navigationViewModel.Title(sectionViewModel.Name());
    navigationViewModel.Color(sectionViewModel.Color());

    $('.working-area').mousewheel(function (event, delta) {
        this.scrollLeft -= (delta * 30);
        event.preventDefault();
    });    

    window.workingSectionViewModel = new SectionViewModel({ Width: 10, Height: 2 }, false);
    window.placeHolderSectionViewModel = new SectionViewModel({ Width: 10, Height: 2 }, false);

    sectionViewModel.pageRendered = function () {
        $('.key').draggable({
            helper: renderDragHelper
        }).on('touchend', keyTouchHandler);

        $('.placeholder-grid .block').droppable({
            over: overGridHandler,
            drop: dropGridHandler,
            tolerance: 'pointer'
        });

        $('.working-grid').droppable({
            out: outGridHandler,
            tolerance: 'pointer'
        });

        $('.working-grid .block')
		    .draggable({
		        cursorAt: {
		            left: 20,
		            top: 20
		        },
		        containment: 'parent',
		        start: function (e, u) {
		            $(this).data("origPosition", $(this).position());
		            prevPage = generatePage(u.helper, $(this));
		        }
		    });

        updateEditables();
    }

    for (var i = 0; i < 20; i++) {
        placeHolderSectionViewModel.addPage(new PageViewModel({ Width: 1, Height: 1, Row: i < 10 ? 0 : 1, Column: i < 10 ? i : i - 10 }));
    }

    if (sectionViewModel.Pages().length === 0) {
        $.get(rootPath + '/Pages/List', { id: sectionViewModel.Id() }, function (data) {
            $(data).each(function (i, item) {
                var page = new PageViewModel(ko.toJS(item));
                sectionViewModel.addPage(page);
                sectionViewModel.addPage(page);
            });            
        });
    } else {
        $(sectionViewModel.Pages()).each(function (i, item) {
            var page = new PageViewModel(ko.toJS(item));
            sectionViewModel.addPage(page);
        });
    }

    $('.working-grid').on('contextmenu', '.block', function (e) {
        $(this).toggleClass('selected');
        var selectedCount = $('.working-grid .block.selected').length;
        if (selectedCount === 1) {
            $('#btn-page-edit').show();
            $('#btn-page-image').show();
        } else {
            $('#btn-page-edit').hide();
            $('#btn-page-image').hide();
        }
        toggleSectionBar(selectedCount > 0);

        return false;
    });

    $('#btn-page-edit').on('click', function () {
        if ($('.working-grid .selected').length === 1) {
            $('.working-grid .selected').each(function () {
                var pageId = parseInt($(this).attr('page'));

                pageViewModel = sectionViewModel.getPage(pageId);

                navigate('/Pages');
            });
        }
    });

    $('#btn-section-image').on('click', function () {
        fileUpload(function () {

        });
    });

    $('#btn-page-image').on('click', function () {
        var selected = $('.working-grid .selected');
        if (selected.length === 1) {
            fileUpload(200, 100, function (url) {
                var pageId = parseInt(selected.attr('page'));
                pageViewModel = sectionViewModel.getPage(pageId);
                pageViewModel.Image(url);
            });
        }
    });

    $('#btn-page-delete').on('click', function () {
        confirmDialog({
            title: 'Atenção',
            message: 'Deseja realmente excluir o(s) template(s) selecionado(s)?',
            positiveCallback: function () {
                $('.working-grid .selected').each(function (i, item) {
                    var pageId = parseInt($(item).attr('page'));
                    var page = sectionViewModel.getPage(pageId);

                    if (page.Id() > 0) {
                        changesViewModel.addChange('/Pages/Delete/' + page.Id());
                    }

                    sectionViewModel.removePage(page);
                    
                    $(item).remove();
                });

                toggleSectionBar(false);
            }
        });
    });

    $('.color-selector').on('click', 'button', function () {
        $('.color-selector ul').toggle();
    });

    $('#btn-templates-hide, #btn-templates-show').on('click', function () {
        toggleGrid();
    });

    $('.color-selector ul li a').on('click', function () {
        var color = $(this).attr('class').split('-');
        for (var i = 0, l = color.length; i < l; i++) {
            color[i] = color[i].substr(0, 1).toUpperCase() + (color[i].length > 1 ? color[i].substr(1).toLowerCase() : "");
        }

        sectionViewModel.Color(color.join(''));
        navigationViewModel.Color(sectionViewModel.Color());

        $('.color-selector ul').toggle();
    });

    updateEditables();
});