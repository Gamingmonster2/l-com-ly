/** تحميل Cloudflare Web Analytics بعد موافقة الزائر فقط. */
const CF_BEACON_SRC =
  "https://static.cloudflareinsights.com/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092"
const CF_BEACON_INTEGRITY =
  "sha512-UKNk8GbxkABxKcXYuLkO16EleLGUkcvJWtpSNmExE0Too3ZaFAxTscNWEc1OdAv5/BikHawapSCaiD2XCmp+Bw=="

export function loadCloudflareAnalytics(token: string): void {
  if (typeof document === "undefined" || !token) return
  if (document.getElementById("lcom-cf-analytics")) return

  const script = document.createElement("script")
  script.id = "lcom-cf-analytics"
  script.src = CF_BEACON_SRC
  script.integrity = CF_BEACON_INTEGRITY
  script.crossOrigin = "anonymous"
  script.defer = true
  script.dataset.cfBeacon = JSON.stringify({
    version: "2024.11.0",
    token,
    r: 1,
    spa: 2,
  })
  document.head.appendChild(script)
}
