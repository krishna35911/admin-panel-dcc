const getColorForDistrict = () => {
    const district = localStorage.getItem("districtname");
    const districtsWithBlackText = ['Palakkad', 'Kannur', 'Idukki', 'Pathanamthitta', 'Ernakulam', 'Malappuram'];
  
    if (districtsWithBlackText.includes(district)) {
      return 'black';
    }
  
    return 'white';
  };
  
  export { getColorForDistrict };
