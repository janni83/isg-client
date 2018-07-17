parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"iJA9":[function(require,module,exports) {
class i{constructor({id:i,values:e,min:s,max:a}){this.id=i,this.values=e,this.min=s,this.max=a}forRequest(i){if(this.values&&-1===this.values.indexOf(i))throw new Error(`'${i}' is not a valid value for parameter ${this.id}`);if(null!=this.min&&i<this.min)throw new Error(`'${i}' is below min value of '${this.min}' for parameter ${this.id}`);if(null!=this.max&&i>this.max)throw new Error(`'${i}' is above max value of '${this.max}' for parameter ${this.id}`);return{name:`val${this.id}`,value:`${i}`}}}module.exports={PAGES:{DIAGNOSIS:{STATUS:"2,0"},COOLING:{STANDARD_SETTING:"4,3,4"}},LANGUAGE:new i({id:"spracheeinstellung",values:["DEUTSCH","ENGLISH"]}),COOLING:{HC2:{ENABLED:new i({id:"74",values:["1","0"]}),TYPE:new i({id:"190",values:["1","0"]}),TEMPERATURE:new i({id:"104"}),HYST_ROOM_TEMP:new i({id:"108"})},STANDARD_SETTING:{PERCENT_CAPACITY:new i({id:"411",min:30,max:50}),HYST_FLOW_TEMP:new i({id:"105",min:0,max:3})}},VENTILATION:{STAGES:{DAY:new i({id:"82",values:["0","1","2","3"]}),NIGHT:new i({id:"83",values:["0","1","2","3"]}),STANDBY:new i({id:"84",values:["0","1","2","3"]}),PARTY:new i({id:"85",values:["0","1","2","3"]}),MANUAL:new i({id:"88",values:["0","1","2","3"]})}}};
},{}],"qQCB":[function(require,module,exports) {
const{COOLING:t,PAGES:e}=require("../constants"),s="COOLING",i=new RegExp(`\\['${t.STANDARD_SETTING.PERCENT_CAPACITY.id}'\\]\\['val'\\]='([0-9]{2})'`);class r{constructor(t){this.isgClient=t}setEnabledHC2(e){return this.isgClient.setParameter(t.HC2.ENABLED.forRequest(e?"1":"0"))}setCapacity(e){return this.isgClient.setParameter(t.STANDARD_SETTING.PERCENT_CAPACITY.forRequest(e))}async fetchIsActive(){const t=await this.isgClient.fetchPage(e.DIAGNOSIS.STATUS);return t("td").filter((e,i)=>t(i).text().trim()===s).length>=2}async fetchCapacity(){const t=await this.isgClient.fetchPage(e.COOLING.STANDARD_SETTING),s=i.exec(t.html())[1];return parseInt(s,10)}}module.exports=r;
},{"../constants":"iJA9"}],"f9KS":[function(require,module,exports) {
var e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e};const t=require("request-promise-native").defaults({forever:!0,jar:!0}),s=require("uuid/v4"),r=require("cheerio"),a=require("./modules/cooling"),{VENTILATION:i,LANGUAGE:n}=require("./constants"),o={Cookie:`PHPSESSID=${s()}`,Connection:"keep-alive"},h={method:"POST",headers:o},u="1,0",l="5,3",g="RELATIVE HUMIDITY HC2";class c{constructor({url:t,username:s,password:r,version:i}){this.url=t,this.username=s,this.password=r,this.version=i,this.languageSet=!1,this.baseSaveOptions=e({url:`${this.url}/save.php`,json:!0},h),this.cooling=new a(this)}login(){const s=e({uri:this.url,form:{make:"send",user:this.username,pass:this.password}},h);return t(s).then(()=>{this.session={date:new Date}}).catch(()=>{this.session=null})}setVentilationDay(e){return this.setParameter(i.STAGES.DAY.forRequest(e))}switchLanguageToEnglish(){return this.setParameter(n.forRequest("ENGLISH"))}async fetchLanguage(){return(await this.fetchPage(l))(`#a${n.forRequest().name}`).val()}async fetchHumidityHC2(){const e=await this.fetchPage(u),t=e("td").filter((t,s)=>e(s).text()===g).next().text(),s=t.trim().substr(0,t.length-1).replace(",",".");return parseFloat(s)}setParameter({name:s,value:r}){return this.verifyLoggedIn().then(()=>{const a=e({form:{data:JSON.stringify([{name:s,value:r}])}},this.baseSaveOptions);return t(a)}).then(({success:e,message:t})=>e?t:new Error(t))}async fetchPage(e){const s={url:this.url,headers:o,qs:{s:e}};await this.verifyLoggedIn(),await this.verifyEnglishLanguage();const a=await t.get(s);return r.load(a)}verifyLoggedIn(){return this.username||this.password?this.session?Promise.resolve():this.login():Promise.resolve()}verifyEnglishLanguage(){return this.languageSet?Promise.resolve():this.switchLanguageToEnglish().then(()=>{this.languageSet=!0}).catch(e=>{throw new Error(`failed to set language to english: ${e}`)})}}module.exports=c;
},{"./modules/cooling":"qQCB","./constants":"iJA9"}]},{},["f9KS"], null)