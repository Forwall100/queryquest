<template>
  <div class="table-container">
    <table class="w-full table-auto bg-white">
      <thead>
        <tr class="border-b">
          <th class="py-2 text-left border-x px-2" v-for="item in result.columns" :key="item">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b" v-for="row in result.result" :key="row[0]">
          <td class="py-2 px-2 border-x" v-for="cell in row" :key="cell">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.table-container {
  height: 300px;
  overflow-y: auto;
}
</style>

<script>
export default {
    props: {
        result: {
            type: Object,
            required: true,
        },
        columns: {
          
        }
    },
    data() {
        return {
        };
    },
    computed: {
        processedResult() {
            return this.result.map(([id, firstName, lastName, timestamp]) => ({
                id,
                firstName,
                lastName,
                timestamp,
            }));
        },
    },
};
</script>
