import React from "react";
import Select from "react-select";
const TagSearch = () => {
  const options = [
    {value: "Collect Invoice First",label: "Collect Invoice First",color: "#ff2701"},
    { value: "From Referal", label: "From Referral", color: "#fe676e" },
    {value: "From Sulekhs",label:"From Sulekhs",color:"#8a3c0e"},
    {value:"From Google",label:"From Google",color:"#00ccff"},
    {value: "New Client",label: "New Client",color: "#e31d7c"},
    { value: "1040", label: "1040", color: "#647899" },
    { value: "1024", label: "1024", color: "#EE4B2B" },

  ];
  const calculateWidth = (label) => {
    const textWidth = label.length * 8; 
    return Math.min(textWidth, 200); 
  };
  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
   
   
    option: (styles, { data}) => ({
      ...styles,
      
      backgroundColor: data.color,
      color: "#fff",
      borderRadius: "15px",
      textAlign: "center",
      padding:"2px,8px",
      margin: "7px",
      fontSize: "12px",
      fontWeight:"bold",
      width: `${calculateWidth(data.label)}px`,
    }),

    multiValue: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.color,
      color: "#fff",
      borderRadius: "15px",
    }),

    
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.color,
      color: "#fff",
      borderRadius: "15px",
      textAlign:"center",
      fontSize:"12px",
    }),
  };
 
  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption);
  };
  return (
    <Select
      options={options}
      onChange={handleChange}
      isMulti
      styles={colorStyles}
      className='select-dropdown'
    />
  );
};
export default TagSearch;