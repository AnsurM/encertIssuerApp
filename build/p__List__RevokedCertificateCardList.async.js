(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"b+ig":function(e,t,a){"use strict";a.r(t);a("2qtc");var i=a("kLXV"),n=(a("14J3"),a("BMrR")),r=(a("Mwp2"),a("VXEj")),c=(a("Telt"),a("Tckk")),l=(a("+L6B"),a("2/Rp")),o=a("d6i3"),s=a.n(o),d=(a("miYZ"),a("tsqr")),u=a("1l/V"),m=a.n(u),v=a("2Taf"),k=a.n(v),h=a("vZ4D"),p=a.n(h),f=a("l4Ni"),g=a.n(f),C=a("ujKo"),E=a.n(C),b=a("MhPg"),D=a.n(b),I=(a("5NDa"),a("5rEg")),_=(a("IzEo"),a("bx4M")),R=a("q1tI"),x=a.n(R),w=(a("+qE3"),a("wvWk")),y=a("dCQc"),S=a("vDqi"),O=_["a"].Meta,V=(I["a"].TextArea,function(e){function t(){var e,a;k()(this,t);for(var i=arguments.length,n=new Array(i),r=0;r<i;r++)n[r]=arguments[r];return a=g()(this,(e=E()(t)).call.apply(e,[this].concat(n))),a.state={loading:!1,revokedIsVisible:!1,revokeCertificateIsVisible:!1,myData:{},certificateData:{},clickedCertificate:{ID:"",achievementTitle:"",domain:"",coverImage:"",receiverName:"",blockstackID:"",issuerName:"",description:"",issueDate:"",revokedDate:"",reason:"",expirationDate:""},revokeCertificate:{holder:"",reason:""},revokeHolder:"",revokeReason:""},a.onSearchChange=function(e){var t=e;a.setState({searchInput:e});var i=Object.values(a.state.myData),n=[];i.forEach(function(e){(e.receiver_name.includes(t)||e.receiver_blockstack_id.includes(t))&&(console.log("Name: ",e),n.push(e))}),n.length>0?(console.log(n),a.setState({searchData:n})):a.setState({searchData:n})},a.showModal=function(e){console.log(e),a.setState({revokedIsVisible:!0,clickedCertificate:{ID:e.id,achievementTitle:e.achievement_title,domain:e.domain,coverImage:e.cover_image,receiverName:e.receiver_name,blockstackID:e.blockstack_id,issuerName:e.issuer_name,description:e.description,issueDate:e.issue_date,expirationDate:e.expiration_date}})},a.handleOk=function(){a.setState({loading:!1,revokedIsVisible:!1})},a.handleCancel=function(){a.setState({revokedIsVisible:!1})},a.showRevokeModal=function(){a.setState({revokeCertificateIsVisible:!0})},a.handleRevokeOk=m()(s.a.mark(function e(){var t,i;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(a.setState({loading:!0}),!(a.state.revokeHolder.length>0)){e.next=13;break}return console.log(a.state.revokeHolder,"holder id"),e.next=5,S.get("https://encert-server.herokuapp.com/issuer/certificate/"+a.state.revokeHolder);case 5:return t=e.sent,i=t.data.data.result,e.next=9,Object(w["c"])(i);case 9:console.log(i),setTimeout(function(){a.setState({loading:!1,revokeCertificateIsVisible:!1,revokeHolder:" "})},2e3),e.next=15;break;case 13:d["a"].error("Input fields can't be empty"),a.setState({loading:!1});case 15:case"end":return e.stop()}},e)})),a.handleRevokeCancel=function(){a.setState({revokeCertificateIsVisible:!1})},a.onRevokeCert=function(){a.showRevokeModal()},a.onRevokeInputChange=function(e){var t=e.target.value;console.log(e.target.value),a.setState({revokeHolder:t})},a}return D()(t,e),p()(t,[{key:"componentDidMount",value:function(){var e=this;S.get("https://encert-server.herokuapp.com/issuer/certificate").then(function(){var t=m()(s.a.mark(function t(a){var i,n;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log("data  from server",a.data.data.result),i=a.data.data.result,t.next=4,Object(w["e"])(i);case 4:n=t.sent,e.setState({certificateData:n}),console.log(e.state.certificateData);case 7:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()).catch(function(e){}),Object(y["g"])("/revokedCertificatesList").then(function(t){console.log("Data ",t);var a=t.map(function(e){return{achievement_title:e.achievement_title,cover_image:e.cover_image,description:e.description,domain:e.domain,expiration_date:e.expiration_date,id:e.id,issue_date:e.issue_date,issuer_name:e.issuer_name,receiver_name:e.receiver_name,blockstack_id:e.blockstack_id}});e.setState({myData:a})}).catch(function(e){return console.log("error ",e)})}},{key:"render",value:function(){var e=this,t=null;this.state.certificateData.length&&(t=this.state.certificateData);var a=this.state,o=a.revokedIsVisible,s=a.revokeCertificateIsVisible,d=a.loading;return x.a.createElement("div",null,x.a.createElement("br",null),x.a.createElement("h2",null,"All Revoked Certificates"),x.a.createElement(l["a"],{type:"danger",size:"large",onClick:this.onRevokeCert},"Revoke a Certificate"),x.a.createElement("br",null),x.a.createElement("br",null),x.a.createElement("div",null,x.a.createElement(n["a"],null,t?x.a.createElement(r["a"],{grid:{gutter:40,xs:1,sm:2,md:3,lg:4},dataSource:t,renderItem:function(t){return x.a.createElement(r["a"].Item,null,x.a.createElement(_["a"],{onClick:function(){return e.showModal(t)},style:{width:"100%"},cover:x.a.createElement("img",{alt:"example",src:"http://placehold.it/32x32"})},x.a.createElement(O,{avatar:x.a.createElement(c["a"],{src:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}),title:t.receiver_name,description:t.domain})))}}):x.a.createElement("p",null,"No Data"))),x.a.createElement("div",null,x.a.createElement(i["a"],{visible:o,title:"Revoked Certificate Details",onOk:this.handleOk,onCancel:this.handleCancel,footer:[x.a.createElement(l["a"],{key:"submit",type:"primary",onClick:this.handleOk},"OK")]},x.a.createElement("p",null,"ID: ".concat(this.state.clickedCertificate.ID)),x.a.createElement("p",null,"Achievement Title:  ".concat(this.state.clickedCertificate.achievementTitle)),x.a.createElement("p",null,"Domain:  ".concat(this.state.clickedCertificate.domain)),x.a.createElement("p",null,"Cover Image: ".concat(this.state.clickedCertificate.coverImage)),x.a.createElement("p",null,"Receiver Name: ".concat(this.state.clickedCertificate.receiverName)),x.a.createElement("p",null,"Blockstack ID: ".concat(this.state.clickedCertificate.blockstackID)),x.a.createElement("p",null,"Issuer Name: ".concat(this.state.clickedCertificate.issuerName)),x.a.createElement("p",null,"Description: ".concat(this.state.clickedCertificate.description)),x.a.createElement("p",null,"Issue Date: ".concat(this.state.clickedCertificate.issueDate)),x.a.createElement("p",null,"Expiration Date: ".concat(this.state.clickedCertificate.expirationDate)))),x.a.createElement("div",null,x.a.createElement(i["a"],{visible:s,title:"Revoke A Certificate",onOk:this.handleRevokeOk,onCancel:this.handleRevokeCancel,footer:[x.a.createElement(l["a"],{type:"primary",onClick:this.handleRevokeCancel},"Return"),x.a.createElement(l["a"],{key:"submit",type:"danger",loading:d,onClick:this.handleRevokeOk},"Revoke Certificate")]},x.a.createElement("p",null,"Select Holder: "),x.a.createElement(I["a"],{id:"revHolder",onChange:this.onRevokeInputChange,placeholder:"Holder name here"}))))}}]),t}(R["Component"]));t["default"]=V}}]);