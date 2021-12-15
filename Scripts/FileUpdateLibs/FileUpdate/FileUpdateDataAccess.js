define(['dojo/_base/declare'], function (declare) {
    var _$node = null;
    var _selected = [];
    function init() {

    }
    
    function getCropFileList() {
        var $deferred = $.Deferred();
        $.ajax({
            type: 'Get',
            url: $Url.resolve('~/FileUpdate/GetCropFileList'),
            cache: false,
            success: function (result) {
                $deferred.resolve(result);
            }
        });
        return $deferred.promise();
    }

    function fileUpdate(data) {
        var $deferred = $.Deferred();
        $.ajax({
            type: 'Post',
            url: $Url.resolve('~/FileUpdate/FileUpdate'),
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            success: function (result) {
                $deferred.resolve(result);
            }
        });
        return $deferred.promise();
    }

    function downloadFile(data) {
        var $deferred = $.Deferred();
        $.ajax({
            type: 'Post',
            data: data,
            cache: false,
            url: $Url.resolve('~/FileUpdate/CheckDownloadFile'),
            success: function (result) {
                $deferred.resolve(result);
            }
        });
        return $deferred.promise();
    }

    function exportFile(data) {
        window.location = $Url.resolve('~/FileUpdate/DownloadFile?id=' + data);
    }


    return declare([], {
        constructor: init,
        getCropFileList: getCropFileList,
        fileUpdate: fileUpdate,
        downloadFile: downloadFile,
        exportFile: exportFile
    });
});