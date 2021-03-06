'use strict';

angular.module('acuefuel')

.controller('updateAirportController', function ($scope, UpdateAirportService) {
  		$scope.dropName = true;
  		$scope.supplierName = true;
      	$scope.countryName = true;
      	$scope.subDivisionName = true;
      	$scope.fboHandlerName = true;
      	console.log(localStorage.getItem('airportLoader'))
      	if(localStorage.getItem('airportLoader') == 'false'){
      		$scope.showAirports = false;
      	}else{
      		$scope.showAirports = true;
      	}
		  console.log(localStorage.getItem('countryLoader'))
      	if(localStorage.getItem('countryLoader') == 'false'){
      		$scope.showCountries = false;
      	}else{
      		$scope.showCountries = true;
      	}
		  console.log(localStorage.getItem('fboHandleLoader'))
      	if(localStorage.getItem('fboHandleLoader') == 'false'){
      		$scope.fboHandlerDetail = false;
      	}else{
      		$scope.fboHandlerDetail = true;
      	}
		  console.log(localStorage.getItem('subDivStateLoader'))
      	if(localStorage.getItem('subDivStateLoader') == 'false'){
      		$scope.subDivState = false;
      	}else{
      		$scope.subDivState = true;
      	}
      	if(localStorage.getItem('suppDetailLoader') == 'false'){
      		$scope.suppDetail = false;
      	}else{
      		$scope.suppDetail = true;
      	}
      	
  		// Showing Date
      	var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		if(dd < 10){  
			dd='0'+dd;  
		}   
		if(mm < 10){  
			mm='0'+mm;  
		} 
		$scope.newDate = dd + '/' + mm + '/' + yyyy;

		//Import Airport Data
		$scope.data = {};
		$scope.importAirportData = function(fileName) {
			$scope.showAirports = false;
			window.localStorage.setItem('airportLoader', false);
			console.log("fileName ---  ",fileName)
			if(fileName.name != undefined){
				$scope.dropName = false;
				$scope.selectedFile = fileName;
				$scope.data.airportFile = $scope.selectedFile;
			}else if(fileName instanceof Array){
				$scope.dropName = false;
				$scope.selectedFile = fileName[0];
				$scope.data.airportFile = $scope.selectedFile;
			}
			var fileCheck = $scope.data.airportFile.name.split('.')[1];
			console.log(fileCheck)
			if(fileCheck == 'csv'){
				$scope.setFileTypeLocal("Airports")
				UpdateAirportService.updateAirportData($scope.data).then(function(result) {
					// localStorage.removeItem('airportLoader');
					$scope.showAirports = true;
			  	 	toastr.success('File Upload Successfully', {
		              closeButton: true
		            })
				}, function (err) {
					localStorage.removeItem('airportLoader');
					$scope.showAirports = true;
					toastr.error('Error in uploading', {
						closeButton: true
					})
				});
			}else {
				localStorage.removeItem('airportLoader');
				$scope.showAirports = true;
				$scope.dropName = true;
				toastr.error('Please select only csv file', {
	              closeButton: true
	            })
			}
			
		}

		//Import Supplier Detail Data
		$scope.supplierData = {};
		$scope.importSuppluerDetail = function(fileName){
			$scope.suppDetail = false;
			window.localStorage.setItem('suppDetailLoader', false);
			console.log(fileName)
			if(fileName.name != undefined){
				$scope.supplierName = false;
				$scope.selectedSuplier = fileName;
				$scope.supplierData.supplierDetailFile = $scope.selectedSuplier;
			}else if(fileName instanceof Array){
				$scope.supplierName = false;
				$scope.selectedSuplier = fileName[0];
				$scope.supplierData.supplierDetailFile = $scope.selectedSuplier;
			}
			var fileCheck = $scope.supplierData.supplierDetailFile.name.split('.')[1];
			console.log(fileCheck)
			if(fileCheck == 'csv'){
				$scope.setFileTypeLocal("SupplierDetail")
				UpdateAirportService.updateSupplierDetail($scope.supplierData).then(function(result) {
			  	console.log(result)
			  		$scope.suppDetail = true;
			  		// localStorage.removeItem('suppDetailLoader');
					  console.log("row count ",result)
			  	 	toastr.success('File Upload Successfully', {
		              closeButton: true
		            })
				}, function (err) {
					localStorage.removeItem('suppDetailLoader');
					$scope.suppDetail = true;
					toastr.error('Error in uploading', {
						closeButton: true
					})
				});
			}else {
				localStorage.removeItem('suppDetailLoader');
				$scope.suppDetail = true;
				$scope.supplierName = true;
				toastr.error('Please select only csv file', {
	              closeButton: true
	            })
			}
		}

		//Import Countries Data
		$scope.countryData = {};
		$scope.importCountryData = function(fileName){
			$scope.showCountries = false;
			window.localStorage.setItem('countryLoader', false);
			console.log(fileName)
			if(fileName.name != undefined){
				$scope.countryName = false;
				$scope.selectedCountry = fileName;
				$scope.countryData.countrieFile = $scope.selectedCountry;
			}else if(fileName instanceof Array){
				$scope.countryName = false;
				$scope.selectedCountry = fileName[0];
				$scope.countryData.countrieFile = $scope.selectedCountry;
			}
			var fileCheck = $scope.countryData.countrieFile.name.split('.')[1];
			console.log(fileCheck)
			if(fileCheck == 'csv'){
				$scope.setFileTypeLocal("Countries")
				UpdateAirportService.updateCountries($scope.countryData).then(function(result) {
			  	console.log(result)
			  		$scope.showCountries = true;
			  		// localStorage.removeItem('countryLoader');
			  	 	toastr.success('File Upload Successfully', {
		              closeButton: true
		            })
				}, function (err) {
					localStorage.removeItem('countryLoader');
					$scope.showCountries = true;
					toastr.error('Error in uploading', {
						closeButton: true
					})
				});
			}else {
				localStorage.removeItem('countryLoader');
				$scope.showCountries = true;
				$scope.countryName = true;
				toastr.error('Please select only csv file', {
	              closeButton: true
	            })
			}
		}

		//Import Sub Divison State Data
		$scope.subDivisionData = {};
		$scope.importsubDivisionData = function(fileName){
			$scope.subDivState = false;
			window.localStorage.setItem('subDivStateLoader', false);
			console.log(fileName)
			if(fileName.name != undefined){
				$scope.subDivisionName = false;
				$scope.selectedState = fileName;
				$scope.subDivisionData.subDivisionStateFile = $scope.selectedState;
			}else if(fileName instanceof Array){
				$scope.subDivisionName = false;
				$scope.selectedState = fileName[0];
				$scope.subDivisionData.subDivisionStateFile = $scope.selectedState;
			}
			var fileCheck = $scope.subDivisionData.subDivisionStateFile.name.split('.')[1];
			console.log(fileCheck)
			if(fileCheck == 'csv'){
				$scope.setFileTypeLocal("SubdivisionStates")
				UpdateAirportService.updateSubDivisionState($scope.subDivisionData).then(function(result) {
			  		// localStorage.removeItem('subDivStateLoader');
			  		$scope.subDivState = true;
			  	 	toastr.success('File Upload Successfully', {
		              closeButton: true
		            })
				}, function (error) {
					console.log("err",error)
					localStorage.removeItem('subDivStateLoader');
					$scope.subDivState = true;
					toastr.error('Error in uploading', {
						closeButton: true
					})
				});
			}else {
				localStorage.removeItem('subDivStateLoader');
				$scope.subDivState = true;
				$scope.subDivisionName = true;
				toastr.error('Please select only csv file', {
	              closeButton: true
	            })
			}
		}

		//Import FBO Handler Data
		$scope.fboHandlerData = {};
		$scope.importFboHandler = function(fileName){
			$scope.fboHandlerDetail = false;
			window.localStorage.setItem('fboHandleLoader', false);
			console.log(fileName)
			if(fileName.name != undefined){
				$scope.fboHandlerName = false;
				$scope.selectedFBO = fileName;
				$scope.fboHandlerData.FBOHandlerFile = $scope.selectedFBO;
			}else if(fileName instanceof Array){
				$scope.fboHandlerName = false;
				$scope.selectedFBO = fileName[0];
				$scope.fboHandlerData.FBOHandlerFile = $scope.selectedFBO;
			}
			var fileCheck = $scope.fboHandlerData.FBOHandlerFile.name.split('.')[1];
			console.log(fileCheck)
			if(fileCheck == 'csv'){
				$scope.setFileTypeLocal("FBOHandlerDetail")
				UpdateAirportService.updateFBOHandler($scope.fboHandlerData).then(function(result) {
			  	console.log(result)
			  		// localStorage.removeItem('fboHandleLoader');
			  		$scope.fboHandlerDetail = true;
			  	 	toastr.success('File Upload Successfully', {
		              closeButton: true
		            })
				}, function (err) {
					localStorage.removeItem('fboHandleLoader');
					$scope.fboHandlerDetail = true;
					toastr.error('Error in uploading', {
						closeButton: true
					})
				});
			}else {
				localStorage.removeItem('fboHandleLoader');
				$scope.fboHandlerDetail = true;
				$scope.fboHandlerName = true;
				toastr.error('Please select only csv file', {
	              closeButton: true
	            })
			}
		}
	
	
	// $scope.getAllUploadProgress = function(){
	// 	UpdateAirportService.getAllUploadProgress().then(function(result) {
	// 		console.log("all results ",result)
	// 		for(var i =0 ; i<result.length; i++){
	// 			if(result[i].filetype == 'Airports'){
	// 				$scope.record.AirportCount = result[i].progress
	// 				$scope.record.AirportStatus = result[i].status
	// 			}
	// 			else if(result[i].filetype == 'Countries'){
	// 				$scope.record.CountriesCount = result[i].progress
	// 				$scope.record.CountriesStatus = result[i].status
	// 			}
	// 			else if(result[i].filetype == 'SubdivisionStates'){
	// 				$scope.record.SubdivisionStatesCount = result[i].progress
	// 				$scope.record.SubdivisionStatesStatus = result[i].status
	// 			}
	// 			else if(result[i].filetype == 'FBOHandlerDetail'){
	// 				$scope.record.FBOHandlerDetailCount = result[i].progress
	// 				$scope.record.FBOHandlerDetailStatus = result[i].status
	// 			}
	// 			else if(result[i].filetype == 'SupplierDetail'){
	// 				$scope.record.SupplierDetailCount = result[i].progress
	// 				$scope.record.SupplierDetailStatus = result[i].status

	// 			}
	// 		}
			
	// 	})

	// }	
	// $scope.getAllUploadProgress();

	$scope.setFileTypeLocal = function(value){
		if(value == 'Airports'){
		window.localStorage.setItem('filetypeA', value+",InProgress")
	}
		else if(value == 'Countries'){
		window.localStorage.setItem('filetypeC', value+",InProgress")
	}
		else if(value == 'SubdivisionStates'){
		window.localStorage.setItem('filetypeSS', value+",InProgress")
	}
		else if(value == 'FBOHandlerDetail'){
		window.localStorage.setItem('filetypeFBO', value+",InProgress")
	}
		else if(value == 'SupplierDetail'){
		window.localStorage.setItem('filetypeSD', value+",InProgress")
	}


	
	}
	


})