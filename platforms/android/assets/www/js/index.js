/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        var isLogin = window.localStorage.getItem("LOGIN_FLAG");
        
        if (isLogin!=undefined && isLogin=="Y") {
            $.mobile.changePage("homepage.html",{transition: "slide"});
        } else {
            $.mobile.changePage("index.html",{transition: "slide"});
        }
    }
};

$(document).ready(function () {
    $("#loginForm input").keyup(function (e) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        if (e.keyCode == 13) {
            $("#login").trigger("click");
            return false;
        }
    });
    
    $(document).on("click", "#backBtn", function(event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        $.mobile.back();
    });
    $(document).on("click", "#login", function(event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        var name = $("#userName").val();
        var pwd = $("#password").val();
        if (name == "") {
            showAlert("Please fill your email");
        } else if (pwd == "") {
            showAlert("Please fill your user password");
        } else {
            var data={
                email:name,
                password:pwd,
                mobile_code: HASH
            }
            USER_NAME=name;
            USER_PASSWORD=pwd;
            callAjax("POST",LOGIN_URL,data,loginSuccess);
        }
    });
    
    $(document).on("click", "#forgotPw", function(event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        $.mobile.changePage("forgotPw.html",{transition: "flip"});
    });
    
    $(document).on("pageinit", "#forgotPwPage", function(event) {
        $(document).on("click", "#submitForgotPw", function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            var forgotEmail = $("#forgotEmail").val();
            if (forgotEmail=="") {
                showAlert(FORGOT_PW_EMPTY);
            } else {
                var data={
                    email : forgotEmail,
                    mobile_code: HASH
                }
                USER_NAME=forgotEmail;
                callAjax("POST",FORGOT_PW_URL,data,forgotPwSuccess);
            }
        });
    });
    
    $(document).on("pageinit", "#forgotPwConfirmPage", function(event) {
        $(document).on("click", "#submitForgotPwCode", function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            var verCode = $("#forgotEmailCode").val();
            if (verCode=="") {
                showAlert(FORGOT_PW_CODE_EMPTY);
            } else {
                var data = {
                    email: USER_NAME,
                    code: verCode,
                    mobile_code:HASH
                }
                callAjax("POST",FORGOT_PW_SUBMIT_URL,data,forgotPwConfirm);
            }
        });
        
        $(document).on("click", "#resendCode", function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            var data={
                email : USER_NAME,
                mobile_code: HASH
            }
            callAjax("POST",FORGOT_PW_URL,data,function(){
                showAlert(FORGOT_PW_SUCCESS);  
            });
        });
    });
    
    $(document).on("pageshow", "#homePage", function(event) {
        $(document).on("click", ".homeIco", function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            var id=$(this).attr("id");
            if (id=="reportIco") {
                $.mobile.changePage("reportCategory.html",{transition: "slide"});
            } else if (id=="poIco") {
                $.mobile.changePage("poForm.html",{transition: "slide"});
            } else if (id=="profileIco") {
                $.mobile.changePage("profilePage.html",{transition: "slide"});
            }
        });
        
        $(document).on("click", "#logout", function(event) {
            window.localStorage.removeItem("LOGIN_FLAG");
            $.mobile.changePage("index.html",{transition: "flip"});
        });
        
        $(".welcomeFooter").textillate(
            {
                loop: true,
                minDisplayTime: 2000,
                autoStart: true,
                in: {
                        // set the effect name
                        effect: 'flash',
                        // set the delay factor applied to each consecutive character
                        delayScale: 1.5,
                        // set the delay between each character
                        delay: 50,
                        // set to true to animate all the characters at the same time
                        sync: false,
                        // randomize the character sequence 
                        // (note that shuffle doesn't make sense with sync = true)
                        shuffle: false,
                        // reverse the character sequence 
                        // (note that reverse doesn't make sense with sync = true)
                        reverse: false,
                        // callback that executes once the animation has finished
                        callback: function () {}
                    },
                out: {
                    // set the effect name
                    effect: 'flash',
                    // set the delay factor applied to each consecutive character
                    delayScale: 1.5,
                    // set the delay between each character
                    delay: 50,
                    // set to true to animate all the characters at the same time
                    sync: false,
                    // randomize the character sequence 
                    // (note that shuffle doesn't make sense with sync = true)
                    shuffle: false,
                    // reverse the character sequence 
                    // (note that reverse doesn't make sense with sync = true)
                    reverse: false,
                    // callback that executes once the animation has finished
                    callback: function () {}
                    },
            });
        });
    
    $(document).on("pageinit", "#reportPage", function(event) {
        //set selected calendar
        var today = new Date();
        var month = today.getMonth(); //January is 0!
        var year = today.getFullYear();
        var yearCount = parseInt(today.getFullYear()-6);
        
        var data = {
            mobile_code: HASH,
            month: monthArr[month],
            region:getRegion(),
            year: year,
            dir:REPORT_FROM
        }
        
        var restHtml ="";
        console.log("YEARCOUNT === " + yearCount);
        console.log("YEAR === " + year);
        for(var i = yearCount;i<=year;i++) {
            restHtml += "<option value='"+i+"'>"+i+"</option>";
        }
        
        $("#monthReport").val(month).selectmenu("refresh", true);
        
        $("#yearReport").html(restHtml).selectmenu("refresh", true);
        $("#yearReport").val(year).selectmenu("refresh", true);
        
        callAjax("POST",LIST_REPORT_URL,data,renderReport);
        
        $(document).on("change", "#monthReport", function(event) {
            var data = {
                mobile_code: HASH,
                dir:REPORT_FROM,
                region:getRegion(),
                year: $("#yearReport").val(),
                month: monthArr[$(this).val()]
            }
            callAjax("POST",LIST_REPORT_URL,data,renderReport);
        });
        
        $(document).on("change", "#yearReport", function(event) {
            var data = {
                mobile_code: HASH,
                dir:REPORT_FROM,
                region:getRegion(),
                year: $(this).val(),
                month: monthArr[$("#monthReport").val()]
            }
            callAjax("POST",LIST_REPORT_URL,data,renderReport);
        });
        
        $(document).on("keyup","#filterReport", function(event){
            event.stopPropagation();
            event.stopImmediatePropagation();
            var key = $(this).val();
            $("#reportList > li").each(function() {
                if ($(this).text().toLowerCase().search(key.toLowerCase()) > -1) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }
            });
        });
        
        $(document).on("click", ".viewDoc", function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            var data ={
                mobile_code: HASH,
                region:getRegion(),
                folder_name:REPORT_FROM,
                month:monthArr[$("#monthReport").val()],
                year:$("#yearReport").val(),
                name:encodeURI($(this).parent().attr("data-target")),
            }
            callAjax("POST",REPORT_URL,data,viewReport);
        });
        
        $(document).on("click", ".downloadIco", function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            var data ={
                mobile_code: HASH,
                region:getRegion(),
                month:monthArr[$("#monthReport").val()],
                year:$("#yearReport").val(),
                name:encodeURI($(this).parent().attr("data-target")),
                folder_name:REPORT_FROM
            }
            callAjax("POST",REPORT_URL,data,downloadReport);
        });
    });
    
    $(document).on("pageinit", "#reportCategoryPage", function(event) {
        var data ={
                mobile_code:HASH,
                region: getRegion()
            };
        callAjax("POST",LIST_REPORT_URL,data,renderReportList);
                
        $(document).on("click", ".reportListing", function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            var id=$(this).attr("data-target");
            REPORT_FROM=id;
            $.mobile.changePage("reportPage.html",{transition: "slide"});
        });
    });
    
    $(document).on("pageinit", "#profilePage", function(event) {
        var profileJson = window.localStorage.getItem("profile");
        if (typeof(profileJson) == "string") {
            profileJson = JSON.parse(profileJson);
        }
        $("#userNm").html(profileJson.name);
        $("#userEmail").html(profileJson.email);
        $("#userTelp").html(profileJson.phone);
    });
    
    $(document).on("pageinit", "#poPage", function(event) {
        var poHistoryForm="";
        var custNameHist = [];
        
        try {
            poHistoryForm = window.localStorage.getItem("poFormHistory");
        } catch(err) {
            console.log("poHistoryForm EMPTY");
        }
        
        if (poHistoryForm != "" && poHistoryForm != undefined) {
            var custNameArr = JSON.parse(poHistoryForm).custArray;
            var keyword = $(this).val();
            var restHtml = "";
            for(var i=0; i<custNameArr.length;i++) {
                restHtml+="<li id='"+custNameArr[i]+"' class='custName'>"+custNameArr[i]+"</li>"
            }
            $("#custHistorySelect").html(restHtml);
        }
        
        var data={
            mobile_code:HASH
        }
        callAjax("POST",PRODUCT_LIST,data,renderProduct);
        
        $(document).on("keyup", "#custName", function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            //custHistorySelect
            
            var key = $(this).val();
            if (key != "") {
                $("#custHistorySelect").show();
            
                $("#custHistorySelect > li").each(function() {
                    if ($(this).text().toLowerCase().search(key.toLowerCase()) > -1) {
                        $(this).show();
                    }
                    else {
                        $(this).hide();
                    }
                });
            } else {
                $("#custHistorySelect").hide();
            }
        });
        
        $(document).on("click",".custName", function(event){
            event.stopPropagation();
            event.stopImmediatePropagation();
            var id = $(this).attr("id");
            
            if (poHistoryForm == null || poHistoryForm =="") {
                poHistoryForm = window.localStorage.getItem("poFormHistory");
            }
            var jsonOb =JSON.parse(poHistoryForm).poFormHistory;
            
            var selectedUserData =  jsonOb[id];
            $("#custName").val(selectedUserData.name);
            $("#custAddress").val(selectedUserData.address);
            $("#custTel").val(selectedUserData.telp);
            $("#custTel_2").val(selectedUserData.telp2);
            $("#custTel_3").val(selectedUserData.telp3);
            $("#faswName").val(selectedUserData.sales);
            $("#contactPerson").val(selectedUserData.contact);
            
            $("#custHistorySelect").hide();
        });
        
        $(document).on("change", ".prdNameSelect", function(event) {
            var selectedCat = $(this).val();
            var idx = $(this).attr('idx');
            if (selectedCat != null || selectedCat!= "") {
                renderDetailProduct(selectedCat,idx);
            }
        });
        
        $(document).on("change", ".prdDetailSelect", function(event) {
            var selectedPrd = $(this).val();
            var idx = $(this).attr('idx');
            if (selectedPrd != null || selectedPrd!= "") {
                renderQtyProduct(selectedPrd,idx);
            }
        });
        
        $(document).on("click", "#addPrd", function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            prdIdx++;
            //var restHtml = '<select name="prdName_'+prdIdx+'" id="prdName_'+prdIdx+'">'+
            //                    '<option value="standard">Standard: 7 day</option>'+
            //                    '<option value="rush">Rush: 3 days</option>'+
            //                    '<option value="express">Express: next day</option>'+
            //                    '<option value="overnight">Overnight</option>'+
            //                '</select>';
            //$("#prdNameSection").append(restHtml);
            //$("#prdNameSection #prdName_"+prdIdx).selectmenu();
            
            //callAjax("POST",PRODUCT_LIST,data,renderAddProduct);
            var prodJSON = JSON.parse(window.localStorage.getItem("productList"));
            renderAddProduct(prodJSON);
        });
        
        $(document).on("click", "#submitPo", function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            var custName=$("#custName").val();
            var custAddress=$("#custAddress").val();
            var custTel=$("#custTel").val();
            var custTel_2=$("#custTel_2").val();
            var custTel_3=$("#custTel_3").val();
            var prdName_1=$("#prdName_1 option:selected").val();
            var faswName=$("#faswName").val();
            var contactPerson=$("#contactPerson").val();
            var comment=$("#comment").val();
            if (custName=="") {
                showAlert(POFORM_NAME);
            } else if (custAddress=="") {
                showAlert(POFORM_ADDRESS);
            } else if (custTel=="") {
                showAlert(POFORM_TELP);
            } else if (faswName=="") {
                showAlert(POFORM_FASW);
            } else if (contactPerson==""){
                showAlert(POFORM_CONTACT);
            } else if (comment=="") {
                showAlert(POFORM_COMMENT);
            } else if (prdName_1=="") {
                showAlert(POFORM_PRD_NAME);
            } else {
                //var resHtml = "Nama customer\t\t: "+custName+"\r\n"+
                //              "Alamat customer\t\t: "+custAddress+"\r\n"+
                //              "Telp customer\t\t\t: "+custTel+"\r\n"+
                //              "Nama produk\t\t\t: "+prdName_1+"\r\n"+
                //              "Nama Sales\t\t\t: "+faswName+"\r\n"+
                //              "Contact person\t\t: "+contactPerson;
                //var email="tbm@support.com";
                
                poHistorySave(custName,custAddress,custTel,custTel_2,custTel_3,faswName,contactPerson);
                var productListJson = new Object;
                var productObj = new Object;
                var productEach = [];
                for(var i=1; i<=prdIdx;i++){
                    productObj=new Object;
                    productObj.category = $("#prdName_"+i +" option:selected").val();
                    productObj.product = $("#prdDetail_"+i +" option:selected").val();
                    productObj.quantity = $("#unitVal_"+i).val()+" "+$(".unitProduct_"+i).text();
                    productEach.push(productObj);
                }
                productListJson.order = productEach;
                
                var data = {
                    mobile_code:HASH,
                    nama : custName,
                    alamat : custAddress,
                    telp_1 : custTel,
                    telp_2 : custTel_2,
                    telp_3 : custTel_3,
                    sales : faswName,
                    cp : contactPerson,
                    order : JSON.stringify(productListJson),
                    region:getRegion(),
                    comment: comment,
                    email: getUserName()
                }
                
                callAjax("POST",SUBMIT_ORDER,data,submitSuccess);
                //window.location.href = "mailto:" + email + "?subject=po form&body="+encodeURIComponent(resHtml);
            }
        });
    });
    
    $(document).on("pageinit", "#newPasswordPage", function(event) {
         $(document).on("click", "#changePwBtn", function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            var pwd = $("#newPassword").val();
            var pwdConf = $("#newPasswordConf").val();
            if (pwd == "") {
                showAlert(FORGOT_PW_PW_EMPTY);
            } else if (pwdConf=="") {
                showAlert(FORGOT_PW_PW_CONF_EMPTY);
            } else if (pwd!=pwdConf) {
                showAlert(FORGOT_PW_NOMATCH_EMPTY);
            } else {
                var data={
                    mobile_code:HASH,
                    email:USER_NAME,
                    password:pwd
                }
                callAjax("POST",FORGOT_PW_CHANGE_URL,data,forgotPwDone);
            }
         });
    });
});

function loginSuccess(res) {
    window.localStorage.setItem("LOGIN_FLAG","Y");
    
    window.localStorage.setItem("profile",JSON.stringify(res.profile));
    REGION = res.profile.region;
    $.mobile.changePage("homepage.html",{transition: "flip"});
}

function getRegion() {
    var loginJson = window.localStorage.getItem("profile");
    response = $.parseJSON(loginJson);
    REGION = response.region;
    return REGION;
}

function callAjax(method,url,data,callback) {
    $.ajax({
        type: method,
        url: url,
        data: data,
        crossDomain: true,
        timeout: AJAX_TIMEOUT_INT,
        beforeSend: function( xhr ) {
            /*$.mobile.loading( 'show', {
                text: LOADING_MESSAGE,
                textVisible: "true",
                theme: "a"
            });*/
            loading.show();
        },
        success: function (response) {
            if (typeof(response)=="string") {
                response = $.parseJSON(response);
            }
            console.log(JSON.stringify(response));
            if(response.status == 1) {
                console.log("SUKSES");
                callback(response);
            } else {
                console.log("ERROR");
                $.mobile.loading('hide');
                showAlert(response.msg);
            }
            loading.hide();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if(ajaxOptions === "timeout") {
                loading.hide();
                showAlert(AJAX_TIMEOUT);
            } else {
                loading.hide();
                showAlert(ajaxOptions);
            }
        }
    });
}

var loading = {
    show: function() {
        $("#loadingModal").modal(LOADING_MODAL_PROP);
    },
    hide: function() {
        $("#loadingModal").modal('hide');
    }
}

function showAlert(content) {
    var restHtml= '     <div class="modal-dialog modal-sm">'+
                   '       <div class="modal-content">'+
                   '         <div class="modal-header">'+
                   '           <h4 class="modal-title">'+COMPANY_NAME+'</h4>'+
                   '         </div>'+
                   '         <div class="modal-body">'+
                   '           <p>'+content+'</p>'+
                   '         </div>'+
                   '         <div class="modal-footer">'+
                   '           <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                   '         </div>'+
                   '       </div>'+        
                   '     </div>';
    $("#mainModal").html(restHtml);
    $("#mainModal").modal('show');
}

function saveReportList(res) {
    
    var reportListJson = window.localStorage.getItem("LIST_REPORT");
    
    if (reportListJson!="" && reportListJson != undefined) {
        window.localStorage.setItem("LIST_REPORT",res);    
    }
    
}

function forgotPwSuccess(res) {
    showAlert(FORGOT_PW_SUCCESS);
        $.mobile.changePage("forgotPwCode.html",{transition: "slide"});
}

function renderReportList(res) {
    //<li id="piutang" class="reportListing">Daftar Laporan Piutang<img class="leftArrow" src="img/leftArrow.png"/></li>
    var restHtml="";
    for(var i=0; i<res.folder.length;i++) {
        restHtml+="<li class='reportListing' data-target='"+res.folder[i]+"'>"+res.folder[i].replace("_"," ")+"<img class='leftArrow' src='img/leftArrow.png'/></li>";
    }
    
    $("#SectionReport").html(restHtml);
}

function renderReport(res) {
    var restHtml="";
    for(var i=0; i<res.folder.length;i++) {
        restHtml+="<li data-target='"+res.folder[i]+"'>"+
                    "<div class='reportTitle'><strong>"+res.folder[i].replace(".pdf","")+"</strong></div>"+
                    "<span class='legend'><strong>Release Date: </strong>05-Jan-2016 14:41:00</span>"+
                    "<img class='viewDoc' src='img/viewDoc.png'/>"+
                    "<img class='downloadIco' src='img/downloadIco1.png'/>"+
                "</li>";   
    }
    $("#reportList").html(restHtml);
}

function viewReport(res) {
    var docUrl = res.url.replace("\\","");
    //cordova.InAppBrowser.open(docUrl, '_blank', 'location=yes');
    window.open('https://docs.google.com/viewer?url='+docUrl+'&embedded=true', '_blank', 'location=yes');
}

function downloadReport(res) {
    var docUrl = res.url.replace("\\","");
    window.open(docUrl, '_system', 'location=no');
}

function forgotPwConfirm(res) {
    $.mobile.changePage("newPassword.html",{transition: "slide"});
}

function forgotPwDone(res) {
    showAlert(FORGOT_PW_DONE);
    $.mobile.changePage("index.html",{transition: "flip"});
}

function renderProduct(res){
    window.localStorage.setItem("productList",JSON.stringify(res));
    var restHtml="<select name='prdName_"+prdIdx+"' idx='"+prdIdx+"' id='prdName_"+prdIdx+"' class='prdNameSelect'>"+
                    "<option value=''>Pilih Product</option>";
    for(var i=0;i<res.product.length;i++) {
        var obj = res.product[i];
        //restHtml +="<optgroup label='"+obj.name+"'>";
        //for(var o=0;o<obj.productList.length;o++){
        //        restHtml +="<option value='"+obj.productList[o]+"'>"+obj.productList[o]+"</option>";
        //}
        //restHtml +="</optgroup>";
        restHtml +="<option value='"+obj.name+"'>"+obj.name+"</option>";
    }
    restHtml +="</select>";
   
    $("#prdNameSection_"+prdIdx).html(restHtml);
    $("#prdNameSection_"+prdIdx).selectmenu();    
}

function renderDetailProduct(selectedCat,idx) {
    var productJson = JSON.parse(window.localStorage.getItem("productList"));
    var restHtml="<select name='prdDetail_"+idx+"' idx='"+idx+"' id='prdDetail_"+idx+"' class='prdDetailSelect'>"+
                    "<option value=''>Pilih Product</option>";
                    
    for(var i=0;i<productJson.product.length;i++) {
        var obj = productJson.product[i];
        if (obj.name == selectedCat) {
            for(var o=0;o<obj.productList.length;o++){
                    restHtml +="<option value='"+obj.productList[o]+"'>"+obj.productList[o]+"</option>";
            }    
        }
    }
    restHtml +="</select>";
    
    $("#prdNameDetail_"+idx).removeClass("hide");
    $("#prdNameSelect_"+idx).html(restHtml).selectmenu();
}

function renderQtyProduct(selectedPrd,idx) {
    //var units = selectedPrd.split(" ");
    //var unit = units[units.length-1];
    //var unitFinal = unit.replace(/\d+/g,"");
    //if (unitFinal.toLowerCase()=="ml") {
    //    unitFinal="Ltr";
    //} else if (unitFinal.toLowerCase()=="gr") {
    //    unitFinal="Kg";
    //} else if (unitFinal.toLowerCase()=="l") {
    //    unitFinal="Ltr";
    //}
    
    $(".unitProduct_"+idx).html("Box");
    $("#prdQty_"+idx).removeClass("hide");
}

function renderAddProduct(res){
    var restHtml="<hr/><div class='ui-grid-a'>"+
                        "    <div class='ui-block-a'>Jenis Barang</div>"+
                        "    <div id='prdNameSection_"+prdIdx+"' data-idx='"+prdIdx+"' class='ui-block-b'>"+
                        "    <select name='prdName_"+prdIdx+"' idx='"+prdIdx+"' id='prdName_"+prdIdx+"' class='prdNameSelect'>>"+
                        "       <option value=''>Pilih Product</option>";;
    for(var i=0;i<res.product.length;i++) {
        var obj = res.product[i];
        //restHtml +="<optgroup label='"+obj.name+"'>";
        //for(var o=0;o<obj.productList.length;o++){
        //        restHtml +="<option value='"+obj.productList[o]+"'>"+obj.productList[o]+"</option>";
        //}
        //restHtml +="</optgroup>";
        restHtml +="<option value='"+obj.name+"'>"+obj.name+"</option>";
    }
    restHtml +="</select>"+
                "    </div>"+
                "</div>"+
                "<div id='prdNameDetail_"+prdIdx+"' class='ui-grid-a hide'>"+
                "    <div class='ui-block-a'>Nama Barang</div>"+
                "    <div id='prdNameSelect_"+prdIdx+"' data-idx='"+prdIdx+"' class='ui-block-b'>"+
                "    </div>"+
                "</div>"+
                "<div id='prdQty_"+prdIdx+"' class='ui-grid-a hide'>"+
                "    <div class='ui-block-a'>Kuantitas Barang</div>"+
                "    <div id='prdQtyDetail_"+prdIdx+"' data-idx='"+prdIdx+"' class='ui-block-b'>"+
                "        <div class='ui-grid-a'>"+
                "            <div class='ui-block-a' style='padding: 0px'>"+
                "                <input type='text' id='unitVal_"+prdIdx+"' placeholder='xxx' value=''>"+
                "            </div>"+
                "            <div class='ui-block-b' style='padding: 10px'>"+
                "                <span class='unitProduct_"+prdIdx+"'></span>"+
                "            </div>"+
                "        </div>"+
                "    </div>"+
                "</div>";
                
    $("#productListSection").append(restHtml)
    $("#prdNameSection_"+prdIdx).selectmenu();
    $("#unitVal_"+prdIdx).textinput();
}

function submitSuccess(res) {
    showAlert(res.msg);
    prdIdx=1;
    $.mobile.changePage("homepage.html",{transition: "slide"});
}

function poHistorySave(custName,custAddress,custTel,custTel_2,custTel_3,faswName,contactPerson) {
    var poHistory = "";
    
    try {
        poHistory = window.localStorage.getItem("poFormHistory");
    } catch(err) {
        poHistory = "";
    }
    
    var poHistoryObj = new Object();
    var poObj = new Object();
    var poArr = [];
    var poArrCustName = [];
    var poValues = new Object();
    
    if (poHistory != undefined && poHistory != "") {
        poHistoryObj = JSON.parse(poHistory);
    }
    
    if (poHistoryObj.poFormHistory != undefined) {
        poObj = poHistoryObj.poFormHistory;
        poArrCustName = poHistoryObj.custArray;
    }
    
    //create record
    poValues.name = custName;
    poValues.address = custAddress;
    poValues.telp = custTel;
    poValues.telp2 = custTel_2;
    poValues.telp3 = custTel_3;
    poValues.sales = faswName;
    poValues.contact = contactPerson;
    
    console.log("BEFORE +++ " + JSON.stringify(poObj));
    delete poObj[custName];
    console.log("AFTER +++ " + JSON.stringify(poObj));
    poObj[custName] = poValues;
    
    //add to array
    //poArr.push(poObj);
    if (jQuery.inArray(custName, poArrCustName ) == -1) {
        poArrCustName.push(custName);
    }
    
    poHistoryObj.poFormHistory = poObj;
    poHistoryObj.custArray = poArrCustName;
    
    window.localStorage.setItem("poFormHistory",JSON.stringify(poHistoryObj));
}

function getUserName() {
    if (USER_NAME==undefined || USER_NAME=="") {
        var profile=window.localStorage.getItem("profile");
        var jsonOb =JSON.parse(profile);
        console.log(profile);
        USER_NAME = jsonOb.email;
        console.log(USER_NAME);
    }
    return USER_NAME;
}