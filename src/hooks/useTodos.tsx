import { useMemo, useEffect, useState } from 'react'
import moment from 'moment'
import { ref, onValue, set } from 'firebase/database'

import { db } from 'firebaseConfig'
import { Todo } from 'types'

export function useTodos(uid: string, date: Date) {
  const [todos, setTodos] = useState<null | Todo[]>(null)
  const [loading, setLoading] = useState(false)
  const dateWithoutTime = useMemo(() => moment(date).format('YYYY-MM-DD'), [
    date,
  ])

  useEffect(() => {
    setLoading(true)
    const todosRef = ref(db, `user/${uid}/todos/date/${dateWithoutTime}`)

    const unsubscribe = onValue(todosRef, (snapshot) => {
      const todos = snapshot.val()
      if (todos !== null) {
        setTodos(todos)
      } else {
        setTodos([])
      }
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [uid, date])

  const addTodo = (content) => {
    const id = getNewId(todos)

    set(ref(db, `user/${uid}/todos/date/${dateWithoutTime}`), [
      ...todos,
      {
        id,
        content: content,
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

const getNewId = (todos) => {
  if (todos.length === 0) return 1
  else return todos[todos.length - 1].id + 1
}
