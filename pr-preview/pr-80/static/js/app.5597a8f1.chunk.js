(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{333:function(e,t,n){e.exports=n(434)},354:function(e,t){},374:function(e,t){},434:function(e,t,n){"use strict";n.r(t);var r=n(473),i=(n(435),n(4)),c=n(1),o=n.n(c),a=n(5),l=n.n(a),s=n(8),u=n.n(s),d=n(15),f=n(6),j=n(464),b=n(463),O=n(42),p=n(76),h=n(475),g=n(91),m={s3credentials:{apiKey:void 0,apiSecret:void 0,region:void 0,endpoint:void 0,bucket:void 0},backblaze:{authorizationToken:"",downloadUrl:"",s3ApiUrl:""},s3client:void 0,otherStuff:"",mutatedAt:void 0},x=Object(c.createContext)(Object.create(null)),y=n(470),v=n(18),w=n.n(v),P=n(148),S=n(26),C=n.n(S),k=n(466),D=n(452),I=n(453),z=n(454),B=n(455),F=(n(341),n(353),n(433).getSignedUrl),E=function(e){var t=e.credentials,n=e.region,r=e.endpoint,i=new k.S3Client({region:n,credentials:t,endpoint:r});return i.middlewareStack.add((function(e,t){return function(){var t=w()((function*(t){return yield e(t)}));return function(e){return t.apply(this,arguments)}}()}),{step:"finalizeRequest",name:"removeHeaders"}),i},R=function(){var e=w()((function*(e,t){var n,r,i=new D.ListObjectsCommand(t),c=yield e.send(i),o=(null==(n=c.CommonPrefixes)?void 0:n.map((function(e){return{prefix:e.Prefix,etag:void 0,name:e.Prefix,lastModified:void 0,size:0,key:e.Prefix}})))||[],a=(null==(r=c.Contents)?void 0:r.map((function(e){return{prefix:"",etag:e.ETag,name:null==e?void 0:e.Key,lastModified:null==e?void 0:e.LastModified,size:null==e?void 0:e.Size,key:e.Key}})))||[];return[].concat(C()(o),C()(a))}));return function(t,n){return e.apply(this,arguments)}}(),A=function(){var e=w()((function*(e,t){try{var n=yield e.send(new I.CopyObjectCommand(t));return console.log("updated asset",n),n}catch(r){console.log("Error",r)}}));return function(t,n){return e.apply(this,arguments)}}(),N=function(){var e=w()((function*(e,t){try{return yield e.send(new z.DeleteObjectCommand(t))}catch(n){console.log("Error",n)}}));return function(t,n){return e.apply(this,arguments)}}(),M=function(){var e=w()((function*(e,t){var n=new B.GetObjectCommand(t);return yield e.send(n)}));return function(t,n){return e.apply(this,arguments)}}(),T=function(){var e=w()((function*(e,t){var n=new B.GetObjectCommand(t);return yield F(e,n,{expiresIn:3600})}));return function(t,n){return e.apply(this,arguments)}}(),L=(function(){var e=w()((function*(e,t){var n=new B.GetObjectCommand(t),r=yield e.config.endpoint();n.middlewareStack.add((function(e){return function(){var e=w()((function*(e){var n=e.request,i=n.headers,c=n.path,o=r.hostname,a=r.protocol;return fetch(a+"//"+o+"/"+t.Bucket+c,{headers:i}).then((function(e){console.log("Response = ",e)})),new Promise((function(e,t){return t(new Error("Intentional Failure"))}))}));return function(t){return e.apply(this,arguments)}}()}),{step:"finalizeRequest",name:"rH"});try{yield e.send(n)}catch(i){}}))}(),n(315)),K=n(456),H=n(467),V=n(3),G=i.default.create({textInput:{marginTop:20}}),W=function(e){var t=e.control,n=e.name,r=e.label;return void 0===t?null:Object(V.jsx)(V.Fragment,{children:Object(V.jsx)(P.Controller,{control:t,name:n,render:function(e){var t=e.field,i=t.value,c=t.onChange,o=t.onBlur;return Object(V.jsx)(V.Fragment,{children:Object(V.jsx)(H.default,{label:r,value:i,onChangeText:function(e){console.log("[InputChange] name = ",n," value = ",e),c(e)},onBlur:o,style:G.textInput})})}})})},U=n(178),_=n(275);function J(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?J(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):J(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Q=function(){var e=Object(c.useContext)(x),t=u()(e,2),n=t[0],r=t[1],a=n.s3credentials,l=Object(P.useForm)({defaultValues:a}),s=l.control,j=l.handleSubmit,b=l.getValues,p=l.reset;Object(c.useEffect)((function(){p(a)}),[a]);var h=Object(c.useState)(!1),g=u()(h,2)[1],m=function(){var e=w()((function*(){k();var e=b();r(q(q({},n),{},{s3credentials:e,s3client:void 0})),g(!0),setTimeout((function(){g(!1)}),1e3);var t=E({credentials:{accessKeyId:e.apiKey,secretAccessKey:e.apiSecret},region:e.region,endpoint:e.endpoint});R(t,{Bucket:"testinghumza"}).catch((function(){console.log("[SaveCredentialsForm] Promise failure getAssets")}))}));return function(){return e.apply(this,arguments)}}(),y=o.a.useState(!1),v=u()(y,2),S=v[0],C=v[1],k=function(){return C(!S)},D=i.default.create({container:{flex:1},inner:{padding:24,flex:1,justifyContent:"space-around"},header:{fontSize:36,marginBottom:48},textInput:{height:40,borderColor:"#000000",borderBottomWidth:1,marginBottom:36},snackBarContainer:{flex:1,justifyContent:"space-between"}});return Object(V.jsxs)(_.default,{behavior:"ios"===d.default.OS?"padding":"height",style:D.container,children:[Object(V.jsxs)(L.default,{children:[Object(V.jsxs)(L.default.Content,{children:[Object(V.jsx)(O.default,{variant:"headlineSmall",children:"API Configuration"}),Object(V.jsx)(W,{control:s,name:"apiKey",label:"API KEY"}),Object(V.jsx)(W,{control:s,name:"apiSecret",label:"Api Secret"}),Object(V.jsx)(W,{control:s,name:"endpoint",label:"Endpoint"}),Object(V.jsx)(W,{control:s,name:"bucket",label:"Bucket"}),Object(V.jsx)(W,{control:s,name:"region",label:"Region"})]}),Object(V.jsx)(L.default.Actions,{children:Object(V.jsx)(U.default,{onPress:j(m),children:"Submit"})})]}),Object(V.jsx)(f.default,{style:D.snackBarContainer,children:Object(V.jsx)(K.default,{visible:S,onDismiss:function(){return C(!1)},action:{label:"Dismiss",onPress:function(){}},children:"Credentials are saved!"})})]})},Y=function(){return Object(V.jsx)(Q,{})},$=n(462),X=n(471),Z=n(474),ee=n(457),te=function(e,t){return e.map((function(e){var n,r=e.name.replace(t.Prefix,"");return{assetId:e.etag,fileName:r,fileSize:e.size,updatedAt:e.lastModified,isFolder:(null==(n=e.prefix)?void 0:n.length)>0,prefix:e.prefix,etag:e.etag,key:e.key}}))},ne=function(e){var t=e.s3credentials,n=t.apiKey,r=t.apiSecret,i=t.region,o=t.endpoint,a=Object(c.useMemo)((function(){return n&&r&&o?[E({region:i,credentials:{accessKeyId:n,secretAccessKey:r},endpoint:o}),!0]:[void 0,!1]}),[n,r,i,o]),l=u()(a,2);return[l[0],l[1]]},re=n(63),ie=n(469),ce=n(158),oe=n(72),ae=n(459),le=n(285),se=n(198),ue=n.n(se),de=n(286),fe=n.n(de),je=n(458),be=function(){return Object(V.jsx)(V.Fragment,{})},Oe=function(e){switch(e){case"png":case"jpeg":case"jpg":return"image";default:return"file"}};ue.a.extend(fe.a);var pe=i.default.create({icon:{},filename:{}}),he=function(e){var t=e.isFolder?"folder":/(?:\.([^.]+))?$/.exec(e.fileName)[1]||"",n=e.fileName.split(".").pop();switch(t){case"folder":return Object(V.jsx)(je.default,{name:"folder",color:"#ffbd43",size:22,style:pe.icon});default:return Object(V.jsx)(je.default,{name:Oe(n),color:"#6565d6",size:22,style:pe.icon})}},ge=function(){var e=Object(re.createColumnHelper)();return[e.accessor("fileName",{id:"fileName",header:"Name",cell:function(e){var t=e.row.original,n=t.isFolder?e.getValue().slice(0,-1):e.getValue();return Object(V.jsx)(V.Fragment,{children:Object(V.jsxs)(O.default,{variant:"bodyLarge",style:pe.filename,children:[he(t)," \xa0",n]})})}}),e.accessor("fileSize",{id:"fileSize",header:"Size",cell:function(e){return Object(V.jsx)(O.default,{children:!e.row.original.isFolder&&Object(le.default)(e.getValue())})}}),e.accessor("updatedAt",{id:"updatedAt",header:"Last Modified",cell:function(e){return Object(V.jsx)(O.default,{children:!e.row.original.isFolder&&ue()(e.getValue()).fromNow()})}}),e.display({id:"actions",cell:function(){return Object(V.jsx)(be,{})}})].filter((function(e){return"web"===d.default.OS||"fileName"===e.id}))},me=i.default.create({tableHead:{height:"auto"},sorterIcon:{marginLeft:"10px"},cell:{flexBasis:"auto",paddingRight:"30px"},cellFirstChild:{flexBasis:"78%"},title:{display:"flex",alignItems:"center"}}),xe=function(e){var t=e.assets,n=e.onPress,r=e.isLoading,i=o.a.useState((function(){return t||[]})),a=u()(i,2),l=a[0],s=a[1],d=o.a.useState([]),f=u()(d,2),j=f[0],b=f[1],p=Object(c.useState)(1),h=u()(p,2),g=h[0],m=h[1];Object(c.useEffect)((function(){s(t||[]),m(1)}),[t]);var x=Object(re.useReactTable)({data:l,columns:ge(),state:{sorting:j},onSortingChange:b,getCoreRowModel:Object(re.getCoreRowModel)(),getSortedRowModel:Object(re.getSortedRowModel)(),getPaginationRowModel:Object(re.getPaginationRowModel)()});Object(c.useEffect)((function(){x.setPageSize(20*g)}),[g]);return Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(ie.default.Header,{style:me.tableHead,children:x.getHeaderGroups().map((function(e){return Object(V.jsx)(c.Fragment,{children:e.headers.map((function(e,t){var n;return Object(V.jsx)(ie.default.Title,{style:0===t?me.cellFirstChild:me.cell,children:Object(V.jsx)(U.default,{children:e.isPlaceholder?null:Object(V.jsxs)(O.default,{onClick:e.column.getToggleSortingHandler(),children:[Object(re.flexRender)(e.column.columnDef.header,e.getContext()),null!=(n={asc:Object(V.jsx)(ae.default,{name:"arrowup",style:me.sorterIcon}),desc:Object(V.jsx)(ae.default,{name:"arrowdown",style:me.sorterIcon})}[e.column.getIsSorted()])?n:null]})})},e.id)}))},e.id)}))}),Object(V.jsx)(oe.default,{onScroll:function(e){(function(e){var t=e.layoutMeasurement,n=e.contentOffset,r=e.contentSize;return t.height+n.y>=r.height-20})(e.nativeEvent)&&(console.log("[Scroll] Scroll close to bottom"),m(g+1))},children:Object(V.jsxs)(ie.default,{children:[r&&Object(V.jsx)(ce.default,{animating:!0}),x.getRowModel().rows.map((function(e){return Object(V.jsx)(ie.default.Row,{onPress:function(){n(e.original)},children:e.getVisibleCells().map((function(e,t){return Object(V.jsx)(ie.default.Cell,{style:0===t?me.cellFirstChild:me.cell,children:Object(re.flexRender)(e.column.columnDef.cell,e.getContext())},e.id)}))},e.id)})),Object(V.jsx)(ie.default.Pagination,{page:x.getState().pagination.pageIndex+1,numberOfPages:x.getPageCount(),onPageChange:function(e){return x.setPageIndex(e-1)},label:x.getState().pagination.pageIndex+1+" of "+x.getPageCount()})]})})]})},ye=n(317),ve=n(460),we=i.default.create({centeredView:{justifyContent:"center",alignItems:"center"},modalView:{backgroundColor:"white",borderRadius:20,padding:30,alignItems:"center"},button:{borderRadius:20,padding:10,elevation:2},buttonOpen:{backgroundColor:"#F194FF"},buttonClose:{backgroundColor:"#2196F3"},textStyle:{textAlign:"center"},modalText:{marginBottom:15,textAlign:"center"}}),Pe=function(e){var t=e.isVisible,n=e.onClose,r=e.children;return t?Object(V.jsx)(ye.default,{children:Object(V.jsx)(ve.default,{visible:t,onDismiss:n,children:Object(V.jsx)(f.default,{style:we.centeredView,children:Object(V.jsxs)(f.default,{style:we.modalView,children:[r,Object(V.jsx)(O.default,{style:we.textStyle,children:"Tap below to dismiss"})]})})})}):null},Se=n(14),Ce=n.n(Se),ke=["children","isUnderlined"];function De(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ie(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?De(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):De(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ze=function(e){var t=e.children,n=e.isUnderlined,r=Ce()(e,ke);return Object(V.jsx)(O.default,Ie(Ie({},r),{},{style:n?[Be.underline]:[],children:t}))},Be=i.default.create({underline:{textDecorationLine:"underline"}}),Fe=(n(44),n(41)),Ee=function(e){return e<576?"xs":e>=576&&e<768?"md":e>=768&&e<992?"lg":e>=992&&e<1200?"xl":e>=1200?"xxl":void 0},Re=Fe.default.get("window"),Ae=Fe.default.get("screen"),Ne=Ee(Re.width),Me=function(e){var t=e.hidden,n=e.children,r=Object(c.useState)({window:Re,screen:Ae,screenType:Ne}),i=u()(r,2),o=i[0],a=i[1];Object(c.useEffect)((function(){var e=Fe.default.addEventListener("change",(function(e){var t=e.window,n=e.screen,r=Ee(t.width);a({window:t,screen:n,screenType:r})}));return function(){return null==e?void 0:e.remove()}}),[]);var l=!!t&&t.includes(o.screenType);return Object(V.jsx)(V.Fragment,{children:!l&&Object(V.jsx)(f.default,{children:n})})},Te=(i.default.create({header:{fontSize:16,marginVertical:10}}),Object(c.createContext)(Object.create({}))),Le=n(203),Ke=function(){var e=w()((function*(e){return(yield Object(Le.default)({method:"GET",url:"https://api.backblazeb2.com/b2api/v2/b2_authorize_account",headers:{Accept:"application/json",Authorization:"Basic "+e}})).data}));return function(t){return e.apply(this,arguments)}}(),He=(function(){var e=w()((function*(e,t,n){return(yield Object(Le.default)({method:"POST",url:"https://api.backblazeb2.com/b2api/v2/b2_get_download_authorization",headers:{Accept:"application/json",Authorization:"Basic "+e},data:{bucketId:t,fileNamePrefix:n,validDurationInSeconds:86400}})).data}))}(),function(){var e=w()((function*(e){var t=e.s3credentials,n=t.apiKey,r=t.apiSecret,i=btoa(n+":"+r);return yield Ke(i)}))}(),function(){var e=w()((function*(e,t,n,r){return e.s3credentials.endpoint.toLowerCase().includes("backblazeb2")?yield T(n,{Key:r,Bucket:e.s3credentials.bucket}):yield T(e.s3client,{Key:r,Bucket:e.s3credentials.bucket})}));return function(t,n,r,i){return e.apply(this,arguments)}}());function Ve(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ge(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ve(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ve(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var We=function(e){var t=e.asset,n=e.onClose,r=Object(c.useContext)(x),i=u()(r,2),o=i[0],a=i[1],l=o.s3credentials,s=Object(c.useContext)(Te),d=u()(s,1)[0],j=Object(c.useState)(!1),b=u()(j,2),h=b[0],g=b[1],m=Object(c.useState)(t),y=u()(m,2),v=y[0],P=y[1],S=Object(c.useState)(t.fileName),C=u()(S,2),k=C[0],D=C[1],I=ne(o),z=u()(I,1)[0],B=function(){var e=w()((function*(){g(!1),P((function(e){return Ge(Ge({},e),{},{fileName:k})})),yield A(z,{Bucket:l.bucket,Key:l.bucket+"/"+t.key.replace(t.fileName,k),CopySource:l.bucket+"/"+t.key}),a(Ge(Ge({},o),{},{mutatedAt:new Date}))}));return function(){return e.apply(this,arguments)}}(),F=function(){var e=w()((function*(){var e={Bucket:l.bucket,Key:v.key};yield N(z,e),a(Ge(Ge({},o),{},{mutatedAt:new Date}))}));return function(){return e.apply(this,arguments)}}(),E=function(){var e=w()((function*(){var e=yield He(o,a,z,t.key),n=document.createElement("a");n.href=e,n.download=t.key,n.style.display="none",document.body.appendChild(n),n.click(),n.remove()}));return function(){return e.apply(this,arguments)}}();return Object(V.jsx)(V.Fragment,{children:Object(V.jsx)(Me,{hidden:["xs","md"],children:Object(V.jsxs)(f.default,{style:Ue.main,children:[Object(V.jsx)(p.default,{theme:d,icon:"close",onPress:n,style:Ue.closeButton}),Object(V.jsxs)(f.default,{style:[Ue.section2,Ue.centered],children:[Object(V.jsx)(O.default,{variant:"headlineSmall",style:[Ue.textCenter,Ue.marginBottom],children:Object(V.jsx)(je.default,{theme:d,name:"file",size:100})}),Object(V.jsx)(O.default,{variant:"headlineSmall",style:Ue.textCenter,children:h?Object(V.jsx)(H.default,{value:h?k:null==v?void 0:v.fileName,onChangeText:function(e){return D(e)}}):null==v?void 0:v.fileName}),Object(V.jsxs)(f.default,{style:[Ue.centered,Ue.horizontal],children:[h?Object(V.jsx)(p.default,{theme:d,icon:"check",onPress:B}):Object(V.jsx)(p.default,{theme:d,icon:"pencil",onPress:function(){return g(!0)}}),Object(V.jsx)(p.default,{theme:d,icon:"trash-can",onPress:F}),Object(V.jsx)(p.default,{theme:d,icon:"download",onPress:E})]})]})]})})})},Ue=i.default.create({main:{display:"flex",flexGrow:1},closeButton:{display:"flex",textAlign:"right",height:50},marginBottom:{marginBottom:10},textCenter:{textAlign:"center"},centered:{justifyContent:"center",alignItems:"center"},horizontal:{flexDirection:"row"},section2:{minWidth:"30vw",flex:1,flexGrow:1,margin:20}}),_e=n(175),Je=n(57),qe=n(165),Qe=["png","jpeg","jpg"],Ye=function(e){var t=e.item,n=e.onPress,r=e.s3client,i=e.s3Initialized,o=e.appState,a=Object(c.useState)(),l=u()(a,2),s=l[0],d=l[1],f=Object(c.useState)(void 0),j=u()(f,2),b=j[0],p=j[1],h=Object(c.useState)(!1),g=u()(h,2),m=g[0],x=g[1],y=Object(c.useState)(!1),v=u()(y,2)[1],w=t.fileName.split(".").pop(),P=Qe.includes(w),S=t.isFolder?"folder":Oe(w),C=t.fileSize<1e6;Object(c.useEffect)((function(){t.isFolder||P&&C&&(v(!0),M(r,{Key:t.key,Bucket:o.s3credentials.bucket}).then((function(e){var t;(t=e.Body,new Response(t,{})).blob().then((function(e){var t=new FileReader;t.readAsDataURL(e),t.onload=function(){var e=t.result;d(e),x(!0)}})).catch((function(e){p(e)}))})).catch((function(e){p(e)})))}),[i]);return Object(V.jsxs)(qe.default,{onPress:function(){n(t)},children:[P&&C?m&&!b?Object(V.jsx)(Je.default,{source:{uri:s.toString()},style:$e.preview}):Object(V.jsx)(je.default,{name:"alert-triangle",size:100,style:$e.errorIcon}):Object(V.jsx)(je.default,{name:S,size:100,style:$e.icon}),Object(V.jsx)(O.default,{style:$e.fileName,onPress:function(){n(t)},children:t.fileName})]})},$e=i.default.create({preview:{width:"100%",height:200},icon:{marginTop:20},wrapper:{},fileName:{bottom:0,textAlign:"center"},errorIcon:{color:"red"}}),Xe=function(e){var t=e.item,n=e.onPress,r=t.fileName.split(".").pop(),i=t.isFolder?"folder":Oe(r);return Object(V.jsxs)(qe.default,{onPress:function(){n(t)},children:[Object(V.jsx)(je.default,{name:i,size:100,style:Ze.icon}),Object(V.jsx)(O.default,{style:Ze.fileName,onPress:function(){n(t)},children:t.fileName})]})},Ze=i.default.create({icon:{marginTop:20},wrapper:{},fileName:{bottom:0,textAlign:"center"},errorIcon:{color:"red"}}),et=function(e){var t=e.item,n=e.onPress,r=e.s3client,i=e.s3Initialized,c=e.appState,o=t.fileName.split(".").pop();return Object(V.jsx)(f.default,{style:tt.item,children:function(){switch(o){case"png":case"jpeg":case"jpg":return Object(V.jsx)(Ye,{item:t,onPress:n,s3client:r,s3Initialized:i,appState:c});default:return Object(V.jsx)(Xe,{item:t,onPress:n})}}()})},tt=i.default.create({item:{marginVertical:8,marginHorizontal:16,height:200,display:"flex",flex:1,overflow:"hidden",textAlign:"center"}}),nt=i.default.create({cell:{flexBasis:"auto",minWidth:"105px",paddingRight:"15px"},cellFirstChild:{flexBasis:"78%"},title:{display:"flex",alignItems:"center"},columnWrapperStyle:{display:"flex"}}),rt=function(e){var t=e.assets,n=e.onPress,r=e.isLoading,i=Object(c.useContext)(x),a=u()(i,1)[0],l=ne(a),s=u()(l,2),d=s[0],j=s[1],b=o.a.useState((function(){return t||[]})),O=u()(b,2),p=O[0],h=O[1],g=Object(c.useState)(1),m=u()(g,2),y=m[0],v=m[1];Object(c.useEffect)((function(){h(t||[]),v(1)}),[t]);var w=Object(re.useReactTable)({data:p,columns:it(),getCoreRowModel:Object(re.getCoreRowModel)(),getPaginationRowModel:Object(re.getPaginationRowModel)()}),P=w.getRowModel().flatRows.map((function(e){return e.original}));Object(c.useEffect)((function(){w.setPageSize(20*y)}),[y]);return Object(V.jsx)(V.Fragment,{children:Object(V.jsxs)(oe.default,{onScroll:function(e){(function(e){var t=e.layoutMeasurement,n=e.contentOffset,r=e.contentSize;return t.height+n.y>=r.height-20})(e.nativeEvent)&&(console.log("[Scroll] Scroll close to bottom"),v(y+1))},children:[r&&Object(V.jsx)(ce.default,{animating:!0}),Object(V.jsxs)(f.default,{children:[Object(V.jsx)(_e.default,{columnWrapperStyle:nt.columnWrapperStyle,numColumns:4,data:P,renderItem:function(e){var t=e.item;return Object(V.jsx)(et,{item:t,onPress:n,s3client:d,s3Initialized:j,appState:a})},keyExtractor:function(e){return e.fileName}}),Object(V.jsx)(V.Fragment,{})]})]})})},it=function(){return[Object(re.createColumnHelper)().accessor("fileName",{id:"fileName",header:"Name",cell:function(e){return Object(V.jsx)(V.Fragment,{})}})]},ct=n(461),ot=n(320),at=function(){var e="us-west-004",t="",n="",r="https://s3.us-west-004.backblazeb2.com/",a="testinghumza",l=Object(c.useState)(!1),s=u()(l,2),d=s[0],j=s[1],b=Object(c.useState)(!0),h=u()(b,2),g=h[0],m=h[1],x=o.a.useState(!1),y=u()(x,2),v=y[0],P=y[1],S=i.default.create({snackbarcontainer:{left:"-45%"},snackbarinner:{backgroundColor:"grey",width:250,height:40},snackbartext:{color:"white"},uploadcontainer:{padding:10,flexDirection:"row"},activityindicator:{marginLeft:5}});return Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(O.default,{children:"Click on the button below to select & upload file"}),Object(V.jsxs)(f.default,{style:S.uploadcontainer,children:[Object(V.jsx)(p.default,{icon:"cloud-upload",onPress:w()((function*(){var i=yield ot.getDocumentAsync({});console.log(i),j(!0);var c=lt(e,t,n,r);st(c,i.name,a,i.file).then((function(){m(!1)})),j(!1),P(!v)}))}),d&&Object(V.jsx)(ce.default,{style:S.activityindicator,animating:!0})]}),Object(V.jsx)(f.default,{style:S.snackbarcontainer,children:Object(V.jsx)(K.default,{style:S.snackbarinner,visible:v,onDismiss:function(){return P(!1)},action:{label:"Dismiss",onPress:function(){}},children:g?Object(V.jsx)(O.default,{style:S.snackbartext,children:"Failed to upload file"}):Object(V.jsx)(O.default,{style:S.snackbartext,children:"File upload successfull"})})})]})},lt=function(e,t,n,r){return E({region:e,credentials:{accessKeyId:t,secretAccessKey:n},endpoint:r})},st=function(){var e=w()((function*(e,t,n,r){var i={Body:r,Key:t,Bucket:n},c=new ct.PutObjectCommand(i);return yield e.send(c)}));return function(t,n,r,i){return e.apply(this,arguments)}}();function ut(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function dt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ut(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ut(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ft=function(){var e,t,n=Object(c.useState)(void 0),r=u()(n,2),i=r[0],a=r[1],l=o.a.useState(!1),s=u()(l,2),d=s[0],j=s[1],b=Object(c.useState)(""),h=u()(b,2),m=h[0],y=h[1],v=Object(c.useContext)(x),P=u()(v,1)[0],S=ne(P),k=u()(S,2),D=k[0],I=k[1],z=o.a.useState(!0),B=u()(z,2),F=B[0],E=B[1],A=Object(c.useState)({Bucket:P.s3credentials.bucket,Prefix:"",Delimiter:"/"}),N=u()(A,2),M=N[0],T=N[1];Object(c.useEffect)((function(){T(dt(dt({},M),{},{Bucket:P.s3credentials.bucket}))}),[P,D]);var K=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",i=arguments.length>4?arguments[4]:void 0,c=Object(ee.useQuery)(["getAssets",r,n.Bucket||"",n.Delimiter||"",n.Prefix||"",i||""],w()((function*(){try{var t=yield R(e,n);return te(t,n)}catch(r){console.log("[useGetAssets] Error : ",r)}return[]})),{enabled:t,refetchOnWindowFocus:!1});return c}(D,I,M,m,P.mutatedAt),H=K.data,G=K.isLoading,W=K.isError,U=function(e){T(dt(dt({},M),{},{Prefix:e}))},_=function(e){e.isFolder?U(e.prefix):a(e)},J=["bucket"].concat(C()(null==(e=M.Prefix)?void 0:e.split("/"))),q=J.map((function(e,t){var n=t===(null==J?void 0:J.length)-1;return Object(V.jsxs)(ze,{isUnderlined:!n,onPress:function(){!function(e){var t,n=(null==(t=M.Prefix)?void 0:t.split("/")).slice(0,e).join("/")+"/";U("/"===n?"":n)}(t)},children:["/",!n&&Object(V.jsx)($.default,{name:"folder-open-outline",color:"#ffbd43",size:22}),e]},"dirPath"+t)}));return Object(V.jsx)(V.Fragment,{children:I?Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(g.Portal,{hostName:"Reloader",children:Object(V.jsx)(p.default,{animated:!0,icon:"reload",onPress:function(){y(""+Math.random())}})}),Object(V.jsx)(g.Portal,{hostName:"Back",children:(null==(t=M.Prefix)?void 0:t.length)>0&&Object(V.jsx)(p.default,{icon:"arrow-left",onPress:function(){!function(){var e=M.Prefix;if(""!==e){var t=e.substring(0,e.substring(0,e.length-1).lastIndexOf("/")+1);U(t)}}()}})}),Object(V.jsxs)(f.default,{style:jt.root,children:[Object(V.jsxs)(f.default,{style:jt.section1,children:[W&&Object(V.jsx)(O.default,{variant:"headlineSmall",children:"Error "}),Object(V.jsxs)(f.default,{style:jt.actionBarContainer,children:[Object(V.jsx)(O.default,{variant:"bodyMedium",style:jt.path,children:q}),Object(V.jsxs)(f.default,{style:jt.buttonGroup,children:[Object(V.jsx)(X.default,{icon:"dots-grid",value:"grid",status:!1===F?"checked":"unchecked",onPress:function(){return E(!1)}}),Object(V.jsx)(X.default,{icon:"table",value:"table",status:!0===F?"checked":"unchecked",onPress:function(){return E(!0)}})]})]}),Object(V.jsx)(Pe,{isVisible:d,onClose:function(){j(!1)},children:Object(V.jsx)(at,{})}),F?Object(V.jsx)(xe,{assets:H,onPress:_,isLoading:G}):Object(V.jsx)(rt,{assets:H,onPress:_,isLoading:G}),Object(V.jsx)(Z.default,{icon:"plus",onPress:function(){return j(!d)},visible:!0,style:[jt.fabStyle]})]}),i&&Object(V.jsx)(We,{onClose:function(){return a(void 0)},asset:i})]})]}):Object(V.jsx)(L.default,{style:jt.errorMessage,children:Object(V.jsx)(O.default,{children:"S3 Client has not been initialized, please update your API Configuration first."})})})},jt=i.default.create({path:{display:"flex",margin:10,flex:1},fabStyle:{bottom:45,right:25,position:"absolute"},errorMessage:{margin:12,padding:10},root:{flexDirection:"row",display:"flex",flex:1,flexGrow:1},section1:{flex:3,borderColor:"gray",borderRightWidth:2,flexDirection:"column"},buttonGroup:{display:"flex",flexDirection:"row"},actionBarContainer:{display:"flex",flexDirection:"row"}});function bt(){return Object(V.jsx)(ft,{})}var Ot=n(468),pt=function(e){return Object(V.jsxs)(Ot.default.Header,{mode:"center-aligned",elevated:!0,children:[Object(V.jsx)(g.PortalHost,{name:"Back"}),Object(V.jsx)(Ot.default.Content,{title:e.title}),Object(V.jsx)(g.PortalHost,{name:"Reloader"})]})},ht=function(){var e=c.useState(0),t=u()(e,2),n=t[0],r=t[1],i=c.useState([{key:"assets",title:"Assets",focusedIcon:"folder"},{key:"api_configuration",title:"API Configuration",focusedIcon:"cogs"}]),o=u()(i,1)[0],a=y.default.SceneMap({assets:bt,api_configuration:Y});return"web"===d.default.OS?null:Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(pt,{title:"BYOS"}),Object(V.jsx)(y.default,{navigationState:{index:n,routes:o},onIndexChange:r,renderScene:a})]})},gt=n(205),mt=function(){var e=w()((function*(e){try{yield gt.default.setItem("byos/application",JSON.stringify(e))}catch(t){}}));return function(t){return e.apply(this,arguments)}}(),xt=function(){var e=w()((function*(){try{var e=yield gt.default.getItem("byos/application");if(null!==e)return e}catch(t){}return""}));return function(){return e.apply(this,arguments)}}(),yt=function(e){try{return JSON.parse(e)}catch(t){return{}}},vt=function(){var e=w()((function*(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"{}",t=yield xt();return yt(t||e)}));return function(){return e.apply(this,arguments)}}(),wt=function(){var e=w()((function*(e){return yield mt(e),null}));return function(t){return e.apply(this,arguments)}}();function Pt(){return Object(V.jsx)(V.Fragment,{children:Object(V.jsx)(Q,{})})}var St=n(182);function Ct(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function kt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ct(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ct(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Dt=kt(kt({},St.MD3LightTheme),{},{roundness:2,version:3,colors:kt({},St.MD3LightTheme.colors)});function It(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var zt=Object(b.default)(),Bt=i.default.create({ButtonsWrapper:{flexDirection:"row"},Button:{border:"1px",borderStyle:"solid"}});var Ft=function(e){var t=e.children,n=Object(c.useContext)(Te),r=u()(n,1)[0];return Object(V.jsx)(h.default,{theme:r,children:t})},Et=function(){var e=Object(c.useState)(Dt),t=function(e){var t=Object(c.useState)(e),n=u()(t,2),r=n[0],i=n[1],o=Object(c.useState)(!1),a=u()(o,2),l=a[0],s=a[1];return Object(c.useMemo)((function(){vt(JSON.stringify(e)).then((function(e){i(e),s(!0)})).catch((function(){console.log("[useGetApplicationStateFromLs] Promise failure getApplicationStateLS")}))}),[e]),{data:r,isLoaded:l}}(m),n=t.data,r=t.isLoaded,i=Object(c.useState)(n),o=u()(i,2),a=o[0],s=o[1];Object(c.useEffect)((function(){s(n)}),[n]),Object(c.useEffect)((function(){r&&wt(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?It(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):It(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},a))}),[a,r]);var b=function(e){var t=e.navigation;return{headerTitle:function(e){return Object(V.jsx)(O.default,{children:"BYOS"})},headerRight:function(){return Object(V.jsxs)(f.default,{style:Bt.ButtonsWrapper,children:[Object(V.jsx)(p.default,{style:Bt.Button,icon:"home",onPress:function(){return t.navigate("Home")}}),Object(V.jsx)(p.default,{style:Bt.Button,icon:"cogs",onPress:function(){return t.navigate("Credentials")}})]})}}};return Object(V.jsx)(Te.Provider,{value:e,children:Object(V.jsx)(Ft,{children:Object(V.jsx)(g.PortalProvider,{children:Object(V.jsxs)(x.Provider,{value:i,children:["web"===d.default.OS&&Object(V.jsx)(j.default,{children:Object(V.jsxs)(zt.Navigator,{children:[Object(V.jsx)(zt.Screen,{name:"Home",component:bt,options:b}),Object(V.jsx)(zt.Screen,{name:"Credentials",component:Pt,options:b})]})}),Object(V.jsx)(ht,{})]})})})})},Rt=Object(c.createContext)(Object.create(null));var At={isReady:!1,routes:[{path:"/credentials",component:Object(V.jsx)(Pt,{}),showInNavigation:!0},{path:"/",component:Object(V.jsx)((function(){return Object(V.jsx)(V.Fragment,{})}),{}),showInNavigation:!0}]};function Nt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Mt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Nt(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Nt(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Tt=function(e){var t=e.children,n=o.a.useContext(Rt),r=u()(n,2),i=r[0],a=r[1];return Object(c.useEffect)((function(){!1===i.isReady&&a(Mt(Mt({},i),{},{isReady:!0}))}),[i.isReady,i.routes]),Object(V.jsx)(V.Fragment,{children:t})},Lt=n(465),Kt=n(279),Ht=new Lt.QueryClient;function Vt(e){var t=e.children;return Object(V.jsx)(Kt.QueryClientProvider,{client:Ht,children:t})}var Gt=function(e){var t=e.children,n=Object(c.useState)(At);return Object(V.jsx)(Vt,{children:Object(V.jsx)(Rt.Provider,{value:n,children:Object(V.jsx)(Tt,{children:t})})})},Wt=function(){return Object(V.jsx)(Gt,{children:Object(V.jsx)(Et,{})})};i.default.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"}});function Ut(){return Object(V.jsx)(Wt,{})}Object(r.default)(Ut),Object(r.default)(Ut)}},[[333,1,2]]]);
//# sourceMappingURL=app.5597a8f1.chunk.js.map