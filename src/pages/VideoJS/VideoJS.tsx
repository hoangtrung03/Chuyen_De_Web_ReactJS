import React from 'react';
//@ts-ignore
import styles from './VideoJs.module.scss';
//@ts-ignore
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export interface VideoJsProps {
  options: videojs.PlayerOptions;
}

export interface VideoJsDataType { }

const VideoJs: React.FC<VideoJsProps> = (options) => {

  const initialOptions: videojs.PlayerOptions = {
    controls: true,
    fluid: true,
    controlBar: {
      volumePanel: {
        inline: false
      }
    }
  };
  const videoNode = React.useRef<HTMLVideoElement>();
  const player = React.useRef<videojs.Player>();

  React.useEffect(() => {
    player.current = videojs(videoNode.current, {
      ...initialOptions,
      ...options
    }).ready(function () {
      // console.log('onPlayerReady', this);
    });
    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [options]);

  return <video ref={videoNode} className="video-js" />;
};

export default VideoJs;