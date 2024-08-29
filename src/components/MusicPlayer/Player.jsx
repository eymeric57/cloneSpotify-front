import {useEffect, useRef} from "react";
import { MUSIC_URL } from "../../constants/apiConstant";

const Player = ({
                    activeSong,
                    volume,
                    isPlaying,
                    seekTime,
                    repeat,
                    currentIndex,
                    onEnded,
                    onTimeUpdate,
                    onLoadedData
                }) => {

    const ref = useRef(null);

    if (ref.current) {
        if (isPlaying) {
            ref.current.play(); // permet de lancer la musique dans le player
        } else  {
            ref.current.pause(); // permet de mettre en pause la musique dans le player
        }
    }

    useEffect(() => {
        ref.current.currentTime = seekTime;
    }, [seekTime]);

    useEffect(() => {
        ref.current.volume = volume;
    }, [volume]);

    


    return (
        <audio
        src={`${MUSIC_URL}/${activeSong?.filePath}`}
        ref={ref}
        loop={repeat}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}>

        </audio>
    );
};

export default Player;