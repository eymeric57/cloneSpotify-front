import React from "react";
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { CiShuffle } from "react-icons/ci";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

const Controles = ({
  isPlaying,
  currentSong,
  handleNextSong,
  handlePlayPause,
  handlePrevSong,
  shuffle,
  setShuffle,
  repeat,
  setRepeat,
}) => {
  return (
    <div className="flex flex-center justify-around items-center md:w-36 lg:w-52 2xl:w-80">
      {/* //on affiche le btn repeat */}
      <BsArrowRepeat
        size={20}
        color={repeat ? "rgba(30,215,96,1)" : "#FFF"}
        className="cursor-pointer hidden sm:block"
        onClick={() => setRepeat((prev) => !prev)}
      />

      {/* //on affiche le btn prev si ont a plus de 1 element dans le tableau  */}
      {currentSong?.length > 1 && (
        <MdSkipPrevious
          size={30}
          color={"#FFF"}
          className="cursor-pointer "
          onClick={handlePrevSong}
        />
      )}
      {/* //on affiche le play pause  */}
      {isPlaying ? (
        <BsFillPauseFill
          size={45}
          color={"#FFF"}
          className="cursor-pointer"
          onClick={handlePlayPause}
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color={"#FFF"}
          className="cursor-pointer"
          onClick={handlePlayPause}
        />
      )}

      {/* //on affiche le btn prev si ont a plus de 1 element dans le tableau  */}
      {currentSong?.length > 1 && (
        <MdSkipNext
          size={30}
          color={"#FFF"}
          className="cursor-pointer "
          onClick={handlePrevSong}
        />
      )}

      <CiShuffle
        size={20}
        color={shuffle ? "rgba(30,215,96,1)" : "#FFF"}
        className="cursor-pointer hidden sm:block"
        onClick={() => setShuffle((prev) => !prev)}
      />
    </div>
  );
};

export default Controles;
