import{r as l,u as h,j as a,B as u,t as s}from"./index-DgSD1OFZ.js";import{F as p}from"./field-DyKXzH6d.js";import{c as n,B as g,V as f,T as x,I as m}from"./config-BQa2vKrU.js";const y=async r=>{try{const t=await fetch(`${n.backendPath}/api/users`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:r})});if(t.ok)return await t.json();if(t.status!==409)throw new Error(`Failed to create user ${r}`)}catch(t){throw console.error("Error creating user:",t),t}try{const t=await fetch(`${n.backendPath}/api/users/${r}/id`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`Failed to get user ID of ${r}`);return await t.json()}catch(t){throw console.error("Error getting user ID:",t),t}},E=({setUsername:r,setUserID:t})=>{const[e,i]=l.useState(""),c=h(),d=async()=>{try{const o=await y(e);r(e),t(o.user_id),s.create({description:`Logged in as ${e}`,type:"success"}),c("/")}catch{s.create({description:`Failed to log in as ${e}`,type:"error"})}};return a.jsx(g,{minH:"80vh",display:"flex",alignItems:"center",justifyContent:"center",children:a.jsxs(f,{spaceY:6,p:8,bg:"white",shadow:"md",borderRadius:"md",width:"100%",maxWidth:"400px",textAlign:"center",children:[a.jsx(x,{fontSize:"2xl",fontWeight:"bold",color:"teal.600",children:"Welcome to Your Hangout Hub!"}),a.jsx(p,{label:"What is your name?",color:"gray.800",children:a.jsx(m,{placeholder:"Username",value:e,onChange:o=>i(o.target.value),focusRingColor:"teal.500"})}),a.jsx(u,{onClick:d,variant:"solid",colorPalette:"teal",children:"Enter"})]})})};export{E as default};