"""Parte rockyou.txt en fragmentos comprimidos para RockYou Finder.

Cada contraseña va al fragmento fnv1a32(bytes) & (SHARDS-1). Cada fragmento
guarda sus entradas en orden de línea, en dos columnas comprimidas por separado
(comprimen mejor que mezcladas):
    u32le(tamaño de A) | A = gzip(palabras unidas por salto de línea)
                       | B = gzip(varint(delta de línea)...)
La posición es la línea física de rockyou.txt (1 = primera), la misma que da
`grep -nx`. La línea vacía se salta pero sigue contando.

Uso:  python tools/build_shards.py ruta/a/rockyou.txt
"""
import gzip, hashlib, io, json, os, sys

SHARDS = 4096
TOP = 100_000
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data')


def fnv1a32(b):
    h = 0x811C9DC5
    for c in b:
        h = ((h ^ c) * 0x01000193) & 0xFFFFFFFF
    return h


def varint(n):
    out = bytearray()
    while n >= 0x80:
        out.append((n & 0x7F) | 0x80)
        n >>= 7
    out.append(n)
    return out


def gz(data):
    buf = io.BytesIO()
    with gzip.GzipFile(fileobj=buf, mode='wb', compresslevel=9, mtime=0) as f:
        f.write(data)
    return buf.getvalue()


def main(src):
    raw = open(src, 'rb').read()
    lines = raw.split(b'\n')
    if lines and lines[-1] == b'':
        lines.pop()
    words = [[] for _ in range(SHARDS)]
    deltas = [bytearray() for _ in range(SHARDS)]
    last = [0] * SHARDS
    entries = 0
    for i, w in enumerate(lines, 1):
        w = w.rstrip(b'\r')
        if not w:
            continue
        s = fnv1a32(w) & (SHARDS - 1)
        words[s].append(w)
        deltas[s] += varint(i - last[s])
        last[s] = i
        entries += 1

    os.makedirs(os.path.join(OUT, 's'), exist_ok=True)
    total = 0
    for s in range(SHARDS):
        a = gz(b'\n'.join(words[s]))
        data = len(a).to_bytes(4, 'little') + a + gz(bytes(deltas[s]))
        total += len(data)
        with open(os.path.join(OUT, 's', '%03x.bin' % s), 'wb') as f:
            f.write(data)

    top = b'\n'.join(w.rstrip(b'\r') for w in lines[:TOP]) + b'\n'
    with open(os.path.join(OUT, 'top.bin'), 'wb') as f:
        f.write(gz(top))

    meta = {
        'source': 'rockyou.txt',
        'sha256': hashlib.sha256(raw).hexdigest(),
        'bytes': len(raw),
        'lines': len(lines),
        'entries': entries,
        'shards': SHARDS,
        'hash': 'fnv1a32',
        'top': TOP,
    }
    with open(os.path.join(OUT, 'meta.json'), 'w', encoding='utf-8') as f:
        json.dump(meta, f, indent=2)
    print(json.dumps(meta, indent=2))
    print('fragmentos: %.1f MB' % (total / 1e6))


if __name__ == '__main__':
    main(sys.argv[1])
