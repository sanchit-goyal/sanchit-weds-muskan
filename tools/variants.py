# Writes royal/ and garden/ pages from the marked master pages in tools/masters/.
# <slug>/index.html and <slug>/S = all events, /A = family, /N = friends.
# Markers: <!--g:SA-->...<!--/g--> (inner) and <!--G:SA-->...<!--/G--> (outer) keep a block only for the listed versions.
import re, os
for slug in ('royal', 'garden'):
    src = open(f'tools/masters/{slug}.html').read()
    for g in 'SAN':
        keep = lambda m: m.group(2) if g in m.group(1) else ''
        out = re.sub(r'<!--g:([SAN]+)-->(.*?)<!--/g-->', keep, src, flags=re.S)
        out = re.sub(r'<!--G:([SAN]+)-->(.*?)<!--/G-->', keep, out, flags=re.S)
        if g == 'S':
            open(f'{slug}/index.html', 'w').write(out)
        os.makedirs(f'{slug}/{g}', exist_ok=True)
        open(f'{slug}/{g}/index.html', 'w').write(out.replace('../assets/', '../../assets/'))
