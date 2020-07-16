(this["webpackJsonpprime-solo-project"]=this["webpackJsonpprime-solo-project"]||[]).push([[0],{141:function(e,t){},144:function(e,t,a){},146:function(e,t,a){},147:function(e,t,a){},148:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(40),o=a.n(s),c=a(19),l=a(9),i=a(45);a(98);var p=Object(c.c)({loginMessage:(e="",t)=>{switch(t.type){case"CLEAR_LOGIN_ERROR":return"";case"LOGIN_INPUT_ERROR":return"Enter your username and password!";case"LOGIN_FAILED":return"Oops! The username and password didn't match. Try again!";case"LOGIN_FAILED_NO_CODE":return"Oops! Something went wrong! Is the server running?";default:return e}},registrationMessage:(e="",t)=>{switch(t.type){case"CLEAR_REGISTRATION_ERROR":return"";case"REGISTRATION_INPUT_ERROR":return"Choose a username and password!";case"REGISTRATION_FAILED":return"Oops! That didn't work. The username might already be taken. Try again!";default:return e}}});var u=(e="login",t)=>{switch(t.type){case"SET_TO_LOGIN_MODE":return"login";case"SET_TO_REGISTER_MODE":return"register";default:return e}};var m=(e={},t)=>{switch(t.type){case"SET_USER":return t.payload;case"UNSET_USER":return{};default:return e}},d=a(16);var E=(e={},t)=>{let a=Object(d.a)({},e);switch(t.type){case"SET_TOPICS":return Object(d.a)({},t.payload);case"ADD_TOPIC":return a[t.payload.id]=t.payload.name,a;case"RESET_TOPICS":return{};default:return e}};var h=(e=[],t)=>{switch(t.type){case"SET_POPULAR_TOPICS":return[...t.payload];case"RESET_POPULAR_TOPICS":return{};default:return e}};var g=(e=[],t)=>{let a=[...e];switch(t.type){case"SET_ROOMS":return a=[...t.payload],a;case"ADD_ROOM":return a=[...a,t.payload],a;case"RESET_ROOMS":return[];default:return e}};var O=(e={},t)=>{let a=Object(d.a)({},e);switch(t.type){case"SET_CURRENT_ROOM":return a=t.payload,a;default:return e}};var y=(e="STARTING",t)=>{let a=e.slice(0);switch(t.type){case"SET_STATUS":return a=t.payload.slice(0),a;default:return a}};var b=(e={},t)=>{let a,r=Object(d.a)({},e);switch(t.type){case"SET_HISTORIES":return r=Object(d.a)({},t.payload),r;case"ADD_HISTORY":return r[t.payload.roomID]=[...t.payload.history.reverse()],r;case"ADD_MESSAGE":return a=[...r[t.payload.room_id]],a.push(t.payload),r[t.payload.room_id]=a,r;case"UPDATE_MESSAGE":a=[...r[t.payload.room_id]];for(let e=a.length-1;e>=0;e--)if(a[e].id===t.payload.id){a[e]=Object(d.a)({},t.payload),r[t.payload.room_id]=a;break}return r;case"REMOVE_MESSAGE":return a=[...r[t.payload.room_id]],a=a.filter(e=>e.id!==t.payload.id),r[t.payload.room_id]=a,r;case"RESET_HISTORIES":return[];default:return e}};var S=(e={},t)=>{let a=Object(d.a)({},e);switch(t.type){case"SET_MEMBER_LISTS":return a=Object(d.a)({},t.payload),a;case"ADD_MEMBER_LIST":return a[t.payload.room]=t.payload.members,a;case"ADD_MEMBER_TO_ROOM":let r=a[t.payload.room];return a[t.payload.room]=r.push(t.payload.member),a;case"RESET_MEMBER_LISTS":return{};default:return e}};var v=Object(c.c)({errors:p,loginMode:u,user:m,topics:E,popularTopics:h,rooms:g,currentRoom:O,status:y,histories:b,memberLists:S}),_=a(7),T=a.n(_),R=a(4),f=a(23),I=a.n(f),x=T.a.mark(C),w=T.a.mark(M),j=T.a.mark(A);function C(e){var t;return T.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(R.d)({type:"CLEAR_LOGIN_ERROR"});case 3:return t={headers:{"Content-Type":"application/json"},withCredentials:!0},a.next=6,I.a.post("/api/user/login",e.payload,t);case 6:return a.next=8,Object(R.d)({type:"FETCH_USER"});case 8:return a.next=10,Object(R.d)({type:"OPEN_SOCKET"});case 10:a.next=22;break;case 12:if(a.prev=12,a.t0=a.catch(0),console.log("Error with user login:",a.t0),401!==a.t0.response.status){a.next=20;break}return a.next=18,Object(R.d)({type:"LOGIN_FAILED"});case 18:a.next=22;break;case 20:return a.next=22,Object(R.d)({type:"LOGIN_FAILED_NO_CODE"});case 22:case"end":return a.stop()}}),x,null,[[0,12]])}function M(e){var t;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t={headers:{"Content-Type":"application/json"},withCredentials:!0},e.next=4,Object(R.d)({type:"CLOSE_SOCKET"});case 4:return e.next=6,I.a.post("/api/user/logout",t);case 6:return e.next=8,Object(R.d)({type:"UNSET_USER"});case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("Error with user logout:",e.t0);case 13:case"end":return e.stop()}}),w,null,[[0,10]])}function A(){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(R.g)("LOGIN",C);case 2:return e.next=4,Object(R.g)("LOGOUT",M);case 4:case"end":return e.stop()}}),j)}var D=A,N=T.a.mark(k),L=T.a.mark(G);function k(e){return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(R.d)({type:"CLEAR_REGISTRATION_ERROR"});case 3:return t.next=5,I.a.post("/api/user/register",e.payload);case 5:return t.next=7,Object(R.d)({type:"LOGIN",payload:e.payload});case 7:return t.next=9,Object(R.d)({type:"SET_TO_LOGIN_MODE"});case 9:t.next=16;break;case 11:return t.prev=11,t.t0=t.catch(0),console.log("Error with user registration:",t.t0),t.next=16,Object(R.d)({type:"REGISTRATION_FAILED"});case 16:case"end":return t.stop()}}),N,null,[[0,11]])}function G(){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(R.g)("REGISTER",k);case 2:case"end":return e.stop()}}),L)}var P=G,U=T.a.mark(H),F=T.a.mark(B);function H(){var e,t;return T.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,e={headers:{"Content-Type":"application/json"},withCredentials:!0},a.next=4,I.a.get("/api/user",e);case 4:return t=a.sent,a.next=7,Object(R.d)({type:"SET_USER",payload:t.data});case 7:a.next=12;break;case 9:a.prev=9,a.t0=a.catch(0),console.log("User get request failed",a.t0);case 12:case"end":return a.stop()}}),U,null,[[0,9]])}function B(){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(R.g)("FETCH_USER",H);case 2:case"end":return e.stop()}}),F)}var K=B,J=a(54),Y=a.n(J),q=T.a.mark(X);function V(e){return new i.b(t=>(e.on("message.receive",e=>{console.log("Message received:",e),t({type:"ADD_MESSAGE",payload:e})}),e.on("message.update",e=>{console.log("Message updated: ",e),t({type:"UPDATE_MESSAGE",payload:e})}),e.on("message.remove",e=>{console.log("Message removed:",e),t({type:"REMOVE_MESSAGE",payload:e})}),e.on("member.new",e=>{console.log("New member joined",e),t({type:"ADD_MEMBER_TO_ROOM",payload:e})}),e.on("room.joined",e=>{console.log("Joined room",e),t({type:"ADD_ROOM",payload:{id:e.id,created_at:e.created_at,topic_id:e.topic_id}}),t({type:"ADD_TOPIC",payload:e.topic}),t({type:"ADD_HISTORY",payload:{roomID:e.id,history:e.history}}),t({type:"ADD_MEMBER_LIST",payload:{room:e.id,members:e.members}})}),e.on("topic.popularTopics",e=>{console.log("Popular topics:",e)}),e.on("session.ready",e=>{console.log("Session ready, hooray!"),t({type:"SET_STATUS",payload:"OKAY"})}),()=>{}))}function X(e){var t,a;return T.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(R.b)(V,e);case 2:t=r.sent;case 3:return r.next=6,Object(R.e)(t);case 6:return a=r.sent,r.next=9,Object(R.d)(a);case 9:r.next=3;break;case 11:case"end":return r.stop()}}),q)}var z=T.a.mark(se);function Q(e,t){try{console.log("start session:",t),e.emit("session.start")}catch(a){console.log("start session error:",a)}}function W(e,t){try{console.log("send message:",t),e.emit("message.send",t.payload)}catch(a){console.log("send message error:",a)}}function Z(e,t){try{console.log("send message:",t),e.emit("message.edit",t.payload)}catch(a){console.log("send message error:",a)}}function $(e,t){try{console.log("delete message:",t),e.emit("message.delete",t.payload)}catch(a){console.log("delete message error:",a)}}function ee(e,t){try{console.log("get messages:",t),e.emit("message.getMessages",t.payload)}catch(a){console.log("get messages error:",a)}}function te(e,t){try{console.log("get members:",t),e.emit("member.getMembers",t.payload)}catch(a){console.log("get room members error:",a)}}function ae(e,t){try{console.log("get rooms:",t),e.emit("room.getRooms",t.payload)}catch(a){console.log("get rooms error:",a)}}function re(e,t){try{console.log("set room:",t),e.emit("room.listen",t.payload)}catch(a){console.log("get rooms error:",a)}}function ne(e,t){try{console.log("join topic:",t),e.emit("topic.join",t.payload)}catch(a){console.log("join topic error:",a)}}function se(e){return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(R.f)("SESSION_START",Q,e);case 2:return t.next=4,Object(R.f)("SEND_MESSAGE",W,e);case 4:return t.next=6,Object(R.f)("EDIT_MESSAGE",Z,e);case 6:return t.next=8,Object(R.f)("DELETE_MESSAGE",$,e);case 8:return t.next=10,Object(R.f)("GET_MESSAGES",ee,e);case 10:return t.next=12,Object(R.f)("GET_MEMBERS",te,e);case 12:return t.next=14,Object(R.f)("GET_ROOMS",ae,e);case 14:return t.next=16,Object(R.f)("SELECT_CURRENT_ROOM",re,e);case 16:return t.next=18,Object(R.f)("JOIN_TOPIC",ne,e);case 18:case"end":return t.stop()}}),z)}var oe=T.a.mark(ie);function ce(){const e=Y()("http://localhost:5000/");return new Promise(t=>{e.on("connect",()=>{t(e)})})}function le(e){console.log("Closing socket"),e.close()}function ie(){var e;return T.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=3,Object(R.e)("OPEN_SOCKET");case 3:return console.log("opening socket"),t.next=6,Object(R.b)(ce);case 6:return e=t.sent,t.next=9,Object(R.c)(X,e);case 9:return t.next=11,Object(R.c)(se,e);case 11:return t.next=13,Object(R.d)({type:"SESSION_START"});case 13:return t.next=15,Object(R.d)({type:"REFRESH_POPULAR_TOPICS"});case 15:return t.next=17,Object(R.h)("CLOSE_SOCKET",le,e);case 17:t.next=0;break;case 19:case"end":return t.stop()}}),oe)}var pe=T.a.mark(me),ue=T.a.mark(de);function me(e){var t,a;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("refreshTopics"),t={headers:{"Content-Type":"application/json"},withCredentials:!0},e.next=5,I.a.get("/api/topic",t);case 5:return a=e.sent,e.next=8,Object(R.d)({type:"SET_POPULAR_TOPICS",payload:a.data});case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("Error with refresh topics:",e.t0);case 13:case"end":return e.stop()}}),pe,null,[[0,10]])}function de(){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(R.g)("REFRESH_POPULAR_TOPICS",me);case 2:case"end":return e.stop()}}),ue)}var Ee=de,he=T.a.mark(ge);function ge(){return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(R.a)([D(),P(),K(),ie(),Ee()]);case 2:case"end":return e.stop()}}),he)}var Oe=a(10),ye=a(24);var be=Object(l.b)()(e=>n.a.createElement("button",{className:e.className,onClick:()=>e.dispatch({type:"LOGOUT"})},"Log Out"));a(144);var Se=Object(l.b)(e=>({user:e.user}))(e=>n.a.createElement("div",{className:"nav"},n.a.createElement(ye.a,{to:"/home"},n.a.createElement("h2",{className:"nav-title"},"Prime Solo Project")),n.a.createElement("div",{className:"nav-right"},n.a.createElement(ye.a,{className:"nav-link",to:"/main"},e.user.id?"Home":"Login / Register"),e.user.id&&n.a.createElement(n.a.Fragment,null,n.a.createElement(ye.a,{className:"nav-link",to:"/info"},"Info Page"),n.a.createElement(be,{className:"nav-link"})),n.a.createElement(ye.a,{className:"nav-link",to:"/about"},"About"))));a(146);var ve=()=>n.a.createElement("footer",null,"\xa9 Prime Digital Academy"),_e=a(84);class Te extends r.Component{constructor(...e){super(...e),this.state={username:"",password:""},this.login=e=>{e.preventDefault(),this.state.username&&this.state.password?this.props.dispatch({type:"LOGIN",payload:{username:this.state.username,password:this.state.password}}):this.props.dispatch({type:"LOGIN_INPUT_ERROR"})},this.handleInputChangeFor=e=>t=>{this.setState({[e]:t.target.value})}}render(){return n.a.createElement("div",null,this.props.errors.loginMessage&&n.a.createElement("h2",{className:"alert",role:"alert"},this.props.errors.loginMessage),n.a.createElement("form",{onSubmit:this.login},n.a.createElement("h1",null,"Login"),n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"username"},"Username:",n.a.createElement("input",{type:"text",name:"username",value:this.state.username,onChange:this.handleInputChangeFor("username")}))),n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"password"},"Password:",n.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:this.handleInputChangeFor("password")}))),n.a.createElement("div",null,n.a.createElement("input",{className:"log-in",type:"submit",name:"submit",value:"Log In"}))),n.a.createElement("center",null,n.a.createElement("button",{type:"button",className:"link-button",onClick:()=>{this.props.dispatch({type:"SET_TO_REGISTER_MODE"})}},"Register")))}}var Re=Object(l.b)(e=>({errors:e.errors}))(Te);class fe extends r.Component{constructor(...e){super(...e),this.state={username:"",password:""},this.registerUser=e=>{e.preventDefault(),this.state.username&&this.state.password?this.props.dispatch({type:"REGISTER",payload:{username:this.state.username,password:this.state.password}}):this.props.dispatch({type:"REGISTRATION_INPUT_ERROR"})},this.handleInputChangeFor=e=>t=>{this.setState({[e]:t.target.value})}}render(){return n.a.createElement("div",null,this.props.errors.registrationMessage&&n.a.createElement("h2",{className:"alert",role:"alert"},this.props.errors.registrationMessage),n.a.createElement("form",{onSubmit:this.registerUser},n.a.createElement("h1",null,"Register User"),n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"username"},"Username:",n.a.createElement("input",{type:"text",name:"username",value:this.state.username,onChange:this.handleInputChangeFor("username")}))),n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"password"},"Password:",n.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:this.handleInputChangeFor("password")}))),n.a.createElement("div",null,n.a.createElement("input",{className:"register",type:"submit",name:"submit",value:"Register"}))),n.a.createElement("center",null,n.a.createElement("button",{type:"button",className:"link-button",onClick:()=>{this.props.dispatch({type:"SET_TO_LOGIN_MODE"})}},"Login")))}}var Ie=Object(l.b)(e=>({errors:e.errors}))(fe);var xe=Object(l.b)(e=>({user:e.user,loginMode:e.loginMode}))(e=>{const t=e.component,a=e.user,r=e.loginMode,s=Object(_e.a)(e,["component","user","loginMode"]);let o;return o=a.id?t:"login"===r?Re:Ie,n.a.createElement(Oe.c,Object.assign({},s,{component:o}))});var we=()=>n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("p",null,"This about page is for anyone to read!"))),je=a(159),Ce=a(164),Me=a(163);class Ae extends n.a.Component{constructor(...e){super(...e),this.state={editing:!1,editInput:""},this.deleteMessage=()=>{this.props.dispatch({type:"DELETE_MESSAGE",payload:this.props.id})},this.handleChange=e=>{this.setState({editInput:e.target.value})},this.save=e=>{e.preventDefault(),this.props.dispatch({type:"EDIT_MESSAGE",payload:{text:this.state.editInput,id:this.props.id}}),this.toggleEditMode()},this.toggleEditMode=()=>{!1===this.state.editing?this.setState({editing:!0,editInput:this.props.text}):this.setState({editing:!1,editInput:""})}}render(){return n.a.createElement("div",null,this.state.editing?n.a.createElement("form",{onSubmit:this.save},n.a.createElement("input",{type:"text",value:this.state.editInput,onChange:this.handleChange}),n.a.createElement("button",{type:"button",onClick:this.cancelEdit},"Cancel"),n.a.createElement("button",{type:"submit"},"Save")):n.a.createElement("p",null,this.props.author,": ",this.props.text),this.props.user.id===this.props.authorID&&n.a.createElement(n.a.Fragment,null,n.a.createElement("button",{type:"button",onClick:this.toggleEditMode},"Edit"),n.a.createElement("button",{type:"button",onClick:this.deleteMessage},"X")))}}var De=Object(l.b)(e=>({user:e.user}))(Ae);class Ne extends n.a.Component{constructor(...e){super(...e),this.state={count:0,messageInput:""},this.componentDidMount=()=>{console.log("Chat.componentDidMount")},this.sendMessage=e=>{console.log("sendMessage"),e.preventDefault(),this.props.dispatch({type:"SEND_MESSAGE",payload:{text:this.state.messageInput,room:this.props.currentRoom}}),this.setState({messageInput:""})}}render(){var e;return n.a.createElement("div",null,n.a.createElement(je.a,{container:!0},n.a.createElement(je.a,{item:!0,xs:9},"Messages:",n.a.createElement("div",{style:{height:"400px",overflowY:"scroll",overflowAnchor:"none"}},null===(e=this.props.messages)||void 0===e?void 0:e.map((e,t)=>{let a;const r=this.props.members;for(let n in r)if(e.author_id===r[n].id){a=r[n].username;break}return n.a.createElement(De,{key:"message-".concat(t),id:e.id,author:a,authorID:e.author_id,text:e.text})}),n.a.createElement("div",{ref:e=>this.messagesEnd=e})),n.a.createElement("br",null),n.a.createElement("form",{onSubmit:this.sendMessage},n.a.createElement("input",{required:!0,width:"100%",name:"messageInput",type:"text",value:this.state.messageInput,onChange:e=>this.setState({messageInput:e.target.value})})))))}}var Le=Object(l.b)(e=>({user:e.user,messages:e.histories[e.currentRoom],members:e.memberLists[e.currentRoom],currentRoom:e.currentRoom}))(Ne);class ke extends n.a.Component{render(){var e;return n.a.createElement("div",null,"Member List:",null===(e=this.props.members)||void 0===e?void 0:e.map((e,t)=>n.a.createElement("p",{key:"member-".concat(t)},e.username)))}}var Ge=Object(l.b)(e=>({members:e.memberLists[e.currentRoom]}))(ke);class Pe extends n.a.Component{constructor(...e){super(...e),this.select=()=>{this.props.dispatch({type:"SET_CURRENT_ROOM",payload:this.props.room.id})}}render(){return n.a.createElement("div",null,n.a.createElement("p",{onClick:this.select},this.props.topics[this.props.room.topic_id],"#",this.props.room.id))}}var Ue=Object(l.b)(e=>({topics:e.topics}))(Pe);class Fe extends n.a.Component{constructor(...e){super(...e),this.state={topicInput:""},this.joinTopic=e=>{e.preventDefault(),this.props.dispatch({type:"JOIN_TOPIC",payload:this.state.topicInput}),this.setState({topicInput:""})}}render(){var e,t;return n.a.createElement("div",null,"Enter topic:",n.a.createElement("form",{onSubmit:this.joinTopic},n.a.createElement("input",{required:!0,minLength:3,type:"text",value:this.state.topicInput,onChange:e=>this.setState({topicInput:e.target.value})})),"Topics:",n.a.createElement("button",{type:"button",onClick:()=>this.props.dispatch({type:"REFRESH_POPULAR_TOPICS"})},"Refresh"),null===(e=this.props.popularTopics)||void 0===e?void 0:e.map((e,t)=>n.a.createElement("p",{key:"poptopic-".concat(t)},e.name)),"My Rooms:",null===(t=this.props.rooms)||void 0===t?void 0:t.map((e,t)=>n.a.createElement(Ue,{key:"room-".concat(t),room:e})))}}var He=Object(l.b)(e=>({topics:e.topics,rooms:e.rooms,popularTopics:e.popularTopics}))(Fe);class Be extends n.a.Component{constructor(...e){super(...e),this.componentDidMount=()=>{}}render(){return n.a.createElement("div",null,"STARTING"===this.props.status&&"Loading...","OKAY"===this.props.status&&n.a.createElement(je.a,{container:!0,justify:"center"},n.a.createElement(Ce.a,{xsDown:!0},n.a.createElement(je.a,{item:!0,name:"left-section"},n.a.createElement(Me.a,{width:200},n.a.createElement(He,null)))),n.a.createElement(je.a,{item:!0,name:"center-section",xs:!0},n.a.createElement(Le,null)),n.a.createElement(Ce.a,{xsDown:!0},n.a.createElement(je.a,{item:!0,name:"right-section"},n.a.createElement(Me.a,{width:200},n.a.createElement(Ge,null))))))}}var Ke=Object(l.b)(e=>({user:e.user,status:e.status}))(Be);var Je=()=>n.a.createElement("div",null,n.a.createElement("p",null,"Info Page"));a(147);class Ye extends r.Component{render(){return n.a.createElement(Oe.a,null,n.a.createElement("div",null,n.a.createElement(Se,null),n.a.createElement(Oe.e,null,n.a.createElement(Oe.b,{exact:!0,from:"/",to:"/main"}),n.a.createElement(Oe.c,{exact:!0,path:"/about",component:we}),n.a.createElement(xe,{exact:!0,path:"/main",component:Ke}),n.a.createElement(xe,{exact:!0,path:"/info",component:Je}),n.a.createElement(Oe.c,{render:()=>n.a.createElement("h1",null,"404")})),n.a.createElement(ve,null)))}}var qe=Object(l.b)()(Ye);const Ve=Object(i.a)(),Xe=[Ve],ze=Object(c.e)(v,Object(c.a)(...Xe));Ve.run(ge),o.a.render(n.a.createElement(l.a,{store:ze},n.a.createElement(qe,null)),document.getElementById("react-root"))},89:function(e,t,a){e.exports=a(148)}},[[89,1,2]]]);
//# sourceMappingURL=main.c1df3a4b.chunk.js.map