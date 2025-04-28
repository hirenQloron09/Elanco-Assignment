import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCountryByCode } from "../../services/countryService";

interface CountryDetail {
  name: string;
  flag: string;
  region: string;
  population: number;
  currencies: { name: string; symbol: string }[];
  languages: string[];
  capital: string;
  timezones: string[];
}

export default function CountryDetailPage() {
  const router = useRouter();
  const { code } = router.query;
  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code) {
      getCountryByCode(code as string).then((data) => {
        setCountry(data);
        setLoading(false);
      });
    }
  }, [code]);

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    );

  if (!country)
    return <p className='text-center text-red-500'>Country not found.</p>;

  return (
    <div className='p-6'>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6'>
        <img
          src={country.flag}
          alt={country.name}
          className='w-40 h-24 mx-auto object-cover mb-4'
        />
        <h1 className='text-2xl font-bold text-center'>{country.name}</h1>
        <p className='text-center text-gray-600'>{country.region}</p>
        <ul className='mt-4 space-y-2'>
          <li>
            <strong>Capital:</strong> {country.capital}
          </li>
          <li>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </li>
          <li>
            <strong>Languages:</strong>{" "}
            {Object.values(country.languages).join(", ")}
          </li>
          <li>
            <strong>Currencies:</strong>{" "}
            {Object.values(country.currencies)
              .map((c) => `${c.name} (${c.symbol})`)
              .join(", ")}
          </li>
          <li>
            <strong>Timezones:</strong> {country.timezones.join(", ")}
          </li>
        </ul>
      </div>
    </div>
  );
}
