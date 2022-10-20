(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{329:function(e,t,n){e.exports=n(428)},350:function(e,t){},370:function(e,t){},428:function(e,t,n){"use strict";n.r(t);var r=n(465),i=(n(429),n(3)),c=n(1),o=n.n(c),a=n(5),l=n.n(a),s=n(9),u=n.n(s),d=n(15),f=n(6),j=n(456),b=n(455),O=n(42),p=n(77),h=n(467),g=n(91),m={s3credentials:{apiKey:void 0,apiSecret:void 0,region:void 0,endpoint:void 0,bucket:void 0},backblaze:{authorizationToken:"",downloadUrl:"",s3ApiUrl:""},s3client:void 0,otherStuff:"",mutatedAt:void 0},x=Object(c.createContext)(Object.create(null)),y=n(462),v=n(18),w=n.n(v),P=n(144),S=n(26),C=n.n(S),k=n(458),D=n(447),z=n(448),B=n(449),E=n(450),F=(n(337),n(349),n(427).getSignedUrl),I=function(e){var t=e.credentials,n=e.region,r=e.endpoint,i=new k.S3Client({region:n,credentials:t,endpoint:r});return i.middlewareStack.add((function(e,t){return function(){var t=w()((function*(t){return yield e(t)}));return function(e){return t.apply(this,arguments)}}()}),{step:"finalizeRequest",name:"removeHeaders"}),i},R=function(){var e=w()((function*(e,t){var n,r,i=new D.ListObjectsCommand(t),c=yield e.send(i),o=(null==(n=c.CommonPrefixes)?void 0:n.map((function(e){return{prefix:e.Prefix,etag:void 0,name:e.Prefix,lastModified:void 0,size:0,key:e.Prefix}})))||[],a=(null==(r=c.Contents)?void 0:r.map((function(e){return{prefix:"",etag:e.ETag,name:null==e?void 0:e.Key,lastModified:null==e?void 0:e.LastModified,size:null==e?void 0:e.Size,key:e.Key}})))||[];return[].concat(C()(o),C()(a))}));return function(t,n){return e.apply(this,arguments)}}(),A=function(){var e=w()((function*(e,t){try{var n=yield e.send(new z.CopyObjectCommand(t));return console.log("updated asset",n),n}catch(r){console.log("Error",r)}}));return function(t,n){return e.apply(this,arguments)}}(),N=function(){var e=w()((function*(e,t){try{return yield e.send(new B.DeleteObjectCommand(t))}catch(n){console.log("Error",n)}}));return function(t,n){return e.apply(this,arguments)}}(),M=function(){var e=w()((function*(e,t){var n=new E.GetObjectCommand(t);return yield e.send(n)}));return function(t,n){return e.apply(this,arguments)}}(),T=function(){var e=w()((function*(e,t){var n=new E.GetObjectCommand(t);return yield F(e,n,{expiresIn:3600})}));return function(t,n){return e.apply(this,arguments)}}(),L=(function(){var e=w()((function*(e,t){var n=new E.GetObjectCommand(t),r=yield e.config.endpoint();n.middlewareStack.add((function(e){return function(){var e=w()((function*(e){var n=e.request,i=n.headers,c=n.path,o=r.hostname,a=r.protocol;return fetch(a+"//"+o+"/"+t.Bucket+c,{headers:i}).then((function(e){console.log("Response = ",e)})),new Promise((function(e,t){return t(new Error("Intentional Failure"))}))}));return function(t){return e.apply(this,arguments)}}()}),{step:"finalizeRequest",name:"rH"});try{yield e.send(n)}catch(i){}}))}(),n(313)),K=n(451),V=n(459),H=n(4),U=i.default.create({textInput:{marginTop:20}}),G=function(e){var t=e.control,n=e.name,r=e.label;return void 0===t?null:Object(H.jsx)(H.Fragment,{children:Object(H.jsx)(P.Controller,{control:t,name:n,render:function(e){var t=e.field,i=t.value,c=t.onChange,o=t.onBlur;return Object(H.jsx)(H.Fragment,{children:Object(H.jsx)(V.default,{label:r,value:i,onChangeText:function(e){console.log("[InputChange] name = ",n," value = ",e),c(e)},onBlur:o,style:U.textInput})})}})})},W=n(176),J=n(274),q=n(312),_=function(){var e=w()((function*(e){var t=yield Object(q.default)({method:"GET",url:"https://api.backblazeb2.com/b2api/v2/b2_authorize_account",headers:{Accept:"application/json",Authorization:"Basic "+e}});return console.log("backblaze response ",t),t.data}));return function(t){return e.apply(this,arguments)}}(),Q=function(e){return e.toLowerCase().includes("backblazeb2")};function Y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Y(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var X=function(){var e=Object(c.useContext)(x),t=u()(e,2),n=t[0],r=t[1],a=n.s3credentials,l=Object(P.useForm)({defaultValues:a}),s=l.control,j=l.handleSubmit,b=l.getValues,p=l.reset;Object(c.useEffect)((function(){p(a)}),[a]);var h=Object(c.useState)(!1),g=u()(h,2)[1],m=function(){var e=w()((function*(){console.log("Submitting form"),k();var e,t,i=b();if(Q(null==i?void 0:i.endpoint)){var c=(e=i.apiKey,t=i.apiSecret,btoa(e+":"+t)),o=yield _(c);r($($({},n),{},{s3credentials:i,s3client:void 0,backblaze:{authorizationToken:o.authorizationToken,downloadUrl:o.downloadUrl,s3ApiUrl:o.s3ApiUrl,updatedAt:new Date}}))}else r($($({},n),{},{s3credentials:i,s3client:void 0}));g(!0),setTimeout((function(){g(!1)}),1e3);var a=I({credentials:{accessKeyId:i.apiKey,secretAccessKey:i.apiSecret},region:i.region,endpoint:i.endpoint});R(a,{Bucket:"testinghumza"}).catch((function(){console.log("[SaveCredentialsForm] Promise failure getAssets")}))}));return function(){return e.apply(this,arguments)}}(),y=o.a.useState(!1),v=u()(y,2),S=v[0],C=v[1],k=function(){return C(!S)},D=i.default.create({container:{flex:1},inner:{padding:24,flex:1,justifyContent:"space-around"},header:{fontSize:36,marginBottom:48},textInput:{height:40,borderColor:"#000000",borderBottomWidth:1,marginBottom:36},snackBarContainer:{flex:1,justifyContent:"space-between"}});return Object(H.jsxs)(J.default,{behavior:"ios"===d.default.OS?"padding":"height",style:D.container,children:[Object(H.jsxs)(L.default,{children:[Object(H.jsxs)(L.default.Content,{children:[Object(H.jsx)(O.default,{variant:"headlineSmall",children:"API Configuration"}),Object(H.jsx)(G,{control:s,name:"apiKey",label:"API KEY"}),Object(H.jsx)(G,{control:s,name:"apiSecret",label:"Api Secret"}),Object(H.jsx)(G,{control:s,name:"endpoint",label:"Endpoint"}),Object(H.jsx)(G,{control:s,name:"bucket",label:"Bucket"}),Object(H.jsx)(G,{control:s,name:"region",label:"Region"})]}),Object(H.jsx)(L.default.Actions,{children:Object(H.jsx)(W.default,{onPress:j(m),children:"Submit"})})]}),Object(H.jsx)(f.default,{style:D.snackBarContainer,children:Object(H.jsx)(K.default,{visible:S,onDismiss:function(){return C(!1)},action:{label:"Dismiss",onPress:function(){}},children:"Credentials are saved!"})})]})},Z=function(){return Object(H.jsx)(X,{})},ee=n(454),te=n(463),ne=n(466),re=n(452),ie=function(e,t){return e.map((function(e){var n,r=e.name.replace(t.Prefix,"");return{assetId:e.etag,fileName:r,fileSize:e.size,updatedAt:e.lastModified,isFolder:(null==(n=e.prefix)?void 0:n.length)>0,prefix:e.prefix,etag:e.etag,key:e.key}}))},ce=function(e){var t=e.s3credentials,n=t.apiKey,r=t.apiSecret,i=t.region,o=t.endpoint,a=Object(c.useMemo)((function(){return n&&r&&o?[I({region:i,credentials:{accessKeyId:n,secretAccessKey:r},endpoint:o}),!0]:[void 0,!1]}),[n,r,i,o]),l=u()(a,2);return[l[0],l[1]]},oe=n(62),ae=n(461),le=n(154),se=n(73),ue=function(){return Object(H.jsx)(H.Fragment,{})},de=n(284),fe=n(198),je=n.n(fe),be=n(285),Oe=n.n(be),pe=n(453),he=function(e){switch(e){case"png":case"jpeg":case"jpg":return"image";default:return"file"}};je.a.extend(Oe.a);var ge=i.default.create({icon:{},filename:{}}),me=function(e){var t=e.isFolder?"folder":/(?:\.([^.]+))?$/.exec(e.fileName)[1]||"",n=e.fileName.split(".").pop();switch(t){case"folder":return Object(H.jsx)(pe.default,{name:"folder",color:"#ffbd43",size:22,style:ge.icon});default:return Object(H.jsx)(pe.default,{name:he(n),color:"#6565d6",size:22,style:ge.icon})}},xe=function(){var e=Object(oe.createColumnHelper)();return[e.accessor("fileName",{id:"fileName",header:"Name",cell:function(e){var t=e.row.original,n=t.isFolder?e.getValue().slice(0,-1):e.getValue();return Object(H.jsx)(H.Fragment,{children:Object(H.jsxs)(O.default,{variant:"bodyLarge",style:ge.filename,children:[me(t)," \xa0",n]})})}}),e.accessor("fileSize",{id:"fileSize",header:"Size",cell:function(e){return Object(H.jsx)(O.default,{children:!e.row.original.isFolder&&Object(de.default)(e.getValue())})}}),e.accessor("updatedAt",{id:"updatedAt",header:"Last Modified",cell:function(e){return Object(H.jsx)(O.default,{children:!e.row.original.isFolder&&je()(e.getValue()).fromNow()})}}),e.display({id:"actions",cell:function(){return Object(H.jsx)(ue,{})}})].filter((function(e){return"web"===d.default.OS||"fileName"===e.id}))},ye=i.default.create({cell:{flexBasis:"auto",paddingRight:"30px"},cellFirstChild:{flexBasis:"78%"},title:{display:"flex",alignItems:"center"}}),ve=function(e){var t=e.assets,n=e.onPress,r=e.isLoading,i=o.a.useState((function(){return t||[]})),a=u()(i,2),l=a[0],s=a[1],d=Object(c.useState)(1),f=u()(d,2),j=f[0],b=f[1];Object(c.useEffect)((function(){s(t||[]),b(1)}),[t]);var p=Object(oe.useReactTable)({data:l,columns:xe(),getCoreRowModel:Object(oe.getCoreRowModel)(),getPaginationRowModel:Object(oe.getPaginationRowModel)()});Object(c.useEffect)((function(){p.setPageSize(20*j)}),[j]);return Object(H.jsxs)(H.Fragment,{children:[Object(H.jsx)(ae.default.Header,{children:p.getHeaderGroups().map((function(e){return Object(H.jsx)(c.Fragment,{children:e.headers.map((function(e,t){return Object(H.jsx)(ae.default.Title,{style:0===t?ye.cellFirstChild:ye.cell,children:Object(H.jsx)(O.default,{children:e.isPlaceholder?null:Object(oe.flexRender)(e.column.columnDef.header,e.getContext())})},e.id)}))},e.id)}))}),Object(H.jsx)(se.default,{onScroll:function(e){(function(e){var t=e.layoutMeasurement,n=e.contentOffset,r=e.contentSize;return t.height+n.y>=r.height-20})(e.nativeEvent)&&(console.log("[Scroll] Scroll close to bottom"),b(j+1))},children:Object(H.jsxs)(ae.default,{children:[r&&Object(H.jsx)(le.default,{animating:!0}),p.getRowModel().rows.map((function(e){return Object(H.jsx)(ae.default.Row,{onPress:function(){n(e.original)},children:e.getVisibleCells().map((function(e,t){return Object(H.jsx)(ae.default.Cell,{style:0===t?ye.cellFirstChild:ye.cell,children:Object(oe.flexRender)(e.column.columnDef.cell,e.getContext())},e.id)}))},e.id)})),Object(H.jsx)(ae.default.Pagination,{page:p.getState().pagination.pageIndex+1,numberOfPages:p.getPageCount(),onPageChange:function(e){return p.setPageIndex(e-1)},label:p.getState().pagination.pageIndex+1+" of "+p.getPageCount()})]})})]})},we=n(288),Pe=n(314),Se=n(41),Ce=n(171),ke=i.default.create({centeredView:{flex:1,justifyContent:"center",alignItems:"center",marginTop:22},modalView:{margin:20,width:200,backgroundColor:"white",borderRadius:20,padding:35,alignItems:"center",shadowColor:"#000",shadowOffset:{width:0,height:2},shadowOpacity:.25,shadowRadius:4,elevation:5},button:{borderRadius:20,padding:10,elevation:2},buttonOpen:{backgroundColor:"#F194FF"},buttonClose:{backgroundColor:"#2196F3"},textStyle:{color:"white",fontWeight:"bold",textAlign:"center"},modalText:{marginBottom:15,textAlign:"center"}}),De=function(e){var t=e.isVisible,n=e.onClose,r=e.children;return t?Object(H.jsx)(f.default,{style:ke.centeredView,children:Object(H.jsx)(Pe.default,{animationType:"slide",transparent:!0,visible:t,onRequestClose:function(){we.default.alert("Modal has been closed."),n()},children:Object(H.jsx)(f.default,{style:ke.centeredView,children:Object(H.jsxs)(f.default,{style:ke.modalView,children:[r,Object(H.jsx)(Ce.default,{style:[ke.button,ke.buttonClose],onPress:function(){return n()},children:Object(H.jsx)(Se.default,{style:ke.textStyle,children:"Hide Modal"})})]})})})}):null},ze=n(14),Be=n.n(ze),Ee=["children","isUnderlined"];function Fe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ie(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Fe(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Fe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Re=function(e){var t=e.children,n=e.isUnderlined,r=Be()(e,Ee);return Object(H.jsx)(O.default,Ie(Ie({},r),{},{style:n?[Ae.underline]:[],children:t}))},Ae=i.default.create({underline:{textDecorationLine:"underline"}}),Ne=n(40),Me=function(e){return e<576?"xs":e>=576&&e<768?"md":e>=768&&e<992?"lg":e>=992&&e<1200?"xl":e>=1200?"xxl":void 0},Te=Ne.default.get("window"),Le=Ne.default.get("screen"),Ke=Me(Te.width),Ve=function(e){var t=e.hidden,n=e.children,r=Object(c.useState)({window:Te,screen:Le,screenType:Ke}),i=u()(r,2),o=i[0],a=i[1];Object(c.useEffect)((function(){var e=Ne.default.addEventListener("change",(function(e){var t=e.window,n=e.screen,r=Me(t.width);a({window:t,screen:n,screenType:r})}));return function(){return null==e?void 0:e.remove()}}),[]);var l=!!t&&t.includes(o.screenType);return Object(H.jsx)(H.Fragment,{children:!l&&Object(H.jsx)(f.default,{children:n})})},He=(i.default.create({header:{fontSize:16,marginVertical:10}}),Object(c.createContext)(Object.create({}))),Ue=function(){var e=w()((function*(e,t){return Q(e.s3credentials.endpoint)?(n=e.backblaze,r=e.s3credentials.bucket,i=t,n.downloadUrl+"/file/"+r+"/"+i+"?Authorization="+n.authorizationToken):yield T(e.s3Client,{Key:t,Bucket:e.s3credentials.bucket});var n,r,i}));return function(t,n){return e.apply(this,arguments)}}();function Ge(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function We(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ge(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ge(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Je=function(e){var t=e.asset,n=e.onClose,r=Object(c.useContext)(x),i=u()(r,2),o=i[0],a=i[1],l=o.s3credentials,s=Object(c.useContext)(He),d=u()(s,1)[0],j=Object(c.useState)(!1),b=u()(j,2),h=b[0],g=b[1],m=Object(c.useState)(t),y=u()(m,2),v=y[0],P=y[1],S=Object(c.useState)(t.fileName),C=u()(S,2),k=C[0],D=C[1],z=ce(o),B=u()(z,1)[0],E=function(){var e=w()((function*(){g(!1),P((function(e){return We(We({},e),{},{fileName:k})})),yield A(B,{Bucket:l.bucket,Key:l.bucket+"/"+t.key.replace(t.fileName,k),CopySource:l.bucket+"/"+t.key}),a(We(We({},o),{},{mutatedAt:new Date}))}));return function(){return e.apply(this,arguments)}}(),F=function(){var e=w()((function*(){var e={Bucket:l.bucket,Key:v.key};yield N(B,e),a(We(We({},o),{},{mutatedAt:new Date}))}));return function(){return e.apply(this,arguments)}}(),I=function(){var e=w()((function*(){var e=yield Ue(o,t.key),n=document.createElement("a");n.href=e,n.download=t.key,n.style.display="none",document.body.appendChild(n),n.click(),n.remove()}));return function(){return e.apply(this,arguments)}}();return Object(H.jsx)(H.Fragment,{children:Object(H.jsx)(Ve,{hidden:["xs","md"],children:Object(H.jsxs)(f.default,{style:qe.main,children:[Object(H.jsx)(p.default,{theme:d,icon:"close",onPress:n,style:qe.closeButton}),Object(H.jsxs)(f.default,{style:[qe.section2,qe.centered],children:[Object(H.jsx)(O.default,{variant:"headlineSmall",style:[qe.textCenter,qe.marginBottom],children:Object(H.jsx)(pe.default,{theme:d,name:"file",size:100})}),Object(H.jsx)(O.default,{variant:"headlineSmall",style:qe.textCenter,children:h?Object(H.jsx)(V.default,{value:h?k:null==v?void 0:v.fileName,onChangeText:function(e){return D(e)}}):null==v?void 0:v.fileName}),Object(H.jsxs)(f.default,{style:[qe.centered,qe.horizontal],children:[h?Object(H.jsx)(p.default,{theme:d,icon:"check",onPress:E}):Object(H.jsx)(p.default,{theme:d,icon:"pencil",onPress:function(){return g(!0)}}),Object(H.jsx)(p.default,{theme:d,icon:"trash-can",onPress:F}),Object(H.jsx)(p.default,{theme:d,icon:"download",onPress:I})]})]})]})})})},qe=i.default.create({main:{display:"flex",flexGrow:1},closeButton:{display:"flex",textAlign:"right",height:50},marginBottom:{marginBottom:10},textCenter:{textAlign:"center"},centered:{justifyContent:"center",alignItems:"center"},horizontal:{flexDirection:"row"},section2:{minWidth:"30vw",flex:1,flexGrow:1,margin:20}}),_e=n(173),Qe=n(55),Ye=n(162),$e=["png","jpeg","jpg"],Xe=function(e){var t=e.item,n=e.onPress,r=e.s3client,i=e.s3Initialized,o=e.appState,a=Object(c.useState)(),l=u()(a,2),s=l[0],d=l[1],f=Object(c.useState)(void 0),j=u()(f,2),b=j[0],p=j[1],h=Object(c.useState)(!1),g=u()(h,2),m=g[0],x=g[1],y=Object(c.useState)(!1),v=u()(y,2)[1],w=t.fileName.split(".").pop(),P=$e.includes(w),S=t.isFolder?"folder":he(w),C=t.fileSize<1e6;Object(c.useEffect)((function(){t.isFolder||P&&C&&(v(!0),M(r,{Key:t.key,Bucket:o.s3credentials.bucket}).then((function(e){var t;(t=e.Body,new Response(t,{})).blob().then((function(e){var t=new FileReader;t.readAsDataURL(e),t.onload=function(){var e=t.result;d(e),x(!0)}})).catch((function(e){p(e)}))})).catch((function(e){p(e)})))}),[i]);return Object(H.jsxs)(Ye.default,{onPress:function(){n(t)},children:[P&&C?m&&!b?Object(H.jsx)(Qe.default,{source:{uri:s.toString()},style:Ze.preview}):Object(H.jsx)(pe.default,{name:"alert-triangle",size:100,style:Ze.errorIcon}):Object(H.jsx)(pe.default,{name:S,size:100,style:Ze.icon}),Object(H.jsx)(O.default,{style:Ze.fileName,onPress:function(){n(t)},children:t.fileName})]})},Ze=i.default.create({preview:{width:"100%",height:200},icon:{marginTop:20},wrapper:{},fileName:{bottom:0,textAlign:"center"},errorIcon:{color:"red"}}),et=function(e){var t=e.item,n=e.onPress,r=t.fileName.split(".").pop(),i=t.isFolder?"folder":he(r);return Object(H.jsxs)(Ye.default,{onPress:function(){n(t)},children:[Object(H.jsx)(pe.default,{name:i,size:100,style:tt.icon}),Object(H.jsx)(O.default,{style:tt.fileName,onPress:function(){n(t)},children:t.fileName})]})},tt=i.default.create({icon:{marginTop:20},wrapper:{},fileName:{bottom:0,textAlign:"center"},errorIcon:{color:"red"}}),nt=function(e){var t=e.item,n=e.onPress,r=e.s3client,i=e.s3Initialized,c=e.appState,o=t.fileName.split(".").pop();return Object(H.jsx)(f.default,{style:rt.item,children:function(){switch(o){case"png":case"jpeg":case"jpg":return Object(H.jsx)(Xe,{item:t,onPress:n,s3client:r,s3Initialized:i,appState:c});default:return Object(H.jsx)(et,{item:t,onPress:n})}}()})},rt=i.default.create({item:{marginVertical:8,marginHorizontal:16,height:200,display:"flex",flex:1,overflow:"hidden",textAlign:"center"}}),it=i.default.create({cell:{flexBasis:"auto",minWidth:"105px",paddingRight:"15px"},cellFirstChild:{flexBasis:"78%"},title:{display:"flex",alignItems:"center"},columnWrapperStyle:{display:"flex"}}),ct=function(e){var t=e.assets,n=e.onPress,r=e.isLoading,i=Object(c.useContext)(x),a=u()(i,1)[0],l=ce(a),s=u()(l,2),d=s[0],j=s[1],b=o.a.useState((function(){return t||[]})),O=u()(b,2),p=O[0],h=O[1],g=Object(c.useState)(1),m=u()(g,2),y=m[0],v=m[1];Object(c.useEffect)((function(){h(t||[]),v(1)}),[t]);var w=Object(oe.useReactTable)({data:p,columns:ot(),getCoreRowModel:Object(oe.getCoreRowModel)(),getPaginationRowModel:Object(oe.getPaginationRowModel)()}),P=w.getRowModel().flatRows.map((function(e){return e.original}));Object(c.useEffect)((function(){w.setPageSize(20*y)}),[y]);return Object(H.jsx)(H.Fragment,{children:Object(H.jsxs)(se.default,{onScroll:function(e){(function(e){var t=e.layoutMeasurement,n=e.contentOffset,r=e.contentSize;return t.height+n.y>=r.height-20})(e.nativeEvent)&&(console.log("[Scroll] Scroll close to bottom"),v(y+1))},children:[r&&Object(H.jsx)(le.default,{animating:!0}),Object(H.jsxs)(f.default,{children:[Object(H.jsx)(_e.default,{columnWrapperStyle:it.columnWrapperStyle,numColumns:4,data:P,renderItem:function(e){var t=e.item;return Object(H.jsx)(nt,{item:t,onPress:n,s3client:d,s3Initialized:j,appState:a})},keyExtractor:function(e){return e.fileName}}),Object(H.jsx)(H.Fragment,{})]})]})})},ot=function(){return[Object(oe.createColumnHelper)().accessor("fileName",{id:"fileName",header:"Name",cell:function(e){return Object(H.jsx)(H.Fragment,{})}})]};function at(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function lt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?at(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):at(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var st=function(){var e,t,n=Object(c.useState)(void 0),r=u()(n,2),i=r[0],a=r[1],l=o.a.useState(!1),s=u()(l,2),d=s[0],j=s[1],b=Object(c.useState)(""),h=u()(b,2),m=h[0],y=h[1],v=Object(c.useContext)(x),P=u()(v,1)[0],S=ce(P),k=u()(S,2),D=k[0],z=k[1],B=o.a.useState(!0),E=u()(B,2),F=E[0],I=E[1],A=Object(c.useState)({Bucket:P.s3credentials.bucket,Prefix:"",Delimiter:"/"}),N=u()(A,2),M=N[0],T=N[1];Object(c.useEffect)((function(){T(lt(lt({},M),{},{Bucket:P.s3credentials.bucket}))}),[P,D]);var K=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",i=arguments.length>4?arguments[4]:void 0,c=Object(re.useQuery)(["getAssets",r,n.Bucket||"",n.Delimiter||"",n.Prefix||"",i||""],w()((function*(){try{var t=yield R(e,n);return ie(t,n)}catch(r){console.log("[useGetAssets] Error : ",r)}return[]})),{enabled:t,refetchOnWindowFocus:!1});return c}(D,z,M,m,P.mutatedAt),V=K.data,U=K.isLoading,G=K.isError,W=function(e){T(lt(lt({},M),{},{Prefix:e}))},J=function(e){e.isFolder?W(e.prefix):a(e)},q=["bucket"].concat(C()(null==(e=M.Prefix)?void 0:e.split("/"))),_=q.map((function(e,t){var n=t===(null==q?void 0:q.length)-1;return Object(H.jsxs)(Re,{isUnderlined:!n,onPress:function(){!function(e){var t,n=(null==(t=M.Prefix)?void 0:t.split("/")).slice(0,e).join("/")+"/";W("/"===n?"":n)}(t)},children:["/",!n&&Object(H.jsx)(ee.default,{name:"folder-open-outline",color:"#ffbd43",size:22}),e]},"dirPath"+t)}));return Object(H.jsx)(H.Fragment,{children:z?Object(H.jsxs)(H.Fragment,{children:[Object(H.jsx)(g.Portal,{hostName:"Reloader",children:Object(H.jsx)(p.default,{animated:!0,icon:"reload",onPress:function(){y(""+Math.random())}})}),Object(H.jsx)(g.Portal,{hostName:"Back",children:(null==(t=M.Prefix)?void 0:t.length)>0&&Object(H.jsx)(p.default,{icon:"arrow-left",onPress:function(){!function(){var e=M.Prefix;if(""!==e){var t=e.substring(0,e.substring(0,e.length-1).lastIndexOf("/")+1);W(t)}}()}})}),Object(H.jsxs)(f.default,{style:ut.root,children:[Object(H.jsxs)(f.default,{style:ut.section1,children:[G&&Object(H.jsx)(O.default,{variant:"headlineSmall",children:"Error "}),Object(H.jsxs)(f.default,{style:ut.actionBarContainer,children:[Object(H.jsx)(O.default,{variant:"bodyMedium",style:ut.path,children:_}),Object(H.jsxs)(f.default,{style:ut.buttonGroup,children:[Object(H.jsx)(te.default,{icon:"dots-grid",value:"grid",status:!1===F?"checked":"unchecked",onPress:function(){return I(!1)}}),Object(H.jsx)(te.default,{icon:"table",value:"table",status:!0===F?"checked":"unchecked",onPress:function(){return I(!0)}})]})]}),Object(H.jsx)(De,{isVisible:d,onClose:function(){j(!1)},children:Object(H.jsx)(O.default,{children:"Upload files here"})}),F?Object(H.jsx)(ve,{assets:V,onPress:J,isLoading:U}):Object(H.jsx)(ct,{assets:V,onPress:J,isLoading:U}),Object(H.jsx)(ne.default,{icon:"plus",onPress:function(){return j(!d)},visible:!0,style:[ut.fabStyle]})]}),i&&Object(H.jsx)(Je,{onClose:function(){return a(void 0)},asset:i})]})]}):Object(H.jsx)(L.default,{style:ut.errorMessage,children:Object(H.jsx)(O.default,{children:"S3 Client has not been initialized, please update your API Configuration first."})})})},ut=i.default.create({path:{display:"flex",margin:10,flex:1},fabStyle:{bottom:45,right:25,position:"absolute"},errorMessage:{margin:12,padding:10},root:{flexDirection:"row",display:"flex",flex:1,flexGrow:1},section1:{flex:3,borderColor:"gray",borderRightWidth:2,flexDirection:"column"},buttonGroup:{display:"flex",flexDirection:"row"},actionBarContainer:{display:"flex",flexDirection:"row"}});function dt(){return Object(H.jsx)(st,{})}var ft=n(460),jt=function(e){return Object(H.jsxs)(ft.default.Header,{mode:"center-aligned",elevated:!0,children:[Object(H.jsx)(g.PortalHost,{name:"Back"}),Object(H.jsx)(ft.default.Content,{title:e.title}),Object(H.jsx)(g.PortalHost,{name:"Reloader"})]})},bt=function(){var e=c.useState(0),t=u()(e,2),n=t[0],r=t[1],i=c.useState([{key:"assets",title:"Assets",focusedIcon:"folder"},{key:"api_configuration",title:"API Configuration",focusedIcon:"cogs"}]),o=u()(i,1)[0],a=y.default.SceneMap({assets:dt,api_configuration:Z});return"web"===d.default.OS?null:Object(H.jsxs)(H.Fragment,{children:[Object(H.jsx)(jt,{title:"BYOS"}),Object(H.jsx)(y.default,{navigationState:{index:n,routes:o},onIndexChange:r,renderScene:a})]})},Ot=n(204),pt=function(){var e=w()((function*(e){try{yield Ot.default.setItem("byos/application",JSON.stringify(e))}catch(t){}}));return function(t){return e.apply(this,arguments)}}(),ht=function(){var e=w()((function*(){try{var e=yield Ot.default.getItem("byos/application");if(null!==e)return e}catch(t){}return""}));return function(){return e.apply(this,arguments)}}(),gt=function(e){try{return JSON.parse(e)}catch(t){return{}}},mt=function(){var e=w()((function*(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"{}",t=yield ht();return gt(t||e)}));return function(){return e.apply(this,arguments)}}(),xt=function(){var e=w()((function*(e){return yield pt(e),null}));return function(t){return e.apply(this,arguments)}}();function yt(){return Object(H.jsx)(H.Fragment,{children:Object(H.jsx)(X,{})})}var vt=n(180);function wt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Pt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?wt(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):wt(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var St=Pt(Pt({},vt.MD3LightTheme),{},{roundness:2,version:3,colors:Pt({},vt.MD3LightTheme.colors)});function Ct(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var kt=Object(b.default)(),Dt=i.default.create({ButtonsWrapper:{flexDirection:"row"},Button:{border:"1px",borderStyle:"solid"}});var zt=function(e){var t=e.children,n=Object(c.useContext)(He),r=u()(n,1)[0];return Object(H.jsx)(h.default,{theme:r,children:t})},Bt=function(){var e=Object(c.useState)(St),t=function(e){var t=Object(c.useState)(e),n=u()(t,2),r=n[0],i=n[1],o=Object(c.useState)(!1),a=u()(o,2),l=a[0],s=a[1];return Object(c.useMemo)((function(){mt(JSON.stringify(e)).then((function(e){i(e),s(!0)})).catch((function(){console.log("[useGetApplicationStateFromLs] Promise failure getApplicationStateLS")}))}),[e]),{data:r,isLoaded:l}}(m),n=t.data,r=t.isLoaded,i=Object(c.useState)(n),o=u()(i,2),a=o[0],s=o[1];Object(c.useEffect)((function(){s(n)}),[n]),Object(c.useEffect)((function(){r&&xt(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ct(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ct(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},a))}),[a,r]);var b=function(e){var t=e.navigation;return{headerTitle:function(e){return Object(H.jsx)(O.default,{children:"BYOS"})},headerRight:function(){return Object(H.jsxs)(f.default,{style:Dt.ButtonsWrapper,children:[Object(H.jsx)(p.default,{style:Dt.Button,icon:"home",onPress:function(){return t.navigate("Home")}}),Object(H.jsx)(p.default,{style:Dt.Button,icon:"cogs",onPress:function(){return t.navigate("Credentials")}})]})}}};return Object(H.jsx)(He.Provider,{value:e,children:Object(H.jsx)(zt,{children:Object(H.jsx)(g.PortalProvider,{children:Object(H.jsxs)(x.Provider,{value:i,children:["web"===d.default.OS&&Object(H.jsx)(j.default,{children:Object(H.jsxs)(kt.Navigator,{children:[Object(H.jsx)(kt.Screen,{name:"Home",component:dt,options:b}),Object(H.jsx)(kt.Screen,{name:"Credentials",component:yt,options:b})]})}),Object(H.jsx)(bt,{})]})})})})},Et=Object(c.createContext)(Object.create(null));var Ft={isReady:!1,routes:[{path:"/credentials",component:Object(H.jsx)(yt,{}),showInNavigation:!0},{path:"/",component:Object(H.jsx)((function(){return Object(H.jsx)(H.Fragment,{})}),{}),showInNavigation:!0}]};function It(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Rt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?It(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):It(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var At=function(e){var t=e.children,n=o.a.useContext(Et),r=u()(n,2),i=r[0],a=r[1];return Object(c.useEffect)((function(){!1===i.isReady&&a(Rt(Rt({},i),{},{isReady:!0}))}),[i.isReady,i.routes]),Object(H.jsx)(H.Fragment,{children:t})},Nt=n(457),Mt=n(278),Tt=new Nt.QueryClient;function Lt(e){var t=e.children;return Object(H.jsx)(Mt.QueryClientProvider,{client:Tt,children:t})}var Kt=function(e){var t=e.children,n=Object(c.useState)(Ft);return Object(H.jsx)(Lt,{children:Object(H.jsx)(Et.Provider,{value:n,children:Object(H.jsx)(At,{children:t})})})},Vt=function(){return Object(H.jsx)(Kt,{children:Object(H.jsx)(Bt,{})})};i.default.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"}});function Ht(){return Object(H.jsx)(Vt,{})}Object(r.default)(Ht),Object(r.default)(Ht)}},[[329,1,2]]]);
//# sourceMappingURL=app.6230ab0b.chunk.js.map