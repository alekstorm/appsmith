import { StyleSheet, css } from "aphrodite";
// const { css, StyleSheet } = Aphrodite;
// import latitudeColors from "./colors";
// import Text from "./Text";

const latitudeColors = Object.freeze({
  black: "#272C34",
  white: "#FFFFFF",
  grey10: "#F7F9FD",
  grey20: "#DAE3F3",
  grey30: "#C5D2E7",
  grey40: "#67768D",
  grey50: "#4B5564",
  grey60: "#39414D",
  red10: "#FFF5F5",
  red20: "#FDA6A6",
  red30: "#FA5959",
  red40: "#D92736",
  red50: "#BA0202",
  red60: "#800000",
  orange10: "#FFF7F0",
  orange20: "#FAC69D",
  orange30: "#F5954D",
  orange40: "#DA5A00",
  orange50: "#A64300",
  orange60: "#5C2500",
  blue10: "#F5FCFF",
  blue20: "#C2E0EF",
  blue30: "#94C1DF",
  blue40: "#6294BE",
  blue50: "#326089",
  blue60: "#0F2943",
  green10: "#F5FFFC",
  green20: "#BAF8EA",
  green30: "#82F2DA",
  green40: "#45DABE",
  green50: "#11B08F",
  green60: "#008062",
  purple10: "#F9F5FF",
  purple20: "#CEA1FA",
  purple30: "#AF50F5",
  purple40: "#9200DA",
  purple50: "#7700A6",
  purple60: "#43005C",
  indigo10: "#F5F6FF",
  indigo20: "#A2ACF2",
  indigo30: "#566AE5",
  indigo40: "#0723D8",
  indigo50: "#031ABA",
  indigo60: "#00108C",
});

/**
 * @short Select options in a flexible way.
 * @brandStatus V2
 * @status Stable
 * @category Data Entry
 *
 * A Checkbox input for selecting options in a flexible way.
 * For managing lists of Checkboxes, consider using <a href="CheckboxList">CheckboxList</a>.
 *
 * @extends React.Component */
class Checkbox extends React.PureComponent<any> {
  static defaultProps = {
    checked: false,
    indeterminate: false,
    disabled: false,
    isInvalid: false,
    wrapLabel: true,
    fillParentContainer: false,
  };

  handleClick = () => {
    this.props.onChange(!this.props.checked);
  };

  render() {
    const {
      checked,
      dataQaId,
      disabled,
      fillParentContainer,
      indeterminate,
      isInvalid,
      onBlur,
      wrapLabel,
    } = this.props;

    const WrapperTag = !!this.props.label === true ? "label" : "div";

    return (
      <WrapperTag
        className={css(
          styles.label,
          isInvalid ? styles.invalid : null,
          disabled ? styles.disabled : null,
          fillParentContainer === true ? styles.fillParentContainer : null,
        )}
        onBlur={(event: any) => onBlur && onBlur(event)}
      >
        <input
          checked={checked}
          className={css(
            styles.input,
            indeterminate ? styles.indeterminate : null,
            isInvalid ? styles.invalidInput : null,
            disabled ? styles.disabledInput : null,
          )}
          data-qa-id={dataQaId}
          disabled={disabled}
          onChange={this.handleClick}
          type="checkbox"
        />
        {!!this.props.label === true ? (
          <span
            className={css(
              styles.radioLabel,
              wrapLabel === true ? null : styles.radioLabelNoWrap,
            )}
          >
            <span color={disabled ? "grey40" : "grey60"}>
              {this.props.label}
            </span>
          </span>
        ) : null}
      </WrapperTag>
    );
  }
}

const checkedFill = latitudeColors.grey60;
const disabledEmptyFill = latitudeColors.grey10;
const disabledMarkedFill = latitudeColors.grey20;

const styles = StyleSheet.create({
  label: {
    cursor: "pointer",
    margin: "4px 0px 4px 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ":hover input": {
      borderColor: latitudeColors.grey50,
      boxShadow: "0 2px 2px rgba(0, 0, 0, 0.05)",
    },
    ":active input": {
      borderColor: latitudeColors.grey50,
      background: latitudeColors.grey50,
      boxShadow: "none",
    },
    ":hover input:checked": {
      borderColor: "transparent",
      backgroundColor: latitudeColors.grey60,
    },
    ":active input:checked": {
      borderColor: "transparent",
      background: latitudeColors.grey60,
      boxShadow: "none",
    },
  },
  input: {
    cursor: "pointer",
    boxSizing: "border-box",
    appearance: "none",
    backgroundColor: latitudeColors.white,
    outline: "none",
    border: `2px solid ${latitudeColors.grey30}`,
    width: "20px",
    height: "20px",
    minWidth: "20px",
    minHeight: "20px",
    margin: "0",
    transitionProperty: "background-color, border, box-shadow, color, fill",
    transitionDuration: "150ms",
    transform: "ease-in-out",
    ":focus": {
      borderColor: latitudeColors.grey50,
      boxShadow: `0 0 0 3px ${latitudeColors.grey30}`,
    },
    ":checked": {
      background: `${checkedFill} url("data:image/svg+xml,%3Csvg width='16px' height='16px' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cpath d='M61.964,16.52 L23.778,54.706 C23.3853277,55.0977362 22.7496723,55.0977362 22.357,54.706 L16.557,48.906 L2.294,34.641 C1.90226377,34.2483277 1.90226377,33.6126723 2.294,33.22 L7.979,27.536 C8.37167233,27.1442638 9.00732767,27.1442638 9.4,27.536 L22.948,41.084 L54.738,9.294 C55.1306723,8.90226377 55.7663277,8.90226377 56.159,9.294 L61.964,15.1 C62.3550716,15.4925567 62.3550716,16.1274433 61.964,16.52 Z' fill='%23fff' %3E%3C/path%3E%3C/svg%3E") no-repeat center`,
      backgroundSize: "80%",
      borderColor: "transparent",
    },
  },
  radioLabel: {
    marginLeft: "8px",
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  indeterminate: {
    background: `${checkedFill} url("data:image/svg+xml,%3Csvg width='14px' height='14px' padding='1px' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cpath d='M62 31c0 2.765-.24 5-3.006 5H5.006C2.246 36 2 33.764 2 31c0-2.766.244-5 3.006-5h53.991c2.76 0 3 2.234 3 5H62z' fill='%23fff' %3E%3C/path%3E%3C/svg%3E") no-repeat center`,
    backgroundSize: "80%",
    borderColor: "transparent",
    ":disabled": {
      backgroundColor: disabledMarkedFill,
    },
  },
  disabled: {
    pointerEvents: "none",
    color: latitudeColors.grey40,
    ":hover input": {
      borderColor: latitudeColors.grey20,
      backgroundColor: disabledEmptyFill,
      boxShadow: "none",
    },
    ":active input": {
      borderColor: latitudeColors.grey20,
      backgroundColor: disabledEmptyFill,
      boxShadow: "none",
    },
  },
  disabledInput: {
    borderColor: latitudeColors.grey20,
    backgroundColor: disabledEmptyFill,
    ":checked": {
      borderColor: latitudeColors.grey20,
      backgroundColor: disabledMarkedFill,
    },
  },
  invalid: {
    color: latitudeColors.red40,
    ":hover input": {
      borderColor: latitudeColors.red40,
    },
    ":active input": {
      borderColor: latitudeColors.red40,
      backgroundColor: latitudeColors.red40,
      boxShadow: "none",
    },
    ":hover input:checked": {
      backgroundColor: latitudeColors.red40,
    },
  },
  invalidInput: {
    borderColor: latitudeColors.red40,
    ":checked": {
      backgroundColor: latitudeColors.red40,
    },
    ":focus": {
      boxShadow: `0 0 0 3px ${latitudeColors.red20}`,
      borderColor: latitudeColors.red40,
    },
  },
  radioLabelNoWrap: {
    whiteSpace: "nowrap",
  },
  fillParentContainer: {
    flexGrow: 1,
    height: "100%",
  },
});

// COPIED FROM LATITUDE ABOVE -----------------------------------------

import React from "react";
import styled from "styled-components";
import { ComponentProps } from "widgets/BaseComponent";
import { Alignment, Classes } from "@blueprintjs/core";
import { AlignWidget } from "widgets/constants";
import { Colors } from "constants/Colors";

type StyledCheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  rowSpace: number;
  borderRadius?: string;
  accentColor?: string;
};

type StyledCheckboxContainerProps = {
  isValid: boolean;
  noContainerPadding?: boolean;
};

const DEFAULT_BORDER_RADIUS = "0";
const DEFAULT_BACKGROUND_COLOR = Colors.GREEN_SOLID;

const CheckboxContainer = styled.div<StyledCheckboxContainerProps>`
  && {
    padding: ${({ noContainerPadding }) =>
      noContainerPadding ? 0 : "9px 12px"};
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: flex-start;
    width: 100%;
    &.${Alignment.RIGHT} {
      justify-content: flex-end;

      label {
        flex-direction: row-reverse;
      }
    }
    & .bp3-control-indicator {
      border: ${(props) =>
        !props.isValid && `1px solid ${props.theme.colors.error} !important`};
    }
  }
`;

export const StyledCheckbox = styled(Checkbox)<StyledCheckboxProps>`
  height: ${({ rowSpace }) => rowSpace}px;
  color: ${({ checked }) => (checked ? Colors.GREY_10 : Colors.GREY_9)};
  &.bp3-control.bp3-checkbox .bp3-control-indicator {
    border-radius: ${({ borderRadius }) => borderRadius};
    border: 1px solid ${Colors.GREY_3};
    box-shadow: none !important;
    outline: none !important;
    background: transparent;
    ${({ accentColor, checked, indeterminate }) =>
      checked || indeterminate
        ? `
        background-color: ${accentColor} !important;
        background-image: none;
        border: none !important;
        `
        : ``}
    ${({ checked }) =>
      checked &&
      `
      &::before {
          background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='14' height='14' /%3E%3Cpath d='M10.1039 3.5L11 4.40822L5.48269 10L2.5 6.97705L3.39613 6.06883L5.48269 8.18305L10.1039 3.5Z' fill='white'/%3E%3C/svg%3E%0A") !important;
        }
    `}
    ${({ disabled }) => (disabled ? `opacity: 0.5;` : ``)}
  }
  &:hover {
    &.bp3-control.bp3-checkbox .bp3-control-indicator {
      ${({ disabled }) =>
        disabled ? "" : `border: 1px solid ${Colors.GREY_5}`};
      ${({ checked, indeterminate }) =>
        checked || indeterminate
          ? `
        background-image: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0.2)
        );
        `
          : ""};
    }
  }
  &.${Classes.CONTROL}.${Classes.DISABLED} {
    color: ${Colors.GREY_8};
  }
`;

class CheckboxComponent extends React.Component<CheckboxComponentProps> {
  render() {
    const checkboxAlignClass =
      this.props.alignWidget === "RIGHT" ? Alignment.RIGHT : Alignment.LEFT;

    // If the prop isValid has a value true/false (it was explicitly passed to this component),
    // it take priority over the internal logic to determine if the field is valid or not.
    const isValid = (() => {
      if (this.props.isValid !== undefined) {
        return this.props.isValid;
      }

      return !(this.props.isRequired && !this.props.isChecked);
    })();

    return (
      <CheckboxContainer
        className={checkboxAlignClass}
        isValid={isValid}
        noContainerPadding={this.props.noContainerPadding}
      >
        <StyledCheckbox
          accentColor={this.props.accentColor || DEFAULT_BACKGROUND_COLOR}
          alignIndicator={checkboxAlignClass}
          borderRadius={this.props.borderRadius || DEFAULT_BORDER_RADIUS}
          checked={this.props.isChecked}
          className={
            this.props.isLoading ? Classes.SKELETON : Classes.RUNNING_TEXT
          }
          disabled={this.props.isDisabled}
          inputRef={this.props.inputRef}
          label={this.props.label}
          onChange={this.onCheckChange}
          rowSpace={this.props.rowSpace}
        />
      </CheckboxContainer>
    );
  }

  onCheckChange = () => {
    this.props.onCheckChange(!this.props.isChecked);
  };
}

export interface CheckboxComponentProps extends ComponentProps {
  alignWidget?: AlignWidget;
  noContainerPadding?: boolean;
  isChecked: boolean;
  isLoading: boolean;
  isRequired?: boolean;
  isValid?: boolean;
  label: string;
  onCheckChange: (isChecked: boolean) => void;
  rowSpace: number;
  inputRef?: (el: HTMLInputElement | null) => any;
  accentColor: string;
  borderRadius: string;
}

export default CheckboxComponent;
