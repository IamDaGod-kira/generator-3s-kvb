
$repo = "IamDaGod-kira/generator-3s-kvb"

Get-Content .env | ForEach-Object {
    if ($_ -match "^\s*([^#][^=]+)=(.*)$") {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        gh secret set $key -b"$value" -R $repo
    }
}