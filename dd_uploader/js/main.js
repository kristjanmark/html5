$(function () {
    var picbox = $('#picbox'),
        back = $('.back', picbox);

    picbox.filedrop({
        paramname: 'pic',
        maxfilesize: 2,
        maxfiles: 6,
        url: 'upload.php',

        uploadFinished: function (file, response) {
            $.data(file).addClass('done');
        },

        error: function (err, file) {
            switch (err) {
                case 'BroswerNotSuported':
                    showMessage('Browser not supporting html5 file uploading');
                    break;
                case 'TooManyFiles':
                    alert('Max number of files');
                    break;
                case 'FileTooLarge':
                    alert(file.name + ' file size more than max');
                    break;
                default:
                    break;
            }
        },

        beforeEach: function (file) {
            if (!file.type.match(/image\//))
            {
                alert('File is not image');
                return false;
            }
        },

        uploadStart: function (i, file, len) {
            createImage(file);
        },

        progressUpdated: function (i, file, progress) {
            $.data(file).find('.progress').width(progress);
        }
    });

    var template = '<div class="preview">' +
        '<span class="imageHolder">' +
        '<img />' +
        '</span>' +
        '<div class="progressHolder">' +
        '<div class="progress"></div>' +
        '</div>' +
        '</div>';
    function createImage(file) {
        var preview = $(template),
            image = $('img', preview);
        var reader = new FileReader();

        image.width = 100;
        image.height = 100;

        reader.onload = function(e) {
            image.attr('src', e.target.result);
        };

        reader.readAsDataURL(file);

        back.hide();
        preview.appendTo(picbox);

        $.data(file, preview);
    }

    function showMessage(msg) {
        back.html(msg);
    }
});