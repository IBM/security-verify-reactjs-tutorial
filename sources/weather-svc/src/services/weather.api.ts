export abstract class WeatherApi {
  abstract weather(city?: string): Promise<string>;
}
