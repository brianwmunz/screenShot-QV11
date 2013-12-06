function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

var path = Qva.Remote + "?public=only&type=Document&name=Extensions/screenshot/";
Qva.LoadScript(path + 'excanvas.js', function () {
    Qva.LoadScript(path + 'html2canvas.js', function () {
        Qva.AddDocumentExtension('screenshot', function () {
            $("#MainContainer").append("<a style=\"text-indent:-999999px;cursor:pointer;background:url('" + path + "icon-save-screen.png') no-repeat top left;height:23px;width:23px;display:block;overflow:hidden;position:absolute;top:5px;right:5px;\" id=\"sshot\">Click Here To Take a Screen Capture</a>");
            $("#sshot").click(function () {

                //Finding max width so we know where to cut the image
                var childDivs = document.getElementById('MainContainer').getElementsByTagName('div');
                var maxWidth = 0;
                for (i = 0; i < childDivs.length; i++) {
                    if (childDivs[i].offsetLeft + childDivs[i].offsetWidth > maxWidth) {
                        maxWidth = childDivs[i].offsetLeft + childDivs[i].offsetWidth;
                    }
                }

                //Finding max height so we know where to cut the image
                var maxHeight = 0;
                for (i = 0; i < childDivs.length; i++) {
                    if (childDivs[i].offsetTop + childDivs[i].offsetHeight > maxHeight) {
                        maxHeight = childDivs[i].offsetTop + childDivs[i].offsetHeight;
                    }
                }

                $("#QvAjaxToolbar").hide();
                $("#Tabrow").hide();
                $("#sshot").hide();
                html2canvas([document.body], {
                    onrendered: function (canvas) {
                        var imgHere = convertCanvasToImage(canvas);
                        $(imgHere).attr("id", "printIt").css("width", "200px").css("height", "100px").attr("align", "left").css("padding-right", "10px");
                        var divH = "<div id='ssPrev' style=\"width:500px;height:100px;font-size:12px;font-family:Arial;position:absolute;top:30px;right:0px;border:1px solid #439400;background-color:white;padding:10px;z-index:999999;\">Hold down the ctrl and shift keys then right click on the image thumbnail on the left.  <br />Then choose 'Save Image As...' to download it.<br /><br /><a style='cursor:pointer;color:blue;' id='ssClose'>Click here to close this window</a></div>";
                        $("#MainContainer").append(divH);
                        $("#ssPrev").prepend(imgHere);
                        $("#ssClose").click(function () {
                            $("#ssPrev").hide();
                            $("#ssPrev").remove();
                            $("#QvAjaxToolbar").show();
                            $("#Tabrow").show();
                            $("#sshot").show();
                        });
                    },
                    width: maxWidth,
                    height: maxHeight
                });
            });
        });
    });
});