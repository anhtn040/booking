docker-compose run --rm migratedb

docker-compose run --rm migratedb info

docker-compose run --rm migratedb baseline -baselineVersion=0_000 -baselineDescription=Baseline
