<template>
  <div class="card flex justify-center">
    <Chart type="doughnut" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import type { SaleReceive } from '~/interfaces/receive/Sale';

const props = defineProps({
  sales: {
    type: Array as PropType<SaleReceive[]>,
    required: true
  }
});

const chartData = ref();
const chartOptions = ref();

// Atualiza o gráfico sempre que as vendas mudarem
watch(() => props.sales, (newSales) => {
  chartData.value = setChartData(newSales);
});

const setChartData = (sales: SaleReceive[]) => {
  const documentStyle = getComputedStyle(document.body);
  
  // Transformando as vendas em dados para o gráfico
  const productCounts = sales.reduce((acc, sale) => {
    sale.saleItems.forEach(item => {
      const name = item.product.productName;
      acc[name] = (acc[name] || 0) + item.amount;
    });
    return acc;
  }, {} as Record<string, number>);

  return {
    labels: Object.keys(productCounts),
    datasets: [
      {
        data: Object.values(productCounts),
        backgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-500'), 
          documentStyle.getPropertyValue('--p-orange-500'), 
          documentStyle.getPropertyValue('--p-gray-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-400'), 
          documentStyle.getPropertyValue('--p-orange-400'), 
          documentStyle.getPropertyValue('--p-gray-400')
        ]
      }
    ]
  };
};

const setChartOptions = () => {
  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
        }
      }
    }
  };
};

chartOptions.value = setChartOptions();
</script>

<style scoped></style>
