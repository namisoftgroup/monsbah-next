import SearchField from "@/components/search/SearchField";
import SearchNav from "@/components/search/SearchNav";

export default async function layout({ searchParams, children }) {
  const search = await searchParams;
  return (
    <section className="search_section">
      <div className="container">
        <SearchField search={search} />
        <SearchNav />
        {children}
      </div>
    </section>
  );
}
