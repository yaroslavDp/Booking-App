import React from "react";
import { TripItemType } from "../../../types/TripType";
import "./TripItem.css";
import { Link } from "react-router-dom";


const TripItem:React.FC<TripItemType> = ({ id, title, level, duration, price, image }) => {
    return (
        <li data-test-id="trip-card" className="trip-card">
            <img
              data-test-id="trip-card-image"
              src={image}
              alt={`trip ${title}`}
            />
            <div className="trip-card__content">
              <div className="trip-info">
                <h3 data-test-id="trip-card-title" className="trip-info__title">
                  {title}
                </h3>
                <div className="trip-info__content">
                  <span
                    data-test-id="trip-card-duration"
                    className="trip-info__duration"
                  >
                    <strong>{duration}</strong> days
                  </span>
                  <span data-test-id="trip-card-level" className="trip-info__level">
                    {level}
                  </span>
                </div>
              </div>
              <div className="trip-price">
                <span>Price</span>
                <strong
                  data-test-id="trip-card-price-value"
                  className="trip-price__value"
                >
                  {price} $
                </strong>
              </div>
            </div>
            <Link data-test-id="trip-card-link" to={`/trip/${id}`} className="button">
              Discover a trip
            </Link>
        </li>
    )
}

export default TripItem;