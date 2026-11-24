import{readFileSync as R,mkdirSync as K,readdirSync as L,writeFileSync as W}from"node:fs";
import{join as J}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output",
Z="!2b%'+,099999999*******&***&***9***9999999999999AEEA!99999999999&)99999999999999%%\"%";
function V(p:Uint8Array,q:Uint8Array):[Uint8Array,number]{
 const D=new Int32Array(256),S=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
 let s=0,t=0,pc=0,n=0,g=0,l=0;
 const T=(c:number):[Uint8Array,number]=>[o.subarray(0,l),c];
 for(;;){
  if(n===1e6)return T(10);
  if(pc<0||pc>=p.length)return T(9);
  const op=p[pc];
  if(op>83||Z[op]==="9")return T(5);
  const z=Z.charCodeAt(op)-33,im=z>>4,pp=z>>2&3,ps=z&3;
  if(pc+im>=p.length)return T(9);
  n++;
  const nx=pc+1+im;
  if(s<pp)return T(2);
  if(s-pp+ps>256)return T(3);
  pc=nx;
  if(op===0)return T(0);
  if(op===1){D[s++]=(p[nx-1]<<24)>>24;continue}
  if(op===2){D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;continue}
  if(op===3){s--;continue}
  if(op===4){D[s]=D[s-1];s++;continue}
  if(op===5){const x=D[s-1];D[s-1]=D[s-2];D[s-2]=x;continue}
  if(op===6){D[s]=D[s-2];s++;continue}
  if(op===7){const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;continue}
  if(op===23){D[s-1]=-D[s-1]|0;continue}
  if(op===27){D[s-1]=~D[s-1];continue}
  if(op>=16&&op<=34){
   const b=D[s-1],a=D[s-2];let r=0;
   if(op===16)r=a+b|0;
   else if(op===17)r=a-b|0;
   else if(op===18)r=Math.imul(a,b);
   else if(op===19){if(!b)return T(4);r=a===-2147483648&&b===-1?a:(a/b)|0}
   else if(op===20){if(!b)return T(4);r=b===-1?0:a%b|0}
   else if(op===21){if(!b)return T(4);r=Math.floor((a>>>0)/(b>>>0))|0}
   else if(op===22){if(!b)return T(4);r=(a>>>0)%(b>>>0)|0}
   else if(op===24)r=a&b;
   else if(op===25)r=a|b;
   else if(op===26)r=a^b;
   else if(op===28)r=a<<(b&31);
   else if(op===29)r=a>>(b&31);
   else if(op===30)r=(a>>>(b&31))|0;
   else if(op===32)r=a===b?1:0;
   else if(op===33)r=a<b?1:0;
   else r=(a>>>0)<(b>>>0)?1:0;
   s-=2;D[s++]=r;continue;
  }
  if(op>=48&&op<=50){
   const rel=(p[nx-2]|p[nx-1]<<8)<<16>>16;
   let tk=!0;
   if(op!==48){const v=D[--s];tk=op===49?v===0:v!==0}
   if(tk)pc=nx+rel;
   continue;
  }
  if(op===51){
   if(t===64)return T(7);
   S[t++]=nx;pc=p[nx-2]|p[nx-1]<<8;continue;
  }
  if(op===52){
   if(!t)return T(8);
   pc=S[--t];continue;
  }
  if(op===64){
   const a=D[s-1];
   if(a<0||a>255)return T(6);
   D[s-1]=M[a];continue;
  }
  if(op===65){
   const a=D[s-1],v=D[s-2];
   if(a<0||a>255)return T(6);
   s-=2;M[a]=v;continue;
  }
  if(op===80){
   const y=String(D[s-1]);
   if(l+y.length>65536)return T(11);
   s--;
   for(let i=0;i<y.length;i++)o[l++]=y.charCodeAt(i);
   continue;
  }
  if(op===81){
   if(l+1>65536)return T(11);
   o[l++]=D[--s]&255;continue;
  }
  if(op===82){D[s++]=g<q.length?q[g++]:-1;continue}
  return T(D[--s]&255);
 }
}
for(const id of L(I).sort()){
 const[o,e]=V(new Uint8Array(R(J(I,id,"program.bin"))),new Uint8Array(R(J(I,id,"input.bin"))));
 K(J(O,id),{recursive:!0});
 W(J(O,id,"stdout.bin"),o);
 W(J(O,id,"exit.txt"),e+"\n");
}
