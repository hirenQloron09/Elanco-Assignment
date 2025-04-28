import axios from 'axios';
import { getCountries, getCountryByCode, searchCountries, getCountriesByRegion } from '../services/countryService';
import { describe, it, expect, vi } from 'vitest';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CountryService', () => {
  it('fetches all countries', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: ['country1', 'country2'] });
    const data = await getCountries();
    expect(data).toEqual(['country1', 'country2']);
  });

  it('fetches country by code', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { name: 'Botswana' } });
    const data = await getCountryByCode('BW');
    expect(data.name).toBe('Botswana');
  });

  it('searches countries', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: ['India'] });
    const data = await searchCountries({ name: 'India' });
    expect(data).toEqual(['India']);
  });

  it('fetches countries by region', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: ['China', 'India'] });
    const data = await getCountriesByRegion('Asia');
    expect(data.length).toBe(2);
  });
});
