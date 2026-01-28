import { Link } from "react-router-dom";

import { useAppSelector } from "../../../hooks/store";
import { DashboardPoster } from "../../../api/v1/dashboard";
import ProgressBar from "./ProgressBar";
import Image from "./Image";
import TruncText from "../../../Helpers/TruncText";
import NewLibraryModal from "../../../Modals/NewLibrary/Index";
import SelectMediaFile from "../../../Modals/SelectMediaFile/Index";
import SelectMediaFilePlayButton from "../../../Modals/SelectMediaFile/Activators/PlayButton";
import CircleIcon from "../../../assets/Icons/Circle";

import "./Banner.scss";

interface Props {
  data?: DashboardPoster;
  isError: boolean;
  isFetching: boolean;
}

function Banner({ data, isError, isFetching }: Props) {
  const { libraries, user } = useAppSelector((store) => ({
    libraries: store.library.fetch_libraries,
    user: store.user,
  }));

  if (isFetching || isError) {
    return (
      <div className="banner">
        <div className="placeholder" />
      </div>
    );
  } else {
    if (!data && libraries.fetched && libraries.items.length > 0) {
      return (
        <div className="banner">
          <div className="placeholder">
            <h2>Your libraries are empty</h2>
            <p>
              Populate the folders they are pointing to with media or add
              another library with existing media
            </p>
            {user.info.roles?.includes("owner") && (
              <NewLibraryModal>
                <button>Add another library</button>
              </NewLibraryModal>
            )}
          </div>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="banner">
          <div className="placeholder">
            <h2>Add your first library</h2>
            <p>
              You will be able to see all the media from your libraries here,
              organized for quick and easy access.
            </p>
            {user.info.roles?.includes("owner") && (
              <NewLibraryModal>
                <button>Add library</button>
              </NewLibraryModal>
            )}
          </div>
        </div>
      );
    }

    const {
      id,
      title,
      year,
      synopsis,
      backdrop,
      delta,
      duration,
      genres,
      season,
      episode,
    } = data;

    const progressBarData = {
      season,
      episode,
      duration,
      delta,
    };

    return (
      <div className="banner">
        <Image src={backdrop} />

        <div className="info">
          <h1>{title}</h1>
          <div className="meta-row">
            <span>{year}</span>
            {genres.length > 0 && <span>•</span>}
            <span>{genres[0]}</span>
            {/* Add duration/season info if needed */}
          </div>

          <p className="description">
            <TruncText content={synopsis} max={150} />
          </p>

          <div className="buttons">
            {/* Play Button */}
            <SelectMediaFile title={title} mediaID={id}>
              <button className="play-btn">
                {/* Play Icon SVG */}
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Play
              </button>
            </SelectMediaFile>

            {/* More Info Button */}
            <button className="info-btn" onClick={() => {/* Navigate entirely to details? OR Modal? For now allow click to search/details */ }}>
              {/* Info Icon SVG */}
              <svg viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
              More Info
            </button>
          </div>
        </div>
        {/* <ProgressBar data={progressBarData} /> -- Hiding progress bar in Hero for cleaner look */}
      </div>
    );
  }
}

export default Banner;
