#!/usr/bin/env node

import { writeFileSync } from 'fs';

import { processFile } from './process-file';

function main(): void {
	for (const file of process.argv.slice(2)) {
		const filename = `${file}.generated.ts`;
		console.info('Writing', filename);
		writeFileSync(filename, processFile(file));
	}
}

main();
