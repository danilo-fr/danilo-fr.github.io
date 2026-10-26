import json
import os
from datetime import date
from pathlib import Path

from scholarly import scholarly

PROFILE_ID = "krYTU7MAAAAJ"
OUTPUT = Path("_data/scholar_stats.yml")


def main():
    author = scholarly.search_author_id(PROFILE_ID)
    author = scholarly.fill(author, sections=["indices"])

    citations = author.get("citedby")
    h_index = author.get("hindex")

    if citations is None or h_index is None:
        raise RuntimeError("Google Scholar did not return complete statistics.")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        f"citations: {int(citations)}\n"
        f"h_index: {int(h_index)}\n"
        f'last_updated: "{date.today().isoformat()}"\n',
        encoding="utf-8",
    )

    print(f"Updated statistics: {citations} citations, H-index {h_index}")


if __name__ == "__main__":
    main()