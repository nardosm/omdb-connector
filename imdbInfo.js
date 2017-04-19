function parseResponse(response,tableData){
  resp = response.Search;
  for (i = 0, len = resp.length; i < len; i++) {
    tableData.push({
      "Title": resp[i].Title,
      "Year":parseInt(resp[i].Year),
      "imdbID":resp[i].imdbID,
      "Type":resp[i].Type,
      "Poster":resp[i].Poster
    });
  }
}

// Create the connector object
var myConnector = mstr.createDataConnector();
var setTableSchema = function(tableSchema){
  var cols = [{
    name: "Title",
    dataType: mstr.dataTypeEnum.string
  }, {
    name: "Year",
    dataType: mstr.dataTypeEnum.int
  }, {
    name: "imdbID",
    dataType: mstr.dataTypeEnum.string
  }, {
    name: "Type",
    dataType: mstr.dataTypeEnum.string
  }, {
    name: "Poster",
    dataType: mstr.dataTypeEnum.string
  }];
    tableSchema.column = cols;
}

  

// Download the data

myConnector.fetchTable = function(table, params, doneCallback) {
  // mstrObj represents all useful information that the connector saved before sumbit
  debugger;
  var mstrObj = JSON.parse(params);
  var dataObj = mstrObj.connectionData;
  var tableData=[];
  var baseUrl = "http://www.omdbapi.com/?s="+dataObj.value;
  setTableSchema(table.tableSchema);
  $.ajax(baseUrl).success(function(response) {
    parseResponse(response,tableData);         
    var total = parseInt(response.totalResults);
    var pages = Math.ceil(total/10);
    var ajaxArray = []
    for (i=2;i<=pages;i++){
      url = baseUrl + "&page="+i;
      var a=$.ajax(url).done(
        function(response){
          parseResponse(response,tableData)
        }
      )
      ajaxArray.push(a);
    }
    $.when.apply(null,ajaxArray).done(function(){
      table.appendFormattedData(tableData);
      doneCallback(table);
    });
  });
};


// validateDataConnector will do validation check of the connector        
mstr.validateDataConnector(myConnector);
// Create event listeners for when the user submits the form
$(document).ready(function() {
  $("#submitButton").click(function() {
	  debugger;
    var content = $("#Search").val();
    var dataObj = {
      value:content
    };
    mstr.connectionData = dataObj;
    // This will be the data source name in mstr
    mstr.connectionName = "omdb";         
    mstr.fileType = 'FORMAT_JSON';
    var params = {};
    mstr.connectionData = mstr.connectionData;
    mstr.authenticationInfo = "";
    mstr.authType = mstr.authTypeEnum.anonymous;
    mstr.tableList = [];
    mstr.tableList.push({tableName: "omdb"});
    console.log(JSON.stringify(params));
    window.mstr.submit();
  });
});