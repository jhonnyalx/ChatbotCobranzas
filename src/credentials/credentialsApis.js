var conectionsApi={
    mongo:{
        url:'mongodb://userdemos:Soft2020@localhost:27017/test?authSource=test&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false',
        bd:"Chatbots",
        user:"" ,//"amin",
        pwd:"" //"123"
    },
   WatsonAssistant:{
    wconv_version_date : '2018-09-20',
    wconv_workspaceId : "9974ac14-928b-4318-bc21-a8d97ba7b563",//'07864efe-ff25-4f3a-9e2d-dcfff22cad9e',
    wconv_apikey : 'XY1g0x3vRPCVFCcXH-qTAPGibJiK70EF47XyqK5LhM1G',//'dPVHWNmEXdRKlP2Q0-0MTXdboSeWfJ0yP5x4HehNUZYq',
    wconv_url : 'https://gateway.watsonplatform.net/assistant/api',
    },
    Telegram:{
        key:"965781736:AAHM1y6D_Xn2vinomCLYRdUiX2nmVefflTo"
    },
    Facebook:{
        token:"373800613290287|XDk4Q3J1j3gOy8daTg-wtQ2La9g"
    }
}

module.exports=conectionsApi;  