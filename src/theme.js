const themeSettings = () => {
  return {
    palette: {
      primary: {
        light: "#EBE3D5",
        main: "#B0A695",
        dark: "#776B5D",
      },
      secondary: {
        main: "#789461",
      },
      neutral: {
        light: "#ebebeb",
        main: "#bfbfbf",
        medium: "#b3b3b3",
        dark: "#777777",
      },
      background: {
        default: "#F3EEEA",
      },
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export default themeSettings;
