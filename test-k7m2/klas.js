// Klas in de cijfers (Jules, 22/11/2026): met ?klas=<naam> krijgt de installatiepagina een laatste stap
// "Open Taalkaart". Die knop opent taalkaart://klas/<naam>: zo weet de app in welke klas de cursist zit.
(function(){
  var naam=new URLSearchParams(location.search).get('klas');
  if(!naam) return;
  naam=naam.replace(/[^\p{L}\p{N} -]/gu,'').trim().slice(0,30);
  if(!naam) return;
  var android=/Android/i.test(navigator.userAgent);
  var link=android?'intent://klas/'+encodeURIComponent(naam)+'#Intent;scheme=taalkaart;package=be.taalkaart.app;end':'taalkaart://klas/'+encodeURIComponent(naam);
  var T={
    nl:{lead:'In 4 stappen. Het is gratis.',kop:'Open Taalkaart',tekst:'Kom terug naar deze pagina en tik op de knop. Zo weet de app in welke klas je zit.',knop:'Open Taalkaart',klas:'Klas van '},
    fr:{lead:'En 4 étapes. C’est gratuit.',kop:'Ouvrez Taalkaart',tekst:'Revenez sur cette page et touchez le bouton. Ainsi, l’application sait dans quelle classe vous êtes.',knop:'Ouvrir Taalkaart',klas:'Classe de '},
    en:{lead:'In 4 steps. It’s free.',kop:'Open Taalkaart',tekst:'Come back to this page and tap the button. Then the app knows your class.',knop:'Open Taalkaart',klas:'Class of '}
  };
  document.querySelectorAll('section[data-taal]').forEach(function(s){
    var t=T[s.dataset.taal]; if(!t) return;
    var lead=s.querySelector('.lead'); if(lead) lead.textContent=t.lead;
    var h1=s.querySelector('h1');
    if(h1){var k=document.createElement('p');k.className='label';k.style.marginTop='10px';k.textContent=t.klas+naam;h1.parentNode.insertBefore(k,h1);}
    var ol=s.querySelector('ol'); if(!ol) return;
    var li=document.createElement('li');li.className='kaart';li.style.cssText='list-style:none;padding:20px;margin:0 0 14px;border:2px solid var(--oranje,#E07A45)';
    li.innerHTML='<div style="display:flex;gap:14px;align-items:flex-start"><span style="flex:none;width:36px;height:36px;border-radius:50%;background:var(--inkt);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800">4</span><div><h2 style="font-size:22px;margin:4px 0 6px"></h2><p style="margin:0;color:var(--zacht)"></p><p style="margin:14px 0 0"><a class="knop"></a></p></div></div>';
    li.querySelector('h2').textContent=t.kop; li.querySelector('p').textContent=t.tekst;
    var a=li.querySelector('a'); a.textContent=t.knop; a.href=link;
    ol.appendChild(li);
  });
})();
