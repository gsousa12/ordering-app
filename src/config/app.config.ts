export class AppConfig {
  public static readonly port = process.env.PORT!;
  public static readonly jwt_secret = process.env.JWT_SECRET!;
  public static readonly client_url = process.env.CLIENT_URL!;
  public static readonly jwt_expiration_time = '1h';
}
