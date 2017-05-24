var myConnector = mstr.createDataConnector();
    
    // Download the data
    myConnector.fetchTable = function(table, params, doneCallback) {};

    mstr.validateDataConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            console.log("Customer click submit");
            mstr.connectionData = {}; // Use this variable to pass data to your fetchTable functions
            mstr.connectionName = "RawDataJson"; // This will be the data source name in mstr
            mstr.fileType = 'JSON';
            var params = {};
            mstr.connectionData = mstr.connectionData;
            mstr.authenticationInfo = "";
            mstr.authType = mstr.authTypeEnum.anonymous;
            mstr.tableList = [];
            mstr.tableList.push({tableName: "RawDataJson12"});
            console.log(JSON.stringify(params));
	    var eventName = $("#search");
	    mstr.fetchURL = "https://eventmanager-4c485.firebaseio.com/Events" + eventName + ".json"
            window.mstr.submit();
            //window.close();
        });
    });
//})();








/*
var myConnector = mstr.createDataConnector();
    
    // Download the data
    myConnector.fetchTable = function(table, params, doneCallback) {
        var mstrObj = JSON.parse(params);
        var url = "http://rawgit.com/nardosm/omdb-connector/master/test.json";

		$.get(url,function(response){
			table.appendRawData(response);
			doneCallback(table);
		})
    };

    mstr.validateDataConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            console.log("Customer click submit");
            mstr.connectionData = {}; // Use this variable to pass data to your fetchTable functions
            mstr.connectionName = "RawDataJson"; // This will be the data source name in mstr
            mstr.fileType = 'JSON';
            var params = {};
            mstr.connectionData = mstr.connectionData;
            mstr.authenticationInfo = "";
            mstr.authType = mstr.authTypeEnum.anonymous;
            mstr.tableList = [];
            mstr.tableList.push({tableName: "RawDataJson12"});
            console.log(JSON.stringify(params));
            window.mstr.submit();
            //window.close();
        });
    });
//})();
*/
