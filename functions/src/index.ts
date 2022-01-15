import { getEntries, getEntry } from "./entries";
import { addAttribution, getAttribution } from "./attribution";
import { uploadEntry } from "./admin";

import { updateRssOnChange, serveRss, serveStagedRss } from "./rss";
import { updateWeb1OnChange, serveWeb1 } from "./web1";

exports.getEntries = getEntries;
exports.getEntry = getEntry;

exports.getAttribution = getAttribution;

exports.updateRssOnChange = updateRssOnChange;
exports.serveRss = serveRss;
exports.serveStagedRss = serveStagedRss;

exports.updateWeb1OnChange = updateWeb1OnChange;
exports.serveWeb1 = serveWeb1;

// Admin
exports.uploadEntry = uploadEntry;
exports.addAttribution = addAttribution;
