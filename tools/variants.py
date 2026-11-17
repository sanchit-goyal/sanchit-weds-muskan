# Writes archive/royal/ and archive/garden/ pages (password-gated) from the marked master pages in tools/masters/.
# <slug>/index.html and <slug>/S = all events, /A = family, /N = friends.
# Markers: <!--g:SA-->...<!--/g--> (inner) and <!--G:SA-->...<!--/G--> (outer) keep a block only for the listed versions.
import re, os
GATE = open('tools/gate.snippet.html').read().strip()
gate = lambda h: h.replace('<head>', '<head>\n' + GATE, 1)
for slug in ('royal', 'garden'):
    src = open(f'tools/masters/{slug}.html').read()
    for g in 'SAN':
        keep = lambda m: m.group(2) if g in m.group(1) else ''
        out = re.sub(r'<!--g:([SAN]+)-->(.*?)<!--/g-->', keep, src, flags=re.S)
        out = re.sub(r'<!--G:([SAN]+)-->(.*?)<!--/G-->', keep, out, flags=re.S)
        if g == 'S':
            os.makedirs(f'archive/{slug}', exist_ok=True)
            open(f'archive/{slug}/index.html', 'w').write(gate(out.replace('../assets/', '../../assets/')))
        os.makedirs(f'archive/{slug}/{g}', exist_ok=True)
        open(f'archive/{slug}/{g}/index.html', 'w').write(gate(out.replace('../assets/', '../../../assets/')))
