import{r,m as P,j as l,f as F,c as D,Z as W,$ as f,a0 as c,a1 as z,g as G,o as J,l as K,a2 as Q}from"./index-DgSD1OFZ.js";import{u as T,a as U,F as V,b as X}from"./config-BQa2vKrU.js";const M=r.forwardRef((n,o)=>{const e=T(),t=P(e.getErrorTextProps(),n);return e!=null&&e.invalid?l.jsx(F.span,{...t,ref:o}):null});M.displayName="FieldErrorText";const N=r.forwardRef((n,o)=>{const e=T(),t=P(e==null?void 0:e.getHelperTextProps(),n);return l.jsx(F.span,{...t,ref:o})});N.displayName="FieldHelperText";const A=r.forwardRef((n,o)=>{const e=T(),t=P(e==null?void 0:e.getLabelProps(),n);return l.jsx(F.label,{...t,ref:o})});A.displayName="FieldLabel";const Y=typeof window<"u"?r.useLayoutEffect:r.useEffect,[pe,_]=D({name:"FieldsetContext",hookName:"useFieldsetContext",providerName:"<FieldsetProvider />",strict:!1}),ee=n=>{const o=_(),{ids:e,disabled:t=!!(o!=null&&o.disabled),invalid:s=!1,readOnly:a=!1,required:d=!1}=n,u=r.useRef(!1),p=r.useRef(!1),i=n.id??r.useId(),g=r.useRef(null),v=(e==null?void 0:e.control)??`field::${i}`,x=(e==null?void 0:e.errorText)??`field::${i}::error-text`,h=(e==null?void 0:e.helperText)??`field::${i}::helper-text`,y=(e==null?void 0:e.label)??`field::${i}::label`;Y(()=>{const m=g.current;if(!m)return;const C=W(m),I=C.document,j=()=>{u.current=!!I.getElementById(x),p.current=!!I.getElementById(h)};j();const E=new C.MutationObserver(j);return E.observe(m,{childList:!0,subtree:!0}),()=>E.disconnect()},[x,h]);const R=r.useMemo(()=>{const m=[];return u.current&&s&&m.push(x),p.current&&m.push(h),m.join(" ")||void 0},[s,x,h]),$=r.useMemo(()=>()=>({...f.root.attrs,id:v,ref:g,role:"group","data-disabled":c(t),"data-invalid":c(s),"data-readonly":c(a)}),[t,s,a,v]),L=r.useMemo(()=>()=>({...f.label.attrs,id:y,"data-disabled":c(t),"data-invalid":c(s),"data-readonly":c(a),htmlFor:i}),[t,s,a,i,y]),b=r.useMemo(()=>()=>({"aria-describedby":R,"aria-invalid":z(s),"data-invalid":c(s),"data-required":c(d),"data-readonly":c(a),id:i,required:d,disabled:t,readOnly:a}),[R,s,d,a,i,t]),k=r.useMemo(()=>()=>({...b(),...f.input.attrs}),[b]),H=r.useMemo(()=>()=>({...b(),...f.textarea.attrs}),[b]),S=r.useMemo(()=>()=>({...b(),...f.select.attrs}),[b]),B=r.useMemo(()=>()=>({id:h,...f.helperText.attrs}),[h]),Z=r.useMemo(()=>()=>({id:x,...f.errorText.attrs,"aria-live":"polite"}),[x]),O=r.useMemo(()=>()=>({"aria-hidden":!0,...f.requiredIndicator.attrs}),[]);return{ariaDescribedby:R,ids:{root:v,control:i,label:y,errorText:x,helperText:h},refs:{rootRef:g},disabled:t,invalid:s,readOnly:a,required:d,getLabelProps:L,getRootProps:$,getInputProps:k,getTextareaProps:H,getSelectProps:S,getHelperTextProps:B,getErrorTextProps:Z,getRequiredIndicatorProps:O}},q=r.forwardRef((n,o)=>{const[e,t]=U()(n,["id","ids","disabled","invalid","readOnly","required"]),s=ee(e),a=P(s.getRootProps(),t);return l.jsx(V,{value:s,children:l.jsx(F.div,{...a,ref:G(o,s.refs.rootRef)})})});q.displayName="FieldRoot";function re(n){const{viewBox:o="0 0 24 24",d:e,displayName:t,defaultProps:s={}}=n,a=r.Children.toArray(n.path),d=r.forwardRef((u,p)=>l.jsx(X,{ref:p,asChild:!1,viewBox:o,...s,...u,children:a.length?a:l.jsx("path",{fill:"currentColor",d:e})}));return d.displayName=t,d}const{withProvider:te,withContext:w,useStyles:se,useClassNames:oe,PropsProvider:fe}=J({key:"field"}),ae=te(q,"root",{forwardAsChild:!0}),ne=w(A,"label",{forwardAsChild:!0}),de=w(N,"helperText",{forwardAsChild:!0}),le=w(M,"errorText",{forwardAsChild:!0});re({d:"M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"});const ie=r.forwardRef(function(o,e){const{fallback:t,children:s="*",...a}=o,d=T(),u=oe(),p=se();return d!=null&&d.required?l.jsx(K.span,{ref:e,"aria-hidden":"true",...a,className:Q(u.requiredIndicator,o.className),css:[p.requiredIndicator,o.css],children:s}):t}),xe=r.forwardRef(function(o,e){const{label:t,children:s,helperText:a,errorText:d,optionalText:u,...p}=o;return l.jsxs(ae,{ref:e,...p,children:[t&&l.jsxs(ne,{children:[t,l.jsx(ie,{fallback:u})]}),s,a&&l.jsx(de,{children:a}),d&&l.jsx(le,{children:d})]})});export{xe as F};
