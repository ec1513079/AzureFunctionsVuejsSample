### Requirement

- Azure CLI >= 2.0.34
  - [Install Azure CLI on Windows](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest)
- Powershell >= 5.0

### Procedure

1. Preset props
```
$prop=@{
  location="japaneast"
  group="ec-azdeploy-test"
  template="azuredeploy.json"
  parameters="@azuredeploy.param.json"
}
$prop
```
or
```
$prop=@{
  location="japaneast"
  group="ec-azdeploy-test"
  template="azuredeploy.json"
  parameters="appNamePrefix=ec-azdeploy-test"
}
$prop
```
2. Azure CLI Login & Create Resource Group
```
az login
az group create `
  --location $prop.location `
  --name $prop.group
```
3. Template validation
```
az group deployment validate `
  --resource-group $prop.group `
  --template-file "$($prop.template)" `
  --parameters "$($prop.parameters)"
```
4. Template Deploy
```
$result=az group deployment create `
  --name "azdeployment-$((Get-Date).ToString("yyyyMMdd-HHmmss"))" `
  --resource-group $prop.group `
  --template-file "$($prop.template)" `
  --parameters "$($prop.parameters)"
$result
````