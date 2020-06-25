var conectionsApi={
   sqlServer:{
       ipserver: '34.66.171.225',//'localhost',//
       user:'sqlserver',//'sa',//
       password:'Soft2020',//'123',//
       database: 'WAssistantBot'
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