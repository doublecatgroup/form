<template>
  <tr v-if="exportView">
    <td v-for="value in exportedData" :key="value.name">{{ value.value }}</td>
  </tr>
  <li v-else :id="path.join('-')" class="item">

    <fieldset>
      <legend>window</legend>
      <input v-model.trim="name" autocapitalize="none" class="window-name">
      <label>width:
        <input-by-unit :unit="unit" v-model.number="width" placeholder="width" />
      </label>
    </fieldset>

    <fieldset>
      <legend>fixation</legend>
      <fixation v-model="fixation"/>
    </fieldset>
    <fieldset>
      <legend>fabric</legend>
      <fabric v-model="fabric"/>
    </fieldset>

    <fieldset>
      <legend>tailoring</legend>
      <select v-model="heading">
        <option v-for="(value, name) in headings" :key="name" :value="name"> {{ value.en }}</option>
      </select>
      <label>drop:
        <input-by-unit :unit="unit" v-model.number="drop" placeholder="drop" />
      </label>
      <label>ratio:
        <input type="number" v-model.number="ratio" step="0.1" placeholder="ratio" />
      </label>
    </fieldset>

    <fieldset>
      <legend>remarks</legend>
      <input v-model="remarks" class="remarks"/>
    </fieldset>

    <fieldset>
      <legend>total</legend>
      <input placeholder="total" :value="windowItem.total.toFixed(2)" readonly>
      <button name="remove" @click="$emit('remove')">Remove</button>
    </fieldset>
  </li>
</template>

<script>
import Window from './Window'
import Fixation from './Fixation.vue'
import Fabric from './Fabric.vue'
import InputByUnit from './InputByUnit'
const R = require('ramda')

const properties = Object.getOwnPropertyNames(new Window())

const headings = {
  deepPleat: { cn: '四脚勾', en: 'Deep Pleat' },
  doublePleat: { cn: '韩折', en: 'Double Pleat' },
  eylet: { cn: '打孔', en: 'Eyelet' },
  tabTop: { cn: '吊带', en: 'Tab Top' },
  rodPocket: { cn: '穿杆', en: 'Rod Pocket' }
}

export const exportedData = [
  {
    name: 'window窗口',
    value () { return this.name }
  },
  {
    name: 'fabric布料',
    value () { return this.fabric.key }
  },
  {
    name: 'design色号',
    value () { return this.fabric.no }
  },
  {
    name: 'color颜色',
    value () { return this.fabric.color }
  },
  {
    name: 'width宽',
    value () { return this.width / 100 }
  },
  {
    name: 'height高',
    value () { return this.drop / 100 }
  },
  {
    name: 'ratio折率',
    value () { return this.ratio }
  },
  {
    name: 'heading加工',
    value () {
      const heading = this.headings[this.heading]
      return `${heading.cn} (${heading.en})`
    }
  },
  {
    name: 'material usage用料',
    value () { return this.windowItem.materialUsage }
  },
  {
    name: 'remarks备注',
    value () { return this.windowItem.remarks }
  }
]

export default {
  components: { InputByUnit, Fixation, Fabric },

  exportedData,

  props: ['path', 'unit', 'exportView', 'value'],

  data () {
    return {
      headings
    }
  },

  computed: {
    ...R.map(key => {
      return {
        get () {
          return this.windowItem[key]
        },
        set (value) {
          this.$emit('input', R.assoc(key, value, this.value))
        }
      }
    }, R.zipObj(properties, properties)
    ),

    windowItem () {
      return Object.assign(new Window(), this.value)
    },

    exportedData () {
      return R.map(v => { return {name: v.name, value: v.value.call(this)} }, exportedData)
    }
  }
}
</script>

<style>

label {
  white-space:nowrap;
}

.item option {
  width: 5rem;
}

label {
  font-size: 0.5rem;
}

input.remarks {
  width: 100%;
}
</style>
