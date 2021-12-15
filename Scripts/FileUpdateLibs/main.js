$(function () {
    var _modules = {
        fileUpdate: { manager: null, containerId: '#fileUpdate-panel' }
    };

    init();

    function init() {
        instanceModule('fileUpdate');
    }

    function instanceModule(type) {
        switch (type) {
            case 'fileUpdate':
                if (_modules.fileUpdate.manager === null) {
                    initFileUpdateManager();
                }
                break;
        }
    }

    function initFileUpdateManager() {
        require(['fileUpdatelib/FileUpdate/FileUpdateManager'], function (Manager) {
            _modules.fileUpdate.manager = new Manager(_modules.fileUpdate.containerId);
        });
    }
});