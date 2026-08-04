import HistoryCard from "../HistoryCard/HistoryCard";

function HistoryList({ history }) {
    return (
        <div className="grid gap-6">

            {history.map((item) => (
                <HistoryCard
                    key={item._id}
                    item={item}
                />
            ))}

        </div>
    );
}

export default HistoryList;