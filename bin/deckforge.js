#!/usr/bin/env node
// Thin dispatcher: parses only the command name, then hands the rest of
// argv to src/commands/<cmd>.js. No dependencies beyond node stdlib.

const COMMANDS = ['install', 'uninstall', 'list', 'doctor', 'init', 'update'];

function topLevelHelp() {
  return `deckforge — agent-agnostic presentation pipeline installer

Usage: deckforge <command> [options]

Commands:
  install     Install bundled skills into a coding agent
  uninstall   Remove previously installed skills
  list        List bundled skills and their install status
  doctor      Check environment health (node, python, agents)
  init        Scaffold a new deck workspace
  update      Upgrade installed skills to the bundled versions

Run "deckforge <command> --help" for command-specific options.
`;
}

async function main(argv) {
  const [cmd, ...rest] = argv;

  if (cmd === undefined || cmd === '--help' || cmd === '-h') {
    process.stdout.write(topLevelHelp());
    return 0;
  }

  if (!COMMANDS.includes(cmd)) {
    process.stderr.write(topLevelHelp());
    process.stderr.write(`\nUnknown command: ${cmd}\n`);
    return 1;
  }

  let mod;
  try {
    mod = await import(`../src/commands/${cmd}.js`);
  } catch (err) {
    process.stderr.write(`Error: failed to load command "${cmd}": ${err.message}\n`);
    process.stderr.write('Fix: reinstall deckforge; the package contents may be corrupted.\n');
    return 2;
  }

  try {
    return await mod.run(rest);
  } catch (err) {
    process.stderr.write(`Error: ${err.message}\n`);
    process.stderr.write('Fix: re-run with the same arguments; if this keeps happening, file an issue with this output.\n');
    return 1;
  }
}

main(process.argv.slice(2)).then((code) => {
  process.exitCode = code;
});
