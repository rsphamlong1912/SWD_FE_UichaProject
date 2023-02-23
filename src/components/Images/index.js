import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import images from "~/assets/images";

const Image = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallback: customFallback = images.noImage,
      ...props
    },
    ref
  ) => {
    const [fallback, setFaffback] = useState("");
    const handleError = () => {
      setFaffback(customFallback);
    };
    return (
      <img
        className={classNames(className)}
        ref={ref}
        src={src !== null ? fallback || src : fallback}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  }
);

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  classNames: PropTypes.string,
  fallback: PropTypes.string,
};

export default Image;
