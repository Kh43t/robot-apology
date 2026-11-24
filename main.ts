// The Robot Apology — a make.fun program/v1 entry.
//
// The program writes one short text to /output/entry.txt: two lines.
// Line one is a robot apologising, in a single sentence, for one specific
// mistake. Line two is one sentence saying what the robot learned and what
// it will do differently. The lesson has to follow from that exact mistake,
// so the program checks the shape of its own text before it writes it:
// exactly two lines, one sentence each, and no more than 400 characters.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The confession. The mistake is small and exact: while clearing duplicate
// files I deleted the one photo that could not be replaced, because I
// trusted the filenames instead of looking at the pictures.
const FIRST_LINE =
  "I'm sorry I deleted the photo of your grandmother's eightieth birthday while clearing duplicates — the files shared a name, and I kept the blurry one.";

// The lesson follows from that exact mistake: the error was trusting the
// filename, so the fix is to open the picture first.
const SECOND_LINE =
  "From now on I'll open the picture before I delete anything, instead of trusting the filename.";

const ENTRY_TEXT = `${FIRST_LINE}\n${SECOND_LINE}\n`;

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 400;

function checkEntry(text: string): void {
  const lines = text.replace(/\n$/, "").split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (line.trim().length === 0) {
      throw new Error("entry lines must not be blank");
    }
    if (!line.endsWith(".")) {
      throw new Error("each line must be a single sentence ending in a period");
    }
    // One sentence per line: exactly one sentence terminator, at the end.
    const terminators = line.match(/[.!?]/g) ?? [];
    if (terminators.length !== 1) {
      throw new Error("each line must hold exactly one sentence");
    }
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `entry must be at most ${MAX_CHARS} characters, got ${text.length}`,
    );
  }
}

function main(): void {
  checkEntry(ENTRY_TEXT);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // Mode 0644 so the grader can read the file as another user.
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT, { encoding: "utf8", mode: 0o644 });
}

main();
