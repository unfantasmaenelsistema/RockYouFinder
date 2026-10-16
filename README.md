# RockYou Finder

**Posición de una contraseña en `rockyou.txt`, al instante y con el diccionario integrado.**

👉 **Abrir:** https://unfantasmaenelsistema.github.io/RockYouFinder/

Pensado para quien diseña retos CTF: antes de poner una clave, mira en qué línea de `rockyou.txt` está y cuánto tardará el alumno en sacarla con Hydra o John, según el tipo de ataque.

## Qué hace

- **Busca en rockyou.txt sin cargar nada.** El diccionario completo (14.344.391 líneas) viene dentro de la app.
- **Tiempo estimado** según el ataque previsto (SSH, FTP o formulario web con Hydra; bcrypt, `$6$`, ZIP, MD5 o NTLM con John), con la velocidad editable. Da un veredicto: rápida, aceptable, lenta o demasiado lenta.
- **Varias candidatas a la vez** (hasta 500), ordenadas de más rápida a más lenta.
- **Sugerencias:** contraseñas al azar entre las primeras N posiciones, con longitud mínima y la opción de exigir letras.
- **Otro diccionario:** puedes cargar tu propia wordlist en local.
- Te da el `grep -nxF` para comprobar el resultado en Kali.
- Español/inglés y tema claro/oscuro.

## Privacidad

Todo ocurre en el navegador. La contraseña no se envía a ningún sitio: la app calcula su hash (FNV-1a) y descarga solo el fragmento de ~25 KB donde podría estar, de un total de 4096. Ese fragmento contiene unas 3.500 contraseñas, así que de la petición no se deduce cuál buscabas.

## Cómo está integrado el diccionario

`rockyou.txt` pesa 140 MB y GitHub no admite archivos de más de 100 MB. Por eso `tools/build_shards.py` lo reparte en `data/s/000.bin … fff.bin` (113 MB en total):

- Cada contraseña va al fragmento `fnv1a32(bytes) & 4095`.
- Cada fragmento es `u32le(tamaño A) | A | B`, donde A = gzip de las palabras unidas por saltos de línea y B = gzip de los incrementos de línea en varint. La app lo descomprime con `DecompressionStream`.
- La posición es la línea física del archivo (la misma que da `grep -n`).
- Se compara byte a byte. Lo que escribes se prueba en UTF-8 y también en Latin-1, porque rockyou.txt mezcla las dos codificaciones.
- `data/top.bin` guarda las 100.000 primeras líneas para las sugerencias, y `data/meta.json` el SHA-256 del original.

Para regenerarlo:

```bash
python tools/build_shards.py /usr/share/wordlists/rockyou.txt
```

SHA-256 del `rockyou.txt` usado: `6dfa76aa0e02303994fd1062d0ac983f0b69ece5474d85a5bba36362e19c1076`.

## Sobre rockyou.txt

Son las contraseñas filtradas de RockYou en 2009, sin usuarios ni correos. Es la wordlist de referencia en formación y CTF y viene incluida en Kali Linux (`/usr/share/wordlists/rockyou.txt`) y en SecLists. Se incluye aquí con fines educativos. Úsala solo en laboratorios, CTF y auditorías con autorización.

---

**EN —** Instantly find where a password sits in `rockyou.txt` (built in, split into 4096 hashed gzip chunks) and how long Hydra/John would take to reach it. Runs fully in the browser.

Licencia del código: [MIT](LICENSE) · Hecho por [Un Fantasma en el Sistema](https://www.unfantasmaenelsistema.com) · [GhoStore](https://ghostore.unfantasmaenelsistema.com/)
