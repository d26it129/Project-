// Dark mode toggle
(function(){
  var root=document.documentElement, btn=document.getElementById('theme');
  var dark=window.matchMedia('(prefers-color-scheme: dark)').matches;
  function apply(){root.setAttribute('data-theme',dark?'dark':'light');btn.textContent=dark?'Light mode':'Dark mode';btn.setAttribute('aria-pressed',String(dark));}
  apply();
  btn.addEventListener('click',function(){dark=!dark;apply();});
})();

// Footer year
document.getElementById('year').textContent=new Date().getFullYear();

// Project filter
(function(){
  var buttons=document.querySelectorAll('.filters button'), cards=document.querySelectorAll('.project');
  buttons.forEach(function(b){
    b.addEventListener('click',function(){
      var f=b.dataset.filter;
      buttons.forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});
      cards.forEach(function(c){c.hidden=!(f==='all'||c.dataset.type.split(' ').indexOf(f)>-1);});
    });
  });
})();

// Contact form validation
(function(){
  var form=document.getElementById('form'), status=document.getElementById('status');
  var rules=[
    ['name','e-name',function(v){return v.trim()?'':'Please enter your name.';}],
    ['email','e-email',function(v){return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)?'':'Please enter a valid email, like name@example.com.';}],
    ['msg','e-msg',function(v){return v.trim().length>=10?'':'Please write at least 10 characters.';}]
  ];
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=true, first=null;
    rules.forEach(function(r){
      var el=document.getElementById(r[0]), msg=r[2](el.value);
      document.getElementById(r[1]).textContent=msg;
      el.setAttribute('aria-invalid',msg?'true':'false');
      if(msg){ok=false;if(!first)first=el;}
    });
    if(!ok){status.textContent='';first.focus();return;}
    var n=document.getElementById('name').value.trim();
    status.textContent='Thanks, '+n+'. Your message is ready for Keval Solanki. (Demo form: nothing is sent yet.)';
    form.reset();
  });
})();

// Highlight current section in the nav
(function(){
  var links=document.querySelectorAll('nav a');
  if(!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){links.forEach(function(a){a.setAttribute('aria-current',String(a.getAttribute('href')==='#'+en.target.id));});}
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  document.querySelectorAll('main section[id]').forEach(function(s){io.observe(s);});
})();
