import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { getDesigners } from "../lib/getDesigners";
import Analytics from "../components/Analytics.js";
import Filter from "../components/Filter.js";
import FilterSVG from "../components/Icons/FilterSVG.js";
import MetaTags from "../components/Metatags.js";
import Nav from "../components/Nav.js";
import Title from "../components/Title.js";

export async function getStaticProps() {
  const designers = await getDesigners();

  const uniqueExpertise = new Set();
  designers.forEach((designer) => {
    uniqueExpertise.add(designer.expertise);
  });

  const uniqueLocation = new Set();
  designers.forEach((designer) => {
    uniqueLocation.add(designer.location);
  });

  const expertises = Array.from(uniqueExpertise).map((expertise) => ({
    label: expertise,
    active: false,
    category: "expertise",
  }));

  const locations = Array.from(uniqueLocation)
    .sort()
    .map((location) => ({
      label: location,
      active: false,
      category: "location",
    }));

  return {
    props: {
      designers,
      filters: [...expertises, ...locations],
    },
  };
}

export default function Home({ designers, filters }) {
  const [designersList, setDesignersList] = useState(null);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [filterList, setFilterList] = useState(filters);
  const [filterCategory, setFilterCategory] = useState(null);

  useEffect(() => {
    setDesignersList(
      shuffle([...designers]).sort(
        (designerA, designerB) => designerA.order - designerB.order
      )
    );
  }, [designers]);

  const handleCloseFilter = (event) => {
    setFilterIsOpen(false);

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleOpenFilter = (category) => {
    setFilterCategory(category);
    setFilterIsOpen(true);
  };

  const clearFilter = () => {
    const newFilterList = filters.map((filter) => ({
      ...filter,
      active: false,
    }));

    setFilterList(newFilterList);
    setDesignersList(
      shuffle([...designers]).sort(
        (designerA, designerB) =>
          Number(designerA.featured) - Number(designerB.featured)
      )
    );
  };

  const handleFilterClick = (selectedItem) => {
    const newFilterList = filterList.map((filter) =>
      filter.label === selectedItem.label &&
      filter.category === selectedItem.category
        ? { ...filter, active: !filter.active }
        : filter
    );

    setFilterList(newFilterList);

    const expertiseFilters = newFilterList
      .filter((filter) => filter.category === "expertise")
      .map((filter) => filter.label);

    const locationFilters = newFilterList
      .filter((filter) => filter.category === "location")
      .map((filter) => filter.label);

    let activeFilters = newFilterList
      .filter((filter) => filter.active)
      .map((filter) => filter.label);

    const hasActiveExpertise = expertiseFilters.some((expertise) =>
      activeFilters.includes(expertise)
    );

    const hasActiveLocation = locationFilters.some((location) =>
      activeFilters.includes(location)
    );

    if (!hasActiveExpertise) {
      activeFilters = [...activeFilters, ...expertiseFilters];
    }

    if (!hasActiveLocation) {
      activeFilters = [...activeFilters, ...locationFilters];
    }

    if (activeFilters.length > 0) {
      setDesignersList(
        designers.filter(
          (designer) =>
            activeFilters.includes(designer.expertise) &&
            activeFilters.includes(designer.location)
        )
      );
    } else {
      clearFilter();
    }
  };

  return (
    <div
      className="container"
      style={{
        overflow: filterIsOpen ? "hidden" : "visible",
      }}
    >
    <Head>
      <title>Indonesians Who Design</title>
      <link id="favicon" rel="alternate icon" href="/favicon.png" />
      <MetaTags />
    </Head>

      <Content
        designers={designersList}
        handleOpenFilter={handleOpenFilter}
        onClick={filterIsOpen ? handleCloseFilter : undefined}
        className={filterIsOpen ? "filterIsOpen" : ""}
      />

      <AnimatePresence>
        {filterIsOpen && filterCategory ? (
          <Filter
            items={filterList.filter(
              (filter) => filter.category === filterCategory
            )}
            handleFilterClick={handleFilterClick}
            handleCloseFilter={handleCloseFilter}
            categoryName={filterCategory}
          />
        ) : null}
      </AnimatePresence>

      <style global jsx>{`
        html,
        body {
          overflow: ${filterIsOpen ? "hidden" : "auto"};
        }
      `}</style>
    </div>
  );
}

function Content({
  designers,
  handleOpenFilter,
  className,
  onClick,
}) {
  const tableHeaderRef = useRef(null);

  useEffect(() => {
    const header = tableHeaderRef.current;

    if (!header) {
      return undefined;
    }

    const stickyPosition = header.getBoundingClientRect().top + 40;

    const handleScroll = () => {
      if (window.pageYOffset > stickyPosition) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={className} onClick={onClick}>
      <Nav />

      <Title
        className="title m0 p0"
        text="Indonesians*who&nbsp;design"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <table className="large tableContent" cellSpacing="0">
          <thead id="tableHeader" ref={tableHeaderRef}>
            <tr>
              <td>Name</td>

              <td
                className="thsize-aux dn filterTable"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleOpenFilter("location");
                }}
              >
                Location <FilterSVG />
              </td>

              <td
                className="thsize-aux filterTable"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleOpenFilter("expertise");
                }}
              >
                Expertise <FilterSVG />
              </td>

              <td className="thsize-link" />
            </tr>
          </thead>

          {designers ? (
            <tbody>
              {designers.map((designer, index) => (
                <tr key={`${designer.name}-${index}`}>
                  <td>
                    <a
                      href={designer.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {designer.name}
                    </a>
                  </td>

                  <td className="thsize-aux dn">
                    <a
                      href={designer.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {designer.location}
                    </a>
                  </td>

                  <td className="thsize-aux">
                    <a
                      href={designer.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {designer.expertise}
                    </a>
                  </td>

                  <td className="thsize-link">
                    <a
                      href={designer.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </motion.div>

      <style jsx>{`
        .tableContent {
          padding-top: 18vh;
        }

        .filterTable {
          cursor: pointer;
        }

        thead {
          height: 2.2rem;
        }

        .thsize-aux {
          width: 30%;
        }

        .thsize-link {
          width: 2rem;
          text-align: right;
        }

        tbody a {
          width: 100%;
          padding-top: 0.6em;
          padding-bottom: 0.6em;
          color: inherit;
          display: inline-block;
        }

        table tbody td {
          padding-top: 0;
          padding-bottom: 0;
        }

        @media (max-width: 480px) {
          .thsize-aux {
            width: 30%;
          }
        }
      `}</style>

      <Analytics />
    </div>
  );
}

function shuffle(items) {
  const shuffledItems = [...items];
  let currentIndex = shuffledItems.length;

  while (currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [shuffledItems[currentIndex], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[currentIndex],
    ];
  }

  return shuffledItems;
}

