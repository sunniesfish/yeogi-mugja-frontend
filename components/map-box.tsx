
import { IMapProps } from "../interface";
import {Map, MapMarker} from "react-kakao-maps-sdk";


function MapBox({
    locationData:{lat, lng, level}, 
    mapSize:{height, width},
    markerData
}:IMapProps){
    return(
        <>
            <Map 
                center={{lat, lng}}
                style={{height, width}}
                level={level}
            >
                {markerData?.map((data, index) => 
                        <MapMarker
                            key={index} 
                            position={{
                                lat:data.locationData.lat,
                                lng:data.locationData.lng
                            }}
                        >
                            {data.MarkerComponent}
                        </MapMarker>
                    )}
            </Map>
        </>
    )
}

export default MapBox;

