import { Request, Response, NextFunction, RequestHandler } from "express";
import axios from "axios";

const REST_COUNTRIES_API = "https://restcountries.com/v3.1";

// Utility to fetch all countries
const fetchAllCountries = async () => {
  const { data } = await axios.get(`${REST_COUNTRIES_API}/all`);
  return data;
};


// Helper: case-insensitive exact match function for names
const containsExactMatch = (text: string, search: string) => {
  const regex = new RegExp(`^${search}`, "i"); // Word boundary matching (case insensitive)
  return regex.test(text);
};
// Utility to handle errors
const handleError = (res: Response, error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  res.status(500).json({ error: message });
};



// Get all countries
export const getCountries: RequestHandler = async (req, res) => {
  try {
    const countries = await fetchAllCountries();
    const result = countries.map((country: any) => ({
      name: country.name.common,
      flag: country.flags?.svg || country.flags?.png,
      region: country.region,
      timezones: country.timezones,
      cioc: country.cioc,
    }));
    res.status(200).json(result); 
  } catch (error) {
    handleError(res, error);
  }
};

// Get country by code
export const getCountryByCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;

    const { data } = await axios.get(`${REST_COUNTRIES_API}/alpha/${code}`);
    const country = data[0];

    res.status(200).json({
      name: country.name.common,
      flag: country.flags?.svg || country.flags?.png,
      population: country.population,
      languages: country.languages,
      region: country.region,
      currencies: country.currencies,
      timezones: country.timezones,
      capital: country.capital,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Filter countries by region
export const filterCountriesByRegion: RequestHandler = async (req, res) => {
  try {
    const { region } = req.params;
    const countries = await fetchAllCountries();

    const filtered = countries
      .filter(
        (country: any) => country.region.toLowerCase() === region.toLowerCase()
      )
      .map((country: any) => ({
        name: country.name.common,
        flag: country.flags?.svg || country.flags?.png,
        region: country.region,
      }));


    res.status(200).json(filtered);
  } catch (error) {
    handleError(res, error);
  }
};

// Search countries
export const searchCountries: RequestHandler = async (req, res) => {
  try {

    const { name, capital, region, timezone } = req.query;
    let countries: any[] = await fetchAllCountries();

    // Apply name filter if provided
    if (name) {
      countries = countries.filter((country) =>
        containsExactMatch(country.name.common, name as string)
      );
    }

    // Apply capital filter if provided
    if (capital) {
      countries = countries.filter((country) =>
        country.capital?.some((cap: string) =>
          containsExactMatch(cap, capital as string)
        )
      );
    }

    // Apply region filter if provided
    if (region) {
      countries = countries.filter((country) =>
        containsExactMatch(country.region, region as string)
      );
    }

    // Apply timezone filter if provided
    if (timezone) {
      countries = countries.filter((country) =>
        country.timezones?.some((tz: string) =>
          containsExactMatch(tz, timezone as string)
        )
      );
    }
const finResult = countries.map((country: any) => ({
  name: country.name.common,
  flag: country.flags?.svg || country.flags?.png,
  region: country.region,
}));
    res.status(200).json(finResult);
  } catch (error) {
    handleError(res, error);
  }
};