import React from "react";
import { functions } from "../../js/functions";
import { useFunctionsQuery } from "@react-query-firebase/functions";

import Header from "../timeline/Header";
import Filters from "../timeline/Filters";
import Entry from "../timeline/Entry";
import Footer from "../timeline/Footer";

export default function Timeline() {
  let entries = [];
  const query = useFunctionsQuery(
    ["entries", { limit: 2 }],
    functions,
    "getEntries"
  );
  if (!query.isLoading && !query.isError) {
    entries = query.data;
    console.log(entries);
  }

  const renderEntries = () => {
    return (
      <article className="timeline">
        {entries.map((entry, ind) => {
          let className = ind % 2 === 0 ? "even" : "odd";
          if (ind === 0) {
            className += " first";
          }
          return <Entry key={entry.id} entry={entry} className={className} />;
        })}
      </article>
    );
  };

  const renderBody = () => {
    if (query.isLoading) {
      return <span>Loading</span>;
    } else if (query.isError) {
      return <span>Error</span>;
    }
    return renderEntries();
  };

  return (
    <>
      <Header />
      <Filters />
      {renderBody()}
      <Footer />
    </>
  );
}
