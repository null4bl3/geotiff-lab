import { Component, OnInit } from '@angular/core';
import OSM from 'ol/source/OSM';
import Map from 'ol/Map';
import { View } from 'ol';
import GeoTIFF from 'ol/source/GeoTIFF.js';
import TileLayer from 'ol/layer/WebGLTile.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ready: boolean = false;

  cog_layer: any;

  title = 'geotiff-lab';

  output = ""

  //@ts-ignore 
  map: Map;

  ngOnInit(): void {

    try {
      let src = new OSM();
      let base_layer = new TileLayer({
        source: src,
      });
      const cog_source = new GeoTIFF({
        sources: [
          {
            url: 'https://tiff.knast.cc/files/A60.tif',
            // url: 'https://tiff.knast.cc/files/example.tif',
            nodata: 0,
          },
        ],
      });
      this.cog_layer = new TileLayer({
        source: cog_source,
        opacity: 0.7,
        style: {
          color: [
            'interpolate',
            ['linear'],
            // calculate NDVI, bands come from the sources below
            ['band', 1],
            // color ramp for NDVI values, ranging from -1 to 1
            -0.2,
            [191, 191, 191],
            -0.1,
            [219, 219, 219],
            0,
            [255, 255, 224],
            0.025,
            [255, 250, 204],
            0.05,
            [237, 232, 181],
            0.075,
            [222, 217, 156],
            0.1,
            [204, 199, 130],
            0.125,
            [189, 184, 107],
            0.15,
            [176, 194, 97],
            0.175,
            [163, 204, 89],
            0.2,
            [145, 191, 82],
            0.25,
            [128, 179, 71],
            0.3,
            [112, 163, 64],
            0.35,
            [97, 150, 54],
            0.4,
            [79, 138, 46],
            0.45,
            [64, 125, 36],
            0.5,
            [48, 110, 28],
            0.55,
            [33, 97, 18],
            0.6,
            [15, 84, 10],
            0.65,
            [0, 69, 0],
          ],
        },
      })

      this.map = new Map({
        target: 'map',
        layers: [
          base_layer,
          this.cog_layer
        ],
        view: new View({
          center: [0, 0],
          zoom: 5,
        }),
      });

      this.map.getView().setCenter([15.158, 4706817.204]);
      
      this.map.on(['pointermove', 'click'], (event: any) => {
        const data = this.cog_layer.getData(event.pixel);
        if (data) {
          console.log(data);
          this.output = data;
        }
      });

    } catch (e) {
      console.error('MAP INIT ERROR: ', e);
    }
  }

}