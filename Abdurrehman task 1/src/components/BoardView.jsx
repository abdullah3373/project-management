import React, { useState } from 'react'
import TaskCard from './TaskCard'

const BoardView = ({ board, onUpdate }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const statuses = ['todo', 'in-progress', 'review', 'done']

  const getTasksByStatus = (status) => {
    return board.tasks.filter(task => task.status === status)
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTaskTitle,
          description: '',
          status: 'todo',
          priority: 'medium',
          assignee: '1'
        }),
      })

      if (response.ok) {
        setNewTaskTitle('')
        onUpdate()
      }
    } catch (err) {
      console.error('Error adding task:', err)
    }
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{board.name}</h2>
        <p className="text-gray-600">{board.description}</p>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statuses.map((status) => (
          <div key={status} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-900 mb-4 capitalize">
              {status.replace('-', ' ')}
            </h3>
            <div className="space-y-3">
              {getTasksByStatus(status).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={onUpdate}
                />
              ))}
              {getTasksByStatus(status).length === 0 && (
                <p className="text-gray-500 text-sm">No tasks</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BoardView
