import React from "react"

const GoogleMapEmbed = (address) => {

const formattedAddress = encodeURIComponent({address})
const url = `https://www.google.com/maps?q=${formattedAddress}&key=AIzaSyD6Coia3ssHYuRKJ2nDysWBdSlVlBCzKAw&zoom=14`
console.log(url)

  return (

      <div>
        <iframe
          title="Google Map"
          style={{ border: 0, width: "100%", height: "100%" }}
          frameBorder="0"
          referrerPolicy="no-referrer-when-downgrade"
          src={url}
          allowFullScreen
        ></iframe>
      </div>

  );
};

export default GoogleMapEmbed;
