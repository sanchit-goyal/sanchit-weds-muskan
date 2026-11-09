# One-off: bring royal/ and garden/ in line with the final violet wording, and add guest markers.
import re
KICK='<div class="kicker" style="font-size:16px;font-style:italic;font-weight:400;line-height:1.45;letter-spacing:0">We cordially invite you to the sacred occasion<br>of the wedding celebrations of our beloved son</div>'
def sec_bounds(s, needle):
    i=s.index(needle); a=s.rfind('<section',0,i); b=s.index('</section>',i)+len('</section>'); return a,b
def common(s):
    s=s.replace('dates=20261218T200000/','dates=20261218T180000/')
    s=s.replace('var target = Date.UTC(2026,11,18,14,30,0);','var target = Date.UTC(2026,11,18,12,30,0);')
    a,b=sec_bounds(s,'<div class="inv">'); s=s[:a]+s[b:]            # blessings card is merged into the hero
    s=s.replace('</style>','.tg{font-size:11px;letter-spacing:.22em;text-transform:uppercase;opacity:.8;margin-top:3px}\n.hero .fit,.stage .fit{white-space:nowrap}\n</style>',1)
    return s
# ---------------- royal
s=open('royal/index.html').read()
s=s.replace('<div class="kicker">We\'re getting married</div>',KICK,1)
s=s.replace('<div class="par">Son of Smt. Seema Goyal &amp; Shri Sanjay Goyal</div>','<div class="par fit">S/o Smt. Seema Goyal &amp; Shri Sanjay Goyal</div><div class="par fit">G/S/o Late Smt. Sarla Devi &amp; Late Shri Roop Kishore Goyal</div>',1)
s=s.replace('<div class="par">Daughter of Smt. Anjali Jain &amp;<br>Late Shri Atul Jain</div>','<div class="par fit">D/o Smt. Anjali Jain &amp; Late Shri Atul Jain</div>',1)
s=s.replace('<div class="c">8:00 PM onwards</div>','<div class="c">6:00 PM onwards</div>',1)
row=lambda t,top,w,bot,p: f'<div class="row"><div class="t">{t}</div><div class="d">'+(f'<div class="tg">{top}</div>' if top else '')+f'<div class="w">{w}</div>'+(f'<div class="tg">{bot}</div>' if bot else '')+f'<div class="s">{p}</div></div></div>'
a1,b1=sec_bounds(s,'<h2 class="h">Program Timeline</h2>'); wed=s[a1:b1]
a2,b2=sec_bounds(s,'<h2 class="h">Pre-Wedding Events</h2>'); pre=s[a2:b2]
i=wed.index('<div class="date-h">'); j=wed.index('<svg class="swirl"')
wed=wed[:i]+'<div class="date-h">Friday · 18 December</div>\n    <div class="rows">\n      <!--g:S-->'+row('4:00 PM','With Blessings &amp; Grace','Tilak','','Hotel Atithi, Agra')+'<!--/g-->\n      '+row('6:00 PM','Dhol, Dance &amp; Dhamaal','Baraat Prasthan','','Near The Ramana Grand')+'\n      '+row('8:00 PM onwards','','The Beginning of Forever','Shubh Vivah &amp; Preeti Bhoj','The Ramana Grand, Agra')+'\n    </div>\n    '+wed[j:]
wed=wed.replace('<h2 class="h">Program Timeline</h2>','<h2 class="h">Wedding</h2>')
i=pre.index('<div class="date-h">'); j=pre.index('<svg class="swirl"')
pre=pre[:i]+'<div class="date-h">Wednesday, 16 December</div>\n    <div class="rows">'+row('7:00 PM','','The Yes Moment','Ring Ceremony followed by dinner','Hotel Atithi, Agra')+'</div>\n    <!--g:S--><div class="date-h">Thursday, 17 December</div>\n    <div class="rows">'+row('4:00 PM','Pyaar ka Rang','Mehendi','','Hotel Atithi, Agra')+'</div>\n    <div class="date-h">Friday, 18 December</div>\n    <div class="rows">'+row('8:00 AM','The Saffron Soirée','The Golden Hour','A Touch of Sunshine','Hotel Atithi, Agra')+'</div><!--/g-->\n    '+pre[j:]
s=s[:a1]+'<!--g:SA-->'+pre+'<!--/g-->\n\n  '+wed+s[b1:a2]+s[b2:]
s=s.replace('<p>Agra · Baraat Nikasi &amp; Preeti Bhoj</p>','<p>Agra · Baraat Prasthan &amp; The Beginning of Forever</p>',1)
i=s.index('<div class="venue">\n      <h3>Hotel Atithi</h3>'); j=s.index('</div>\n    </div>',i)+len('</div>\n    </div>')
blk=s[i:j].replace('<p>Agra · Pre-wedding functions &amp; Tilak</p>','<p>Agra · <!--g:S-->Ring Ceremony, Mehendi, Haldi &amp; Tilak<!--/g--><!--g:A-->The Yes Moment<!--/g--></p>')
s=s[:i]+'<!--g:SA-->'+blk+'<!--/g-->'+s[j:]
open('royal/index.html','w').write(common(s))
# ---------------- garden
s=open('garden/index.html').read()
s=s.replace('<div class="kicker">We\'re getting married</div>',KICK,1)
s=s.replace('<div class="parent">Son of Smt. Seema Goyal &amp; Shri Sanjay Goyal</div>','<div class="parent fit">S/o Smt. Seema Goyal &amp; Shri Sanjay Goyal</div><div class="parent fit">G/S/o Late Smt. Sarla Devi &amp; Late Shri Roop Kishore Goyal</div>',1)
s=s.replace('<div class="parent">Daughter of Smt. Anjali Jain &amp; Late Shri Atul Jain</div>','<div class="parent fit">D/o Smt. Anjali Jain &amp; Late Shri Atul Jain</div>',1)
s=s.replace('<div class="t">Friday · 8:00 PM onwards</div>','<div class="t">Friday · 6:00 PM onwards</div>',1)
li=lambda t,top,w,bot,p: '<li><div class="when">'+t+'</div>'+(f'<div class="tg">{top}</div>' if top else '')+f'<div class="fancy">{w}</div>'+(f'<div class="tg">{bot}</div>' if bot else '')+f'<div class="where">{p}</div></li>'
a,b=sec_bounds(s,'<h2 class="h-script">Program Timeline</h2>'); sec=s[a:b]
head=sec[:sec.index('<div class="day-tag">')]
pre=head.replace('Program Timeline','Pre-Wedding Events')+'<div class="day-tag">Wednesday · 16 December</div>\n    <ul class="timeline">\n      '+li('7:00 P.M.','','The Yes Moment','Ring Ceremony followed by dinner','Hotel Atithi, Agra')+'\n    </ul>\n    <!--g:S--><div class="day-tag">Thursday · 17 December</div>\n    <ul class="timeline">\n      '+li('4:00 P.M.','Pyaar ka Rang','Mehendi','','Hotel Atithi, Agra')+'\n    </ul>\n    <div class="day-tag">Friday · 18 December</div>\n    <ul class="timeline">\n      '+li('8:00 A.M.','The Saffron Soirée','The Golden Hour','A Touch of Sunshine','Hotel Atithi, Agra')+'\n    </ul><!--/g-->\n  </section>'
wed=head.replace('Program Timeline','Wedding')+'<div class="day-tag">Friday · 18 December</div>\n    <ul class="timeline">\n      <!--g:S-->'+li('4:00 P.M.','With Blessings &amp; Grace','Tilak','','Hotel Atithi, Agra')+'<!--/g-->\n      '+li('6:00 P.M.','Dhol, Dance &amp; Dhamaal','Baraat Prasthan','','Near The Ramana Grand')+'\n      '+li('8:00 P.M. onwards','','The Beginning of Forever','Shubh Vivah &amp; Preeti Bhoj','The Ramana Grand, Agra')+'\n    </ul>\n  </section>'
s=s[:a]+'<!--g:SA-->'+pre+'<!--/g-->\n\n  '+wed+s[b:]
i=s.index('<div class="venue">\n      <h3>Hotel Atithi</h3>'); j=s.index('<div class="venue">\n      <h3>The Ramana Grand</h3>')
blk=s[i:j].replace('<p>Agra · The Yes Moment, Mehendi, Haldi &amp; Tilak</p>','<p>Agra · <!--g:S-->Ring Ceremony, Mehendi, Haldi &amp; Tilak<!--/g--><!--g:A-->The Yes Moment<!--/g--></p>')
s=s[:i]+'<!--g:SA-->'+blk+'<!--/g-->'+s[j:]
s=s.replace('<p>Agra · Baraat Nikasi &amp; Preeti Bhoj</p>','<p>Agra · Baraat Prasthan &amp; The Beginning of Forever</p>',1)
open('garden/index.html','w').write(common(s))
