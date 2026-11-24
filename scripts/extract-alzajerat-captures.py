"""Extract the selected, unaltered storefront views from the supplied recordings.

Usage: python scripts/extract-alzajerat-captures.py --ffmpeg PATH --before PATH --after PATH
Requires Pillow with WebP support. Original recordings are read only and are not published.
"""
import argparse
import io
import json
import subprocess
from pathlib import Path

from PIL import Image


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ffmpeg', required=True, type=Path)
    parser.add_argument('--before', required=True, type=Path)
    parser.add_argument('--after', required=True, type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    destination = root / 'src/assets/images/projects/alzajerat-shopify'
    destination.mkdir(parents=True, exist_ok=True)
    selections = [
        ('before-departments', 'before', 4.5, (0, 3, 1908, 883)),
        ('before-footer', 'before', 39.5, (0, 3, 1908, 883)),
        ('after-homepage', 'after', 25.6, (0, 3, 1908, 883)),
        ('after-departments', 'after', 29.0, (0, 3, 1908, 883)),
        ('after-footer', 'after', 39.5, (0, 3, 1908, 883)),
        ('after-responsive', 'after', 1.8, (48, 140, 1836, 744)),
        ('after-mobile-navigation', 'after', 0.5, (82, 164, 318, 680)),
    ]
    manifest = {'method': 'Frames extracted from project recordings; no AI reconstruction.', 'captures': []}
    for name, stage, seconds, (x, y, width, height) in selections:
        source = getattr(args, stage)
        frame = subprocess.run([
            str(args.ffmpeg), '-hide_banner', '-loglevel', 'error',
            '-ss', str(seconds), '-i', str(source), '-frames:v', '1',
            '-vf', f'crop={width}:{height}:{x}:{y}',
            '-f', 'image2pipe', '-vcodec', 'png', 'pipe:1',
        ], check=True, capture_output=True).stdout
        output = destination / f'{name}.webp'
        with Image.open(io.BytesIO(frame)) as image:
            image.save(output, 'WEBP', quality=90, method=6)
            size = list(image.size)
        manifest['captures'].append({
            'file': output.relative_to(root).as_posix(),
            'recording': source.name, 'stage': stage,
            'seconds': seconds, 'crop': [x, y, width, height], 'size': size,
        })
        print(f'{name}: {size[0]}x{size[1]}, {output.stat().st_size // 1024} KB')
    (root / 'scripts/alzajerat-capture-manifest.json').write_text(
        json.dumps(manifest, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
