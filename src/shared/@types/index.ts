export type WeatherData = {
  hour?: string;
  lat: string;
  lon: string;
  elevation: number;
  timezone: string;
  units: string;
  current: {
    icon: string;
    icon_num: number;
    summary: string;
    temperature: number;
    feels_like: number;
    wind_chill: number;
    dew_point: number;
    wind: {
      speed: number;
      gusts: number;
      angle: number;
      dir: string;
    };
    precipitation: {
      total: number;
      type: string;
    };
    cloud_cover: number;
    ozone: number;
    pressure: number;
    uv_index: number;
    humidity: number;
    visibility: number;
  };
};
