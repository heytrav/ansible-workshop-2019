window.onload = function(){
    function waitForLoad() {
        if (!document.getElementsByClassName("pdf-page").length) {
            window.requestAnimationFrame(waitForLoad);
        } else{
            var footer_html = document.createElement('div');
            footer_html.innerHTML = '<div class="footer">' +
                                        '<div class="scarf">' +
                                            '<div class="scarf-orange"></div>' +
                                            '<div class="scarf-yellow"></div>' +
                                            '<div class="scarf-blue"></div>' +
                                            '<div class="scarf-green"></div>' +
                                        '</div>' +
                                        '<div class="footer-inner">' +
                                            '<div class="catalyst-logo-footer">Catalyst</div>' +
                                            '<div class="open-source-technologists">open source technologists</div>' +
                                        '</div>' +
                                    '</div>';

            if ( window.location.search.match( /print-pdf/ ) ) {
                var pdfpage = document.getElementsByClassName("pdf-page");
                for (i = 0; i < pdfpage.length; i++) {
                    pdfpage[i].appendChild(footer_html.cloneNode(true));
                }
            }
        }
    }
    waitForLoad();
}
