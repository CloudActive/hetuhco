#!/usr/bin/env python3
"""
Generate the email sprite: one PNG with every contact email address, one per row.

Pages show one address at a time by shifting the CSS background position (like an icon sprite),
so the addresses never appear as text or mailto links in the HTML.

Outputs:
  public/contact.png          the sprite, rendered at 2x for sharp text on high-DPI screens
  content/email-sprite.json   display size and the row offset and width of each address, keyed by name

Run after changing EMAILS in content/company.ts:
  python scripts/make_email_sprite.py
Requires Pillow (pip install pillow).
"""
import hashlib
import json
import math
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SCALE = 2                      # render at 2x, display at 1x
FONT_PX = 15                   # display font size in CSS px
ROW_PX = 22                    # display row height in CSS px
COLOR = (51, 65, 85, 255)      # slate-700, readable on white and light grey
FONTS = [
    r"C:\Windows\Fonts\segoeui.ttf",
    r"C:\Windows\Fonts\arial.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]


def read_emails() -> dict:
    src = (ROOT / "content" / "company.ts").read_text(encoding="utf-8")
    block = re.search(r"export const EMAILS = \{(.*?)\}", src, re.S)
    if not block:
        sys.exit("EMAILS block not found in content/company.ts")
    emails = dict(re.findall(r'(\w+):\s*"([^"]+)"', block.group(1)))
    if not emails:
        sys.exit("No addresses found in EMAILS")
    return emails


def main() -> None:
    emails = read_emails()
    font_path = next((f for f in FONTS if Path(f).exists()), None)
    if not font_path:
        sys.exit("No usable font found; add one to FONTS")
    font = ImageFont.truetype(font_path, FONT_PX * SCALE)
    ascent, descent = font.getmetrics()

    row = ROW_PX * SCALE
    widths = {k: math.ceil(font.getlength(v)) for k, v in emails.items()}
    width = SCALE * math.ceil((max(widths.values()) + SCALE) / SCALE)
    height = row * len(emails)

    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    items = {}
    for i, (key, address) in enumerate(emails.items()):
        top = i * row
        draw.text((0, top + (row - (ascent + descent)) // 2), address, font=font, fill=COLOR)
        items[key] = {"y": top // SCALE, "w": math.ceil(widths[key] / SCALE) + 1}

    out = ROOT / "public" / "contact.png"
    img.save(out, optimize=True)
    version = hashlib.sha256(out.read_bytes()).hexdigest()[:10]
    meta = {
        "src": f"/contact.png?v={version}",
        "width": width // SCALE,
        "height": height // SCALE,
        "rowHeight": ROW_PX,
        "items": items,
    }
    (ROOT / "content" / "email-sprite.json").write_text(json.dumps(meta, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote public/contact.png ({width}x{height}) with {len(items)} addresses: {', '.join(items)}")


if __name__ == "__main__":
    main()
