import os
import json
import csv
import io
import urllib.request

# mapping of sheet tab logical names to target JSON keys
KEY_MAP = {
    'MOVIES': 'movies',
    'POLITICAL_NEWS': 'politicalNews',
    'LOCAL_NEWS': 'localNews',
    'SPORTS': 'sportsNews',
    'SCIENCE_TECH': 'scienceTechNews',
    'BOX_OFFICE_LIVE': 'boxOfficeLive',
    'BOX_OFFICE_TOP5': 'boxOfficeTop5',
    'TELUGU_FILM_HISTORY': 'teluguFilmHistory'
}


def fetch_csv(sheet_id, gid):
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}"
    try:
        with urllib.request.urlopen(url) as r:
            data = r.read().decode('utf-8')
        return data
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None


def csv_to_list(csv_text):
    if not csv_text:
        return []
    f = io.StringIO(csv_text)
    reader = csv.DictReader(f)
    rows = []
    for row in reader:
        # clean empty keys
        clean = {k: v for k, v in row.items() if k is not None}
        # convert blank strings to None
        for kk, vv in clean.items():
            if isinstance(vv, str) and vv.strip() == '':
                clean[kk] = None
        rows.append(clean)
    return rows


def main():
    sheet_id = os.environ.get('SHEET_ID')
    tabs_json = os.environ.get('TABS_JSON')
    if not sheet_id or not tabs_json:
        print('SHEET_ID and TABS_JSON environment variables are required')
        return 1
    tabs = json.loads(tabs_json)
    output = {v: [] for v in KEY_MAP.values()}
    for tab_name, gid in tabs.items():
        key = KEY_MAP.get(tab_name)
        if not key:
            print(f'Skipping unknown tab {tab_name}')
            continue
        csv_text = fetch_csv(sheet_id, gid)
        rows = csv_to_list(csv_text)
        output[key] = rows
    # write to public/site-content.json
    out_path = 'public/site-content.json'
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print('Wrote', out_path)
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
