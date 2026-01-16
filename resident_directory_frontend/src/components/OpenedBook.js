import React from "react";
import "./OpenedBook.css";

/**
 * PUBLIC_INTERFACE
 * OpenedBook renders the core two-page "open book" UI shell.
 *
 * Left page is intended for the index/list (placeholder in step 1.1),
 * right page is intended for resident details (placeholder in step 1.1).
 *
 * @param {Object} props
 * @param {Array} props.residents - List of resident records to show (currently only used for placeholder count).
 * @returns {JSX.Element}
 */
export default function OpenedBook({ residents }) {
  return (
    <main className="bookViewport" aria-label="Resident Directory">
      <section className="book" aria-label="Opened book layout">
        <div className="bookSpine" aria-hidden="true" />

        <div className="bookPage bookPageLeft" aria-label="Resident index page">
          <header className="pageHeader">
            <h1 className="pageTitle">Residents</h1>
            <p className="pageSubtitle">
              Index (mock) · {Array.isArray(residents) ? residents.length : 0} entries
            </p>
          </header>

          <div className="pageBody">
            <div className="placeholderCard" role="note" aria-label="Index placeholder">
              <strong>Left pane placeholder</strong>
              <div className="placeholderText">
                This area will contain search + a scrollable resident list.
              </div>
            </div>
          </div>
        </div>

        <div className="bookPage bookPageRight" aria-label="Resident details page">
          <header className="pageHeader">
            <h2 className="pageTitle">Details</h2>
            <p className="pageSubtitle">Select a resident to view details</p>
          </header>

          <div className="pageBody">
            <div className="placeholderCard" role="note" aria-label="Details placeholder">
              <strong>Right pane placeholder</strong>
              <div className="placeholderText">
                This area will show the selected resident’s profile & contact info.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
