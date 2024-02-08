import SearchForm from "../features/search/SearchForm";

export default function TestPage() {

    return (
        <SearchForm onSubmit={(data) => console.log(data)} />
    )
}