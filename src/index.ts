#!/bin/env node

import { writeFileSync } from 'fs';

import { processFile } from './process-file';

function main(): void {
	const files = process.argv.slice(2);

	files.forEach(file => {
		const fileOutput = processFile(file);

		console.info(`Writing ${file}.ts`);

		writeFileSync(`${file}.ts`, fileOutput);
	});
}

main();
