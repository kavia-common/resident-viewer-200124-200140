import React, { useEffect, useMemo, useRef, useState } from "react";
import "./OpenedBook.css";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_SIZE = 4;

// PUBLIC_INTERFACE
function normalizeString(value) {
  /** Normalize a string for case-insensitive comparisons. */
  return String(value || "").trim().toLowerCase();
}

// PUBLIC_INTERFACE
function getResidentInitial(resident) {
  /** Get the A–Z initial for a resident name; returns "#" if not A–Z. */
  const name = String(resident?.name || "").trim();
  if (!name) return "#";
  const initial = name[0].toUpperCase();
  return /^[A-Z]$/.test(initial) ? initial : "#";
}

// PUBLIC_INTERFACE
function paginate(items, page, pageSize) {
  /** Return an array slice for a 1-based page. */
  const safePageSize = Math.max(1, pageSize);
  const safePage = Math.max(1, page);
  const startIndex = (safePage - 1) * safePageSize;
  return items.slice(startIndex, startIndex + safePageSize);
}

/**
 * PUBLIC_INTERFACE
 * OpenedBook renders the core two-page "open book" UI shell.
 *
 * This step adds interactive index controls (A–Z), search filtering, pagination,
 * and a right-side details pane for the currently selected resident.
 *
 * @param {Object} props
 * @param {Array} props.residents - List of resident records to show.
 * @returns {JSX.Element}
 */
export default function OpenedBook({ residents }) {
  const residentList = Array.isArray(residents) ? residents : [];

  const [activeLetter, setActiveLetter] = useState("A");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Selected resident for right-side details pane.
  const [selectedResidentId, setSelectedResidentId] = useState(null);

  // Focus management: move focus to details header when a resident is selected.
  const detailsHeadingRef = useRef(null);

  // Sorted for stable display/pagination.
  const sortedResidents = useMemo(() => {
    return [...residentList].sort((a, b) =>
      String(a?.name || "").localeCompare(String(b?.name || ""), undefined, {
        sensitivity: "base",
      })
    );
  }, [residentList]);

  const filteredResidents = useMemo(() => {
    const query = normalizeString(searchQuery);

    return sortedResidents
      .filter((r) => getResidentInitial(r) === activeLetter)
      .filter((r) => {
        if (!query) return true;
        return normalizeString(r?.name).includes(query);
      });
  }, [sortedResidents, activeLetter, searchQuery]);

  const totalPages = useMemo(() => {
    const pages = Math.ceil(filteredResidents.length / PAGE_SIZE);
    return Math.max(1, pages);
  }, [filteredResidents.length]);

  const pageResidents = useMemo(() => {
    const safePage = Math.min(page, totalPages);
    return paginate(filteredResidents, safePage, PAGE_SIZE);
  }, [filteredResidents, page, totalPages]);

  const selectedResident = useMemo(() => {
    if (!selectedResidentId) return null;
    return residentList.find((r) => r?.id === selectedResidentId) || null;
  }, [residentList, selectedResidentId]);

  useEffect(() => {
    if (!selectedResident) return;
    // Next tick focus ensures the element is mounted before focusing.
    const id = window.setTimeout(() => {
      detailsHeadingRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [selectedResident]);

  const onSelectLetter = (letter) => {
    setActiveLetter(letter);
    setPage(1); // reset paging when scope changes
  };

  const onChangeSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // reset paging when narrowing/widening results
  };

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const onSelectResident = (resident) => {
    setSelectedResidentId(resident?.id || null);
  };

  return (
    <main className="bookViewport" aria-label="Resident Directory">
      <section className="book" aria-label="Opened book layout">
        <div className="bookSpine" aria-hidden="true" />

        <div className="bookPage bookPageLeft" aria-label="Resident index page">
          <header className="pageHeader">
            <h1 className="pageTitle">Residents</h1>
            <p className="pageSubtitle">
              Index (mock) · {residentList.length} entries
            </p>
          </header>

          <div className="pageBody">
            <div
              className="indexPanel"
              aria-label="Resident index controls and results"
            >
              <div className="indexControls">
                <div className="searchField">
                  <label className="searchLabel" htmlFor="resident-search">
                    Search residents
                  </label>
                  <input
                    id="resident-search"
                    className="searchInput"
                    type="text"
                    value={searchQuery}
                    onChange={onChangeSearch}
                    placeholder="Type a name…"
                    autoComplete="off"
                  />
                </div>

                <div className="azIndex" role="group" aria-label="A to Z index">
                  {LETTERS.map((letter) => {
                    const pressed = letter === activeLetter;
                    return (
                      <button
                        key={letter}
                        type="button"
                        className={`azButton ${pressed ? "azButtonActive" : ""}`}
                        aria-pressed={pressed}
                        onClick={() => onSelectLetter(letter)}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="indexResults" aria-label="Filtered residents">
                <div className="resultsMeta" aria-live="polite">
                  <span className="resultsCount">
                    {filteredResidents.length} match
                    {filteredResidents.length === 1 ? "" : "es"} for “
                    {activeLetter}”
                    {searchQuery ? ` + “${searchQuery}”` : ""}
                  </span>
                  <span className="resultsPageMeta">
                    Page {Math.min(page, totalPages)} of {totalPages}
                  </span>
                </div>

                {filteredResidents.length === 0 ? (
                  <div className="emptyState" role="status">
                    No residents found for this filter.
                  </div>
                ) : (
                  <ul className="residentList" aria-label="Resident list">
                    {pageResidents.map((resident) => {
                      const isSelected = resident?.id === selectedResidentId;
                      return (
                        <li key={resident.id} className="residentListItem">
                          <button
                            type="button"
                            className="residentRow"
                            aria-label={`View details for ${resident.name}`}
                            aria-current={isSelected ? "true" : undefined}
                            onClick={() => onSelectResident(resident)}
                          >
                            <span className="residentName">{resident.name}</span>
                            <span className="residentMeta">
                              Apt {resident.apartmentNumber}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <nav className="pagination" aria-label="Resident list pagination">
                  <button
                    type="button"
                    className="pageButton"
                    onClick={goPrev}
                    disabled={!canPrev}
                    aria-label="Previous page"
                  >
                    Prev
                  </button>
                  <span className="pageStatus" aria-live="polite">
                    {Math.min(page, totalPages)} / {totalPages}
                  </span>
                  <button
                    type="button"
                    className="pageButton"
                    onClick={goNext}
                    disabled={!canNext}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <section
          className="bookPage bookPageRight"
          aria-label="Resident details page"
        >
          <header className="pageHeader">
            <h2 className="pageTitle">Details</h2>
            <p className="pageSubtitle">Select a resident to view details</p>
          </header>

          <div className="pageBody">
            {!selectedResident ? (
              <div
                className="detailsEmpty"
                role="status"
                aria-label="No resident selected"
              >
                <strong className="detailsEmptyTitle">No resident selected</strong>
                <p className="detailsEmptyText">
                  Choose a resident from the left page to see their portrait,
                  address, and contact details.
                </p>
              </div>
            ) : (
              <article
                className="detailsPanel"
                aria-label={`Resident details for ${selectedResident.name}`}
              >
                <header className="detailsHeader">
                  <div className="detailsPortraitWrap">
                    <img
                      className="detailsPortrait"
                      src={selectedResident.portraitUrl}
                      alt={`Portrait of ${selectedResident.name}`}
                      loading="lazy"
                      decoding="async"
                      width="120"
                      height="120"
                    />
                  </div>

                  <div className="detailsHeaderText">
                    {/* tabindex allows focus programmatically without inserting into tab order */}
                    <h3
                      ref={detailsHeadingRef}
                      className="detailsName"
                      tabIndex={-1}
                    >
                      {selectedResident.name}
                    </h3>
                    <div className="detailsDivider" aria-hidden="true" />
                  </div>
                </header>

                <section
                  className="detailsType"
                  aria-label="Contact and address"
                >
                  <dl className="detailsDefinitionList">
                    <div className="detailsRow">
                      <dt className="detailsTerm">Address</dt>
                      <dd className="detailsValue">
                        {selectedResident.address}
                      </dd>
                    </div>

                    <div className="detailsRow">
                      <dt className="detailsTerm">Apartment</dt>
                      <dd className="detailsValue">
                        {selectedResident.apartmentNumber}
                      </dd>
                    </div>

                    {selectedResident.phone ? (
                      <div className="detailsRow">
                        <dt className="detailsTerm">Phone</dt>
                        <dd className="detailsValue">
                          <a
                            className="detailsLink"
                            href={`tel:${String(selectedResident.phone).replace(
                              /[^+\d]/g,
                              ""
                            )}`}
                          >
                            {selectedResident.phone}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                </section>
              </article>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
