import PropTypes from "prop-types";

export const EMPTY_ENTRY = {
  body: "",
  date: "",
  faicon: "",
  icon: "",
  filters: {
    blockchain: [],
    tech: [],
    theme: [],
  },
  links: [{ linkText: "", href: "", extraText: "" }],
  title: "",
  image: { src: "", alt: "", caption: "" },
  scamTotal: 0,
};

export const LinkFieldPropType = PropTypes.shape({
  linkText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  extraText: PropTypes.string,
});

export const EntryPropType = PropTypes.shape({
  id: PropTypes.string,
  filters: PropTypes.shape({
    theme: PropTypes.arrayOf(PropTypes.string).isRequired,
    tech: PropTypes.arrayOf(PropTypes.string),
    blockchain: PropTypes.arrayOf(PropTypes.string),
  }),
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
  links: PropTypes.arrayOf(LinkFieldPropType),
  scamTotal: PropTypes.number,
});

export const trimEmptyFields = (entry, imageAttribution, entryAttribution) => {
  const newEntry = JSON.parse(JSON.stringify(entry));
  let newImageAttribution = null;
  let newEntryAttribution = null;

  if (!entry.faicon) {
    delete newEntry.faicon;
  }
  if (!entry.icon) {
    delete newEntry.icon;
  }
  if (!entry.image.src) {
    delete newEntry.image;
  } else {
    newImageAttribution = imageAttribution;
    if (!entry.image.link) {
      delete newEntry.image.link;
    }
    if (!entry.image.caption) {
      delete newEntry.image.caption;
    }
  }
  if (entry.scamTotal === 0) {
    delete newEntry.scamTotal;
  }
  if (entryAttribution.text) {
    newEntryAttribution = entryAttribution;
  }
  const filteredLinks = entry.links
    .filter((link) => link.linkText && link.href)
    .map((link) => {
      if (link.extraText) {
        return link;
      } else {
        return { linkText: link.linkText, href: link.href };
      }
    });

  newEntry.links = filteredLinks;
  return {
    entry: newEntry,
    imageAttribution: newImageAttribution,
    entryAttribution: newEntryAttribution,
  };
};

export const isValidEntry = (entry, imageAttribution, entryAttribution) => {
  if (!entry.title || !entry.body || !entry.date) {
    return false;
  }
  if (
    Object.keys(entry.image).some((key) => !!entry.image[key]) &&
    (!entry.image.src || !entry.image.alt)
  ) {
    return false;
  }
  if (!entry.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return false;
  }
  if (!entry.faicon && !entry.icon) {
    return false;
  }
  if (
    (imageAttribution.text && !imageAttribution.href) ||
    (!imageAttribution.text && imageAttribution.href)
  ) {
    return false;
  }
  if (!entryAttribution.text && entryAttribution.href) {
    return false;
  }
  return true;
};
