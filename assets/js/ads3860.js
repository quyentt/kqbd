/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var domain=document.domain.replace("m.","");
domain=domain.replace(".vn","");
domain='ketquabongda.com';
var page='';
var listads=new Array();
var indexItem=0;
const d = new Date();
let timeReload = 10 * 60 * 1000;

$(function (){
    page=$('.pageid_ads').attr('data-id');
    console.log('domain...'+domain);
    console.log('page...'+page);
    loadads();   
});


//lay quang cao
function loadads(){
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var kieu;
    if (isMobile) { kieu = 'mobile'; }else{ kieu = 'pc'; } 
    
    var ads=sessionStorage.getItem(page+'_'+kieu);
    var adsTimeReload = sessionStorage.getItem(page+'_'+kieu+'_timereload');
    if(ads!==''&& ads!==null){
        let time = d.getTime();
        var currentTimeLong = time;
        if(adsTimeReload === undefined || currentTimeLong - adsTimeReload >= timeReload) {
            getAds();
        } else {
            listads=JSON.parse(ads);
            for (var i = 0; i <listads.length; i++) {
                //  showAds(listads[i]);
                showAdsByPosition(listads[i]);
            }
        }
    }else{
        getAds();
    }
}

function getAllAds(){
    //get page all
    getAds('pageall');
    
    //get of page
    getAds(page);
}

function getAds(){
    
   var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   var kieu;
   if (isMobile) { kieu = 'mobile'; }else{ kieu = 'pc'; } 
    
    var url="https://qc.kqbd88.com/ads.api/get_ads.htm?domain="+domain+"&page="+page+"&kieu="+kieu+"&trangthai=1";
    try{
        $.ajax({
            url: url,
            dataType: 'text',
            cache: false
        }).done(function (data) {
            console.log('data...' + data);
            if(data!==''){
                data=JSON.parse(data);
                for (var i = 0; i < data.length; i++) {
//                    showAds(data[i]);
                    showAdsByPosition(data[i]);
                    listads[indexItem]=data[i];
                    sessionStorage.setItem(page+'_'+kieu, JSON.stringify(listads));
                    indexItem++;
                }
                let time = d.getTime();
                sessionStorage.setItem(page+'_'+kieu+'_timereload', time);
            }
        });
    }catch (e) {
        console.log('getAds...'+e);
    }
}


function showAdsByPosition(item) {
    console.log('showAdsByPosition');
    console.log('#'+item.kieu+'_'+item.kichthuoc+'_'+item.vitri);
    if($('#'+item.kieu+'_'+item.kichthuoc+'_'+item.vitri) !== undefined) {
        $('#'+item.kieu+'_'+item.kichthuoc+'_'+item.vitri).html(item.maquangcao);
    }
}

//show quang cao
function showAds(item){    
    console.log('showAds');
    console.log(item);
    if(item.kichthuoc==='qc_chungads'){
        console.log('qc_chungads');
        $('.qc_chungads').each(function (index){
            console.log(index);
            if(index===eval(item.vitri)){
                console.log('show quang cao vi tri...'+item.vitri);
                $(this).html(item.maquangcao);        
            }
        });
    }else if(item.kichthuoc==='qc_riengads'){
        $('.qc_riengads').each(function (index){
            if(index===eval(item.vitri)){
                $(this).html(item.maquangcao);        
            }
        });
    }
}