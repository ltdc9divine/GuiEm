const scenes=[...document.querySelectorAll('.scene')];
const fill=document.querySelector('.progress-fill');
const ptxt=document.querySelector('.progress-text');
let current=0;
function goTo(i){
  current=Math.max(0,Math.min(scenes.length-1,i));
  if(escaped&&time.isConnected&&time.style.opacity!=='0'){
    time.style.opacity='0';
    setTimeout(()=>time.remove(),400);
  }
  scenes.forEach((s,n)=>{
    s.classList.toggle('active',n===current);
    s.querySelectorAll('.scene-card,.hero-card,.letter,.letter-wrap').forEach(el=>el.scrollTop=0);
  });
  fill.style.width=((current+1)/scenes.length*100)+'%';
  ptxt.textContent=`${current+1} / ${scenes.length}`;
}
document.querySelectorAll('.next').forEach(b=>b.addEventListener('click',()=>goTo(current+1)));

const petals=document.getElementById('petals');
function makePetal(){
  const p=document.createElement('span'); p.className='petal'; p.textContent=Math.random()>.45?'♡':'✿';
  p.style.left=Math.random()*100+'vw'; p.style.setProperty('--x',(Math.random()*180-90)+'px');
  p.style.animationDuration=(7+Math.random()*7)+'s'; p.style.fontSize=(10+Math.random()*12)+'px';
  petals.appendChild(p); setTimeout(()=>p.remove(),15000);
}
setInterval(makePetal,650); for(let i=0;i<8;i++) setTimeout(makePetal,i*250);

const yes=document.getElementById('yesBtn'), time=document.getElementById('timeBtn');
const title=document.getElementById('endingTitle'), text=document.getElementById('endingText'), lines=document.getElementById('finalLines');
yes.addEventListener('click',()=>{
  title.textContent='Vậy… mình thử lại nhé.';
  text.textContent='Không phải trở lại với những gì đã từng khiến chúng ta mệt mỏi. Mà là bắt đầu một phiên bản khác của chúng ta.';
  lines.innerHTML='<span>Chậm hơn.</span><span>Trưởng thành hơn.</span><span>Và thật lòng hơn.</span>';
  goTo(6); burst();
});
// Nút "Anh cần thêm thời gian" — nút chạy trốn: bấm là nhảy đi chỗ khác & nhỏ lại, đủ 5 lần thì biến mất
const respect=document.querySelector('.question .respect');
const tease=[
  'Ơ kìa, tay em lung tung rồi đó ♡',
  'Nút này nó biết chạy đó, em bấm không tới đâu đâu 😆',
  'Em chịu khó ghê… thử cái phía trên đi nà 🥺',
  'Bấm thêm lần nữa là nó biến mất thật đó…',
  'Thôi, anh chỉ chừa lại một lựa chọn thôi ♡'
];
let dodges=0, lastDodge=0, escaped=false;
function dodge(){
  const now=Date.now();
  if(now-lastDodge<250) return;
  lastDodge=now;
  dodges++;
  if(respect) respect.textContent=tease[Math.min(dodges,tease.length)-1];
  if(dodges>=5){
    time.style.opacity='0';
    time.style.transform='scale(.2)';
    time.style.pointerEvents='none';
    setTimeout(()=>time.remove(),450);
    return;
  }
  const r=time.getBoundingClientRect();
  const s=Math.max(.45,1-.13*dodges);
  if(!escaped){
    escaped=true;
    document.body.appendChild(time); // tách khỏi thẻ trắng (backdrop-filter làm mốc toạ độ fixed) để nhảy tự do cả màn hình
    time.style.position='fixed';
    time.style.margin='0';
    time.style.zIndex=60;
    time.style.transition='left .45s cubic-bezier(.34,1.56,.64,1), top .45s cubic-bezier(.34,1.56,.64,1), transform .3s ease, opacity .4s ease';
    time.style.left=r.left+'px';
    time.style.top=r.top+'px';
    void time.offsetWidth;
  }
  const yr=yes.getBoundingClientRect(), w=r.width, h=r.height;
  const pad=14, vw=innerWidth, vh=innerHeight;
  const topMin=100, bottomMax=Math.max(topMin+10,vh-140);
  let x=pad, y=topMin;
  for(let i=0;i<60;i++){
    x=pad+Math.random()*Math.max(1,vw-w-pad*2);
    y=topMin+Math.random()*Math.max(1,bottomMax-topMin-h);
    const clear=x+w<yr.left-24||x>yr.right+24||y+h<yr.top-24||y>yr.bottom+24;
    if(clear) break;
  }
  time.style.left=x+'px';
  time.style.top=y+'px';
  time.style.transform='scale('+s+') rotate('+(Math.random()*8-4).toFixed(1)+'deg)';
}
time.addEventListener('click',e=>{e.preventDefault();dodge();});
addEventListener('resize',()=>{
  if(escaped&&time.isConnected&&time.style.opacity!=='0'){
    const r=time.getBoundingClientRect(),pad=14;
    time.style.left=Math.min(Math.max(pad,r.left),Math.max(pad,innerWidth-r.width-pad))+'px';
    time.style.top=Math.min(Math.max(100,r.top),Math.max(100,innerHeight-r.height-90))+'px';
  }
});
document.getElementById('restart').addEventListener('click',()=>goTo(0));

function burst(){
  for(let i=0;i<20;i++) setTimeout(makePetal,i*45);
}
const audio=document.getElementById('audio'), mb=document.getElementById('musicBtn');
mb.addEventListener('click',async()=>{
  if(audio.paused){try{await audio.play();mb.textContent='❚❚'}catch(e){mb.textContent='♫';alert('Hãy đặt file nhạc tại assets/music.mp3 rồi bấm lại nhé ♡')}}else{audio.pause();mb.textContent='♫'}
});
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft') goTo(current-1);
  else if(e.key==='ArrowRight'||e.key==='Enter'){
    if(e.key==='Enter'&&document.activeElement&&document.activeElement.tagName==='BUTTON') return;
    goTo(current+1);
  }
});
goTo(0);