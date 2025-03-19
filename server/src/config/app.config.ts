export class AppConfig {
  public static readonly port = process.env.PORT!;
  public static readonly jwt_secret = process.env.JWT_SECRET!;
  public static readonly client_url = process.env.CLIENT_URL!;
  public static readonly node_env = process.env.NODE_ENV!;
  public static readonly jwt_expiration_time = '1h';
  public static readonly access_token_age = 60 * 60 * 1000;
  public static readonly refresh_token_age = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}
