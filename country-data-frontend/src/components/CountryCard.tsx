import Image from "next/image";
import Link from "next/link";

interface CountryCardProps {
  country: {
    name: string;
    flag: string;
    region: string;
    timezones: string[];
    cioc: string;
  };
}


export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/countries/${country.cioc}`}
      className='block bg-white rounded-lg shadow hover:shadow-lg transition p-4 text-center'
    >
      <Image
        src={country.flag}
        alt={country.name}
        width={100} 
        height={60} 
        className='mx-auto object-cover mb-1'
        loading='lazy'
        style={{ width: "45%", height: "50%" }} 
      />

      <h3 className='font-bold'>{country.name}</h3>
      <p className='text-sm text-gray-600'>{country.region}</p>
      <p className='text-sm text-gray-500 mt-1'>
        {/* {country.timezones[0]} */}
      </p>
    </Link>
  );
}
