<template>
  <div class="bg-white rounded-2xl  border-gray-100 shadow-sm p-6">
    <div class="mb-6">
      <h2 class="text-lg font-bold text-primary-100">
        Resumo Financeiro Mensal
      </h2>
      <p class="text-sm text-gray-500">
        Entradas vs Saídas
      </p>
    </div>

    <div ref="chartContainer" class="h-[600px] -mx-2" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import Highcharts from 'highcharts'

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  },
  filterType: {
    type: String,
    default: 'all'
  }
})

const chartContainer = ref(null)
let chartInstance = null

const chartData = computed(() => {
  const grouped = {}

  props.transactions.forEach(tx => {
    const [year, month] = tx.date.split('-')
    const key = `${year}-${month}`

    if (!grouped[key]) {
      grouped[key] = { income: 0, expense: 0 }
    }
    grouped[key][tx.type] += tx.amount
  })

  const sortedMonths = Object.keys(grouped).sort()
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

  return {
    categories: sortedMonths.map(date => {
      const [year, month] = date.split('-')
      return `${monthNames[parseInt(month) - 1]}/${year.slice(-2)}`
    }),
    income: sortedMonths.map(month => grouped[month].income),
    expense: sortedMonths.map(month => grouped[month].expense)
  }
})

function renderChart() {
  if (!chartContainer.value) return

  chartInstance = Highcharts.chart(chartContainer.value, {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }
    },
    title: {
      text: null
    },
    xAxis: {
      categories: chartData.value.categories,
      labels: {
        style: {
          color: '#6b7280',
          fontSize: '12px'
        }
      },
      lineColor: '#e5e7eb',
      tickColor: '#e5e7eb'
    },
    yAxis: {
      title: {
        text: 'Valor (R$)',
        style: {
          color: '#6b7280',
          fontSize: '12px'
        }
      },
      labels: {
        formatter: function () {
          return 'R$ ' + this.value.toLocaleString('pt-BR')
        },
        style: {
          color: '#6b7280'
        }
      },
      gridLineColor: '#f3f4f6'
    },
    tooltip: {
      useHTML: true,
      shared: true,
      outside: true,
      padding: 0,
      backgroundColor: 'transparent',
      borderWidth: 0,
      shadow: false,
      formatter: function () {
        const category = this.points?.[0]?.key ?? this.x

        const rows = this.points?.map(point => `
          <div style="display:flex; justify-content:space-between; align-items:center; gap:20px; margin-top:6px">
            <span style="color:#4a635f; font-size:12px">
              ${point.series.name}
            </span>
            <b style="color:#4a635f; font-size:12px">
              R$ ${point.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </b>
          </div>
        `).join('')

        return `
          <div style="
            background:#f9fafb;
            border:1px solid #e5e7eb;
            border-radius:10px;
            padding:10px 14px;
            min-width:210px;
            box-shadow:0 4px 12px rgba(0,0,0,0.08);
            font-family:system-ui, -apple-system, sans-serif;
          ">
            <div style="font-weight:600; color:#4a635f; font-size:13px; margin-bottom:4px">
              ${category}
            </div>
            <hr style="border:none; border-top:1px solid #e5e7eb; margin:6px 0"/>
            ${rows}
          </div>
        `
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      itemStyle: {
        color: '#374151',
        fontWeight: '500'
      }
    },
    plotOptions: {
      column: {
        legendSymbol: 'lineMarker' // ✅ linha com marcador na legenda
      },
      spline: {
        lineWidth: 3,
        marker: {
          enabled: true,
          radius: 4,
          lineWidth: 2,
          lineColor: '#fff'
        },
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'Entradas',
        data: chartData.value.income,
        color: '#52b788'
      },
      {
        name: 'Saídas',
        data: chartData.value.expense,
        color: '#c0533a'
      }
    ],
    credits: {
      enabled: false
    }
  })
}

onMounted(() => {
  renderChart()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})

watch(() => [props.transactions, props.filterType], () => {
  if (chartInstance) {
    chartInstance.update({
      xAxis: {
        categories: chartData.value.categories
      },
      series: [
        { data: chartData.value.income },
        { data: chartData.value.expense }
      ]
    })
  }
}, { deep: true })
</script>