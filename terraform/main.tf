terraform {
  required_providers {
    azuredevops = {
      source  = "microsoft/azuredevops"
      version = ">=0.1.0"
    }
  }

  backend "azurerm" {
    resource_group_name   = "everwrite-resources"
    storage_account_name  = "everwritetfstate"
    container_name        = "tfstate"
    key                   = "terraform.tfstate"
  }
}

### To Create the Azure Webapp Plan ################
resource "azurerm_service_plan" "webplan" {
  name                = var.WEBAPP_PLAN_NAME
  location            = var.LOCATION
  resource_group_name = var.RG_NAME
  os_type             = var.OS_TYPE
  sku_name            = var.SKU_NAME
}

### To Create the Azure Webapp Service ################
resource "azurerm_app_service" "backend" {
  name                = var.WEBAPPNAME
  location            = azurerm_service_plan.webplan.location
  resource_group_name = azurerm_service_plan.webplan.resource_group_name
  app_service_plan_id = azurerm_service_plan.webplan.id

  site_config {
    always_on        = true
    app_command_line = "python3 -m flask run --host=0.0.0.0 --port=4567 --debug"
    linux_fx_version = "DOCKER|everwriteacr.azurecr.io/everwrite:backend"
  }
  app_settings = {
    "SCM_DO_BUILD_DURING_DEPLOYMENT"      = "true"
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "DOCKER_REGISTRY_SERVER_URL"          = var.DOCKER_REGISTRY_SERVER_URL
    "DOCKER_REGISTRY_SERVER_USERNAME"     = var.DOCKER_REGISTRY_SERVER_USERNAME
    "DOCKER_REGISTRY_SERVER_PASSWORD"     = var.DOCKER_REGISTRY_SERVER_PASSWORD
  }
}
