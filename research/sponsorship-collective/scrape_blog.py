#!/usr/bin/env python3
"""Scrape Sponsorship Collective blog posts + key pages into clean markdown."""
import sys, os, re, time, urllib.request, html as htmlmod
from concurrent.futures import ThreadPoolExecutor, as_completed
import html2text

OUTDIR = sys.argv[2] if len(sys.argv) > 2 else "blog"
URLFILE = sys.argv[1]

h = html2text.HTML2Text()
h.ignore_links = False
h.ignore_images = True
h.body_width = 0  # don't wrap

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

def balanced_div(html, start_idx):
    """From an opening <div ...> at start_idx, return inner HTML up to its matching </div>."""
    # move to end of the opening tag
    open_end = html.find('>', start_idx)
    if open_end == -1:
        return None
    i = open_end + 1
    depth = 1
    body_start = i
    tag_re = re.compile(r'<(/?)div\b', re.I)
    for m in tag_re.finditer(html, i):
        if m.group(1) == '/':
            depth -= 1
            if depth == 0:
                return html[body_start:m.start()]
        else:
            depth += 1
    return html[body_start:]  # fallback: rest of doc

def extract_content(html):
    # Prefer Divi single-post content container
    m = re.search(r'<div[^>]*class="[^"]*et_pb_post_content[^"]*"', html, re.I)
    if m:
        inner = balanced_div(html, m.start())
        if inner and len(inner) > 200:
            return inner
    # Fallback: <article>...</article> (largest)
    arts = re.findall(r'<article\b.*?</article>', html, re.I | re.S)
    if arts:
        return max(arts, key=len)
    # Last resort: <body>
    mb = re.search(r'<body.*?>(.*)</body>', html, re.I | re.S)
    return mb.group(1) if mb else html

def get_title(html):
    m = re.search(r'<title>(.*?)</title>', html, re.I | re.S)
    return htmlmod.unescape(m.group(1).strip()) if m else "Untitled"

def clean_html(frag):
    # strip scripts/styles/noscript and Divi UI cruft
    frag = re.sub(r'<(script|style|noscript)\b.*?</\1>', '', frag, flags=re.I | re.S)
    return frag

def slug_from_url(url):
    s = url.rstrip('/').split('/')[-1]
    return re.sub(r'[^a-zA-Z0-9_-]', '_', s) or "index"

def fetch(url):
    slug = slug_from_url(url)
    out = os.path.join(OUTDIR, slug + ".md")
    if os.path.exists(out) and os.path.getsize(out) > 300:
        return (url, "skip(exists)")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=45) as r:
            raw = r.read().decode('utf-8', errors='ignore')
        title = get_title(raw)
        content = clean_html(extract_content(raw))
        md = h.handle(content).strip()
        # collapse 3+ blank lines
        md = re.sub(r'\n{3,}', '\n\n', md)
        if len(md) < 100:
            return (url, f"WARN short ({len(md)} chars)")
        with open(out, 'w', encoding='utf-8') as f:
            f.write(f"# {title}\n\nURL: {url}\n\n---\n\n{md}\n")
        return (url, f"ok ({len(md)} chars)")
    except Exception as e:
        return (url, f"ERROR {type(e).__name__}: {e}")

def main():
    urls = [u.strip() for u in open(URLFILE) if u.strip()]
    os.makedirs(OUTDIR, exist_ok=True)
    ok = warn = err = skip = 0
    with ThreadPoolExecutor(max_workers=10) as ex:
        futs = {ex.submit(fetch, u): u for u in urls}
        for i, f in enumerate(as_completed(futs), 1):
            url, status = f.result()
            if status.startswith("ok"): ok += 1
            elif status.startswith("skip"): skip += 1
            elif status.startswith("WARN"): warn += 1
            else: err += 1
            if status.startswith(("ERROR","WARN")) or i % 50 == 0:
                print(f"[{i}/{len(urls)}] {status}  {url}", flush=True)
    print(f"\nDONE: ok={ok} skip={skip} warn={warn} err={err} total={len(urls)}", flush=True)

if __name__ == "__main__":
    main()
