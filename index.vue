<template>
  <header id="04">
    <VCard tile flat :color="custom.headerBackground.value">
      <VCol class="pa-2 d-flex align-center">
        <VCol class="py-0 d-flex">
          <HeadersMobile04Logo />
        </VCol>
        <div class="d-flex justify-end ga-3">
          <HeadersMobile04Account
            :buttonAccount="custom.buttonAccount.value"
            :radiusAccount="custom.radiusAccount.value"
            :buttonAccountColor="custom.buttonAccountColor.value"
            :iconAccountColor="custom.iconAccountColor.value"
          />
          <HeadersMobile04Cart
            :buttonCart="custom.buttonCart.value"
            :radiusCart="custom.radiusCart.value"
            :buttonCartColor="custom.buttonCartColor.value"
            :iconCartColor="custom.iconCartColor.value"
            :dotTextCartColor="custom.dotTextCartColor.value"
            :dotCartColor="custom.dotCartColor.value"
            :headerBackground="custom.headerBackground.value"
          />
          <HeadersMobile04Menu
            :buttonMenu="custom.buttonMenu.value"
            :radiusMenu="custom.radiusMenu.value"
            :buttonMenuColor="custom.buttonMenuColor.value"
            :iconMenuColor="custom.iconMenuColor.value"
          />
        </div>
      </VCol>

      <div>
        <VCol class="py-1">
          <HeadersMobile04Search
            :searchButtonColor="custom.searchButtonColor.value"
            :searchIconColor="custom.searchIconColor.value"
            :backgroundSearch="custom.backgroundSearch.value"
            :colorSearch="custom.colorSearch.value"
            :colorSearchActive="custom.colorSearchActive.value"
            :radiusSearch="custom.radiusSearch.value"
            :inputSearch="custom.inputSearch.value"
          />
        </VCol>
        <VCard tile flat :color="custom.backgroundCategory.value">
          <VCol class="py-1">
            <HeadersMobile04Category
              :buttonCategory="custom.buttonCategory.value"
              :buttonCategoryColor="custom.buttonCategoryColor.value"
              :buttonCategoryTextColor="custom.buttonCategoryTextColor.value"
              :radiusCategory="custom.radiusCategory.value"
            />
          </VCol>
        </VCard>
      </div>
    </VCard>
  </header>
</template>

<script setup>
import header from "./default";
import { setupGlobalComponent } from "@/scripts/custom/globalComponent.ts";

const custom = ref(header);
setupGlobalComponent(custom.value);
</script>
