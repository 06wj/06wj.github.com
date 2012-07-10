function loadFileToElement(filename, elementId)
{
    var xmlHTTP = new XMLHttpRequest();
    try
    {
    xmlHTTP.open("GET", filename, false);
    xmlHTTP.send(null);
    }
    catch (e) {
        window.alert("Unable to load the requested file.");
        return;
    }

    console.log(xmlHTTP.responseText);
}

loadFileToElement("footman.xml")