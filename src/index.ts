#!/usr/bin/env node

import { writeFileSync } from 'fs';

import { processFile } from './process-file';

function main(): void {
	const args = process.argv.slice(2);
	for (let i = 0; i < args.length; ++i) {
		const file = args[i]!;
		const outFile = args[i + 1] ?? `${file}.generated.ts`;
		console.info('Writing', outFile);
		writeFileSync(outFile, processFile(file));
	}
}

main();
