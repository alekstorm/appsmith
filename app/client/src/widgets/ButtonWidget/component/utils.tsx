import { css } from "styled-components";

import { ButtonVariantTypes } from "components/constants";
import { getCustomHoverColor } from "widgets/WidgetUtils";
import { ButtonContainerProps } from "./DragContainer";
import invariant from "invariant";

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

export const getButtonStyle = (
  theme: Theme,
  kind: ButtonKind | "blank",
  intent: ButtonIntent,
  size: ButtonSize,
  width: ButtonWidth,
  disabled: boolean,
  optionals: Optionals,
): ButtonStyles => {
  const isLoading = optionals ? optionals.isLoading || false : false;

  const styleSheet = styles(theme, intent);

  const buttonStyles = [
    styleSheet.button.base,
    styleSheet.button[size],
    styleSheet.button[kind],
    styleSheet.button[width],
    disabled ? styleSheet.disabledButton.base : null,
    disabled ? styleSheet.disabledButton[kind] : null,
    isLoading ? styleSheet.button.isLoading : null,
  ];

  const labelStyles = [
    styleSheet.label.base,
    styleSheet.label[kind],
    disabled ? styleSheet.disabledLabel[kind] : null,
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

export function include(style: SheetEntry): SheetDefinition {
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
