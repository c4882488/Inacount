import React from "react";
import { AiFillCreditCard } from "react-icons/ai";
import { GrLink } from "react-icons/gr";
import Link from "@mui/material/Link";

import "./App.css";

const CardListItem = (props) => {
  const { creditCard } = props;
  return (
    <div className="card-item">
      <div className="card-itemDetail">
        <AiFillCreditCard className="card-icon" />
        <span className="card-itemDetail">{creditCard.cardName}</span>

        <hr />
      </div>
      <div className="card-itemDetail">
        <div>{creditCard.des}</div>
      </div>
      <div className="card-link">
        <Link href={creditCard.link}>
          <GrLink />
        </Link>
      </div>
    </div>
  );
};

export default CardListItem;
