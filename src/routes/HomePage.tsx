import { ChangeEvent, useState } from 'react'
import moment from 'moment'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { ref, set, update } from 'firebase/database'

import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { TiDelete } from 'react-icons/ti'
import { useForm } from 'react-hook-form'

import { db } from 'firebaseConfig'
import { useAuthState, useTodos } from 'hooks'

function HomePage() {
  const [date, setDate] = useState<Date | null>(new Date())
  const { user } = useAuthState()
  const { todos, addTodo, deleteTodo } = useTodos(user?.uid, date)

  const {
    register: todoRegister,
    handleSubmit: todoHandleSubmit,
    formState: { errors: todoErrors },
  } = useForm()

  const {
    register: addItemRegister,
    handleSubmit: addItemHandleSubmit,
    reset: addItemReset,
    formState: { errors: addErrors },
  } = useForm()

  const handleDateChange = (date: Date) => {
    setDate(date)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    set(ref(db, `user/${user?.uid}/todos/date/${date}`), [
      ...todos.map((todo) => {
        if (`todo${todo.id}` === name) {
          return {
            ...todo,
            content: value,
          }
        }
        return todo
      }),
    ])
  }

  const handleAddClick = (data: any) => {
    addTodo(data)
    addItemReset()
  }

  const handleDeleteClick = (e, id) => {
    e.preventDefault()
    deleteTodo(id)
  }

  const handleCheckChange = (e) => {
    const { checked, name } = e.target

    update(ref(db, `user/${user?.uid}/todos/date/${date}`), [
      ...todos.map((todo) => {
        if (`todo${todo.id}` === name) {
          return {
            ...todo,
            completed: checked,
          }
        }
        return todo
      }),
    ])
  }

  return (
    <div className="flex justify-center p-12 gap-4 h-screen w-4xl">
      <div className="">
        <Calendar
          onChange={handleDateChange}
          value={date}
          locale="ko"
          formatDay={(_, date) => moment(date).format('DD')}
          minDetail="month"
          maxDetail="month"
          showNeighboringMonth={false}
        />
      </div>
      <div className="w-6/12 p-6 border border-gray-300">
        <div className="text-gray-900 font-semibold text-2xl">
          {moment(date).format('YYYY년 MM월 DD일')}
        </div>

        <div className="flex flex-col p-4 h-full overflow-auto">
          {todos?.map(({ id, content, completed }) => (
            <div
              key={content}
              className="flex justify-between items-center p-2"
            >
              <div className="flex justify-center">
                <form>
                  <input
                    type="checkbox"
                    checked={completed}
                    name={content}
                    onChange={handleCheckChange}
                    className={`appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`}
                  />
                  <input
                    defaultValue={content}
                    {...todoRegister(`todo${id}`, {
                      required: true,
                      onChange,
                    })}
                  />
                  <button onClick={(e) => handleDeleteClick(e, id)}>
                    <TiDelete size="24px" />
                  </button>
                </form>
              </div>
            </div>
          ))}

          {/* Add item */}
          <form
            onSubmit={addItemHandleSubmit(handleAddClick)}
            className="flex gap-2 items-center"
          >
            <input
              placeholder="enter..."
              className=" px-2 py-1 border border-gray-300"
              {...addItemRegister('new', { required: true })}
            />
            <button type="submit" className="cursor-pointer">
              <MdOutlineAddCircleOutline className="text-2xl" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HomePage
