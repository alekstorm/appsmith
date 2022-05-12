import * as React from "react";

export const sizes = {
  xs: 20,
  s: 24,
  m: 30,
  l: 40,
};

const spacing = {
  xs: 7,
  s: 7,
  m: 8,
  l: 12,
};

import { StyleSheet, css as css2 } from "aphrodite";
import { Colors } from "constants/Colors";

export default function Pill({ text = "" /*, size = "m" */ }) {
  const style = {
    height: sizes["m"],
    padding: `0 ${spacing["m"]}px`,
    borderRadius: sizes["m"] / 2,
  };

  return (
    <span className={css2(styles.pill)} style={style}>
      {text}
    </span>
  );
}

const styles = StyleSheet.create({
  pill: {
    boxSizing: "border-box",
    display: "inline-flex",
    position: "relative",
    alignItems: "center",
    border: `solid 1px ${Colors.grey20}`,
    maxWidth: "100%",
    background: Colors.white,
    overflow: "hidden",
  },
});
