'use strict';

 //Load controller
  angular.module('acuefuel')

	.controller('updateFBODeptController', function($scope, $stateParams, $state, UpdateAllFBODept, UpdateAllFBO, FBOFlight, FBOAdmin) {
      $(document).ready(function(){
        $('.fboflight').addClass('active');
      });
      $scope.showPayments = true;
      $scope.aircraft = {};
      $scope.updateData = {};
      var userProfileID = $stateParams.id;
      $scope.companyId;
      
      UpdateAllFBODept.getALlFBOData(userProfileID).then(function(result) {
          console.log(result)
          $scope.user = result;
         // $scope.aircraft.accountId = result.account.id;
          $scope.user.userTypeId = result.userType.id;
          UpdateAllFBODept.getNotes(userProfileID).then(function(response) {
            $scope.user.clientNote = response[0].notes
            $scope.user.userNoteId = response[0].id;
          })
          // $scope.feature = result.accountFeatureControl;
          // console.log($scope.feature,"dsdsdsds")
          if($scope.user.account.user.status == 'ACTIVE'){
            $scope.status = true;
          }else {
            $scope.status = false;
          }
        })
      
      UpdateAllFBODept.getAssociatedCompany(userProfileID).then(function(result) {
        console.log('=======q===',result)
        $scope.companyId = result.id;
        getCrafts(result.id);
        $scope.aircraft.accountId = result.id;
      })

      
      function getCrafts(id){
        UpdateAllFBODept.getAircrafts(id).then(function(response) {
          $scope.getCraftList = response;
          for(var i=0;i<$scope.getCraftList.length;i++){
            $scope.getCraftList[i].sizeId = $scope.getCraftList[i].compAircraftSize.id;
            $scope.getCraftList[i].size = $scope.getCraftList[i].compAircraftSize.size;
          }
        })
      }
      
      UpdateAllFBODept.getPaymentMethod(userProfileID).then(function(response) {
          $scope.paymentList = response;

      })

      $scope.openCard = function(payment){
        console.log(payment)
        $scope.showPayments = false;
        $scope.data = {};
        $scope.data.cardNumber = payment.cardNumber;
        $scope.data.cardType = payment.cardType;
        $scope.data.expiryDate = payment.expiryDate;
        $scope.data.id = payment.id;
        $scope.data.accountId = payment.user.account.id;
      }

      var cardData = {}
      cardData.paymentMethodList = [];
      $scope.updateCard = function(){
        console.log($scope.data)
        cardData.paymentMethodList.push($scope.data);
        console.log("cardData", cardData);
        UpdateAllFBODept.updatePaymentMethod(cardData).then(function(result) {
          console.log(result)
            toastr.success('Updated Successfully', {
              closeButton: true
            })
          $scope.reset();
        })
      }


      $scope.reset = function(){
        cardData.paymentMethodList = [];
      }

      $scope.checkUsername = function(){
        FBOAdmin.checkUsernameEmail($scope.user.email).then(function(status) {
          console.log(status)
          if(status != 200){
            toastr.error('This email has alreay taken', {
              closeButton: true
            })
          }
        })
      }

      $scope.userData = function(){
        console.log($scope.user.userTypeId)
        if($scope.user.email == undefined || $scope.user.email == null){
          toastr.error('Please enter your email first', {
            closeButton: true
          })
        }else if($scope.user.firstName == undefined || $scope.user.firstName == null){
          toastr.error('Please enter your First Name', {
            closeButton: true
          })
        }else{
          if($scope.status == true){
            $scope.user.status = 'active';
          }else{
            $scope.user.status = 'inactive';
          }
          $scope.user.username = $scope.user.email;
          $scope.user.userType = 'flightDetp';
          console.log($scope.user)
          // if($scope.user.userNoteId == undefined){
          //   $scope.user.userNoteId = null;
          // }
          var updateData = "companyName=" + $scope.user.companyName + "&username=" + $scope.user.username + "&firstName=" + $scope.user.firstName + "&lastName=" + $scope.user.lastName + "&phone=" + $scope.user.phone + "&mobile=" + $scope.user.mobile + "&status=" + $scope.user.status + "&userType=" + $scope.user.userType + "&userNote=" + $scope.user.clientNote + "&userNoteId=" + $scope.user.userNoteId + "&userTypeId=" + $scope.user.userTypeId + "&userProfileId=" + userProfileID;
          UpdateAllFBO.updateUser(updateData).then(function(result) {
            toastr.success(''+result.success+'', {
                closeButton: true
            })
          })
          $state.go('index.flightDept');
        }
      }

      getData();
      function getData(){
        FBOFlight.getAircraftMake().then(function(result) {
          $scope.aircraftMakeList = result;
          $scope.aircraft.make = $scope.aircraftMakeList[0];
          FBOFlight.getModal($scope.aircraft.make).then(function(result) {
            $scope.aircraftModalList = result;
            $scope.aircraft.model = $scope.aircraftModalList[0];

            FBOFlight.getAircraftSize($scope.aircraft.make, $scope.aircraft.model).then(function(result) {
              $scope.aircraftSizeList = result;
              $scope.aircraft.sizeId = $scope.aircraftSizeList[0].aircraftSize.id;
                
            })
          })
            
        })
      }

      $scope.getModal = function(){
        var makeId = $scope.aircraft.make
        FBOFlight.getModal(makeId).then(function(result) {
          $scope.aircraftModalList = result;
          $scope.aircraft.model = $scope.aircraftModalList[0];

          FBOFlight.getAircraftSize(makeId, $scope.aircraft.model).then(function(result) {
            $scope.aircraftSizeList = result;
            $scope.aircraft.sizeId = $scope.aircraftSizeList[0].aircraftSize.id;
          })
        })
      }

      $scope.getSize = function(){
        FBOFlight.getAircraftSize($scope.aircraft.make, $scope.aircraft.model).then(function(result) {
          $scope.aircraftSizeList = result;
          console.log($scope.aircraftSizeList)
          $scope.aircraft.sizeId = $scope.aircraftSizeList[0].aircraftSize.id;
          console.log($scope.aircraft.sizeId)
        })
      }

      
      
      $scope.addAircraft = function(){
    	  $scope.aircraftListData = {};
          $scope.addData = [];
          $scope.aircraftListData.aircraftList= [];
          
          $scope.addData.push({ 
            'tail': $scope.aircraft.tail,
            'make': $scope.aircraft.make,
            'model': $scope.aircraft.model,
            'sizeId' : $scope.aircraft.sizeId
          });
          console.log('$scope.addData',$scope.addData);
          
          $scope.aircraftListData.aircraftList = $scope.addData;
          $scope.aircraftListData.accountId = $scope.companyId;
        console.log($scope.aircraft)
        //$scope.aircraftData.aircraftList.push($scope.aircraft);
        
        FBOFlight.addAircraft($scope.aircraftListData).then(function(result) {
          $('#myModal4').modal('hide');
          getCrafts($scope.companyId);
          $scope.resetData();
          toastr.success('Created Successfully', {
            closeButton: true
          })
        }, function (err) {
            toastr.error('Error in Adding Aircraft', {
              closeButton: true
            })
            $('#myModal4').modal('hide');
            $scope.getCraftList.splice($scope.aircraft);
        });
       }

      $scope.closeModal = function(){
        $("#myModal5").modal('hide');
        $scope.resetData();
      }

      $scope.update = function(airdata){
        $("#myModal5").modal('show');
        $scope.aircraft = airdata;
        console.log('--------$scope.companyId---',$scope.companyId);
        $scope.aircraft.accountId = $scope.companyId;
        
        FBOFlight.getModal($scope.aircraft.make).then(function(result) {
          $scope.aircraftModalList = result;
          FBOFlight.getAircraftSize($scope.aircraft.make, $scope.aircraft.model).then(function(result) {
            $scope.aircraftSizeList = result;
            console.log($scope.aircraftSizeList)
            $scope.aircraft.sizeId = $scope.aircraftSizeList[0].aircraftSize.id;
          })
        })
      }

      $scope.updatecraftData = {};
      $scope.updatecraftData.aircraftList = [];
      $scope.updateAircraftData = {};

      $scope.updateAircraft = function(updateAircraft){
        $scope.updateAircraftData.id = updateAircraft.id;
        $scope.updateAircraftData.make = updateAircraft.make;
        $scope.updateAircraftData.model = updateAircraft.model;
        $scope.updateAircraftData.sizeId = updateAircraft.sizeId;
        $scope.updateAircraftData.tail = updateAircraft.tail;
        $scope.updateAircraftData.accountId = $scope.companyId;
        console.log($scope.updateAircraftData)

        $scope.updatecraftData.aircraftList.push($scope.updateAircraftData);
        console.log($scope.updatecraftData.aircraftList)
        
        UpdateAllFBODept.updateAircraft($scope.updatecraftData).then(function(result) {
          $('#myModal5').modal('hide');
          $scope.resetData();
          getCrafts($scope.companyId);
          toastr.success('Updated Successfully', {
            closeButton: true
          })
        }, function (err) {
            toastr.error('Error in Updating Aircraft', {
              closeButton: true
            })
            $('#myModal5').modal('hide');
            $scope.getCraftList.splice($scope.aircraft);
        });
      }

      $scope.remove = function(data){
        console.log(data)
        UpdateAllFBODept.removeAircraft(data.id).then(function(result) {
          toastr.success(''+result.success+'', {
            closeButton: true
          })
          getCrafts($scope.companyId);
        })
      }

      $scope.resetData = function() {
        $scope.aircraft = {};
        $scope.aircraft.accountId = $scope.companyId;
        $scope.aircraftListData.aircraftList = [];
        getData();
      }

  });