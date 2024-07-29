import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

export async function GET() {
	try {
		const examplesDir = path.resolve('static/examples');
		const directories = fs
			.readdirSync(examplesDir, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);

		const result = {};

		for (const dir of directories) {
			const dirPath = path.join(examplesDir, dir);
			const files = fs.readdirSync(dirPath).filter((file) => file.endsWith('.json'));

			result[dir] = {};

			for (const file of files) {
				const filePath = path.join(dirPath, file);
				const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
				const key = file.replace('.json', '');
				result[dir][key] = fileContent;
			}
		}

		return json(result);
	} catch (error) {
		console.log(error);
		return json({ error: 'Failed to read files' }, { status: 500 });
	}
}
