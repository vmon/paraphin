fs = require("fs")
/**
   This is the constructor for the object that manipulate
   the iframe template to represent the page that the user
   request

   @wrapper_template_fliename the name html file that contains the template
   @on_template_load is the callback which is called after the template is 
                      read in the memomry
*/
function createTemplateManipulator(wrapper_template_filename, on_template_load)
{
    debugger;
    this._filename = wrapper_template_filename;
    this._on_template_load = on_template_load;

    //callback that is called by fs when the template are read
    //from disk by fs
    this.load_template = function (err, data) {
        debugger;
        if (err) throw err;
        console.log(data);
        this._template = String(data)
        //call the user's callback 
        this._on_template_load()
    }

    /**
       Gets src_url and set the iframe src equal to it.
       
       @src_url the url to the requested page
    */
    this.embed_page = function(src_url) {
        if (this._template == undefined) {
            throw "date not loaded"
            return;
        }

        debugger;
        //I need to search for iframe statement here
        iframe_offset = this._template.indexOf("iframe id=\"wrapped_page\"")
        wrapped_src_offset = iframe_offset+"iframe id=\"wrapped_page\" src=\"".length
        return this._template.substring(0, wrapped_src_offset) + src_url + this._template.substring(wrapped_src_offset)
    }
    
    //along with object creatation we aim at reading the template
    fs.readFile(this._filename, this.load_template.bind(this));
    
}
    
/**
   constructor for creating the object that create and embed different 
   components of the wrapped page. These are 1.iframe 2. the signature 
   verifier 3. the signature.

   @page_uri the uri to the mirrored page
   @template_manipulator the template manipulator with loaded template
   @signature_verifier signature verifier object 
   @on_page_ready the callback that is called when the page is ready 
*/
function createWrappedPage(template_manipulator, page_uri, signature_verifier, on_page_ready)
{
    //I have yet to implemenet signature related stuff for 
    //now we just embeds stuff here
    this.uri = page_uri;
    this._template_manipulator = template_manipulator;
    this._mirror = "http://equalit.ie" //this need to be chosen later

    try {
        debugger;
        this._page_body = template_manipulator.embed_page(this.uri)
    } 
    catch(err){
        console.log(err);
        console.log("Template manipulator object is not ready.");
        return;
    }
    
    /** 
        Access functions for page_uri
    */
    this.__defineGetter__("page", function(){
        if (this._page_body == undefined)
            throw "page has not been created yet.";
        
        return this._page_body
    });

    this.__defineSetter__("page", function(uri){
        try {
            debugger;
            this.uri = uri;
            this._page_body = this._template_manipulator.embed_page(this._mirror+this.uri);
        } 
        catch(err)
        {
            console.log(err);
            console.log("Template manipulator object is not ready.");
        }
    });
      
}

exports.createTemplateManipulator = createTemplateManipulator;
exports.createWrappedPage = createWrappedPage
