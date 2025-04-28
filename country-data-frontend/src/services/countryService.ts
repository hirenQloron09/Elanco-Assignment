import axios from "axios";

const BASE_URL = "http://localhost:3001";

export async function getCountries() {
  try {
    const response = await axios.get(`${BASE_URL}/countries`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

export async function getCountryByCode(code: string) {
  try {
    const response = await axios.get(`${BASE_URL}/countries/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country ${code}:`, error);
    return null;
  }
}

export async function searchCountries(params: {
  name?: string;
  capital?: string;
  region?: string;
  timezone?: string;
}) {
  try {
    
    const query = new URLSearchParams(
      params as Record<string, string>
    ).toString();

    const response = await axios.get(`${BASE_URL}/countries/search?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching countries:", error);
    return [];
  }
}

export async function getCountriesByRegion(region: string) {
  try {
    const response = await axios.get(`${BASE_URL}/countries/region/${region}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries by region ${region}:`, error);
    return [];
  }
}
