/**
 * TEAM: frontend_infra
 * @flow strict
 */
/* eslint-disable react/prefer-stateless-function */

import * as React from "react";
import { css, StyleSheet } from "aphrodite";
import classnames from "classnames";
import { Colors } from "constants/Colors";
import iconSizes from "./iconSizes";

/**
 * @short Inline SVG iconography
 * @brandStatus V2
 * @status In Review
 * @category General
 *
 * Our current icon list can be accessed from our [Icon Guidelines](/design/components/iconography/system-icons).
 * @extends React.Component */
class Icon extends React.PureComponent<Props> {
  static defaultProps = {
    alignment: "baseline",
    isARIAAccessible: false,
    deprecatedAllowColorInheritance: true,
  };

  render() {
    const {
      alignment,
      className,
      color,
      deprecatedAllowColorInheritance,
      isARIAAccessible,
      iconName,
    } = this.props;
    const icon = iconData[iconName];
    // $FlowFixMe[unnecessary-invariant](uforic): This is here to double check.
    invariant(
      icon,
      `IconName received an invalid value. There is no option for "${iconName}". Check tools/icons.jsx for valid options.`,
    );

    const isElaborate = !!icon.elaboratePath;
    const iconColor = getIconColor(color);

    // HACK(@kaye): the "svgIcon" classname is needed because of OOCSS color inheritance
    const classes = classnames(css(styles.wrapper), className, {
      svgIcon: deprecatedAllowColorInheritance,
    });
    const viewBox = "0 0 64 64";
    const size = this.props.size || null;
    const customSize =
      this.props.customSize != null ? this.props.customSize : null;
    // proportions are set on the svg if we know the specific size intended.
    // Pass undefined if no size is defined to omit the attributes.
    // Browsers such as chrome throw errors if width/height have
    // empty values
    const proportion = size ? iconSizes[size] : undefined;
    return (
      <span
        className={classes}
        style={{
          ...getIconSize(size, customSize),
          ...{ fill: iconColor },
        }}
      >
        <svg
          className={css(
            alignment === "center" ? styles.svgCenter : styles.svgBaseline,
          )}
          color={iconColor}
          viewBox={viewBox}
          width={proportion}
          height={proportion}
          role="img"
          aria-hidden="true"
          aria-labelledby="title desc"
          style={{
            width: getDimensions(proportion, customSize),
            height: getDimensions(proportion, customSize),
          }}
        >
          <title id="title">{isARIAAccessible ? icon.name : ""}</title>
          <desc id="desc">{icon.description}</desc>
          <g fillRule="nonzero">
            {isElaborate
              ? icon.elaboratePath
              : icon.path.map((value, index) => (
                  <path
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    d={value}
                    role="presentation"
                    fillRule="evenodd"
                  />
                ))}
          </g>
        </svg>
      </span>
    );
  }
}

export default Icon;

/**
 * Passing a `customSize` will override the icon's `1em` sizing
 * (which is the default) and will normally allow the svg to inherit it's
 * size from the text-size.
 */
const getIconSize = (size, customSize) => {
  if (customSize != null && !size) {
    return {
      width: customSize,
      height: customSize,
      verticalAlign: -0.125 * customSize,
    };
  } else if (!size) {
    return {
      width: "1em",
      height: "1em",
      verticalAlign: "-0.125em",
    };
  }
  const sizeInPx = iconSizes[size];
  return {
    width: sizeInPx,
    height: sizeInPx,
    verticalAlign: -0.125 * sizeInPx,
  };
};

const getDimensions = (proportion, customSize) => {
  if (proportion != null) {
    // When `size` is defined, the width and height *styles* should be reset to "unset".
    return "unset";
  } else if (customSize != null) {
    // When `customSize` is defined, the width and height *styles* should be defined on the SVG.
    return customSize;
  }
  // When no `size` or `customSize` is specified, the icon should inherit it's size.
  return "auto";
};

const getIconColor = (color) => {
  if (color == null) {
    return "unset";
  }

  if (color === "inherit") {
    return "inherit";
  }
  return Colors[color];
};

export const styles = StyleSheet.create({
  wrapper: {
    display: "inline-block",
    position: "relative",
  },
  svgCenter: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    fontSize: 0,
  },
  svgBaseline: {
    position: "absolute",
    bottom: "-0.125em",
    left: 0,
    fontSize: 0,
  },
});

export const _test = { Icon };
