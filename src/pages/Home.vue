<template>
  <div class="container">
    
    <!-- Filtre -->
    <input 
      v-model="search"
      type="text" 
      placeholder="Filtrer tâches"
    />

    <!-- Ajouter tâche -->
    <div class="add-section">
      <input 
        v-model="newTask"
        type="text"
        placeholder="Nouvelle tâche"
        @keyup.enter="addTask"
      />
      <button @click="addTask">Ajouter</button>
    </div>

    <!-- Liste tâches -->
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Tâche</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="task in filteredTasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td :class="{ done: task.completed }">
            {{ task.text }}
          </td>
          <td>
            {{ task.completed ? "Terminée" : "En cours" }}
          </td>
          <td>
            <button @click="toggleTask(task.id)">✔</button>
            <button @click="deleteTask(task.id)">🗑</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tasks = ref([
  { id: 1, text: "Apprendre Vue", completed: false },
  { id: 2, text: "Créer un projet", completed: true }
])

const newTask = ref("")
const search = ref("")

const addTask = () => {
  if (!newTask.value.trim()) return

  tasks.value.push({
    id: Date.now(),
    text: newTask.value,
    completed: false
  })

  newTask.value = ""
}

const deleteTask = (id) => {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

const toggleTask = (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.completed = !task.completed
}

const filteredTasks = computed(() => {
  return tasks.value.filter(task =>
    task.text.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<style>
.container {
  max-width: 600px;
  margin: auto;
}

.add-section {
  margin: 10px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
}

.done {
  text-decoration: line-through;
  color: gray;
}
</style>