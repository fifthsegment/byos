(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{264:function(e,t,n){e.exports=n(355)},342:function(e,t){},355:function(e,t,n){"use strict";n.r(t);var r=n(383),i=(n(356),n(3)),c=n(1),o=n.n(c),a=n(6),s=n.n(a),l=n(23),u=n.n(l),d=Object(c.createContext)(Object.create(null)),f={s3credentials:{apiKey:void 0,apiSecret:void 0,region:void 0,endpoint:void 0,bucket:void 0},s3client:void 0,otherStuff:""},j=Object(c.createContext)(Object.create(null)),b=n(384),O=n(378),p=n(75),g=n(8),h=function(e){return Object(g.jsxs)(O.default.Header,{mode:"center-aligned",elevated:!0,children:[Object(g.jsx)(p.PortalHost,{name:"Back"}),Object(g.jsx)(O.default.Content,{title:e.title}),Object(g.jsx)(p.PortalHost,{name:"Reloader"})]})},x=n(381),m=n(129),y=n(39),v=n.n(y),P=n(27),S=n.n(P),w=n(376),C=n(369),D=(n(310),n(322),function(e){var t=e.credentials,n=e.region,r=e.endpoint,i=new w.S3Client({region:n,credentials:t,endpoint:r});return i.middlewareStack.add((function(e,t){return function(){var t=S()((function*(t){return yield e(t)}));return function(e){return t.apply(this,arguments)}}()}),{step:"finalizeRequest",name:"removeHeaders"}),i}),k=function(){var e=S()((function*(e,t){var n,r;console.log("[s3:getAssets] Making a List Objects command");var i=new C.ListObjectsCommand(t);console.log("[s3:getAssets] Command ",i),console.log("[s3:getAssets] Our s3 Client",e),console.log("[s3:getAssets] Sending command using client.send");var c=yield e.send(i),o=(null==(n=c.CommonPrefixes)?void 0:n.map((function(e){return{prefix:e.Prefix,etag:void 0,name:e.Prefix,lastModified:void 0,size:0}})))||[],a=(null==(r=c.Contents)?void 0:r.map((function(e){return{prefix:"",etag:e.ETag,name:null==e?void 0:e.Key,lastModified:null==e?void 0:e.LastModified,size:null==e?void 0:e.Size}})))||[];return[].concat(v()(o),v()(a))}));return function(t,n){return e.apply(this,arguments)}}(),A=n(45),I=n(379),E=n(38),F=n(370),R=n(377),B=function(e){var t=e.control,n=e.name,r=e.label;if(void 0===t)return null;var c=i.default.create({textInput:{height:40,marginTop:20}});return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)(m.Controller,{control:t,name:n,render:function(e){var t=e.field,i=t.value,o=t.onChange,a=t.onBlur;return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)(R.default,{label:r,value:i,onChangeText:function(e){console.log("[InputChange] name = ",n," value = ",e),o(e)},onBlur:a,style:c.textInput})})}})})},M=n(133),z=n(51),N=n(229),L=n(15),K=n(5);function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function G(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(Object(n),!0).forEach((function(t){s()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var H=function(){var e=Object(c.useContext)(j),t=u()(e,2),n=t[0],r=t[1],a=n.s3credentials,s=Object(m.useForm)({defaultValues:a}),l=s.control,d=s.handleSubmit,f=s.getValues,b=s.reset;Object(c.useEffect)((function(){b(a)}),[a]);var O=Object(c.useState)(!1),p=u()(O,2)[1],h=function(){S();var e=f();r(G(G({},n),{},{s3credentials:e,s3client:void 0})),p(!0),setTimeout((function(){p(!1)}),1e3);var t=D({credentials:{accessKeyId:e.apiKey,secretAccessKey:e.apiSecret},region:e.region,endpoint:e.endpoint});k(t,{Bucket:"testinghumza"}).catch((function(){console.log("[SaveCredentialsForm] Promise failure getAssets")}))},x=o.a.useState(!1),y=u()(x,2),v=y[0],P=y[1],S=function(){return P(!v)},w=i.default.create({container:{flex:1},inner:{padding:24,flex:1,justifyContent:"space-around"},header:{fontSize:36,marginBottom:48},textInput:{height:40,borderColor:"#000000",borderBottomWidth:1,marginBottom:36},snackBarContainer:{flex:1,justifyContent:"space-between"}});return Object(g.jsxs)(z.default,{children:[Object(g.jsx)(N.default,{behavior:"ios"===L.default.OS?"padding":"height",style:w.container,children:Object(g.jsx)(A.default,{style:w.inner,children:Object(g.jsxs)(I.default,{children:[Object(g.jsxs)(I.default.Content,{children:[Object(g.jsx)(E.default,{variant:"headlineSmall",children:"API Configuration"}),Object(g.jsx)(B,{control:l,name:"apiKey",label:"API KEY"}),Object(g.jsx)(B,{control:l,name:"apiSecret",label:"Api Secret"}),Object(g.jsx)(B,{control:l,name:"endpoint",label:"Endpoint"}),Object(g.jsx)(B,{control:l,name:"bucket",label:"Bucket"}),Object(g.jsx)(B,{control:l,name:"region",label:"Region"})]}),Object(g.jsx)(I.default.Actions,{children:Object(g.jsx)(M.default,{onPress:function(){return d(h)},children:"Submit"})})]})})}),Object(g.jsx)(K.default,{style:w.snackBarContainer,children:Object(g.jsx)(F.default,{visible:v,onDismiss:function(){return P(!1)},action:{label:"Dismiss",onPress:function(){}},children:"Credentials are saved!"})})]})},V=function(){return Object(g.jsx)(H,{})},J=n(371),Q=function(e,t){return e.map((function(e){var n,r=e.name.replace(t.Prefix,"");return{assetId:e.etag,fileName:r,fileSize:e.size,updatedAt:e.lastModified,isFolder:(null==(n=e.prefix)?void 0:n.length)>0,prefix:e.prefix}}))},W=n(77),Y=function(){return Object(g.jsx)(g.Fragment,{})},_=n(239),q=n(156),$=n.n(q),U=n(240),X=n.n(U),Z=n(372),ee=n(373);$.a.extend(X.a);var te=i.default.create({icon:{marginRight:"6px"}}),ne=function(e){switch(e.isFolder?"folder":/(?:\.([^.]+))?$/.exec(e.fileName)[1]||""){case"folder":return Object(g.jsx)(Z.default,{name:"folder1",size:24,style:te.icon});case"txt":return Object(g.jsx)(ee.default,{name:"file-text",size:24,style:te.icon});default:return Object(g.jsx)(ee.default,{name:"file",size:24,style:te.icon})}},re=function(){var e=Object(W.createColumnHelper)();return[e.accessor("fileName",{id:"fileName",header:"Name",cell:function(e){var t=e.row.original,n=t.isFolder?e.getValue().slice(0,-1):e.getValue();return Object(g.jsxs)(g.Fragment,{children:[ne(t)," ",n]})}}),e.accessor("fileSize",{id:"fileSize",header:"Size",cell:function(e){return!e.row.original.isFolder&&Object(_.default)(e.getValue())}}),e.accessor("updatedAt",{id:"updatedAt",header:"Last Modified",cell:function(e){return!e.row.original.isFolder&&$()(e.getValue()).fromNow()}}),e.display({id:"actions",cell:function(){return Object(g.jsx)(Y,{})}})].filter((function(e){return"web"===L.default.OS||"fileName"===e.id}))},ie=n(380),ce=i.default.create({cell:{flexBasis:"auto",paddingRight:"30px"},cellFirstChild:{flexBasis:"78%"},title:{display:"flex",alignItems:"center"}}),oe=function(e){var t=e.assets,n=e.onPress,r=o.a.useState((function(){return t||[]})),i=u()(r,2),a=i[0],s=i[1];Object(c.useEffect)((function(){s(t||[])}),[t]);var l=Object(W.useReactTable)({data:a,columns:re(),getCoreRowModel:Object(W.getCoreRowModel)(),getPaginationRowModel:Object(W.getPaginationRowModel)()});return Object(c.useEffect)((function(){l.setPageSize(20)}),[]),Object(g.jsxs)(ie.default,{children:[Object(g.jsx)(ie.default.Header,{children:l.getHeaderGroups().map((function(e){return Object(g.jsx)(c.Fragment,{children:e.headers.map((function(e,t){return Object(g.jsx)(ie.default.Title,{style:0===t?ce.cellFirstChild:ce.cell,children:Object(g.jsx)(E.default,{children:e.isPlaceholder?null:Object(W.flexRender)(e.column.columnDef.header,e.getContext())})},e.id)}))},e.id)}))}),l.getRowModel().rows.map((function(e){return Object(g.jsx)(ie.default.Row,{onPress:function(){n(e.original)},children:e.getVisibleCells().map((function(e,t){return Object(g.jsx)(ie.default.Cell,{style:0===t?ce.cellFirstChild:ce.cell,children:Object(g.jsx)(E.default,{style:ce.title,children:Object(W.flexRender)(e.column.columnDef.cell,e.getContext())})},e.id)}))},e.id)})),Object(g.jsx)(ie.default.Pagination,{page:l.getState().pagination.pageIndex+1,numberOfPages:l.getPageCount(),onPageChange:function(e){return l.setPageIndex(e-1)},label:l.getState().pagination.pageIndex+1+" of "+l.getPageCount()})]})},ae=n(228),se=n(374);function le(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ue(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?le(Object(n),!0).forEach((function(t){s()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):le(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var de=i.default.create({path:{margin:10},fabStyle:{bottom:16,right:16,position:"absolute",zIndex:1}}),fe=function(){var e,t=o.a.useState(!1),n=u()(t,1)[0],r=Object(c.useState)(""),i=u()(r,2),a=i[0],s=i[1],l=Object(c.useContext)(j),d=u()(l,1)[0],f=function(e){var t=e.s3credentials,n=t.apiKey,r=t.apiSecret,i=t.region,o=t.endpoint,a=Object(c.useMemo)((function(){return n&&r&&o?(console.log("[useS3Client] Building S3 Client region = ",i),console.log("[useS3Client] Building S3 Client apiKey = ",n),[D({region:i,credentials:{accessKeyId:n,secretAccessKey:r},endpoint:o}),!0]):[void 0,!1]}),[n,r,i,o]),s=u()(a,2);return[s[0],s[1]]}(d),b=u()(f,2),O=b[0],h=b[1],x=Object(c.useState)({Bucket:d.s3credentials.bucket,Prefix:"",Delimiter:"/"}),m=u()(x,2),y=m[0],v=m[1];Object(c.useEffect)((function(){v(ue(ue({},y),{},{Bucket:d.s3credentials.bucket})),console.log("Current app state= ",d)}),[d,O]);var P=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",i=Object(J.useQuery)(["getAssets",r,n.Bucket||"",n.Delimiter||"",n.Prefix||""],S()((function*(){try{console.log("[useGetAssets] Getting data with params = ",n);var t=yield k(e,n),r=Q(t,n);return console.log("[useGetAssets] Assets = ",r),r}catch(i){console.log("[useGetAssets] Error : ",i)}return[]})),{enabled:t,refetchOnWindowFocus:!1});return i}(O,h,y,a),w=P.data,C=P.isLoading,A=P.isError,I=function(e){v(ue(ue({},y),{},{Prefix:e}))};return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(p.Portal,{hostName:"Reloader",children:Object(g.jsx)(M.default,{onPress:function(){s(""+Math.random())},mode:"outlined",children:"Reload"})}),Object(g.jsx)(p.Portal,{hostName:"Back",children:(null==(e=y.Prefix)?void 0:e.length)>0&&Object(g.jsx)(M.default,{onPress:function(){!function(){var e=y.Prefix;if(""!==e){var t=e.substring(0,e.substring(0,e.length-1).lastIndexOf("/")+1);I(t)}}()},mode:"outlined",children:"Go back"})}),Object(g.jsx)(E.default,{variant:"bodyLarge",style:de.path,children:"Bucket Root /"+y.Prefix}),C&&Object(g.jsx)(ae.default,{animating:!0}),A&&Object(g.jsx)(E.default,{variant:"headlineSmall",children:"Error "}),Object(g.jsx)(se.default,{icon:"plus",label:"Label",extended:n,onPress:function(){return console.log("Pressed")},visible:!0,animateFrom:"right",iconMode:"static",style:[de.fabStyle]}),Object(g.jsx)(z.default,{children:null!=w&&!C&&Object(g.jsx)(oe,{assets:w,onPress:function(e){e.isFolder&&I(e.prefix)}})})]})};function je(){return Object(g.jsx)(fe,{})}var be=function(){var e=c.useState(0),t=u()(e,2),n=t[0],r=t[1],i=c.useState([{key:"assets",title:"Assets",focusedIcon:"folder"},{key:"api_configuration",title:"API Configuration",focusedIcon:"cogs"}]),o=u()(i,1)[0],a=x.default.SceneMap({assets:je,api_configuration:V});return Object(g.jsx)(x.default,{navigationState:{index:n,routes:o},onIndexChange:r,renderScene:a})},Oe=n(162),pe=function(){var e=S()((function*(e){try{yield Oe.default.setItem("byos/application",JSON.stringify(e))}catch(t){}}));return function(t){return e.apply(this,arguments)}}(),ge=function(){var e=S()((function*(){try{var e=yield Oe.default.getItem("byos/application");if(null!==e)return e}catch(t){}return""}));return function(){return e.apply(this,arguments)}}(),he=function(e){try{return JSON.parse(e)}catch(t){return{}}},xe=function(){var e=S()((function*(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"{}",t=yield ge();return he(t||e)}));return function(){return e.apply(this,arguments)}}(),me=function(){var e=S()((function*(e){return yield pe(e),null}));return function(t){return e.apply(this,arguments)}}(),ye=n(139);function ve(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Pe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ve(Object(n),!0).forEach((function(t){s()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ve(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Se=Pe(Pe({},ye.MD3LightTheme),{},{roundness:2,version:3,colors:Pe(Pe({},ye.MD3LightTheme.colors),{},{primary:"#eeeeee",secondary:"#112A46"})});function we(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var Ce=function(){var e=o.a.useContext(d),t=u()(e,1)[0],n=function(e){var t=Object(c.useState)(e),n=u()(t,2),r=n[0],i=n[1],o=Object(c.useState)(!1),a=u()(o,2),s=a[0],l=a[1];return Object(c.useMemo)((function(){xe(JSON.stringify(e)).then((function(e){i(e),l(!0)})).catch((function(){console.log("[useGetApplicationStateFromLs] Promise failure getApplicationStateLS")}))}),[e]),{data:r,isLoaded:s}}(f),r=n.data,i=n.isLoaded,a=Object(c.useState)(r),l=u()(a,2),O=l[0],x=l[1];return Object(c.useEffect)((function(){x(r)}),[r]),Object(c.useEffect)((function(){i&&(console.log("[App] Application state was updated = ",O),me(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?we(Object(n),!0).forEach((function(t){s()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):we(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},O)))}),[O,i]),Object(g.jsx)(b.default,{theme:Se,children:Object(g.jsx)(p.PortalProvider,{children:Object(g.jsxs)(j.Provider,{value:a,children:[t.isReady&&t.routes.map((function(e){return null})),Object(g.jsx)(h,{title:"BYOS"}),Object(g.jsx)(be,{})]})})})};var De={isReady:!1,routes:[{path:"/credentials",component:Object(g.jsx)((function(){return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)(H,{})})}),{}),showInNavigation:!0},{path:"/",component:Object(g.jsx)((function(){return Object(g.jsx)(g.Fragment,{})}),{}),showInNavigation:!0}]};function ke(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ae(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ke(Object(n),!0).forEach((function(t){s()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ke(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Ie=function(e){var t=e.children,n=o.a.useContext(d),r=u()(n,2),i=r[0],a=r[1];return Object(c.useEffect)((function(){!1===i.isReady&&a(Ae(Ae({},i),{},{isReady:!0}))}),[i.isReady,i.routes]),Object(g.jsx)(g.Fragment,{children:t})},Ee=n(375),Fe=n(233),Re=new Ee.QueryClient;function Be(e){var t=e.children;return Object(g.jsx)(Fe.QueryClientProvider,{client:Re,children:t})}var Me=function(e){var t=e.children,n=Object(c.useState)(De);return Object(g.jsx)(Be,{children:Object(g.jsx)(d.Provider,{value:n,children:Object(g.jsx)(Ie,{children:t})})})},ze=function(){return Object(g.jsx)(Me,{children:Object(g.jsx)(Ce,{})})};i.default.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"}});function Ne(){return Object(g.jsx)(ze,{})}Object(r.default)(Ne),Object(r.default)(Ne)}},[[264,1,2]]]);
//# sourceMappingURL=app.046113c7.chunk.js.map