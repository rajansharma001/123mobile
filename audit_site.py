import os
import re

PAGES = ['index.html', 'phones.html', 'accessories.html', 'services.html', 'about.html', 'contact.html']

print("=" * 60)
print("123 MOBILE HOUSE WEBSITE COMPREHENSIVE AUDIT")
print("=" * 60)

all_passed = True

for page in PAGES:
    print(f"\nAuditing [{page}]...")
    with open(page, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Official Logo checks
    logo_count = html.count('assets/images/logo-official-full.png')
    badge_count = html.count('header-logo-badge')
    if logo_count < 4 or badge_count < 4:
        print(f"  [FAIL] Logo/Badge occurrences low: logo={logo_count}, badge={badge_count}")
        all_passed = False
    else:
        print(f"  [PASS] Official Logo references: {logo_count} imgs, {badge_count} badges")

    # 2. Back to Top button check
    has_btt_btn = 'id="backToTopBtn"' in html
    has_btt_js = 'backToTopBtn' in html and 'addEventListener' in html and 'smooth' in html
    if not (has_btt_btn and has_btt_js):
        print(f"  [FAIL] Back to Top button or JS missing!")
        all_passed = False
    else:
        print(f"  [PASS] Back to Top button and smooth scrolling JS verified")

    # 3. Preloader (0.5s)
    has_preloader = 'id="sitePreloader"' in html and '500' in html
    if not has_preloader:
        print(f"  [FAIL] Preloader missing or not set to 500ms!")
        all_passed = False
    else:
        print(f"  [PASS] Preloader (0.5s splash) verified")

    # 4. WhatsApp Floating Icon & Custom Modal
    has_wa_trigger = 'id="waFloatingTrigger"' in html
    has_wa_popup = 'id="waChatPopup"' in html
    has_wa_textarea = 'id="waCustomTextarea"' in html
    if not (has_wa_trigger and has_wa_popup and has_wa_textarea):
        print(f"  [FAIL] WhatsApp floating widget or custom modal incomplete!")
        all_passed = False
    else:
        print(f"  [PASS] WhatsApp floating button & custom input popup verified")

    # 5. Business details
    has_phone = '9844338306' in html
    has_address = 'Bishal Chowk' in html and 'Bharatpur' in html
    has_credit = 'Rajan Sharma' in html
    if not (has_phone and has_address and has_credit):
        print(f"  [FAIL] Business details or developer credit missing!")
        all_passed = False
    else:
        print(f"  [PASS] Business info (Bishal Chowk, +977 9844338306, Rajan Sharma) verified")

    # 6. Check all src="..." references exist
    srcs = re.findall(r'src=["\']([^"\']+)["\']', html)
    for src in srcs:
        if src.startswith('http') or src.startswith('data:'):
            continue
        # Strip query strings or hashes
        clean_src = src.split('?')[0].split('#')[0]
        if not os.path.exists(clean_src):
            print(f"  [FAIL] Missing asset file: {clean_src}")
            all_passed = False

    # 7. Check local href="...html" links
    hrefs = re.findall(r'href=["\']([^"\']+\.html)["\']', html)
    for href in hrefs:
        clean_href = href.split('?')[0].split('#')[0]
        if not os.path.exists(clean_href):
            print(f"  [FAIL] Broken page link: {clean_href}")
            all_passed = False

print("\n" + "=" * 60)
if all_passed:
    print("ALL AUDIT CHECKS PASSED PERFECTLY!")
else:
    print("SOME AUDIT CHECKS FAILED - REVIEW ABOVE.")
print("=" * 60)
