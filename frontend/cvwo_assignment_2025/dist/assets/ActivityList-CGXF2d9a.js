import{j as e}from"./index-BZOG1_v5.js";import{H as i,c as x,f as a}from"./MainPage-DgMNokJ_.js";import{B as d,V as n,T as s}from"./config-B1wdXQGA.js";import{B as c}from"./badge-BmNUChh_.js";const p=({activity:r,isParticipant:o,onClick:l})=>{const t=r.participant_count===r.max_participants;return e.jsx(d,{borderColor:"teal.500",borderWidth:o?"1px":"0px",borderRadius:"md",p:4,mx:32,cursor:"pointer",_hover:{bg:"gray.900"},onClick:l,children:e.jsxs(i,{justify:"space-between",borderLeft:"4px",borderColor:"teal.500",children:[e.jsxs(n,{align:"start",maxW:"80%",textOverflow:"ellipsis",overflow:"hidden",children:[e.jsxs(i,{children:[e.jsx(s,{textAlign:"left",fontSize:"xl",fontWeight:"bold",lineClamp:"2",children:r.title}),e.jsx(c,{colorPalette:x.get(r.category),children:r.category})]}),e.jsx(s,{textAlign:"left",fontSize:"sm",color:"gray.500",lineClamp:"3",children:r.description}),e.jsxs(s,{textAlign:"left",fontSize:"sm",children:[r.location,", ",a(r.start_date)," - ",a(r.end_date)]})]}),e.jsxs(n,{align:"end",children:[e.jsx(s,{fontSize:"sm",children:r.status}),e.jsxs(s,{fontSize:"sm",fontWeight:t?"bold":"inherit",color:t?"teal.500":"white",children:[r.participant_count,"/",r.max_participants]}),o&&e.jsx(s,{fontSize:"sm",children:"Joined"})]})]})})},g=({activities:r,participated:o,onCardClick:l})=>e.jsx(d,{width:"full",children:e.jsx(n,{align:"stretch",width:"full",spaceY:4,children:r.map(t=>e.jsx(p,{activity:t,isParticipant:o.includes(t.activity_id),onClick:()=>l(t)},t.activity_id))})});export{g as default};