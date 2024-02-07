import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ComboBox from "./ComboBox";
import "./styles.css";

export default function App() {
	const queryClient = new QueryClient();

	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				<ComboBox />
			</QueryClientProvider>
		</div>
	);
}
