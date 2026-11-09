# Writes royal/ and garden/ guest versions (S = all, A = family, N = friends) from the marked master pages.
# Markers: <!--g:SA-->...<!--/g--> keeps the block only for the listed versions.
import re, os
for slug in ('royal', 'garden'):
    src = open(f'{slug}/index.html').read()
    for g in 'SAN':
        keep = lambda m: m.group(2) if g in m.group(1) else ''
        out = re.sub(r'<!--g:([SAN]+)-->(.*?)<!--/g-->', keep, src, flags=re.S)
        out = re.sub(r'<!--G:([SAN]+)-->(.*?)<!--/G-->', keep, out, flags=re.S)
        out = out.replace('../assets/', '../../assets/')
        os.makedirs(f'{slug}/{g}', exist_ok=True)
        open(f'{slug}/{g}/index.html', 'w').write(out)
