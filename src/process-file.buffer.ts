import { parseJson } from './parse-json';

export interface ProcessBufferContext {
	buffer: Buffer;
	file: string;
}

export function processFileBuffer({ buffer, file }: ProcessBufferContext): string {
	const { serialisedJson } = parseJson({ buffer, file });
	return `export default ${serialisedJson} as const\n`;
}
