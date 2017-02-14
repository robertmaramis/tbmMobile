var PROFILE="PROD",
SECRET="TBM",
CODE="!@#$TBM-Mobile*&^%",
HASH = CryptoJS.SHA1(CryptoJS.SHA1(SECRET)+CODE)+"",
COMPANY_NAME="Tiara Buana Mandiri",
LOADING_MODAL_PROP={backdrop: 'static', keyboard: false},
AJAX_TIMEOUT_INT=60000,
AJAX_TIMEOUT="Failed connect to server, please try again later.",
REPORT_FROM="",
REGION="",
POFORM_NAME="Silahkan isi nama customer",
POFORM_ADDRESS="Silahkan isi alamat customer",
POFORM_TELP="Silahkan isi no telp customer",
POFORM_PRD_NAME="Silahkan piih barang yang di beli",
POFORM_FASW="Silahkan isi nama sales",
POFORM_CONTACT="Silahkan isi contact person",
POFORM_COMMENT="Silahkan isi Comment anda",
FORGOT_PW_EMPTY="Masukan alamat email anda untuk mendapatkan code reset password",
FORGOT_PW_SUCCESS="Kode sudah dikirim ke alamat email anda, segera lakukan konfirmasi",
FORGOT_PW_CODE_EMPTY="Harap masukan kode yang sudah dikirim ke alamat email anda."
FORGOT_PW_PW_EMPTY="Harap masukan password baru anda anda.",
FORGOT_PW_PW_CONF_EMPTY="Harap masukan kembali password anda.",
FORGOT_PW_NOMATCH_EMPTY="Password yang anda masukan tidak sama.",
FORGOT_PW_DONE="Password anda telah di rubah.",
prdIdx=1,
USER_NAME="";

//$security = 'TBM';
// $code = '!@#$TBM-Mobile*&^%';
// $activation = sha1(sha1($security).$code);

if (PROFILE=="DEV") {
    var
    BASE_URL        ="",
    LOGIN_URL       =BASE_URL+"https://dl.dropboxusercontent.com/u/22201907/TBM/JSON/login.json";
    LIST_REPORT_URL =BASE_URL+"https://dl.dropboxusercontent.com/u/22201907/TBM/JSON/reportList.json";
    REPORT_URL      =BASE_URL+"https://dl.dropboxusercontent.com/u/22201907/TBM/JSON/reportUrl.json",
    FORGOT_PW_URL   =BASE_URL+"https://dl.dropboxusercontent.com/u/22201907/TBM/JSON/forgotPw.json",
    FORGOT_PW_SUBMIT_URL =BASE_URL+"https://dl.dropboxusercontent.com/u/22201907/TBM/JSON/forgotPwSubmit.json",
    FORGOT_PW_CHANGE_URL =BASE_URL+"https://dl.dropboxusercontent.com/u/22201907/TBM/JSON/forgotPwChange.json",
    PRODUCT_LIST =BASE_URL+"https://dl.dropboxusercontent.com/u/22201907/TBM/JSON/productList.json",
    SUBMIT_ORDER =BASE_URL+"https://dl.dropboxusercontent.com/u/22201907/TBM/JSON/productList.json";
} else {
    var
    BASE_URL        ="http://www.tiarabuanamandiri.com",
    LOGIN_URL       =BASE_URL+"/api/login",
    LIST_REPORT_URL =BASE_URL+"/api/list_report",
    REPORT_URL      =BASE_URL+"/api/view_report",
    FORGOT_PW_URL   =BASE_URL+"/api/check_email",
    FORGOT_PW_SUBMIT_URL =BASE_URL+"/api/check_code",
    FORGOT_PW_CHANGE_URL =BASE_URL+"/api/forgot_pw",
    PRODUCT_LIST =BASE_URL+"/api/list_product",
    SUBMIT_ORDER =BASE_URL+"/api/submit_order";
}

var monthArr = new Array();
monthArr[0] = "January";
monthArr[1] = "February";
monthArr[2] = "March";
monthArr[3] = "April";
monthArr[4] = "May";
monthArr[5] = "June";
monthArr[6] = "July";
monthArr[7] = "August";
monthArr[8] = "September";
monthArr[9] = "October";
monthArr[10] = "November";
monthArr[11] = "December";