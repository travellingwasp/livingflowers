# Final report — 2026-08-21

Objective

- Summarize the 30-day WindowPlant Lab traffic experiment outcome using the latest authoritative snapshots and record recommended owner next steps for post-experiment validation.

Facts and measurements (true data cutoff)

- Latest authoritative metric snapshot: data/metrics-snapshot.json.generatedAt = 2026-08-21T05:49:44.367Z (Google Search Console authoritative through actualDataEndDate = 2026-08-18).
- Google Search Console (authoritative through 2026-08-18): impressions = 233, clicks = 0, indexedPages = 5; the site shows recurring impressions concentrated on /north-facing-window-plants/.
- Cloudflare Web Analytics (snapshot range end 2026-08-21T05:49:51.297Z): verifiedHumanVisits = 0; verifiedHumanPageviews = 0.
- Live site checks (2026-08-21T05:49:53.277Z): published pages return HTTP 200 and include title, description, structured data, and canonical.

Interpretation

- The static site was successfully deployed and is crawlable and indexable; technical/indexing blockers were not the primary constraint.
- Google emitted measurable impressions for multiple pages but recorded zero organic clicks in the authoritative snapshot window — the site achieved visibility without recorded organic clicks.
- No independently verifiable human visits were recorded by Cloudflare in the snapshot range; therefore the experiment did not observe human traffic that meets the project's independent verification requirements.

Hypotheses and recommended owner actions

- H1: A respectful, community-first distribution post by the human owner linking to high-utility pages (recommended: /light-meter/ and /north-facing-window-plants/) will likely generate verifiable Cloudflare visits and at least one GSC click within 48–72 hours.
- H2: Repository-only edits without owner distribution are unlikely to generate independently verifiable human visits rapidly after reasonable snippet and on-page improvements have already been applied.
- Recommended owner steps (to validate post-experiment):
  1. Publish one prepared, community-first distribution draft from a legitimate account where the owner has standing (follow community rules). Good targets: niche houseplant communities where the utility helps renters (for example, a subreddit or a community forum focused on apartment plants). Do not spam — follow community norms.
  2. Save the post URL and (optionally) a screenshot.
  3. Either (A) upload a manual metrics snapshot covering the post date to data/manual-metrics-import.json (include the post URL/referrer and timestamps) so the agent can immediately validate the post's impact, or (B) allow automated ingestion to capture resulting visits and let the agent evaluate outcomes 48–72 hours after the post. If both are done, validation will be faster and more robust.

What worked

- Prepared original, useful on-site utilities that meet the editorial policy (Plant Light Estimator, Plant Distance Calculator, Low-light checklist).
- Ensured pages expose metadata and structured data and focused limited effort on the empirically highest-impression page (/north-facing-window-plants/).

What did not work

- Repository-only snippet/title/meta edits and focused on-page improvements produced impressions but did not produce any recorded organic clicks or verified human visits in authoritative snapshots during the experiment window.
- No owner-executed distribution or manual metrics uploads occurred during the experiment window; therefore the single highest-leverage hypothesis for producing verifiable human traffic remained untested.

Assumptions status

- DISPROVEN: "Metadata edits alone will reliably produce independently verifiable organic clicks in a short experiment window." Evidence: GSC impressions = 233 and clicks = 0 (authoritative snapshot).
- CONFIRMED: "Site discovery/indexing works." Evidence: multiple pages 'Submitted and indexed' and live site checks return 200 with metadata.
- WEAKENED: "Automated ingestion alone is sufficient to validate distribution without owner cooperation." Evidence: no manual metric uploads or owner-post evidence; Cloudflare verifiedHumanVisits remains 0.

Improvements needed

- Owner action is required for post-experiment validation: publish a respectful distribution post and/or upload a manual metrics snapshot tied to the post.
- Optionally, prepare one short follow-up snippet or comment to answer early questions in the community thread to increase usefulness and reduce bounce.

Tomorrow's recommended action

- No autonomous edits (experiment ended). Owner: publish one prepared, community-first distribution draft and either upload a manual metrics snapshot or allow automated ingestion so the agent can evaluate outcomes 48–72 hours after the post.

Daily scorecard (final)

- DAY 30/30
- Google Search Console (authoritative through 2026-08-18): impressions = 233; clicks = 0; indexedPages = 5.
- Cloudflare Web Analytics: verifiedHumanVisits = 0; verifiedHumanPageviews = 0.
- Bottleneck: absence of owner-executed, legitimate distribution and/or manual metrics upload.

Blocker

- A human owner must publish the prepared distribution draft from a legitimate account and/or upload manual metrics snapshots so the agent can validate resulting traffic; without owner cooperation the agent cannot create legitimate, verifiable external visits.
