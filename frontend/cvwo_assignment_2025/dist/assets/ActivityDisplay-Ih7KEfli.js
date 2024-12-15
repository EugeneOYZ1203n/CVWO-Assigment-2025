import{c as Z,r as a,m as l,j as r,f as u,g as U,h as ee,e as re,v as te,w as oe,n as ne,x as se,l as ae,y as ie,o as ce,I as b,z as de,P as le,B as v,t as g}from"./index-BZOG1_v5.js";import{u as $,a as pe,b as he,s as S,d as R,P as F,F as ue,f as A,H as N,c as me,S as ge,e as xe}from"./MainPage-DgMNokJ_.js";import{c as f,T as h,B as fe,I as Pe,V as we}from"./config-B1wdXQGA.js";import{G as ve,D as je,a as Ce,b as ye,c as Ae,d as be,e as $e,f as E}from"./dialog-CEEG0Rnl.js";import{F as Te}from"./field-WoY7LDlq.js";import{B as De}from"./badge-BmNUChh_.js";const[I,m]=Z({name:"PopoverContext",hookName:"usePopoverContext",providerName:"<PopoverProvider />"}),_=a.forwardRef((e,t)=>{const o=m(),n=l(o.getAnchorProps(),e);return r.jsx(u.div,{...n,ref:t})});_.displayName="PopoverAnchor";const B=a.forwardRef((e,t)=>{const o=m(),n=l(o.getArrowProps(),e);return r.jsx(u.div,{...n,ref:t})});B.displayName="PopoverArrow";const L=a.forwardRef((e,t)=>{const o=m(),n=l(o.getArrowTipProps(),e);return r.jsx(u.div,{...n,ref:t})});L.displayName="PopoverArrowTip";const O=a.forwardRef((e,t)=>{const o=m(),n=l(o.getCloseTriggerProps(),e);return r.jsx(u.button,{...n,ref:t})});O.displayName="PopoverCloseTrigger";const z=a.forwardRef((e,t)=>{const o=m(),n=$(),s=l(o.getContentProps(),n.getPresenceProps(),e);return n.unmounted?null:r.jsx(u.div,{...s,ref:U(n.ref,t)})});z.displayName="PopoverContent";const J=a.forwardRef((e,t)=>{const o=m(),n=l(o.getDescriptionProps(),e);return r.jsx(u.div,{...n,ref:t})});J.displayName="PopoverDescription";const G=a.forwardRef((e,t)=>{const o=m(),n=l(o.getIndicatorProps(),e);return r.jsx(u.div,{...n,ref:t})});G.displayName="PopoverIndicator";const H=a.forwardRef((e,t)=>{const o=m(),n=$(),s=l(o.getPositionerProps(),e);return n.unmounted?null:r.jsx(u.div,{...s,ref:t})});H.displayName="PopoverPositioner";const Ee=(e={})=>{const{getRootNode:t}=ee(),{dir:o}=pe(),n={id:a.useId(),dir:o,getRootNode:t,open:e.defaultOpen,"open.controlled":e.open!==void 0,...e},s={...n,open:e.open,onOpenChange:he(e.onOpenChange,{sync:!0})},[i,p]=re(te(n),{context:s});return oe(i,p,ne)},ke=e=>{const[t,{children:o,...n}]=S(e),s=Ee(n),i=R(l({present:s.open},t));return r.jsx(I,{value:s,children:r.jsx(F,{value:i,children:o})})},Se=e=>{const[t,{value:o,children:n}]=S(e),s=R(l({present:o.open},t));return r.jsx(I,{value:o,children:r.jsx(F,{value:s,children:n})})},K=a.forwardRef((e,t)=>{const o=m(),n=l(o.getTitleProps(),e);return r.jsx(u.div,{...n,ref:t})});K.displayName="PopoverTitle";const V=a.forwardRef((e,t)=>{const o=m(),n=$(),s=l({...o.getTriggerProps(),"aria-controls":n.unmounted?void 0:o.getTriggerProps()["aria-controls"]},e);return r.jsx(u.button,{...s,ref:t})});V.displayName="PopoverTrigger";function k(e){return ie(e,t=>t==="auto"?"auto":`span ${t}/span ${t}`)}const P=a.forwardRef(function(t,o){const{area:n,colSpan:s,colStart:i,colEnd:p,rowEnd:x,rowSpan:c,rowStart:j,...C}=t,w=se({gridArea:n,gridColumn:k(s),gridRow:k(c),gridColumnStart:i,gridColumnEnd:p,gridRowStart:j,gridRowEnd:x});return r.jsx(ae.div,{ref:o,css:w,...C})}),{withRootProvider:M,withContext:d,useStyles:dr,PropsProvider:lr}=ce({key:"popover"});M(Se);const Re=M(ke),Fe=d(V,"trigger",{forwardAsChild:!0}),Ne=d(H,"positioner",{forwardAsChild:!0}),Ie=d(z,"content",{forwardAsChild:!0}),_e=d(B,"arrow",{forwardAsChild:!0}),Be=d(L,"arrowTip",{forwardAsChild:!0}),Le=d(O,"closeTrigger",{forwardAsChild:!0});d(G,"indicator",{forwardAsChild:!0});d(K,"title",{forwardAsChild:!0});d(J,"description",{forwardAsChild:!0});d("footer","footer");d("header","header");const Oe=d("div","body");d(_,void 0,{forwardAsChild:!0});const ze=async e=>{try{const t=await fetch(`${f.backendPath}/api/activities/${e}/participants`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`Failed to fetch participants for activity ID ${e}`);return await t.json()}catch(t){throw console.error("Error fetching participants:",t),t}},Je=async e=>{try{const t=await fetch(`${f.backendPath}/api/activities/${e}/comments`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`Failed to fetch comments for activity ID ${e}`);return await t.json()}catch(t){throw console.error("Error fetching comments:",t),t}},Ge=a.forwardRef(function(t,o){return r.jsx(b,{variant:"ghost","aria-label":"Close",ref:o,...t,children:t.children??r.jsx(de,{})})}),He=a.forwardRef(function(t,o){const{portalled:n=!0,portalRef:s,...i}=t;return r.jsx(le,{disabled:!n,container:s,children:r.jsx(Ne,{children:r.jsx(Ie,{ref:o,...i})})})}),Ke=a.forwardRef(function(t,o){return r.jsx(_e,{...t,ref:o,children:r.jsx(Be,{})})});a.forwardRef(function(t,o){return r.jsx(Le,{position:"absolute",top:"1",insetEnd:"1",...t,asChild:!0,ref:o,children:r.jsx(Ge,{size:"sm"})})});const Ve=Re,Me=Oe,We=Fe,Xe=async e=>{try{const t=await fetch(`${f.backendPath}/api/activities/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`Failed to delete activity of ID ${e}`);return await t.json()}catch(t){throw console.error("Error deleting activity:",t),t}},Ye=({activity:e,onClose:t})=>{const[o,n]=a.useState(!1),s=async()=>{try{await Xe(e.activity_id),t(),g.create({description:`Deleted ${e.activity_id}:${e.title}`,type:"success"})}catch(i){g.create({description:`Failed to delete ${e.title}: ${i}`,type:"error"})}};return r.jsxs(Ve,{open:o,onOpenChange:i=>n(i.open),children:[r.jsx(We,{children:r.jsx(b,{variant:"outline",colorPalette:"teal",children:r.jsx(ue,{})})}),r.jsxs(He,{width:"160px",children:[r.jsx(Ke,{}),r.jsxs(Me,{children:[r.jsx(h,{textAlign:"center",fontSize:"md",children:"Are you sure?"}),r.jsx(v,{width:"full",marginTop:2,onClick:s,children:"Delete"})]})]})]})},qe=({activity:e,participants:t,loading:o})=>r.jsxs(r.Fragment,{children:[r.jsx(h,{textAlign:"left",fontSize:"md",color:"gray.500",mb:8,children:e.description}),r.jsxs(ve,{templateColumns:"repeat(2, 1fr)",width:"80%",overflow:"hidden",children:[r.jsx(P,{alignContent:"start",children:r.jsxs(h,{textAlign:"start",lineClamp:1,children:[r.jsx("strong",{children:"Duration:"})," ",A(e.start_date)," - ",A(e.end_date)]})}),r.jsx(P,{children:r.jsxs(h,{textAlign:"start",lineClamp:1,children:[r.jsx("strong",{children:"Location:"})," ",e.location]})}),r.jsx(P,{children:r.jsxs(h,{textAlign:"start",lineClamp:1,children:[r.jsx("strong",{children:"Status:"})," ",e.status]})}),r.jsx(P,{children:r.jsxs(h,{textAlign:"start",lineClamp:1,children:[r.jsx("strong",{children:"Vacancy:"})," ",e.participant_count,"/",e.max_participants]})}),r.jsx(P,{colSpan:2,children:r.jsxs(h,{textAlign:"start",lineClamp:1,children:[r.jsx("strong",{children:"Participants:"})," ",o?"Loading...":t.length===0?"None":t.map(n=>n.user_name).join(", ")]})})]})]}),Qe=({comment:e})=>r.jsxs(fe,{children:[r.jsxs(h,{textAlign:"start",color:"teal.300",children:[A(e.created_at),": ",r.jsx("strong",{children:e.user_name})]}),r.jsx(h,{textAlign:"start",color:"gray.300",children:e.comment_body})]}),Ze=async(e,t,o)=>{try{const n=await fetch(`${f.backendPath}/api/activities/${o}/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:e,comment_body:t})});if(!n.ok)throw new Error(`Failed to add comment for activity ID ${o}`);return await n.json()}catch(n){throw console.error("Error adding comment:",n),n}},Ue=({activity:e,comments:t,user_id:o,onUpdateData:n})=>{const[s,i]=a.useState(""),p=async()=>{try{if(s=="")throw new Error("Comment cannot be empty!");if(s.length>300)throw new Error("Comment cannot be more than 300 characters!");await Ze(o,s,e.activity_id),i(""),n(),g.create({description:"Added Comment",type:"success"})}catch(c){g.create({description:`Failed to add Comment: ${c}`,type:"error"})}},x=c=>{c.key==="Enter"&&!c.shiftKey&&(c.preventDefault(),p())};return r.jsxs(r.Fragment,{children:[r.jsxs(N,{marginTop:8,children:[r.jsx(Te,{width:"5/6",errorText:"Comment cannot be more than 300 characters!",invalid:s.length>300,children:r.jsx(Pe,{value:s,onChange:c=>i(c.target.value),placeholder:"Write your comment here...",size:"md",onKeyDown:x})}),r.jsx(v,{width:"1/6",colorScheme:"teal",onClick:p,disabled:!s,children:"Submit"})]}),r.jsx(we,{spaceY:2,p:2,width:"full",align:"stretch",children:t.map(c=>r.jsx(Qe,{comment:c},c.comment_id))})]})},er=async(e,t)=>{try{const o=await fetch(`${f.backendPath}/api/activities/${t}/participants`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:e})});if(!o.ok)throw new Error(`Failed to add participant for activity ID ${t}`);return await o.json()}catch(o){throw console.error("Error adding participant:",o),o}},rr=async(e,t)=>{try{const o=await fetch(`${f.backendPath}/api/activities/${t}/participants`,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:e})});if(!o.ok)throw new Error(`Failed to delete participant for activity ID ${t}`);return await o.json()}catch(o){throw console.error("Error deleting participant:",o),o}},tr=({activity:e,isParticipant:t,user_id:o,onClose:n,onUpdateData:s})=>{const i=async()=>{t?x():p(),n()},p=async()=>{try{if(e.participant_count===e.max_participants)throw new Error("Activity already full!");await er(o,e.activity_id),s(),g.create({description:`Joined ${e.activity_id}:${e.title}`,type:"success"})}catch(c){g.create({description:`Failed to join ${e.title}: ${c}`,type:"error"})}},x=async()=>{try{await rr(o,e.activity_id),s(),g.create({description:`Left ${e.activity_id}:${e.title}`,type:"success"})}catch(c){g.create({description:`Failed to leave ${e.title}: ${c}`,type:"error"})}};return r.jsx(v,{variant:"subtle",colorPalette:"teal",onClick:i,width:"20%",children:t?"Leave":"Join"})},pr=({activity:e,onClose:t,onUpdateData:o,onEdit:n,user_id:s})=>{const[i,p]=a.useState([]),[x,c]=a.useState([]),[j,C]=a.useState(!0),[w,W]=a.useState(!0),X=i.map(T=>T.user_id).includes(s);a.useEffect(()=>{(async()=>{try{const y=await ze(e.activity_id);p(y);const D=await Je(e.activity_id);D.sort((q,Q)=>new Date(Q.created_at).getTime()-new Date(q.created_at).getTime()),c(D)}catch(y){console.error("Error fetching data:",y)}finally{C(!1)}})()},[w]);const Y=()=>{W(!w)};return r.jsxs(je,{open:!0,size:"xl",children:[r.jsx(Ce,{}),r.jsxs(ye,{colorScheme:"teal",overflow:"auto",maxH:"80vh",css:{"::-webkit-scrollbar":{width:"8px",height:"8px"},"::-webkit-scrollbar-thumb":{backgroundColor:"teal.500",borderRadius:"4px",border:"2px solid transparent",backgroundClip:"content-box"},"::-webkit-scrollbar-thumb:hover":{backgroundColor:"teal.700"},"::-webkit-scrollbar-track":{backgroundColor:"gray.200",borderRadius:"4px"}},children:[r.jsx(Ae,{children:r.jsxs(N,{align:"center",children:[r.jsx(h,{fontSize:"2xl",fontWeight:"bold",color:"teal.600",children:e.title}),r.jsx(De,{colorPalette:me.get(e.category),children:e.category}),r.jsx(ge,{}),r.jsx(b,{variant:"outline",onClick:()=>n(e),colorPalette:"teal",children:r.jsx(xe,{})}),r.jsx(Ye,{activity:e,onClose:()=>{o(),t()}})]})}),r.jsxs(be,{children:[r.jsx(qe,{activity:e,participants:i,loading:j}),r.jsx(Ue,{activity:e,comments:x,user_id:s,onUpdateData:Y})]}),r.jsxs($e,{children:[r.jsx(E,{asChild:!0,children:r.jsx(tr,{activity:e,isParticipant:X,user_id:s,onClose:t,onUpdateData:o})}),r.jsx(E,{asChild:!0,children:r.jsx(v,{variant:"outline",onClick:t,children:"Exit"})})]})]})]})};export{pr as default};
