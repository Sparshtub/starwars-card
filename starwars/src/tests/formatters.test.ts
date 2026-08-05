import { describe, it, expect } from 'vitest';
import {
  formatHeight,
  formatMass,
  formatDate,
  formatPopulation,
  extractIdFromUrl,
} from '../utils/formatters';

describe('Formatters Unit Tests', () => {
  describe('formatHeight', () => {
    it('converts centimeters to meters with 2 decimal places', () => {
      expect(formatHeight('172')).toBe('1.72 m');
      expect(formatHeight('96')).toBe('0.96 m');
      expect(formatHeight('202')).toBe('2.02 m');
    });

    it('handles unknown or missing height gracefully', () => {
      expect(formatHeight('unknown')).toBe('Unknown');
      expect(formatHeight('none')).toBe('Unknown');
      expect(formatHeight('')).toBe('Unknown');
    });
  });

  describe('formatMass', () => {
    it('appends kg suffix to numeric mass', () => {
      expect(formatMass('77')).toBe('77 kg');
      expect(formatMass('136')).toBe('136 kg');
    });

    it('handles unknown mass gracefully', () => {
      expect(formatMass('unknown')).toBe('Unknown');
      expect(formatMass('none')).toBe('Unknown');
      expect(formatMass('')).toBe('Unknown');
    });
  });

  describe('formatDate', () => {
    it('formats ISO date strings to UTC dd-MM-yyyy consistently', () => {
      expect(formatDate('2014-12-09T13:50:51.644000Z')).toBe('09-12-2014');
      expect(formatDate('2014-12-20T21:17:56.891000Z')).toBe('20-12-2014');
    });

    it('handles invalid or missing date strings gracefully', () => {
      expect(formatDate('')).toBe('N/A');
      expect(formatDate('invalid-date')).toBe('invalid-date');
    });
  });

  describe('formatPopulation', () => {
    it('formats numbers with localized commas', () => {
      expect(formatPopulation('200000')).toBe('200,000');
      expect(formatPopulation('1000000000')).toBe('1,000,000,000');
    });

    it('handles unknown population values', () => {
      expect(formatPopulation('unknown')).toBe('Unknown');
      expect(formatPopulation('n/a')).toBe('Unknown');
      expect(formatPopulation('')).toBe('Unknown');
    });
  });

  describe('extractIdFromUrl', () => {
    it('extracts numeric ID from trailing URL segment', () => {
      expect(extractIdFromUrl('https://swapi.py4e.com/api/people/1/')).toBe('1');
      expect(extractIdFromUrl('https://swapi.info/api/planets/14')).toBe('14');
    });

    it('returns default fallback "1" for invalid input', () => {
      expect(extractIdFromUrl('')).toBe('1');
    });
  });
});
