const YOML = {};
const yoml_rules = ["### ", "## ", "# ", "#", "!", "?", "-", ""];

YOML.parse = function yo_parse(source) {
  return source
    .trim()
    .split("\n")
    .map((line) => {
      line = line.trim();
      for (const rule of yoml_rules) {
        if (line.startsWith(rule)) {
          return { rule, text: line };
        }
      }
    });
};

YOML.htmlify = function htmlify() {};

YOML.stringify = function yo_stringify(ast) {
  return ast.map((line) => JSON.stringify(line)).join("\n");
};

///////////////////////////////////////////////////////////////////////////////

const test_source = `\
hello, world

#meta data
- command ..params
! embed.com/something

? [A] Alpha
? [B] Beta

? (A) Yes
? (B) No

$ formulas $
$$ multi
   line 
   formulas $$

Autolinking wikipedia.org
Or people @adam or @eva
~eva 's 127.0.0.1
#hash #tags
#with values
-yo ..
`;

const test_ast = YOML.parse(test_source);
console.log("-ast", YOML.stringify(test_ast, null, 2));
