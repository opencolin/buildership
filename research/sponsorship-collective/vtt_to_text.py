#!/usr/bin/env python3
"""Convert YouTube .vtt subtitle files to clean plain-text transcripts.
Handles auto-generated subs (rolling duplicate lines + inline timing tags)."""
import sys, os, re, glob

def clean_vtt(path):
    lines = open(path, encoding='utf-8', errors='ignore').read().splitlines()
    out = []
    for ln in lines:
        if ln.strip() == '' or ln.startswith(('WEBVTT', 'Kind:', 'Language:', 'NOTE')):
            continue
        if '-->' in ln:  # timestamp cue line
            continue
        if re.match(r'^\d+$', ln.strip()):  # cue index
            continue
        # strip inline timing/word tags <00:00:00.000> and <c> </c>
        ln = re.sub(r'<[^>]+>', '', ln)
        ln = ln.strip()
        if not ln:
            continue
        out.append(ln)
    # collapse consecutive duplicate lines (auto-sub rolling effect)
    deduped = []
    for ln in out:
        if not deduped or deduped[-1] != ln:
            deduped.append(ln)
    # join into paragraph-ish text, removing remaining adjacent partial-duplicate overlaps
    text = '\n'.join(deduped)
    return text

def main():
    indir = sys.argv[1] if len(sys.argv) > 1 else 'transcripts'
    vtts = glob.glob(os.path.join(indir, '*.vtt'))
    print(f"Found {len(vtts)} vtt files")
    done = 0
    for v in vtts:
        base = re.sub(r'\.en[^.]*\.vtt$', '', os.path.basename(v))
        base = re.sub(r'\.vtt$', '', base)
        txt = clean_vtt(v)
        if len(txt) < 30:
            continue
        out = os.path.join(indir, base + '.txt')
        # if multiple sub langs produced same base, keep the longest
        if os.path.exists(out) and len(open(out, encoding='utf-8').read()) >= len(txt):
            continue
        with open(out, 'w', encoding='utf-8') as f:
            # header: try to recover title from filename (ID__Title)
            title = base.split('__', 1)[1] if '__' in base else base
            f.write(f"# {title}\n\n{txt}\n")
        done += 1
    print(f"Wrote {done} text transcripts")

if __name__ == '__main__':
    main()
