import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";

import { STORAGE_URL } from "../../constants/urls";

import Link from "next/link";
import ExternalLink from "../ExternalLink";

const Header = forwardRef(function Header({ windowWidth }, ref) {
  const componentRef = useRef();
  useImperativeHandle(ref?.focusRef, () => ({
    focus: () => componentRef.current.focus(),
  }));

  const renderLinks = () => (
    <>
      <ul>
        <li>
          <Link href="/what">
            <a>What is web3?</a>
          </Link>
        </li>
        <li>
          <Link href="/glossary">
            <a>Glossary</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About this project</a>
          </Link>
        </li>
        <li>
          <Link href="/suggest">
            <a>Suggest a change</a>
          </Link>
        </li>
        <li>
          <Link href="/attribution">
            <a>License and attribution</a>
          </Link>
        </li>
      </ul>
    </>
  );

  const renderImage = () => (
    <Link href="/">
      <a className="logo-image-link">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="logo"
          src={`${STORAGE_URL}/monkey.png`}
          alt="Illustration: A sad-looking Bored Ape Yacht Club NFT monkey looks at a world engulfed in flames."
        />
      </a>
    </Link>
  );

  const renderMobileImageAndLinks = () => (
    <div className="mobile-image-and-links">
      {renderLinks()}
      <div className="mobile-image-wrapper">{renderImage()}</div>
    </div>
  );

  return (
    <header className="timeline-page page-header" ref={ref?.inViewRef}>
      <div className="constrain-width">
        {windowWidth !== "sm" && renderImage()}
        <div className="header-content">
          <h1 ref={componentRef} tabIndex={-1}>
            <Link href="/">
              <a>Web3 is going just great</a>
            </Link>
          </h1>
          <p className="subtitle">
            ...and is definitely not an enormous grift that's pouring lighter
            fluid on our already-smoldering planet.
          </p>
          <p>
            <span>
              {"2021 – "}
              <span title="that's right! this grift isn't stopping and neither am I">
                2022
              </span>{" "}
              timeline by Molly White{" "}
            </span>
            <span style={{ display: "inline-block" }}>
              <span aria-hidden={true}>(</span>
              <ExternalLink href="https://twitter.com/molly0xFFF">
                <i
                  title="Twitter"
                  className="fa-brands fa-twitter"
                  aria-hidden={true}
                ></i>
                <span className="sr-only">Twitter</span>
              </ExternalLink>
              <span aria-hidden={true}>, </span>
              <ExternalLink href="https://www.mollywhite.net/">
                <i
                  title="Website"
                  className="fas fa-link"
                  aria-hidden={true}
                ></i>
                <span className="sr-only">Website</span>
              </ExternalLink>
              <span aria-hidden={true}>)</span>
            </span>{" "}
            Follow updates on{" "}
            <ExternalLink href="https://twitter.com/web3isgreat">
              Twitter
            </ExternalLink>{" "}
            or with{" "}
            <ExternalLink href="https://web3isgoinggreat.com/feed.xml">
              RSS <i className="fas fa-rss" />
            </ExternalLink>
          </p>
          {windowWidth === "sm" ? renderMobileImageAndLinks() : renderLinks()}
        </div>
      </div>
    </header>
  );
});

Header.propTypes = {
  windowWidth: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Header;
