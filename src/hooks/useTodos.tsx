import { useEffect, useState } from 'react'
import { ref, onValue, get, child, set } from 'firebase/database'

import { db } from 'firebaseConfig'
import { Todo } from 'types'

export function useTodos(uid: string, date: Date) {
  const [todos, setTodos] = useState<null | Todo[]>(null)

  useEffect(() => {
    const dbRef = ref(db)
    const todosRef = ref(db, `user/${uid}/todos/date/${date}`)

    const getData = async () =>
      get(child(dbRef, `user/${uid}/todos/date/${date}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setTodos(snapshot.val())
        } else {
          setTodos([])
        }
      })
    getData()

    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        setTodos(data)
      } else {
        setTodos([])
      }
    })

    return () => {
      getData()
      unsubscribe()
    }
  }, [uid, date])

  const addTodo = (data) => {
    set(ref(db, `user/${uid}/todos/date/${date}`), [
      ...todos,
      {
        id: todos.length + 1,
        content: data.new,
        completed: false,
      },
    ])
  }

  const deleteTodo = (id) => {
    set(ref(db, `user/${uid}/todos/date/${date}`), [
      ...todos.filter((todo) => todo.id !== id),
    ])
  }

  return { todos, addTodo, deleteTodo }
}
