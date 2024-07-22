import { locales } from '../stores';

export const loadLanguage = async (lang) => {
	try {
		const response = await fetch(`/locales/${lang}.json`);
		const data = await response.json();
		locales.set(data);
		localStorage.setItem('preferredLanguage', lang);
	} catch (error) {
		console.error('Error loading language:', error);
	}
};
