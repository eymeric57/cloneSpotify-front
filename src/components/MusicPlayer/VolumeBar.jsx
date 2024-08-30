import {BiVolumeFull, BiVolumeLow, BiVolumeMute} from "react-icons/bi";

const VolumeBar = ({
                       value,
                       min,
                       max,
                       onChange,
                       setVolume
                   }) => {

    return (
        <div className={'hidden lg:flex flex-1 items-center justify-end'}>
            {value <= 1 && value > .5 &&
                <BiVolumeFull className={'cursor-pointer'}
                              size={25}
                              color={'#FFF'}
                              onClick={() => setVolume(0)}
                />}
            {value <= .5 && value > 0 &&
                <BiVolumeLow className={'cursor-pointer'}
                             size={25}
                             color={'#FFF'}
                             onClick={() => setVolume(0)}
                />}
            {value == 0 &&
                <BiVolumeMute className={'cursor-pointer'}
                              size={25}
                              color={'#FFF'}
                              onClick={() => setVolume(.5)}
                />}
            <input
                type={'range'}
                step={'any'}
                value={value}
                min={min}
                max={max}
                onChange={onChange}
                className={'2xl:w-40 lg:w-32 h-1 ml-2 text-green'}
            />
            <p className={'text-white ml-1'}>{Math.floor(value * 100)}%</p>
        </div>
    );
};

export default VolumeBar;