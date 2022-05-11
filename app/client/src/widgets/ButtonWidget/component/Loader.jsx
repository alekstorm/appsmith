/**
 * TEAM: frontend_infra
 * @flow strict
 */

import * as React from "react";
import { css, StyleSheet } from "aphrodite";
import { Colors } from "constants/Colors";

const LOADER_SIZE = 50;

const rotateKeyframes = {
  "100%": {
    transform: "rotate(360deg)",
  },
};

const styles = StyleSheet.create({
  center: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  circularWrapper: {
    position: "relative",
    display: "inline-block",
  },
  loader: {
    animationName: rotateKeyframes,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    transformOrigin: "center center",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  overlayContainer: {
    position: "relative",
  },
  overlayElement: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255,255,255,0.78)",
  },
  fullWidthContainer: {
    width: "100%",
  },
});

const cyclePrimaryKeyframes = ({ dark, light, medium }) => ({
  "100%, 0%": {
    stroke: medium,
  },
  "40%": {
    stroke: dark,
  },
  "66%": {
    stroke: light,
  },
  "80%, 90%": {
    stroke: dark,
  },
});

const indefiniteKeyframes = {
  "0%": {
    strokeDasharray: "1, 124",
  },
  "50%": {
    strokeDasharray: "96, 32",
  },
  "100%": {
    strokeDasharray: "1, 124",
  },
};

const keyframeColors = {
  light: Colors.grey40,
  medium: Colors.grey50,
  dark: Colors.grey60,
};

const darkBackgroundKeyframeColors = {
  light: Colors.grey20,
  medium: Colors.grey30,
  dark: Colors.grey40,
};

const spinnerStyles = StyleSheet.create({
  loaderPath: {
    animationDuration: "2.25s",
    animationTimingFunction: "ease-in-out, ease-in-out",
    animationIterationCount: "infinite, infinite",
    strokeDashoffset: 0,
  },
  standard: {
    animationName: [indefiniteKeyframes, cyclePrimaryKeyframes(keyframeColors)],
  },
  darkBackground: {
    animationName: [
      indefiniteKeyframes,
      cyclePrimaryKeyframes(darkBackgroundKeyframeColors),
    ],
  },
});

/**
 * @short A pure CSS loader with an indeterminate loading animation that should be used as a placeholder element to indicate that data is loading.
 * @brandStatus V2
 * @status Stable
 * @category Data Display
 */
function Loader({
  children,
  loaded,
  isFullWidth = true,
  size = LOADER_SIZE,
  darkBackground = false,
  overlay = false,
  dataQaId,
}) {
  const loader = (
    <div data-qa-id={dataQaId} className={css(styles.overlayContainer)}>
      <div
        className={css(
          styles.circularWrapper,
          isFullWidth && styles.center,
          overlay && styles.overlayElement,
        )}
        style={{ width: size, height: size }}
      >
        <svg className={css(styles.loader)} viewBox="25 25 50 50">
          <circle
            className={css(
              spinnerStyles.loaderPath,
              darkBackground
                ? spinnerStyles.darkBackground
                : spinnerStyles.standard,
            )}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <span className={css(isFullWidth && styles.fullWidthContainer)}>
      {loaded === false ? loader : children}
    </span>
  );
}

export default Loader;
