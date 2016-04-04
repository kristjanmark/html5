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

        beforeEach: function(file) {
            if(!file.type.match(^/image\//)){
                alert('File is not image');
                return false;
            }
        },

        uploadStart: function(i, file, len){

        }
    });
});