import { useEffect, useState } from 'react'
import moment from 'moment'
import { ref, onValue, set } from 'firebase/database'

import { db } from 'firebaseConfig'
import { Todo } from 'types'

export function useTodos(uid: string, date: Date) {
  const [todos, setTodos] = useState<null | Todo[]>(null)
  const [loading, setLoading] = useState(false)
  const dateWithoutTime = moment(date).format('YYYY-MM-DD')

  useEffect(() => {
    setLoading(true)
    const todosRef = ref(db, `user/${uid}/todos/date/${dateWithoutTime}`)

    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        setTodos(data)
      } else {
        setTodos([])
      }
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [uid, date])

  const addTodo = (data) => {
    set(ref(db, `user/${uid}/todos/date/${dateWithoutTime}`), [
      ...todos,
      {
        id: todos.length + 1,
        content: data.new,
        completed: false,
      },
    ])
  }

  const updatedTodo = (id, content, completed) => {
    const newTodos = todos.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          content,
          completed,
        }
      }
      return todo
    })

    setTodos(newTodos)
    set(ref(db, `user/${uid}/todos/date/${dateWithoutTime}`), [...newTodos])
  }

  const deleteTodo = (id) => {
    set(ref(db, `user/${uid}/todos/date/${dateWithoutTime}`), [
      ...todos.filter((todo) => todo.id !== id),
    ])
  }

  return { todos, loading, addTodo, updatedTodo, deleteTodo }
}
