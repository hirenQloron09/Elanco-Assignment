interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  regionFilter: string;
  searchType:string;
  setSearchType:(value:string)=>void;
  setRegionFilter: (value: string) => void;

}

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
const sType = [
  { id: 1, name: "name", display: "Name" },
  { id: 2, name: "capital", display: "capital" },
  { id: 3, name: "region" ,display:'Region'},
  { id: 4, name: "timezone",display:'Timezone' },
];

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  regionFilter,
  searchType,
  setSearchType,
  setRegionFilter,
}: SearchBarProps) {
  return (
    <div className='flex flex-col sm:flex-row justify-between mb-6'>
      <input
        type='text'
        placeholder={`Search By ${searchType}`}
        className='border p-2 rounded mb-2 sm:mb-0 sm:mr-2 flex-1'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className='border p-2 rounded flex-1'
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        {sType.map((t) => (
          <option key={t.id} value={t.name}>
            {t.display}
          </option>
        ))}
      </select>

      <select
        className='border p-2 rounded flex-1'
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
