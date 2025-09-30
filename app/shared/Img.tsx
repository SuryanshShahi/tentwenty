import Image, { ImageProps } from "next/image";
import { ReactElement } from "react";

interface IImg extends ImageProps {
  isLocal?: boolean;
}

const Img = ({
  alt,
  src,
  width,
  height,
  isLocal,
  ...props
}: IImg): ReactElement => {
  const sourcePrefix = process.env.NEXT_PUBLIC_BASE_URL || "";
  const source = !isLocal && sourcePrefix ? `${sourcePrefix}${src}` : src;

  return (
    <Image
      src={source || "/images/icons/emptyState.png"}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default Img;
