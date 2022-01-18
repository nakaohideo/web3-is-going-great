import {
  collection,
  orderBy,
  query,
  limit,
  startAfter,
  startAt,
  where,
  FieldPath,
  getDocs,
} from "firebase/firestore/lite";
import { db } from "./db";

const DEFAULT_LIMIT = 10;

export const getEntries = async (data) => {
  const respLimit = data && data.limit ? limit : DEFAULT_LIMIT;

  const entriesCollection = collection(db, "entries");
  let q = query(
    entriesCollection,
    orderBy("id", data && data.sort === "Ascending" ? "asc" : "desc")
  );

  if (data && data.theme && data.theme.length) {
    q = query(
      q,
      where(new FieldPath("filters", "theme"), "array-contains-any", data.theme)
    );
  } else if (data && data.tech && data.tech.length) {
    q = query(
      q,
      where(new FieldPath("filters", "tech"), "array-contains-any", data.tech)
    );
  } else if (data && data.blockchain && data.blockchain.length) {
    q = query(
      q,
      where(
        new FieldPath("filters", "blockchain"),
        "array-contains-any",
        data.blockchain
      )
    );
  }

  if (data && data.cursor) {
    q = query(q, startAfter(data.cursor));
  } else if (data && data.startAtId) {
    q = query(q, startAt(data.startAtId));
  }
  q = query(q, limit(respLimit + 1));
  const snapshot = await getDocs(q);

  const entries = [];
  let hasMore = false;
  snapshot.forEach((child) => {
    if (entries.length < respLimit) {
      entries.push({ _key: child.id, ...child.data() });
    } else {
      hasMore = true;
    }
  });

  return { entries, hasMore };
};

export const getAllEntries = async () => {
  const entriesCollection = collection(db, "entries");
  const snapshot = await getDocs(entriesCollection);
  const entries = [];
  snapshot.forEach((child) => {
    entries.push({ _key: child.id, ...child.data() });
  });
  if (!entries.length) {
    throw new Error("internal");
  }
  return entries;
};
