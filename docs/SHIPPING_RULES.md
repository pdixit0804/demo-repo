# Shipping rules

These are product decisions. Change them in `src/config.ts`.

- **Free shipping:** domestic orders of $50.00 or more ship free
  (`FREE_SHIPPING_THRESHOLD_CENTS`).
- **Weight limit:** parcels over 30 kg are refused (`MAX_PARCEL_WEIGHT_KG`).
- **Price:** a zone base rate that includes the first kilo, then $1.50 for each
  started extra kilo (`PER_KG_CENTS`).

| Zone | Base rate |
| --- | --- |
| domestic | $4.99 |
| europe | $12.99 |
| international | $24.99 |
