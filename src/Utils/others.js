
    export function haversine_distance(p1, p2) {
        var R = 6371; // Radius of the Earth in kms
        var rlat1 = p1.lat * (Math.PI/180); // Convert degrees to radians
        var rlat2 = p2.lat * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (p2.lng-p1.lng) * (Math.PI/180); // Radian difference (longitudes)
  
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
      }