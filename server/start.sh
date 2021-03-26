#!/bin/bash

export MIX_ENV=prod
export PORT=4799

CFGD=$(readlink -f ~/.config/spa_event_app)

if [ ! -e "$CFGD/base" ]; then
	            echo "run deploy first"
		                exit 1
fi

DB_PASS=$(cat "$CFGD/db_pass")
export DATABASE_URL=ecto://spa_event_app:$DB_PASS@localhost/spa_event_app_prod

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE

_build/prod/rel/event_app/bin/event_app start
