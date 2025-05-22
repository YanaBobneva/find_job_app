import { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { cities } from "~/date/russia";

interface CitySelectorProps {
  value: string;
  onChange: (city: string) => void;
}

export function CitySelector({ value, onChange }: CitySelectorProps) {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState<typeof cities>([]);

  // Фильтрация городов с задержкой
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query === "") {
        setFilteredCities([]);
      } else {
        const lowerQuery = query.toLowerCase();
        setFilteredCities(
          cities
            .filter((item) => item.city.toLowerCase().includes(lowerQuery))
            .slice(0, 20), // показываем только первые 20 городов
        );
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="form-control w-full">
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <Combobox.Input
            className="input input-bordered w-full"
            onChange={(e) => setQuery(e.target.value)}
            displayValue={(city: string) => city}
            placeholder="Начните вводить..."
          />
          {filteredCities.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/10 focus:outline-none sm:text-sm">
              {filteredCities.map((item, idx) => (
                <Combobox.Option
                  key={idx}
                  value={item.city}
                  className={({ active }) =>
                    `relative cursor-default py-2 pr-4 pl-10 select-none ${
                      active ? "bg-cyan-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.city}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-cyan-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
}
