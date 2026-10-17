# ParcelPost (sample project)

A small, fictional parcel shipping service. It exists to try out
[ScopeCheck](https://github.com/Bhaviip/PMAI_Hackathon): each open pull request
changes the code in a different way, so ScopeCheck shows a different impact map.

```
npm test        # Node 22.6+ (uses --experimental-strip-types)
```

## What's inside

| File | What it does |
| --- | --- |
| `src/config.ts` | Business rules: free shipping threshold, weight limit, countries |
| `src/rates.ts` | Shipping price for a parcel (`calculateShippingCost`) |
| `src/address.ts` | Address checks and postcode clean-up |
| `src/orders.ts` | Turns a paid order into a shipment |
| `src/tracking.ts` | Tracking statuses and delivery estimates |
| `src/labels.ts` | Printable shipping label text |
| `src/notifications.ts` | Customer emails |
| `src/money.ts` | Price formatting |
| `src/api/routes.ts` | HTTP handlers |

See [docs/API.md](docs/API.md) for the endpoints and [docs/SHIPPING_RULES.md](docs/SHIPPING_RULES.md)
for the pricing rules.
