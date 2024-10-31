<template>
  <div>
    <Chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { SaleReceive } from '~/interfaces/receive/Sale';

// Chart config
const chartData = ref();
const chartOptions = ref();

const props = defineProps({
  sales: {
    type: Array as PropType<SaleReceive[]>,
    required: true
  }
});

const setChartData = (sales: SaleReceive[]) => {
  // Transform sales data into chart format
  const salesCount = sales.reduce((acc, sale) => {
    const month = new Date(sale.createdAt).getMonth(); // Get sale month
    acc[month] = (acc[month] || 0) + sale.saleItems.reduce((sum, item) => sum + item.amount, 0); // Sum item amounts
    return acc;
  }, [0, 0, 0, 15, 21, 12, 0, 0, 0, 0, 0, 0]); // Initialize array for each month

  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Vendas',
        data: salesCount,
        borderWidth: 1,
      }
    ]
  };
};

// Update chartData when sales prop changes
watch(
  () => props.sales,
  (newSales) => {
    chartData.value = setChartData(newSales || []);
  },
  { immediate: true } // Run on initial load as well
);
</script>

<style scoped></style>
