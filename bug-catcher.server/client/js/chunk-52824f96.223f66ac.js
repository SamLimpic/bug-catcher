(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52824f96"],{"02ec":function(e,t,c){},"85f4":function(e,t,c){"use strict";c.r(t);var a=c("7a23");const s=Object(a["E"])("data-v-f225c43c");Object(a["u"])("data-v-f225c43c");const d={class:"home container"},o={key:0,class:"row justify-content-center"},l=Object(a["h"])("div",{class:"col-12 text-center p-3 m-md-4 my-md-3 my-4"},[Object(a["h"])("i",{class:"fas fa-bug fa-spin text-success large-icon mx-1"})],-1),r={key:1,class:"row justify-content-center bg-light shadow rounded p-3 m-md-0 m-2 my-md-5 my-4"},n={class:"col-12"},b={class:"row justify-content-between align-items-end "},i={class:"col-md-3 col-12 order-md-1 order-2 text-md-left text-center pl-md-0 my-md-0 my-3"},u=Object(a["h"])("div",{class:"col-md-6 col-12 order-md-2 order-1 text-center"},[Object(a["h"])("h2",{class:"m-0 font-xl"}," Current Collection ")],-1),h={class:"col-md-3 col-12 order-md-3 order-3 text-md-right text-center"},j={key:0,class:"form-check row align-items-center pr-md-1"},m=Object(a["h"])("label",{class:"form-check-label font-sm",for:"hide-released"}," Hide Released ",-1),g={key:0,class:"row justify-content-between table-border mt-3"},v={class:"col-12"},O=Object(a["f"])('<div class="row" data-v-f225c43c><div class="col-1 d-md-block d-none" data-v-f225c43c></div><div class="col-md-3 col-7" data-v-f225c43c><h3 data-v-f225c43c>Name</h3></div><div class="col-1 d-md-block d-none" data-v-f225c43c></div><div class="col-3 d-md-block d-none" data-v-f225c43c><h3 data-v-f225c43c>Catcher</h3></div><div class="col-md-2 col-5 text-md-left text-right" data-v-f225c43c><h3 data-v-f225c43c>Status</h3></div><div class="col-2 d-md-block d-none" data-v-f225c43c><h3 data-v-f225c43c>Updated</h3></div></div>',1),f={class:"row table-border-top"},y={class:"col-12"},p={key:1,class:"text-center table-border-top mt-4 pt-3"};Object(a["s"])();const k=s((e,t,c,s,k,w)=>{const x=Object(a["y"])("BugComponent");return Object(a["r"])(),Object(a["d"])("div",d,[s.state.loading?(Object(a["r"])(),Object(a["d"])("div",o,[l])):(Object(a["r"])(),Object(a["d"])("div",r,[Object(a["h"])("div",n,[Object(a["h"])("div",b,[Object(a["h"])("div",i,[s.user.isAuthenticated?(Object(a["r"])(),Object(a["d"])("button",{key:0,type:"button",class:"btn btn-lg btn-primary",label:"Catch a bug",onClick:t[1]||(t[1]=(...e)=>s.getPokeBug&&s.getPokeBug(...e))}," Catch a Bug ")):Object(a["e"])("",!0),s.user.isAuthenticated?Object(a["e"])("",!0):(Object(a["r"])(),Object(a["d"])("button",{key:1,type:"button",class:"btn btn-lg btn-primary",label:"Login",onClick:t[2]||(t[2]=(...e)=>s.login&&s.login(...e))}," Login "))]),u,Object(a["h"])("div",h,[s.state.bugs.length?(Object(a["r"])(),Object(a["d"])("div",j,[Object(a["h"])("input",{class:"form-check-input checkbox-2x",type:"checkbox",value:"",id:"hide-released",onClick:t[3]||(t[3]=(...e)=>s.hideReleased&&s.hideReleased(...e))}),m])):Object(a["e"])("",!0)])]),s.state.bugs[0]?(Object(a["r"])(),Object(a["d"])("div",g,[Object(a["h"])("div",v,[O,Object(a["h"])("div",f,[Object(a["h"])("div",y,[(Object(a["r"])(!0),Object(a["d"])(a["a"],null,Object(a["x"])(s.state.bugs,e=>(Object(a["r"])(),Object(a["d"])(x,{key:e.id,"bug-prop":e},null,8,["bug-prop"]))),128))])])])])):(Object(a["r"])(),Object(a["d"])("h2",p," We're all out of bugs! Why not help us add some? "))])]))])});var w=c("83fc"),x=c("af90"),B=c("5d40"),C=c("b012"),P={name:"Bugs",setup(){const e=Object(a["v"])({loading:!0,newPost:Object(a["b"])(()=>w["a"].newPost),bugs:Object(a["b"])(()=>w["a"].bugs)});return Object(a["p"])(async()=>{try{await x["a"].getAllBugs(),e.loading=!1}catch(t){B["a"].toast("Error: "+t,"error")}try{await x["a"].getAllPokeBugs()}catch(t){B["a"].toast("Error: "+t,"error")}}),{state:e,user:Object(a["b"])(()=>w["a"].user),async getPokeBug(){try{await x["a"].formatPokeBug(),B["a"].toast(`You caught a ${w["a"].activePost.title}!`,"success")}catch(e){B["a"].toast("Error: "+e,"error")}},async hideReleased(){try{!0===document.getElementById("hide-released").checked?(await x["a"].hideReleased(),B["a"].toast('"Released" hidden',"warning")):(await x["a"].getAllBugs(),B["a"].toast('"Released" shown',"info"))}catch(e){B["a"].toast("Error: ",+e,"error")}},async login(){C["a"].loginWithPopup()}}}};c("9a78");P.render=k,P.__scopeId="data-v-f225c43c";t["default"]=P},"9a78":function(e,t,c){"use strict";c("02ec")}}]);