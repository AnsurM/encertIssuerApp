(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{"0Fdr":function(e,r,s){"use strict";s.r(r);var a=s("d6i3"),t=s.n(a),n=(s("miYZ"),s("tsqr")),i=s("dCQc"),c=s("34ay"),u=s("HZnN"),d=s("iA/x");r["default"]={namespace:"register",state:{status:void 0},effects:{submit:t.a.mark(function e(r,s){var a,c,u,o;return t.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=r.payload,c=s.call,u=s.put,e.next=4,c(i["d"],a);case 4:if(o=e.sent,!o.user){e.next=12;break}return n["a"].success("Registering new user.",1.5),d["a"].setUID(o.user.uid),e.next=10,u({type:"registerHandle",payload:o});case 10:e.next=13;break;case 12:n["a"].error("Error registering user. The email may already have been registered.",5);case 13:case"end":return e.stop()}},e)})},reducers:{registerHandle:function(e,r){var s=r.payload;return Object(c["b"])("user"),Object(u["b"])(),void 0!==s.user?(d["a"].setUserData("",s.user.email,"",""),{isNewUser:!0,message:"User registered."}):{isNewUser:!1,code:s.code,message:s.message}}}}}}]);