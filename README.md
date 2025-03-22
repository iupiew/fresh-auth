# Fresh Auth

Here is a sample app built using Deno's [Fresh](https://fresh.deno.dev/) framework,
[Supabase](https://supabase.com/) and [Redis](https://redis.io/) to
implement a simple cookie-based authentication scheme.


## Usage

Create a `.env` file with the following variables:

```
SUPABASE_URL=https://<projectName>.supabase.co
SUPABASE_KEY=<api_key>

REDIS_HOST=<redis_host>
REDIS_PORT=<redis_port>
REDIS_USERNAME=<default>
REDIS_PASSWORD=<redis_password>

```

Run the app:

```
deno task start
```

