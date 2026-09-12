import fs from "fs";

interface InsertOptions {
  label?: string;
  indentSize?: number;
  ensureTrailingComma?: boolean; // for object literals
}

interface BlockRange {
  matchStart: number;
  openEnd: number;   // index right after the block's "{"
  closeStart: number; // index of the block's matching "}"
}

function locateBraceBlock(content: string, anchorRegex: RegExp): BlockRange {
  const match = content.match(anchorRegex);
  if (!match || match.index === undefined) {
    throw new Error(`Anchor pattern not found: ${anchorRegex}`);
  }

  const matchStart = match.index;
  const openEnd = matchStart + match[0].length; // right after "{"

  let depth = 1;
  let i = openEnd;
  for (; i < content.length; i++) {
    if (content[i] === "{") depth++;
    else if (content[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }

  if (depth !== 0) {
    throw new Error("Could not find matching closing brace for anchor.");
  }

  return { matchStart, openEnd, closeStart: i };
}

function readSnippet(snippet: string): string {
  return snippet.trim();
}

function indentBlock(text: string, indent: string): string {
  return text
    .split("\n")
    .map((line) => (line.trim() ? indent + line : line))
    .join("\n");
}

function buildHeader(label: string | undefined, indent: string): string {
  if (!label) return "\n\n";
  return (
    `\n\n${indent}// ---------------------------------------------------------\n` +
    `${indent}// ${label}\n` +
    `${indent}// ---------------------------------------------------------\n`
  );
}

/** Insert INSIDE a brace block (class body, function body, object literal) — before its closing brace. */
export function insertInsideBlock(
  filePath: string,
  anchorRegex: RegExp,
  snippetOrPath: string,
  options: InsertOptions = {}
) {
  const content = fs.readFileSync(filePath, "utf8");
  const snippet = readSnippet(snippetOrPath);
  const { closeStart } = locateBraceBlock(content, anchorRegex);

  const before = content.slice(0, closeStart);
  const after = content.slice(closeStart);
  const indent = " ".repeat(options.indentSize ?? 2);
  const indented = indentBlock(snippet, indent);

  let prefix = before.trimEnd();
  if (options.ensureTrailingComma) {
    const lastChar = prefix.slice(-1);
    if (lastChar && lastChar !== "," && lastChar !== "{") {
      prefix += ",";
    }
  }

  const updated = prefix + buildHeader(options.label, indent) + indented + "\n" + after;
  fs.writeFileSync(filePath, updated, "utf8");
  console.log(`Inserted inside block in ${filePath}`);
}

/** Insert right AFTER a brace block ends (sibling to a function/method — not nested inside it). */
export function insertAfterBlock(
  filePath: string,
  anchorRegex: RegExp,
  snippetOrPath: string,
  options: InsertOptions = {}
) {
  const content = fs.readFileSync(filePath, "utf8");
  const snippet = readSnippet(snippetOrPath);
  const { closeStart } = locateBraceBlock(content, anchorRegex);

  const afterBraceIndex = closeStart + 1;
  const before = content.slice(0, afterBraceIndex);
  const after = content.slice(afterBraceIndex);
  const indent = " ".repeat(options.indentSize ?? 2);
  const indented = indentBlock(snippet, indent);

  const updated = before + buildHeader(options.label, indent) + indented + "\n" + after;
  fs.writeFileSync(filePath, updated, "utf8");
  console.log(`Inserted after block in ${filePath}`);
}

/** Prebuilt anchor patterns — all must capture through the opening "{". */
export const anchors = {
  classBody: (name: string) => new RegExp(`class\\s+${name}[^{]*\\{`),
  functionBody: (name: string) =>
    new RegExp(`(?:export\\s+)?(?:async\\s+)?function\\s+${name}\\s*\\([^)]*\\)\\s*(?::[^{]+)?\\{`),
  methodBody: (name: string) =>
    new RegExp(`(?:async\\s+)?${name}\\s*\\([^)]*\\)\\s*(?::[^{]+)?\\{`),
  objectLiteral: (varName: string) =>
    new RegExp(`(?:const|let|var)\\s+${varName}\\s*(?::[^=]+)?=\\s*\\{`),
  objectProperty: (propName: string) => new RegExp(`${propName}\\s*:\\s*\\{`),
};