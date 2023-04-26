import React from "react";
import "../../../css/list.css";

const List = ({ datas, presenterData }) => {
    return (
        <ul className="list">
            {presenterData.map((presenter, i) => {
                return (
                    <li className="list-item" key={i}>
                        <span className="label">{presenter.label}</span>
                        <span className="value">
                            {datas[presenter.key] ? datas[presenter.key] : "-"}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};

export default List;
