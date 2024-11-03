<template>
  <div class="card flex justify-center">
    <Chart type="doughnut" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
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
    const company = sale.company.name;
    sale.saleItems.forEach(item => {
      const name = company;
      acc[name] = (acc[name] || 0) + item.amount;
    });
    return acc;
  }, {} as Record<string, number>);

  const topCompanies = Object.entries(productCounts)
    .sort(([, a], [, b]) => b - a)  // Ordena por quantidade de vendas, de forma decrescente
    .slice(0, 3);                    // Seleciona os 3 maiores

  return {
    labels: topCompanies.map(([name]) => name),
    datasets: [
      {
        data: topCompanies.map(([, count]) => count),
        backgroundColor: [
          documentStyle.getPropertyValue('--p-green-400'), 
          documentStyle.getPropertyValue('--p-blue-400'), 
          documentStyle.getPropertyValue('--p-purple-400')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-green-300'), 
          documentStyle.getPropertyValue('--p-blue-300'), 
          documentStyle.getPropertyValue('--p-purple-300')
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
