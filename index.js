// Maplibre GL JSを使用してウェブ地図を作成するJavaScriptファイル

// 新しい地図オブジェクトを作成します
const map = new maplibregl.Map({
    // container: 地図を表示するHTML要素のIDを指定
    // index.htmlの<div id="map"></div>に地図が表示されます
    container: 'map',

    // style: 地図の見た目（スタイル）を決めるURL
    // 国土地理院の標準地図を利用
    style: {
      version: 8,
      sources: {
        'gsi-pale': {
          type: 'raster',
          // https://maps.gsi.go.jp/development/ichiran.html
          tiles: ['https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>',
        },
        'my-data': {
          type: 'geojson',
          data: 'italian.geojson',
        }
      },
      layers: [
        {
          id: 'gsi-pale',
          type: 'raster',
          source: 'gsi-pale',
        },
        {
          id: 'my-data_circle-layer',
          type: 'circle',
          source: 'my-data',
          paint: {
            'circle-radius': 6,
            'circle-color': '#FF0000',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#FFFFFF',
          },
        },
        {
          id: 'my-data_symbol-layer',
          type: 'symbol',
          source: 'my-data',
          layout: {
            'text-field': ['get', 'name:ja'], // GeoJSONのプロパティ'name'を表示
            'text-font': ['Noto Sans JP Regular'],
            'text-size': 12,
            'text-offset': [0, 1.5],
            'text-anchor': 'top',
          },
          paint: {
            'text-color': '#000000',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
          }
        }
      ]
    },

    // center: 地図の初期表示位置を経度・緯度で指定
    // [経度, 緯度] の順番で指定します
    center: [139.6917, 35.6895], // 東京駅付近

    // zoom: 地図の初期ズームレベルを指定
    // 数値が大きいほど拡大表示されます
    zoom: 1,

    // hash: URLのハッシュ部分に地図の位置情報を反映させるかどうか
    hash: true,

    maxZoom: 10,
    minZoom: 4,
});

// クリックした時のインタラクション
map.on('click', function (event) {
    const features = map.queryRenderedFeatures(
      event.point,
      {
        layers: [
          'my-data_circle-layer',
          'my-data_symbol-layer',
        ]
      }
    );

    if(features.length > 0){
        const feature = features[0];
        alert('クリックした地物の営業時間:\n' + feature.properties.opening_hours);
    }
})

