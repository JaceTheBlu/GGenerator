import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

export async function GET() {
	try {
		const tutorialsDir = path.resolve('static/tutorials');
		const files = fs.readdirSync(tutorialsDir).filter((file) => file.endsWith('.json'));
		return json(files);
	} catch (error) {
		console.log(error);
	}
}
