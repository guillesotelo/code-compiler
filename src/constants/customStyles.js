export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "5px",
    color: "lightgray",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    backgroundColor: "#1e293b",
    cursor: "pointer",
    border: "2px solid #314360",
    ":hover": {
      border: "2px solid darkblue",
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: 'lightgray',
    borderColor: 'lightgray'
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: 'none'
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "lightgray",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      backgroundColor: "#1e293b",
      ":hover": {
        opacity: '0.8',
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#1e293b",
      maxWidth: "14rem",
      border: "2px solid #314360",
      borderRadius: "5px",
    };
  },

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "lightgray",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
};
