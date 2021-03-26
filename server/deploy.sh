#!/bin/bash

export MIX_ENV=prod
# Common port range for this is 4000-10,000
# Valid port range for a user app to listen
# on is something like 1025-32767
export PORT=4799
export SECRET_KEY_BASE=insecure
export DATABASE_URL=ecto://spa_event_app:bad@localhost/spa_event_app_prod

mix deps.get --only prod
mix compile

CFGD=$(readlink -f ~/.config/spa_event_app)

if [ ! -d "$CFGD" ]; then
	            mkdir -p "$CFGD"
fi

if [ ! -e "$CFGD/base" ]; then
	            mix phx.gen.secret > "$CFGD/base"
fi

if [ ! -e "$CFGD/db_pass" ]; then
	            pwgen 12 1 > "$CFGD/db_pass"
fi

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE

DB_PASS=$(cat "$CFGD/db_pass")
export DATABASE_URL=ecto://spa_event_app:$DB_PASS@localhost/spa_event_app_prod

mix ecto.reset
mix ecto.create
mix ecto.migrate

#npm install --prefix ./assets
#npm run deploy --prefix ./assets
mix phx.digest

mix release