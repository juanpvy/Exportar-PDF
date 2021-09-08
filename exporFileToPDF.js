// variables generales
var tenantURL = "https://midominniodev.sharepoint.com";     //tenat
var siteRelativeURL = "/sites/PlantaMON";                   // url al sitio 
var folder = "TestBiblioteca";                              // carpeta del archivo
var spItemID = "4";                                         // Id del archivo

// URL al endpoint RenderListDataAsStream que es el que nos da la ruta al PDF
var urlGetItemById = tenantURL+siteRelativeURL+"/_api/web/lists/GetbyTitle('"+folder+"')/RenderListDataAsStream?FilterField1=ID&FilterValue1="+spItemID;
var folderRelativeURL = siteRelativeURL+"/"+folder;

// Primero hay que obetener el DigestValue(para temas de seguridad en llamadas POST)
// TIP: en SPFX podemos utilizar DigestCache  https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/working-with-requestdigest
fetch(tenantURL+siteRelativeURL+"/_api/contextinfo",{method: 'POST',headers: {'Accept': 'application/json; odata=verbose','Content-Type': 'application/json; odata=verbose'}})
.then(response => {     
  // retornamos el valor en formato JSON
   return(response.json())
})
.then(data => {  
   // Retornamos solo el valor que nos interesa(DigestValue)
    return data.d.GetContextWebInformation.FormDigestValue;
})
.then( fdg => {  

    // Ahora si , ejecutar la llamada POST que nos retorna el PDF, configuramos los parametros
    var metadata ={ "parameters": { "RenderOptions" : 4103, "FolderServerRelativeUrl" : folderRelativeURL}};    
    var postHeaders = new Headers({'X-RequestDigest': fdg,'Accept': 'application/json; odata=verbose','Content-Type': 'application/json; odata=verbose'});
    var postOptions = { method: 'POST', headers: postHeaders,credentials: 'include',    body: JSON.stringify(metadata)};
	
    // Hacemos la llamada
    fetch(urlGetItemById,postOptions)
    .then(response => {     
       return(response.json())
    })
    .then(data => {  
      // Nos retorna la informacion necesaria para obtener la URL directa al PDF
	  // La url que nos importa es la del parametro ".pdfConversionUrl" , hay que hacer algunos replace para obtener la URL final
       var pdfURL = data.ListSchema[".pdfConversionUrl"].replace("{.mediaBaseUrl}",data.ListSchema[".mediaBaseUrl"])
       .replace("{.fileType}",data.ListData.Row[0]["File_x0020_Type"])
       .replace("{.callerStack}",data.ListSchema[".callerStack"])
       .replace("{.spItemUrl}",data.ListData.Row[0][".spItemUrl"])
       .replace("{.driveAccessToken}",data.ListSchema[".driveAccessToken"])      
       console.log("pdfURL:",pdfURL)
    });
    
});