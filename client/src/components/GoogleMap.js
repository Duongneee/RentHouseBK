import React from "react"

const GoogleMapEmbed = (formattedAddress) => {
const address = formattedAddress.formattedAddress;

const url = `https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`

  return (

      <div className="w-full h-full">
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
