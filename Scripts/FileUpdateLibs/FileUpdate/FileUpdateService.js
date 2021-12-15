define(['dojo/_base/declare'], function (declare) {

    function init() {

    }

    function formatVueData(data) {

        var vueData = {
            judge: { fileList: [], isAcitve: true, type: null },
            cropInformation: { fileList: [], isAcitve: false, type: null },
            cropPropose: { fileList: [], isAcitve: false, type: null },
            cropMeasure: { fileList: [], isAcitve: false, type: null },
            countyImage: { fileList: [], isAcitve: false, type: null },
            cropStatistics: { fileList: [], isAcitve: false, type: null },
            updateTarget: null
        };
        data.forEach(function (item) {
            switch (item.type) {
                case "judge":
                    vueData.judge.fileList = item.cropFileNames;
                    vueData.judge.type = item.type;
                    break;
                case "cropInformation":
                    vueData.cropInformation.fileList = item.cropFileNames;
                    vueData.cropInformation.type = item.type;
                    break;
                case "cropPropose":
                    vueData.cropPropose.fileList = item.cropFileNames;
                    vueData.cropPropose.type = item.type;
                    break;
                case "cropMeasure":
                    vueData.cropMeasure.fileList = item.cropFileNames;
                    vueData.cropMeasure.type = item.type;
                    break;
                case "countyImage":
                    vueData.countyImage.fileList = item.cropFileNames;
                    vueData.countyImage.type = item.type;
                    break;
                case "cropStatistics":
                    vueData.cropStatistics.fileList = item.cropFileNames;
                    vueData.cropStatistics.type = item.type;
                    break;
                default:
            }
        });

        return vueData;
    }

    function validateFile(file) {
        if (file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            && file.name.indexOf('.pptx')>0) {
            return true;
        }
        return false;
    }

    function formatFile(item) {
        var data = new FormData();
        data.append('id', item.id);
        data.append('file', item.file);
        return data;
    }

    return declare([], {
        constructor: init,
        formatVueData: formatVueData,
        validateFile: validateFile,
        formatFile: formatFile
    });
});