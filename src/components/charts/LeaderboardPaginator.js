import PropTypes from "prop-types";
import { EntryPropType } from "../../js/entry";
import { useRouter } from "next/router";
import { copy } from "../../js/utilities";

export default function LeaderboardPaginator({ hasPrev, hasNext, entries }) {
  const router = useRouter();

  const navigate = ({ cursor, direction }) => {
    router.push({ query: { ...router.query, cursor, direction } });
  };

  return (
    <div className="leaderboard-paginator">
      {hasPrev ? (
        <>
          <button
            onClick={() => {
              const newQuery = copy(router.query);
              delete newQuery.cursor;
              delete newQuery.direction;
              router.push({ query: newQuery });
            }}
          >
            <i className="fas fa-angles-left" title="Go to previous page" />
          </button>
          <button
            onClick={() =>
              navigate({
                cursor: entries[0].scamAmountDetails.total,
                direction: "prev",
              })
            }
          >
            <i className="fas fa-angle-left" title="Go to first page" />
          </button>
        </>
      ) : (
        <span />
      )}
      {hasNext ? (
        <button
          onClick={() =>
            navigate({
              cursor: entries[entries.length - 1].scamAmountDetails.total,
              direction: "next",
            })
          }
        >
          <i className="fas fa-angle-right" title="Go to next page" />
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}
LeaderboardPaginator.propTypes = {
  entries: PropTypes.arrayOf(EntryPropType).isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrev: PropTypes.bool,
};
