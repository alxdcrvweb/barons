import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import useOnScreen from "../../hooks/useOnScreen";
import { ModalsEnum } from "../../modals";

const LoadImage = ({
  src,
  placeholder,
  open,
}: {
  src: string;
  placeholder: string;
  open?: () => any;
}) => {
  const [blur, setBlur] = useState(true);
  const [loaded, setLoaded] = useState(true);
  const containerRef = useRef() as React.MutableRefObject<HTMLImageElement>;
  const isOnScreen = useOnScreen(containerRef);

  useEffect(() => {
    if (isOnScreen && loaded) {
      if (loaded) {
        setBlur(false);
        console.log(src);
      }
    }
  }, [isOnScreen]);

  return (
    <div
      className={`image-container ${blur ? "blur" : "unblur"}`}
      ref={containerRef}
    >
      {isOnScreen && 
        <>
          <Image
            src={placeholder}
            className="placeholder-image"
            onClick={() => open && open()}
            layout="fill"
            objectFit="cover"
            unoptimized
          />
          <Image
            src={src}
            className="real-image"
            onClick={() => open && open()}
            layout="fill"
            objectFit="cover"
            unoptimized
            onLoadingComplete={() => {
              setLoaded(true);
            }}
          />
        </>
      }
    </div>
  );
};
export default LoadImage;
