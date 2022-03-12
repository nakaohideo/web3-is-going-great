import moment from "moment";

export const sentenceCase = function (str) {
  if (typeof str !== "string" || !str.length) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export const humanizeDate = function (date) {
  const m = moment(date);
  return m.format("LL");
};

export const humanizeList = function (list, { exclusive }) {
  if (list.length > 1) {
    const result = [];
    const finalConnector = exclusive ? "or" : "and";
    for (let i = 0; i < list.length; i++) {
      result.push(list[i]);
      if (i < list.length - 2) {
        result.push(<span key={`joiner-${i}`}>, </span>);
      } else if (i === list.length - 2) {
        result.push(
          <span key={`joiner-${i}`}>{`${
            list.length === 2 ? "" : ","
          } ${finalConnector} `}</span>
        );
      }
    }
    return result;
  }
  return list;
};

export const isWrappedInParagraphTags = function (html) {
  if (typeof html !== "string") {
    return false;
  }
  return html.substring(0, 3) === "<p>";
};

export const stripHtml = function (html) {
  return html.replace(/<[^>]+>/g, "").replace("&nbsp;", " ");
};

export const getImageDimensions = (imageSrc) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ height: img.height, width: img.width });
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = imageSrc;
  });

export function truncateToNearestWord(str, length, startPosition = 0) {
  if (typeof str !== "string" || (startPosition === 0 && str.length < length)) {
    return str;
  }

  let toTrim;
  if (startPosition) {
    const startIndex = str.indexOf(" ", startPosition);
    toTrim = str.slice(startIndex + 1); // +1 trims off the space too
  } else {
    // Slice anyway to copy (to avoid mutations)
    toTrim = str.slice();
  }

  if (toTrim.length < length) {
    return toTrim;
  }

  const endIndex = toTrim.lastIndexOf(" ", length);
  return toTrim.slice(0, endIndex);
}

export const getPermalink = (params) => {
  const query = new URLSearchParams(params);
  const permalink = `${window.location.origin}${
    window.location.pathname
  }?${query.toString()}`;
  return permalink;
};

export const removeQueryParamsFromUrl = () => {
  const permalink = `${window.location.origin}${window.location.pathname}`;
  window.history.pushState(null, null, permalink);
  return permalink;
};

export const copy = (obj) => JSON.parse(JSON.stringify(obj));

export const getCollectionName = (coll, allCollections) =>
  coll in allCollections
    ? allCollections[coll]
    : sentenceCase(coll.replace("-", " "));
