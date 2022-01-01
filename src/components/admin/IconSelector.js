import React from "react";
import PropTypes from "prop-types";

import FILTERS from "../../constants/filters";

import Select from "react-select";

const ALL_ICONS = {
  poo: { type: "fa", value: "poo", text: FILTERS.theme.badIdea },
  bug: { type: "fa", value: "bug", text: FILTERS.theme.bug },
  "face-frown": {
    type: "fa",
    value: "face-frown",
    text: FILTERS.theme.bummer,
  },
  fakeNews: { type: "img", value: "fakeNews", text: FILTERS.theme.fakeNews },
  hack: { type: "img", value: "hack", text: FILTERS.theme.hack },
  hmm: { type: "img", value: "hmm", text: FILTERS.theme.hmm },
  rugPull: { type: "img", value: "rugPull", text: FILTERS.theme.rugPull },
  shady: { type: "img", value: "shady", text: FILTERS.theme.shady },
};

export default function IconSelector({ updateEntry, value }) {
  const onChange = ({ value }) => {
    const selectedIcon = ALL_ICONS[value];
    if (selectedIcon.type === "fa") {
      updateEntry({ faicon: selectedIcon.value, icon: "" });
    } else {
      updateEntry({ icon: selectedIcon.value, faicon: "" });
    }
  };

  return (
    <Select
      options={Object.entries(ALL_ICONS).map(([key, value]) => ({
        value: key,
        label: value.text,
      }))}
      placeholder="Icon"
      onChange={onChange}
      value={value ? { value, label: ALL_ICONS[value].text } : null}
    ></Select>
  );
}

IconSelector.propTypes = {
  updateEntry: PropTypes.func.isRequired,
  value: PropTypes.string,
};
