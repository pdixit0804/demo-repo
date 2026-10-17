# ParcelPost API

## GET /quote

Returns a shipping price without creating anything. Uses `calculateShippingCost`
with the zone from `getZoneForCountry`.

```
GET /quote?country=DE&weightKg=2.5
→ { "zone": "europe", "cents": 1599, "display": "$15.99" }
```

## POST /shipments

Creates a shipment from a paid order (`createShipment`) and returns the tracking
number and label text. Orders with a bad address get a 400.

## GET /shipments/:trackingId

Returns the current status and expected delivery date. Statuses, in order:

| Status | Shown to customer |
| --- | --- |
| `label_created` | Label created |
| `in_transit` | In transit |
| `out_for_delivery` | Out for delivery |
| `delivered` | Delivered |
| `returned` | Returned to sender |

## POST /shipments/:trackingId/scan

Called by the warehouse scanner. Moves the shipment one status forward
(`advanceStatus`).
