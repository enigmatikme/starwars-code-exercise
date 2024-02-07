import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

interface Planet {
	climate: string;
	created: string;
	diameter: string;
	edited: string;
	films: string[];
	gravity: string;
	name: string;
	orbital_period: string;
	population: string;
	residents: string[];
	rotation_period: string;
	surface_water: string;
	terrain: string;
	url: string;
}

const getPlanetList = () => {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 500);

	const { isLoading, data } = useQuery({
		enabled: query.length >= 2,
		queryKey: ["planets", { search: debouncedQuery }],
		queryFn: () =>
			fetch(`https://swapi.dev/api/planets?search=${debouncedQuery}`).then(
				(res) => res.json()
			),
	});

	return {
		items: data?.results.map((planet: Planet) => planet.name) ?? [],
		loading: isLoading,
		query,
		setQuery,
	} as const;
};

export default function ComboBox() {
	const { items, query, setQuery, loading } = getPlanetList();
	return (
		<Autocomplete
			inputValue={query}
			id="combo-box-demo"
			options={items}
			sx={{ width: 300 }}
			loading={loading}
			onInputChange={(_e, value) => {
				setQuery(value || "");
			}}
			renderInput={(params) => <TextField {...params} label="Planets" />}
		/>
	);
}
