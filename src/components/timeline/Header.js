import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ExternalLink from "../shared/ExternalLink";
import { STORAGE_URL } from "../../constants/urls";

export default function Header({ windowWidth }) {
  const renderLinks = () => (
    <ul>
      <li>
        <Link to="/what">What is web3?</Link>
      </li>
      <li>
        <Link to="/glossary">Glossary</Link>
      </li>
      <li>
        <Link to="/about">About this project</Link>
      </li>
      <li>
        <Link to="/suggest">Suggest a change</Link>
      </li>
      <li>
        <a href="/feed.xml">
          <i className="fas fa-rss"></i>
          <span className="sr-only">Subscribe to RSS</span>
        </a>
      </li>
    </ul>
  );

  const renderImage = () => (
    <a href="https://web3isgoinggreat.com/" className="logo-image-link">
      <img
        className="logo"
        src={`${STORAGE_URL}/monkey.png`}
        alt="Illustration: A sad-looking Bored Ape Yacht Club NFT monkey looks at a world engulfed in flames."
      />
    </a>
  );

  const renderMobileImageAndLinks = () => (
    <div className="mobile-image-and-links">
      {renderLinks()}
      <div className="mobile-image-wrapper">{renderImage()}</div>
    </div>
  );

  return (
    <header className="timeline-page page-header">
      <div className="constrain-width">
        {windowWidth !== "sm" && renderImage()}
        <div className="header-content">
          <h1>
            <a href="https://web3isgoinggreat.com/">Web3 is going just great</a>
          </h1>
          <p>
            ...and is definitely not an enormous grift that's pouring lighter
            fluid on our already-smoldering planet.
          </p>
          <p>
            2021 timeline by Molly White{" "}
            <span style={{ display: "inline-block" }}>
              (
              <ExternalLink href="https://twitter.com/molly0xFFF">
                <i
                  title="Twitter"
                  className="fa-brands fa-twitter"
                  aria-hidden={true}
                ></i>
                <span className="sr-only">Twitter</span>
              </ExternalLink>
              ,{" "}
              <ExternalLink href="https://www.mollywhite.net/">
                <i
                  title="Website"
                  className="fas fa-link"
                  aria-hidden={true}
                ></i>
                <span className="sr-only">Website</span>
              </ExternalLink>
              )
            </span>
          </p>
          {windowWidth === "sm" ? renderMobileImageAndLinks() : renderLinks()}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  windowWidth: PropTypes.oneOf(["sm", "md", "lg"]),
};
