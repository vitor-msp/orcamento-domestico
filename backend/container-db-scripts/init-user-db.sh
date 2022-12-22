#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$DB_USER" <<-EOSQL
	CREATE DATABASE orcamento_domestico
		WITH 
		OWNER = postgres
		ENCODING = 'UTF8'
		CONNECTION LIMIT = -1;
EOSQL