import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";

import { useGetCardsQuery } from "../../../api/v1/dashboard";
import useWebSocket from "../../../hooks/ws";
import Card from "../../../Components/Card/Index";
import GhostCards from "./Ghost";
import MediaCarousel from "../../../Components/MediaCarousel/Index";

import "./Index.scss";

function CardList() {
  const location = useLocation();

  const { data: items, error, isFetching, refetch } = useGetCardsQuery();

  const [throttleEventNewCardID, setThrottleEventNewCardID] = useState<
    number | null
  >(null);

  const ws = useWebSocket();

  const handleWS = useCallback(
    (e: any) => {
      const { type } = JSON.parse(e.data);

      if (type === "EventNewCard") {
        if (throttleEventNewCardID) {
          clearTimeout(throttleEventNewCardID);
          setThrottleEventNewCardID(null);
        }

        const id = window.setTimeout(() => {
          refetch();
        }, 500);

        setThrottleEventNewCardID(id);
      }
    },
    [refetch, throttleEventNewCardID]
  );

  useEffect(() => {
    if (!ws) return;

    ws.addEventListener("message", handleWS);
    return () => ws.removeEventListener("message", handleWS);
  }, [handleWS, ws]);

  let card_list;

  if (isFetching || error) {
    card_list = <GhostCards />;
  } else if (items) {
    const sectionsEmpty = Object.values(items).flat().length === 0;
    const emptyDashboard = sectionsEmpty && location.pathname === "/";

    if (emptyDashboard) {
      card_list = <GhostCards />;
    }

    const itemKeys = Object.keys(items);



    if (itemKeys.length > 0 && !emptyDashboard) {
      const sections = Object.entries(items).reduce(
        (memo, [section, sectionItems]) => {
          memo[section] = sectionItems.map((card, i) => (
            <div key={i} style={{ minWidth: "220px", width: "220px" }}>
              <Card data={card} />
            </div>
          ));
          return memo;
        },
        {} as Record<string, React.ReactElement[]>
      );

      card_list = Object.entries(sections).map(
        ([sectionName, sectionElements]) => (
          <section key={sectionName}>
            <div className="sectionHeader">
              <h1>{sectionName.toLowerCase()}</h1>
            </div>
            {sectionElements.length === 0 &&
              (sectionName === "CONTINUE WATCHING" ? (
                <p className="sectionDesc">
                  Anything you watch will show up here in your recents.
                </p>
              ) : (
                <p className="sectionDesc">No media has been found</p>
              ))}
            {sectionElements.length > 0 && (
              <MediaCarousel>{sectionElements}</MediaCarousel>
            )}
          </section>
        )
      );
    }
  }

  return <div className="card_list">{card_list}</div>;
}

export default CardList;
