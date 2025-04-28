// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/countries');
//         setCountries(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load countries');
//         setLoading(false);
//       }
//     };
//     fetchCountries();
//   }, []);

//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   const filteredCountries = countries.filter((country: any) =>
//     country.name.includes(searchTerm)
//   );

//   return (
//     <div className="p-6">
//       {/* Search Input */}
//       <div className="mb-4">
//         <label className="block text-gray-700">
//           Search for a Country
//         </label>
//         <input
//           id="search"
//           type="text"
//           placeholder="Enter country name"
//           className="border border-gray-300"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Display filtered countries */}
//       <div className="grid grid-cols-4">
//         {filteredCountries.length > 0 ? (
//           filteredCountries.map((country) => (
//             <div key={country.name} className="bg-white rounded-lg shadow-md p-4">
//               {/* Accessing the flag from the 'flag' property */}
//               {country.flag ? (
//                 <img
//                   className="w-10 h-10 object-cover"
//                   src={country.flag}
//                   alt={`Flag of ${country.name}`}
//                 />
//               ) : (
//                 <p className="text-center">No Flag Available</p>
//               )}
//               <div className="mt-2 text-center">
//                 <h2>{country.name}</h2>
//                 <p>{country.region}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No countries found.</p>
//         )}
//       </div>
//     </div>
//   );
// };
import { useState, useEffect } from "react";
import {
  getCountries,
  searchCountries,
  getCountriesByRegion,
} from "../services/countryService";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";

interface Country {
  name: string;
  flag: string;
  region: string;
  timezones: string[];
  capital: string;
  cca2: string;
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const[searchType,setSearchType]=useState("name")
  const [regionFilter, setRegionFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchCountries = async () => {
    setLoading(true);
    try {
  
      if (searchTerm.trim() !== "") {

        const results = await searchCountries({
          [searchType]: searchTerm,
        });
        setCountries(results);
      } else if (regionFilter !== "All") {
        const results = await getCountriesByRegion(regionFilter);
        setCountries(results);
      } else {
        const results = await getCountries();
        setCountries(results);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [searchTerm, regionFilter]);

  return (
    <div className='p-6'>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        regionFilter={regionFilter}
        searchType={searchType}
        setSearchType={setSearchType}
        setRegionFilter={setRegionFilter}
      />

      {loading ? (
        <div className='text-center text-gray-500'>Loading...</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {countries.map((country) => (
            <CountryCard key={country.name} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}
