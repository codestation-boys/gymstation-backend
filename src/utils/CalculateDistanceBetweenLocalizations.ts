import Local from '@appTypes/statistics/Local'

class CalculateDistanceBetweenLocalizations
{
  public getDistanceFromLatLonInKm(local1: Local, local2: Local): number
  {
    const radiusOfTheEarthInKm = 6371
    const distanceLatitude = this.degToRad(local2.latitude - local1.latitude)
    const distanceLongitude = this.degToRad(local2.longitude - local1.longitude) 
    const varieByDistances = 
      Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) +
      Math.cos(this.degToRad(local1.latitude)) * Math.cos(this.degToRad(local2.latitude)) * 
      Math.sin(distanceLongitude / 2) * Math.sin(distanceLongitude / 2)

    const calculation = 2 * Math.atan2(Math.sqrt(varieByDistances), Math.sqrt(1 - varieByDistances))

    const distance = radiusOfTheEarthInKm * calculation
    
    return distance
  }

  public degToRad(deg: number): number
  {
    return deg * (Math.PI/180)
  }
}

export default new CalculateDistanceBetweenLocalizations()