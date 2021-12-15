define(['dojo/_base/declare'], function (declare) {
    var _$node = null;
    var _node = null;
    var _vue = null;
    var _updateService = null;
    var _updateDataAccess = null;
    var _dataTableHelper = null;
    var _fileTypes = ['judge', 'cropInformation', 'cropPropose',
                        'cropMeasure', 'countyImage', 'cropStatistics'];
    var _eventCallbacks = {
        publish: []
    };
    var _pptList = null;
    function init(containerId) {
        _node = containerId;
        require(['fileUpdatelib/FileUpDate/FileUpDateService', 'fileUpdatelib/FileUpDate/FileUpDateDataAccess'],
            function (updateService, updateDataAccess) {
                _updateService = new updateService();
                _updateDataAccess = new updateDataAccess();
                $.when(_updateDataAccess.getCropFileList())
                    .done(function (result) {
                        var status = result.status;
                        var msg = result.msg;
                        var errorIndex = status.indexOf('fail');
                        if (errorIndex >= 0) {
                            alert(msg);
                            return;
                        }
                        var data = _updateService.formatVueData(result.data);
                        initVue(_node, data);
                    });
            });
    }
    
    function initVue(node, data) {
        _vue = new Vue({
            el: node,
            data: data,
            methods: {
                openType() { openType(event); },
                openFile(type, fileName) { openFile(type, fileName); },
                setFile() { setFile(this); },
                updateFile(item) { updateFile(item); },
                downloadFile(item) { downloadFile(item); }
            }
        });
    }

    function openType(event) {
        var type = event.target.getAttribute('data-type');
        _fileTypes.forEach(function (fileType) {
            var typeData = _vue[fileType];
            typeData.isAcitve = false;
        });
        var typeData = _vue[type];
        if (typeData == undefined) {
            return;
        }
        typeData.isAcitve = true;
    }

    function openFile(type, fileName) {
        _vue.updateTarget = {
            type: type,
            fileName: fileName
        };
        $(_node).find('.file-list .pptUpload').click();
    }

    function setFile(event) {
        var target = _vue.updateTarget;
        if (event.$refs.newfile.files.length < 1) {
            return;
        }
        var file = event.$refs.newfile.files[0];
        var targetType = _vue[target.type];
        if (!_updateService.validateFile(file)) {
            alert('檔案格式不符合');
            return;
        }
        var fileItem = $.grep(targetType.fileList, function (item, id) {
            return item.fileName === target.fileName;
        });

        fileItem[0].file = file;
        event.$refs.newfile.value = "";
    }

    function updateFile(item) {
        var data = _updateService.formatFile(item);
        $.when(_updateDataAccess.fileUpdate(data))
            .done(function (result) {
                var status = result.status;
                var msg = result.msg;
                var errorIndex = status.indexOf('fail');
                if (errorIndex >= 0) {
                    alert(msg);
                    return;
                }
                alert('更新完成');
                item.file = null;
            });
    }

    function downloadFile(item) {
        var data = { id: item.id };
        $.when(_updateDataAccess.downloadFile(data))
            .done(function (result) {
                var status = result.status;
                var message = result.msg;
                var errorIndex = status.indexOf('fail');
                if (errorIndex >= 0) {
                    alert(message);
                    return;
                }
                _updateDataAccess.exportFile(result.data);
            });
    }
    
    function on(type, callback) {
        if (_eventCallbacks[type] === undefined || callback === undefined) {
            return;
        }
        _eventCallbacks[type].push(callback);
    }
    return declare([], {
        constructor: init,
        on: on
    });
});