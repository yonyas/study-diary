import { ChangeEvent, useState } from 'react'
import moment from 'moment'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { TiDelete } from 'react-icons/ti'
import { useForm } from 'react-hook-form'

import { useAuthState, useTodos } from 'hooks'

function HomePage() {
  const [date, setDate] = useState<Date | null>(new Date())
  const { user } = useAuthState()
  const { todos, addTodo, updatedTodo, deleteTodo } = useTodos(user?.uid, date)
  console.log('todos: ', todos)

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

  const onContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    updatedTodo(name, value, false)
  }

  const handleAddClick = (data: any) => {
    addTodo(data)
    addItemReset()
  }

  const handleDeleteClick = (e, id) => {
    e.preventDefault()
    deleteTodo(id)
  }

  const handleCompleteChange = (e, content) => {
    const { name: id, checked } = e.target

    updatedTodo(id, content, checked)
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
          {todos?.map(({ id, content, completed }) => {
            console.log('completed: ', completed)
            return (
              <div key={id} className="flex justify-between items-center p-2">
                <div className="flex justify-center">
                  <form>
                    <input
                      type="checkbox"
                      name={id.toString()}
                      checked={completed}
                      onChange={(e) => handleCompleteChange(e, content)}
                      className={`appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`}
                    />
                    <input
                      defaultValue={content}
                      {...todoRegister(id.toString(), {
                        required: true,
                        onChange: onContentChange,
                      })}
                    />
                    <button onClick={(e) => handleDeleteClick(e, id)}>
                      <TiDelete size="24px" />
                    </button>
                  </form>
                </div>
              </div>
            )
          })}

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
