var http = require("http");
var url = require("url");

/**
   Starts a http server that wraps the request in an iframed page

   @wrapped_page the object that can embed the url in a pre-created
                 template
   @wrapping_port the port on which the server should listen
*/
function createWrapperProxy(wrapped_page, wrapping_port)
{
    debugger;
    this.wrapped_page = wrapped_page

    this._on_request = function(request,response)
    {
    
        //I simply need to create a url and set it into an iframe
        response.writeHeader(200);
        debugger;
        this.wrapped_page.page = request.url;
        console.log(this.wrapped_page.page);

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(this.wrapped_page.page);
        response.end();
    }

    this.http_wrapper_proxy = http.createServer(this._on_request.bind(this));
    this.http_wrapper_proxy.listen(wrapping_port);
    
    console.log("Wrapper proxy running on "+String(wrapping_port));
}

exports.createWrapperProxy = createWrapperProxy
