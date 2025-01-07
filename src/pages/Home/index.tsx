import { useEffect, useState } from "react";
import { CountryCard } from "../../components/card";
import { CountriesModel } from "../../utils/countries.model";
import "./styles.css";

export function HomeComponent() {
  const url = "https://restcountries.com/v3.1/";

  const [countriesList, setCountriesList] = useState<CountriesModel[] | any>();
  const [keepCountries, setKeepCountries] = useState<CountriesModel[] | any>();

  const [region, setRegion] = useState<string>("asia");

  useEffect(() => {
    fetchUrl(url + `region/${region}`);
    setCountriesList(keepCountries);
  }, []);

  function fetchUrl(urlProvided: string) {
    async function getContries() {
      try {
        const resp = await fetch(urlProvided);
        const data = await resp.json();

        setCountriesList(data);
        setKeepCountries(data);
      } catch (error) {
        console.error(error);
      }
    }
    getContries();
  }

  function handleSearch(keyword: any) {
    const searchResult = keepCountries.filter((k: any) =>
      k.name.common.toLowerCase().includes(keyword.toLowerCase())
    );

    searchResult
      ? setCountriesList(searchResult)
      : setCountriesList(keepCountries);
  }

  function filterByRegion(selection?: any) {
    setRegion(selection.target.value);
    fetchUrl(url + `region/${region}`);
  }

  return (
    <div className="content-container">
      <div className="filter-section">
        <div className="filter-input">
          <button>
            <span className="search-btn" />
          </button>
          <input
            type="text"
            placeholder="Search for a country..."
            onChange={(e) => handleSearch(e.currentTarget.value)}
          />
        </div>
        <div className="filter-combo">
          <select name="countries-combo" onChange={filterByRegion}>
            <option value="0" defaultValue={"Africa"}>
              Filter by region
            </option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Central America">Central America</option>
            <option value="Europe">Europe</option>
            <option value="South America">South America</option>
            <option value="North America">North America</option>
          </select>
        </div>
      </div>
      <div className="countries-cards-container">
        {countriesList?.map((r: any, index: number) => {
          return (
            <CountryCard
              key={index}
              flag={r.flags.svg}
              name={r.name.common}
              population={r.population}
              region={r.region}
              capital={r.capital}
            />
          );
        })}
      </div>
    </div>
  );
}
