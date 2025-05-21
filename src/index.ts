#!/usr/bin/env node

import fs from 'fs-extra';
import p from 'path';

import { processFile } from './process-file';

function main(): void {
	const args = process.argv.slice(2);
	for (let i = 0; i < args.length; ++i) {
		const infile = args[i]!;
		let outFile = args[i + 1];
		if (outFile !== undefined) i++;
		outFile ??= `${infile}.generated.ts`;
		console.info('Writing', outFile);
		fs.ensureDirSync(p.dirname(outFile));
		fs.writeFileSync(outFile, processFile(infile));
	}
}

main();
