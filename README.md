# Exportar documento a PDF

Para exportar un documento de office(word,excel,etc) sin tener un "Power Automate" o un "Azure function" podemos ejecutar en nuestro código de SPFX el  Java Script(exporFileToPDF.js) y aprovechar la funcionalidad de SharePoint para obtener la URL al PDF que SharePoint genera, esa URL es la misma que se utiliza en "Save as PDF" de word on line o la funcionalidad de Export de Microsoft Graph, con la ventaja que no necesitamos Registrar una App.

Solo es necesario adecuar las variables de Javascript
```javascript
var tenantURL = "https://midominniodev.sharepoint.com";   //tenat
var siteRelativeURL = "/sites/PlantaMON";                 // url al sitio 
var folder = "TestBiblioteca";                            // carpeta del archivo
var spItemID = "4";                                       // Id del archivo
```

Al ejecutar el código obtendremos la url al documento PDF

![image](https://user-images.githubusercontent.com/50918464/132559331-5ce11ecf-66e6-4651-afc2-98d72a5ece06.png)

Si pegamos esa url en otro navegador podremos ver el PDF.
![image](https://user-images.githubusercontent.com/50918464/132559513-7cc3ba13-1eb6-4d38-80e0-100b50aba619.png)

Ahora  si , solo queda adaptar el código en tu proyecto de SPFX , parametrizar las variables generales y hacer con el PDF lo que quieras.

Tip: La URL al PDF se puede compartir con cualquier usuario y siempre mostrará el PDF sin importar si está autenticado o es de otro tenant, pero solo está disponible unos cuantos minutos.
