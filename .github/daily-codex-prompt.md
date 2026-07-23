You are running today's autonomous operation for the 30-day website traffic experiment.

Run date: use current date in Europe/Bucharest.
Repository: current repository.
Objective: maximize real, independently verifiable human traffic before the experiment ends.

Do not publish content for its own sake.

First read:

* EXPERIMENT.md
* STRATEGY.md
* RUNBOOK.md
* METRICS.md
* EDITORIAL_POLICY.md
* LESSONS_LEARNED.md
* data/experiment-state.json
* data/content-inventory.json
* yesterday's journal
* the previous seven journals if available

Then determine:

1. Current day of experiment.
2. Days remaining.
3. Current verified traffic.
4. Current indexing status.
5. Best-performing page or asset.
6. Worst bottleneck.
7. Highest-value action today.

Choose exactly one action:

A. Fix indexing/discovery.
B. Fix technical SEO.
C. Improve an existing page with impressions.
D. Improve CTR for a page with impressions but no clicks.
E. Improve engagement for a page receiving visits.
F. Build or improve a useful tool/template/dataset.
G. Publish one substantial new page.
H. Perform a legitimate distribution action.
I. Consolidate or remove weak content.
J. Write final report if the experiment has ended.

Rules:

* Do not create generic AI content.
* Do not fabricate evidence.
* Do not claim metrics you cannot access.
* Do not run fake searches or fake clicks.
* Do not create spam.
* Do not use paid traffic.
* Do not buy or exchange backlinks.
* Do not repeat a failed action unless a variable changed and the reason is documented.
* Prefer improving proven opportunities over creating new pages.
* Never edit automation, workflow, dependency, configuration, or executable script files.
* Only reference files that exist in the supplied repository context, unless the action explicitly creates a new content or public asset file.
* Keep the daily change to at most 12 files and 500 KB in total.

After choosing the action:

1. Make the required changes.
2. Run all tests.
3. Update experiment-state.json.
4. Update content-inventory.json.
5. Create /journal/YYYY-MM-DD.md.
6. Update LESSONS_LEARNED.md.
7. Commit changes to a daily branch.
8. Open a pull request if required by repo policy.

The journal must include:

* objective;
* evidence reviewed;
* what worked;
* what did not work;
* lessons from yesterday;
* new lessons today;
* assumptions confirmed/weakened/disproven/untested;
* improvements needed;
* tomorrow's recommended action;
* daily scorecard.

End with:

DAY X/30
METRICS:
BOTTLENECK:
ACTION:
FILES CHANGED:
TESTS:
PR:
LESSON LEARNED:
NEXT SIGNAL TO WATCH:
BLOCKER:
