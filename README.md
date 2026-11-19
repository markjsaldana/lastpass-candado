# Candado

Candado is the sales enablement assistant I'd build as a product marketing manager at LastPass, and this site shows how I'd build and ship it in my first 90 days. SDRs, AEs, and SEs use it at every stage of the deal, including the security review. It answers from weekly competitive intel on 1Password, Bitwarden, and Keeper, from battlecards and win-loss interviews, and from LastPass's own published security pages, and it cites a source for every line.

An independent work sample by Mark Saldaña. Not affiliated with or endorsed by LastPass, 1Password, Bitwarden, or Keeper.

**Sample data.** LastPass, 1Password, Bitwarden, and Keeper are real, and every fact about them links to a public source. Those facts, with URLs and the date checked, are in [`research/notes.md`](research/notes.md). Every customer, prospect, person, internal event, and customer quote is invented.

## Run locally

```bash
npm install
npm run dev
```

## Data

Everything the UI shows comes from JSON in `/data`, so swapping sample data for real data never touches the UI.

| File | What it holds |
| --- | --- |
| `competitors.json` | Competitors, tiers, buyers, "why they win" hypotheses, sourced facts |
| `sources.json` | What gets monitored, how often, and what we look for |
| `signal_types.json` | The nine kinds of change Candado classifies |
| `rules.json` | Deal-impact scoring, urgency, confidence, routing table |
| `signals.json` | Scored signals across three weeks; public ones carry a citation |
| `digest.json` | This week's top 3, trends, and win-loss questions |
| `battlecards.json` | One battlecard per competitor, each with the cited incident answer |
| `so_what.json` | This week's "so what" for leadership, SDRs, and the team |
| `matrix.json` | Capability matrix (a source URL on every claim) and positioning map |
| `routing_log.json` | Where intel went, the KPI scorecard, and sample pipeline numbers |
| `customers.json` | Sample reference customers |
| `case_studies.json` | Sample case studies, public or internal only |
| `win_loss.json` | The win-loss code list and sample coded interviews |
| `transcript_demo.json` | What the deal assistant demo pulls from the sample call transcript |

Run `npm run check:data` after editing data. It validates enum fields and cross-file references, and fails if a public signal, competitor fact, or matrix claim has no source URL, or if a battlecard is missing the cited incident answer.

## Deploy

Vercel, framework preset Next.js. The site is `noindex` and blocked in `robots.txt`, so it's shared by link only.

## The pipeline (`scripts/radar.py`)

The site shows Candado's output. `scripts/radar.py` shows how it gets made:

1. **Fetch** each public source in `data/sources.json` (`--live`).
2. **Snapshot** it to a dated file.
3. **Diff** against the previous snapshot. Date stamps and edits of 2 words or fewer are dropped as cosmetic.
4. **Classify** each meaningful diff with a language model, using a JSON schema built from `signal_types.json` and `rules.json`. Urgency is computed in code from the rules.
5. **Write drafts** to `samples/output/signals.generated.json` with status "In review". A person checks every draft, and a second check covers anything about encryption, compliance, or incidents, before it reaches `data/signals.json`.

```bash
python3 scripts/radar.py --dry-run          # diff the sample snapshots, no API call
pip install -r scripts/requirements.txt
python3 scripts/radar.py                    # diff + classify the sample snapshots (needs an API key)
```
