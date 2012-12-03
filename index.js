var wrapper_template_manipulator = require("./wrapper_template_manipulator")
var wrap_sign_server = require("./wrap_sign_server")

var template_filename = "wrapper_template.html"
var wrapper_proxy_listen_port = 8080

function on_template_ready_cb()
{
    //Initialize the page with empty uri
    debugger;
    var wrapped_page = new wrapper_template_manipulator.createWrappedPage(template_manipulator, "")
    var my_wrapper_proxy = new wrap_sign_server.createWrapperProxy(wrapped_page,wrapper_proxy_listen_port)

}

var template_manipulator =  new wrapper_template_manipulator.createTemplateManipulator(template_filename, on_template_ready_cb)
