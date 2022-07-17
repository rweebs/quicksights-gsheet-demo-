
function  saveToS3() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  // Get All Sheets
  var sheets = ss.getSheets();
  for (var i=0; i <sheets.length; i++){
    var sheet = sheets[i]
    // append ".csv" extension to the sheet name
    fileName = sheet.getName() + ".csv";
    // convert all available sheet data to csv format
    // var csvFile = convertRangeToCsvFile_(fileName, sheet);
    var AccessKeyId = PropertiesService.getScriptProperties().getProperty('AccessKeyId');
    var SecretAccessKey = PropertiesService.getScriptProperties().getProperty('SecretAccessKey');
    var Bucket = PropertiesService.getScriptProperties().getProperty('Bucket');
    var s3 = getInstance(AccessKeyId, SecretAccessKey);
    var ssID = ss.getId();
  
    var requestData = {"method": "GET", "headers":{"Authorization":"Bearer "+ScriptApp.getOAuthToken()}};
      var sheetNameId = sheet.getSheetId().toString();
  
      params= ssID+"/export?gid="+sheetNameId +"&format=csv"
      var url = "https://docs.google.com/spreadsheets/d/"+ params
      var result = UrlFetchApp.fetch(url, requestData);  
      console.log(result.getBlob())
    s3.putObject(Bucket, fileName, result.getBlob(), {logRequests:true});
  }

}
function sheetToCsv()
{
    var ssID = SpreadsheetApp.getActiveSpreadsheet().getId();
    var sheet_Name = "Sheet1"
  
  
    var requestData = {"method": "GET", "headers":{"Authorization":"Bearer "+ScriptApp.getOAuthToken()}};
  
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet_Name)
      var sheetNameId = sheet.getSheetId().toString();
  
      params= ssID+"/export?gid="+sheetNameId +"&format=csv"
      var url = "https://docs.google.com/spreadsheets/d/"+ params
      var result = UrlFetchApp.fetch(url, requestData);  
  
   var resource = {
  title: sheet_Name+".csv",
  mimeType: "application/vnd.csv"
     }
   var fileJson = Drive.Files.insert(resource,result)
  
} 
function getInstance(accessKeyId, secretAccessKey, options) {
  return new S3(accessKeyId, secretAccessKey, options);
}
