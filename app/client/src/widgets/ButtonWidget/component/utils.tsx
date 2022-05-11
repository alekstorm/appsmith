import { css } from "styled-components";

import { ButtonVariantTypes } from "components/constants";
import { getCustomHoverColor } from "widgets/WidgetUtils";
import { ButtonContainerProps } from "./DragContainer";
import { Colors } from "constants/Colors";

/*
  Created a css util so that we don't repeat our styles.
  Add more styles in the future also make sure you pass the
  same props to the ButtonContainerProps, because we have to
  repeat on the button and the container.
*/

export const buttonHoverActiveStyles = css<ButtonContainerProps>`
  ${({ buttonColor, buttonVariant, disabled, loading, theme }) => {
    if (!disabled && !loading) {
      return `
        background: ${
          getCustomHoverColor(theme, buttonVariant, buttonColor) !== "none"
            ? getCustomHoverColor(theme, buttonVariant, buttonColor)
            : buttonVariant === ButtonVariantTypes.SECONDARY
            ? theme.colors.button.primary.secondary.hoverColor
            : buttonVariant === ButtonVariantTypes.TERTIARY
            ? theme.colors.button.primary.tertiary.hoverColor
            : theme.colors.button.primary.primary.hoverColor
        } !important;
      `;
    }
  }}
`;

const styles = (theme: any, intent: any) => {
  const buttonColors = getColors(theme, intent);
  const transformationProperties = {
    transitionProperty:
      "background, box-shadow, color, fill, border, border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-in-out",
  };

  const button = {
    base: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      userSelect: "none",
      borderRadius: "0",
      ...typeScale.base,
      fontWeight: fontWeights.bold,
      ...include(padding.h.m),
      ...include(padding.v.n),
      whiteSpace: "nowrap",
      outline: "none",
      maxWidth: "100%",
      ...transformationProperties,
      background: "none",
      ":hover span svg": transformationProperties,
      ":focus span svg": transformationProperties,
      ":active span svg": transformationProperties,
    },

    solid: {
      background: buttonColors.primary1,
      borderWidth: "0",
      color: Colors.white,
      fill: Colors.white,
      ":focus": {
        boxShadow: `0 0 0 3px ${buttonColors.highlight}`,
      },
      ":hover": {
        boxShadow: `0 2px 2px ${buttonColors.shadow}`,
      },
      ":active": {
        background: buttonColors.primary3,
        boxShadow: "none",
      },
    },
    hollow: {
      color: buttonColors.primary1,
      fill: buttonColors.primary1,
      background: Colors.white,
      border: `2px solid ${Colors.grey20}`,
      paddingWidth: `calc(${deprecatedPaddingSizeConstants.m} - 1px)`,
      ":focus": {
        boxShadow: `0 0 0 3px ${buttonColors.highlight}`,
        borderColor: buttonColors.primary2,
      },
      ":hover": {
        boxShadow: `0 2px 2px ${buttonColors.shadow}`,
      },
      ":active": {
        color: buttonColors.primary3,
        borderColor: buttonColors.primary2,
        background: Colors.grey10,
        boxShadow: "none",
      },
      ":active span svg": {
        fill: buttonColors.primary3,
      },
    },
    bare: {
      color: buttonColors.primary1,
      fill: buttonColors.primary1,
      borderWidth: "0",
      boxShadow: "none",
      ":focus": {
        boxShadow: `0 0 0 3px ${buttonColors.highlight}`,
      },
      ":hover": {
        background: Colors.grey10,
        boxShadow: "none",
      },
      ":active": {
        background: Colors.grey20,
        color: buttonColors.primary3,
      },
      ":active span svg": {
        fill: buttonColors.primary3,
      },
    },
    blank: {
      position: "relative",
      color: buttonColors.primary1,
      fill: buttonColors.primary1,
      borderColor: "transparent",
      boxShadow: "none",
      border: "none",
      height: "100%",
      ...include(padding.a.n),
      ":after": {
        content: '""',
        position: "absolute",
        width: "100%",
        height: "calc(100% + 4px)",
        boxShadow: "none",
        pointerEvents: "none",
        ...transformationProperties,
      },
      ":focus": {
        ":after": {
          boxShadow: `0 0 0 3px ${buttonColors.highlight}`,
        },
      },
      ":active": {
        color: buttonColors.primary3,
      },
      ":active span svg": {
        fill: buttonColors.primary3,
      },
    },

    s: {
      height: "24px",
      maxHeight: "24px",
    },
    m: {
      height: "30px",
      maxHeight: "30px",
    },
    l: {
      height: "40px",
      maxHeight: "40px",
    },

    responsive: {
      width: "min-content",
    },
    full: {
      flexGrow: 1,
      flexShrink: 0,
      width: "100%",
    },

    isLoading: {
      color: "transparent",
      pointerEvents: "none",
      boxShadow: "none",
      borderColor: "transparent",
      backgroundColor: Colors.grey10,
      ":disabled": {
        color: "transparent",
      },
      ":disabled :nth-child(2) svg path": {
        fill: "transparent",
      },
    },
  };

  const disabledButton = {
    base: {
      cursor: "not-allowed",
      pointerEvents: "none",
      boxShadow: "none",
    },
    solid: {
      background: Colors.grey30,
      color: Colors.grey40,
      fill: Colors.grey40,
    },
    hollow: {
      borderColor: "transparent",
      background: Colors.grey30,
      color: Colors.grey40,
      fill: Colors.grey40,
    },
    bare: {
      color: Colors.grey30,
      ":nth-child(1n) span svg": {
        fill: Colors.grey30,
      },
    },
    blank: {
      color: Colors.grey30,
      ":nth-child(1n) span svg": {
        fill: Colors.grey30,
      },
    },
  };

  const label = {
    base: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      ...typeScale.base,
      fontWeight: fontWeights.bold,
    },
    solid: {},
    hollow: {},
    bare: {
      position: "relative",
      paddingBottom: "1px",
      ":after": {
        content: '""',
        position: "absolute",
        background: buttonColors.primary1,
        width: "100%",
        height: "2px",
        bottom: "0px",
        left: "0",
        ...transformationProperties,
      },
      ":active": {
        ":after": {
          background: buttonColors.primary3,
        },
      },
    },
    blank: {
      position: "relative",
      paddingLeft: "1px",
      paddingRight: "1px",
      overflow: "visisble",
      ":after": {
        content: '""',
        position: "absolute",
        background: buttonColors.primary1,
        width: "calc(100% - 1px)",
        height: "2px",
        bottom: "-1px",
        left: "0",
        ...transformationProperties,
      },
      ":active": {
        ":after": {
          background: buttonColors.primary3,
        },
      },
    },

    isLoading: {
      ":after": {
        background: "transparent",
      },
    },
  };

  const disabledLabel = {
    solid: {},
    hollow: {},
    bare: {
      ":after": {
        background: Colors.grey30,
      },
    },
    blank: {
      ":after": {
        background: Colors.grey30,
      },
    },
  };

  return {
    button,
    disabledButton,
    label,
    disabledLabel,
  };
};

export const getButtonStyle = (
  theme: any,
  kind: any,
  intent: any,
  size: any,
  width: any,
  disabled: any,
  optionals: any,
) => {
  const isLoading = optionals ? optionals.isLoading || false : false;

  const styleSheet = styles("Base", intent);

  const buttonStyles = [
    // @ts-ignore
    styleSheet.button.base,
    // @ts-ignore
    styleSheet.button[size],
    // @ts-ignore
    styleSheet.button[kind],
    // @ts-ignore
    styleSheet.button[width],
    // @ts-ignore
    disabled ? styleSheet.disabledButton.base : null,
    // @ts-ignore
    disabled ? styleSheet.disabledButton[kind] : null,
    // @ts-ignore
    isLoading ? styleSheet.button.isLoading : null,
  ];

  const labelStyles = [
    // @ts-ignore
    styleSheet.label.base,
    // @ts-ignore
    styleSheet.label[kind],
    // @ts-ignore
    disabled ? styleSheet.disabledLabel[kind] : null,
    // @ts-ignore
    isLoading ? styleSheet.label.isLoading : null,
  ];

  return {
    button: buttonStyles,
    label: labelStyles,
  };
};

export const sharedStyles = {
  resetButton: {
    border: "none",
    margin: "0",
    padding: "0",
    width: "auto",
    overflow: "visible",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    lineHeight: "normal",
  },
  shadow: {
    boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.06)",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    animationName: {
      from: {
        opacity: "0",
      },
      to: {
        opacity: "1",
      },
    },
    animationDuration: "150ms",
  },
};

export function include(style: any) {
  if (style == null) {
    return {};
  }
  invariant(style._definition != null, "Style must have a definition");
  return style._definition;
}

export const uiFontFamily = [
  "gt-america",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Fira Sans",
  "Droid Sans",
  "Helvetica Neue",
  "sans-serif",
];

export const fontWeights = Object.freeze({
  regular: "400",
  bold: "700",
  boldExtended: "800",
});

export const fontStyles = Object.freeze({
  normal: "normal",
  italic: "italic",
});

export const typeScale = {
  display: {
    fontSize: "32px",
    fontFamily: uiFontFamily,
    lineHeight: "48px",
    letterSpacing: -0.02,
    fontWeight: fontWeights.bold,
    fontStyle: fontStyles.normal,
  },
  headline: {
    fontSize: "24px",
    fontFamily: uiFontFamily,
    lineHeight: "32px",
    letterSpacing: -0.02,
    fontWeight: fontWeights.boldExtended,
    fontStyle: fontStyles.normal,
  },
  title: {
    fontSize: "16px",
    fontFamily: uiFontFamily,
    lineHeight: "20px",
    letterSpacing: 0,
    fontWeight: fontWeights.bold,
    fontStyle: fontStyles.normal,
  },
  base: {
    fontSize: "14px",
    fontFamily: uiFontFamily,
    lineHeight: "20px",
    letterSpacing: 0,
    fontWeight: fontWeights.regular,
    fontStyle: fontStyles.normal,
  },
  subtext: {
    fontSize: "12px",
    fontFamily: uiFontFamily,
    lineHeight: "16px",
    letterSpacing: 0,
    fontWeight: fontWeights.regular,
    fontStyle: fontStyles.normal,
  },
  tiny: {
    fontSize: "9px",
    fontFamily: uiFontFamily,
    lineHeight: "12px",
    letterSpacing: 0,
  },
};

function invariant(condition: any, format: any, ...args: any) {
  if (!condition) {
    // We use sprintf instead of template strings because we only want to do the
    // (sometimes nontrivial) work of building the final message when the
    // invariant is violated.
    let i = 0;
    const message = format
      ? format.replace(/%s/g, () => {
          const a = args[i];
          i += 1;
          return a;
        })
      : "Invariant violated without message.";
    throw new Error(message);
  }
}

export default invariant;

const getColors = (theme: any, intent: any) => {
  let colorSwatch = {
    primary1: Colors.indigo30,
    primary2: Colors.indigo30,
    primary3: Colors.indigo50,
    highlight: Colors.indigo20,
    shadow: "rgba(39, 44, 52, 0.12)",
  };

  if (intent === "danger") {
    colorSwatch = {
      primary1: Colors.red40,
      primary2: Colors.red40,
      primary3: Colors.red50,
      highlight: Colors.red20,
      shadow: "rgba(39, 44, 52, 0.12)",
    };
  } else if (intent === "none") {
    colorSwatch = {
      primary1: Colors.black,
      primary2: Colors.grey40,
      primary3: Colors.black,
      highlight: Colors.grey20,
      shadow: "rgba(39, 44, 52, 0.12)",
    };
  }

  return colorSwatch;
};

const deprecatedPaddingSizeConstants = {
  none: "0px",
  xs: "3px",
  s: "6px",
  m: "12px",
  l: "21px",
  xl: "36px",
};

const padding = {
  a: {
    n: { padding: deprecatedPaddingSizeConstants.none },
    xs: { padding: deprecatedPaddingSizeConstants.xs },
    s: { padding: deprecatedPaddingSizeConstants.s },
    m: { padding: deprecatedPaddingSizeConstants.m },
    l: { padding: deprecatedPaddingSizeConstants.l },
    xl: { padding: deprecatedPaddingSizeConstants.xl },
  },
  h: {
    n: {
      paddingLeft: deprecatedPaddingSizeConstants.none,
      paddingRight: deprecatedPaddingSizeConstants.none,
    },
    xs: {
      paddingLeft: deprecatedPaddingSizeConstants.xs,
      paddingRight: deprecatedPaddingSizeConstants.xs,
    },
    s: {
      paddingLeft: deprecatedPaddingSizeConstants.s,
      paddingRight: deprecatedPaddingSizeConstants.s,
    },
    m: {
      paddingLeft: deprecatedPaddingSizeConstants.m,
      paddingRight: deprecatedPaddingSizeConstants.m,
    },
    l: {
      paddingLeft: deprecatedPaddingSizeConstants.l,
      paddingRight: deprecatedPaddingSizeConstants.l,
    },
    xl: {
      paddingLeft: deprecatedPaddingSizeConstants.xl,
      paddingRight: deprecatedPaddingSizeConstants.xl,
    },
  },
  v: {
    n: {
      paddingTop: deprecatedPaddingSizeConstants.none,
      paddingBottom: deprecatedPaddingSizeConstants.none,
    },
    xs: {
      paddingTop: deprecatedPaddingSizeConstants.xs,
      paddingBottom: deprecatedPaddingSizeConstants.xs,
    },
    s: {
      paddingTop: deprecatedPaddingSizeConstants.s,
      paddingBottom: deprecatedPaddingSizeConstants.s,
    },
    m: {
      paddingTop: deprecatedPaddingSizeConstants.m,
      paddingBottom: deprecatedPaddingSizeConstants.m,
    },
    l: {
      paddingTop: deprecatedPaddingSizeConstants.l,
      paddingBottom: deprecatedPaddingSizeConstants.l,
    },
    xl: {
      paddingTop: deprecatedPaddingSizeConstants.xl,
      paddingBottom: deprecatedPaddingSizeConstants.xl,
    },
  },
  t: {
    n: { paddingTop: deprecatedPaddingSizeConstants.none },
    xs: { paddingTop: deprecatedPaddingSizeConstants.xs },
    s: { paddingTop: deprecatedPaddingSizeConstants.s },
    m: { paddingTop: deprecatedPaddingSizeConstants.m },
    l: { paddingTop: deprecatedPaddingSizeConstants.l },
    xl: { paddingTop: deprecatedPaddingSizeConstants.xl },
  },
  r: {
    n: { paddingRight: deprecatedPaddingSizeConstants.none },
    xs: { paddingRight: deprecatedPaddingSizeConstants.xs },
    s: { paddingRight: deprecatedPaddingSizeConstants.s },
    m: { paddingRight: deprecatedPaddingSizeConstants.m },
    l: { paddingRight: deprecatedPaddingSizeConstants.l },
    xl: { paddingRight: deprecatedPaddingSizeConstants.xl },
  },
  b: {
    n: { paddingBottom: deprecatedPaddingSizeConstants.none },
    xs: { paddingBottom: deprecatedPaddingSizeConstants.xs },
    s: { paddingBottom: deprecatedPaddingSizeConstants.s },
    m: { paddingBottom: deprecatedPaddingSizeConstants.m },
    l: { paddingBottom: deprecatedPaddingSizeConstants.l },
    xl: { paddingBottom: deprecatedPaddingSizeConstants.xl },
  },
  l: {
    n: { paddingLeft: deprecatedPaddingSizeConstants.none },
    xs: { paddingLeft: deprecatedPaddingSizeConstants.xs },
    s: { paddingLeft: deprecatedPaddingSizeConstants.s },
    m: { paddingLeft: deprecatedPaddingSizeConstants.m },
    l: { paddingLeft: deprecatedPaddingSizeConstants.l },
    xl: { paddingLeft: deprecatedPaddingSizeConstants.xl },
  },
};
