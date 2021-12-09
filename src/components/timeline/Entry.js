import React from "react";
import PropTypes from "prop-types";

import { STORAGE_URL } from "../../constants/urls";
import ICONS from "../../constants/icons";
import { humanizeDate, isWrappedInParagraphTags } from "../../js/utilities";

export default function Entry({ entry, className }) {
  const renderIcon = () => {
    if (entry.faicon) {
      return <i className={`fas fa-${entry.faicon}`} aria-hidden="true"></i>;
    } else if (entry.icon) {
      return (
        <div className="icon-wrapper">
          <img
            src={`${STORAGE_URL}/icons/${ICONS[entry.icon]}`}
            alt="" // Decorative, hidden to screenreaders
            aria-hidden="true"
          />
        </div>
      );
    }
    return null;
  };

  const renderImageElement = () => {
    if (!entry.image) {
      return null;
    }

    const imageEl = (
      <img
        src={`${STORAGE_URL}/entryAssets/${entry.image.src}`}
        alt={entry.image.alt}
      />
    );
    if (entry.image.link) {
      return (
        <a href={entry.image.link} target="_blank" rel="noreferrer">
          {imageEl}
        </a>
      );
    }
    return imageEl;
  };

  const renderImageCaption = () => {
    if (entry?.image?.caption) {
      return (
        <>
          <span
            className="caption"
            dangerouslySetInnerHTML={{ __html: entry.image.caption }}
          />{" "}
          <span className="attribution-link">
            <a href="/attribution">(attribution)</a>
          </span>
        </>
      );
    }
    return null;
  };

  const renderImage = () => {
    return (
      <div className="captioned-image image-right">
        {renderImageElement()}
        {renderImageCaption()}
      </div>
    );
  };

  const renderBody = () => {
    const body = <span dangerouslySetInnerHTML={{ __html: entry.body }} />;
    return isWrappedInParagraphTags(entry.body) ? body : <p>{body}</p>;
  };

  const renderLinks = () => {
    if (entry.links && entry.links.length) {
      return (
        <ul>
          {entry.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                <span dangerouslySetInnerHTML={{ __html: link.linkText }} />
                {link.extraText && (
                  <span dangerouslySetInnerHTML={{ __html: link.extraText }} />
                )}
              </a>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className={`timeline-entry ${className}`}>
      <div className={`timeline-icon ${entry.color || "purple"}`}>
        {renderIcon()}
      </div>
      <div className="timeline-description">
        <span className="timestamp">
          <time dateTime={entry.date}>{humanizeDate(entry.date)}</time>
        </span>
        <h2>
          <a id={entry.id} href={`#${entry.id}`}>
            <i className="fas fa-link"></i>
          </a>
          <span dangerouslySetInnerHTML={{ __html: entry.title }} />
        </h2>
        {renderImage()}
        {renderBody()}
        {renderLinks()}
      </div>
    </div>
  );
}

Entry.propTypes = {
  className: PropTypes.string,
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    color: PropTypes.string,
    faicon: PropTypes.string,
    icon: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      link: PropTypes.string,
      caption: PropTypes.string,
    }),
    body: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        linkText: PropTypes.string.isRequired,
        extraText: PropTypes.string,
      })
    ),
  }),
};
