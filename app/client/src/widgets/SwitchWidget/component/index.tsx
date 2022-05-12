import { Alignment, Classes, Switch } from "@blueprintjs/core";
import { BlueprintControlTransform } from "constants/DefaultTheme";
import styled from "styled-components";
import { ComponentProps } from "widgets/BaseComponent";
import { AlignWidget } from "widgets/constants";
import * as React from "react";
import { css, StyleSheet } from "aphrodite";
import { Colors } from "constants/Colors";
import { memoize } from "lodash";
// import { createThemedStylesheet } from "./styles";
// import ThemeNameContext, { TRANSMISSION } from "./context/ThemeNameContext";
/**
 * @short Allows users to switch a setting on or off.
 * @brandStatus V2
 * @status Beta
 * @category Interaction
 */

const ThemeNameContext = React.createContext("Base");

export function getThemeData(theme = "Base") {
  const colorMap = {
    Base: {
      primary: "blue30",
      brand: "blue40",
    },
  };
  const themeColors = colorMap;
  const themeData = {
    colorMap,
    themeName: "Base",
    themeColors,
  };
  return themeData;
}

export function createThemedStylesheet(stylesheetFn: any) {
  return memoize((theme) =>
    StyleSheet.create(stylesheetFn(getThemeData(theme))),
  );
}
export default function SettingsToggle({
  checked = false,
  disabled = false,
  label = null,
  // @ts-ignore
  onBlur,
  // @ts-ignore
  onChange,
  wrapLabel = true,
}) {
  const theme = React.useContext(ThemeNameContext);
  const styles = themedStyles(theme);
  const containsLabel = label !== "" && label !== null;
  const handleClick = () => onChange(!checked);
  return (
    <label
      className={css(
        styles.label,
        disabled && styles.disabled,
        containsLabel === false && styles.inlineToggle,
      )}
      onBlur={(event) => onBlur && onBlur(event)}
    >
      <span
        className={css(
          styles.inputLabel,
          wrapLabel === false && styles.inputLabelNoWrap,
          containsLabel === false && styles.inlineToggleLabel,
        )}
      >
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleClick}
        className={css(
          styles.input,
          disabled && styles.disabledInput,
          containsLabel === false && styles.inlineToggleInput,
        )}
      />
    </label>
  );
  // }
}

function getColors(theme: any) {
  return {
    primary1: Colors.indigo30,
    primary2: Colors.indigo40,
    primary3: Colors.indigo50,
    highlight: Colors.indigo20,
    shadow: "rgba(39, 44, 52, 0.25)",
    focusOutline: "rgba(162,172,242,0.5)",
  };
}

const themedColors = getColors("Base");

const knobSize = 16;
const trackHeight = 8;
const trackWidth = 28;
const offset = 4;

const themedStyles = StyleSheet.create({
  label: {
    cursor: "pointer",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
    lineHeight: "18px",
    ":hover input": {
      borderColor: "transparent",
      ":after": {
        boxShadow: `0px 2px 2px ${themedColors.shadow}`,
        border: `2px solid ${Colors.grey40}`,
        backgroundColor: Colors.white,
      },
    },
    ":active input": {
      ":after": {
        boxShadow: "none",
        backgroundColor: Colors.grey40,
      },
    },
    ":hover input:checked": {
      borderColor: "transparent",
      ":after": {
        boxShadow: `0px 2px 2px ${themedColors.shadow}`,
        border: `2px solid ${themedColors.primary2}`,
        backgroundColor: themedColors.primary2,
      },
    },
    ":active input:checked": {
      ":after": {
        border: `2px solid ${themedColors.primary2}`,
        backgroundColor: themedColors.primary2,
      },
    },
  },
  input: {
    cursor: "pointer",
    verticalAlign: "center",
    position: "relative",
    appearance: "none",
    outline: "none",
    backgroundColor: Colors.grey20,
    width: `${trackWidth}px`,
    height: `${trackHeight}px`,
    transitionProperty: "background, border, box-shadow",
    transitionDuration: "150ms",
    transform: "ease-in-out",
    margin: `0 ${offset}px 0 0`,
    flexShrink: 0,
    ":after": {
      content: '""',
      position: "absolute",
      top: `-${(knobSize - trackHeight) / 2}px`,
      left: `-${offset}px`,
      width: `${knobSize}px`,
      height: `${knobSize}px`,
      backgroundColor: Colors.white,
      border: `2px solid ${Colors.grey20}`,
      verticalAlign: "center",
      transitionProperty: "left, background, border, box-shadow",
      transitionDuration: "150ms",
      transform: "ease-in-out",
    },
    ":focus:after": {
      borderColor: themedColors.primary1,
      boxShadow: `0 0 0 4px ${themedColors.focusOutline}`,
    },
    ":checked": {
      backgroundColor: themedColors.highlight,
      ":after": {
        left: `${trackWidth + offset - knobSize}px`,
        borderColor: themedColors.primary1,
        backgroundColor: themedColors.primary1,
      },
      ":focus:after": {
        boxShadow: `0 0 0 4px ${themedColors.focusOutline}`,
      },
    },
  },
  inputLabel: {
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    paddingRight: `${8 + offset}px`,
  },
  inlineToggle: {
    display: "inline-block",
    width: `${trackWidth + 2 * offset}px`,
    height: `${knobSize}px`,
    lineHeight: "inherit",
  },
  inlineToggleLabel: {
    paddingRight: 0,
  },
  inlineToggleInput: {
    marginLeft: `${offset}px`,
  },
  disabled: {
    pointerEvents: "none",
    cursor: "default",
    color: Colors.grey40,
  },
  disabledInput: {
    cursor: "not-allowed",
    backgroundColor: Colors.grey10,
    ":after": {
      backgroundColor: Colors.white,
      borderColor: Colors.grey20,
    },
    ":checked": {
      backgroundColor: Colors.grey20,
      ":after": {
        backgroundColor: Colors.grey30,
        borderColor: Colors.grey30,
      },
    },
  },
  inputLabelNoWrap: {
    whiteSpace: "nowrap",
  },
});

export interface SwitchComponentProps extends ComponentProps {
  label: string;
  isSwitchedOn: boolean;
  onChange: (isSwitchedOn: boolean) => void;
  isLoading: boolean;
  alignWidget: AlignWidget;
  accentColor: string;
  inputRef?: (ref: HTMLInputElement | null) => any;
}

const SwitchComponentContainer = styled.div<{
  accentColor: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  &.${Alignment.RIGHT} {
    justify-content: flex-end;
  }
  ${BlueprintControlTransform}
`;

export const StyledSwitch = styled(Switch)<{
  accentColor: string;
}>`
  &.${Classes.CONTROL} {
    margin: 0;
  }

  &.${Classes.CONTROL} {
    & input:checked ~ .${Classes.CONTROL_INDICATOR} {
      background: ${({ accentColor }) => `${accentColor}`} !important;
      border: 1px solid ${({ accentColor }) => `${accentColor}`} !important;
    }
  }

  &.${Classes.SWITCH} {
    & input:not(:disabled):active:checked ~ .${Classes.CONTROL_INDICATOR} {
      background: ${({ accentColor }) => `${accentColor}`} !important;
    }
  }
`;

export function SwitchComponent({
  accentColor,
  alignWidget,
  inputRef,
  isDisabled,
  isLoading,
  isSwitchedOn,
  label,
  onChange,
}: SwitchComponentProps) {
  const switchAlignClass =
    alignWidget === "RIGHT" ? Alignment.RIGHT : Alignment.LEFT;

  return (
    <SwitchComponentContainer
      accentColor={accentColor}
      className={switchAlignClass}
    >
      <StyledSwitch
        accentColor={accentColor}
        alignIndicator={switchAlignClass}
        checked={isSwitchedOn}
        className={
          isLoading
            ? `${Classes.SKELETON} t--switch-widget-loading`
            : `${
                isSwitchedOn
                  ? "t--switch-widget-active"
                  : "t--switch-widget-inactive"
              }`
        }
        disabled={isDisabled}
        inputRef={inputRef}
        label={label}
        onChange={() => onChange(!isSwitchedOn)}
      />
    </SwitchComponentContainer>
  );
}
