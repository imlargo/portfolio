import { describe, expect, it } from 'vitest';
import { PLATFORM, PLATFORM_NEED, recommendPlatform } from './product';

describe('recommendPlatform', () => {
	it('recommends the web when nothing extra is needed', () => {
		expect(recommendPlatform([])).toBe(PLATFORM.web);
	});

	it('recommends a PWA for offline use or notifications', () => {
		expect(recommendPlatform([PLATFORM_NEED.offline])).toBe(PLATFORM.pwa);
		expect(recommendPlatform([PLATFORM_NEED.push])).toBe(PLATFORM.pwa);
	});

	it('recommends native for app stores or device hardware, whatever else is checked', () => {
		expect(recommendPlatform([PLATFORM_NEED.store])).toBe(PLATFORM.native);
		expect(recommendPlatform([PLATFORM_NEED.offline, PLATFORM_NEED.hardware])).toBe(
			PLATFORM.native
		);
	});
});
