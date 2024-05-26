import { Image } from 'antd';

import { FileType } from '../../graphql/type.interface';
import { PlayIcon } from '../../assets/icon';

type Props = {
  fileType: FileType;
  fullThumbUrl?: string;
  fullOriginalUrl?: string;
  key?: string | number;
  size?: number;
};

export const RenderImage = ({ fileType, fullOriginalUrl = '', fullThumbUrl = '', size = 80, key }: Props) => {
  const toggleFullScreen = () => {
    const id = 'full-screenVideo' + key;
    const el = document.getElementById(id);
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    }
  };

  if (fileType === FileType.VIDEO)
    return (
      <div className="relative w-[80px] h-[80px]">
        <video
          src={fullOriginalUrl}
          className="mr-8px rounded"
          width={size}
          height={size}
          key={key}
          controls
          id={'full-screenVideo' + key}
        />
        <div className="absolute top-[4px] left-[4px] text-white hover:cursor-pointer" onClick={toggleFullScreen}>
          <PlayIcon className="w-[26px] h-[26px]" />
        </div>
      </div>
    );
  return (
    <Image
      key={key}
      width={size}
      height={size}
      className="rounded-xl mr-8px"
      src={fullThumbUrl}
      preview={{
        src: fullOriginalUrl,
      }}
    />
  );
};
