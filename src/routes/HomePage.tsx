import { ChangeEvent, useRef, useState } from 'react'
import moment from 'moment'
import Calendar from 'react-calendar'
import { Controller, useForm } from 'react-hook-form'
import 'react-calendar/dist/Calendar.css'

import { TiDelete } from 'react-icons/ti'
import { MdOutlineAddCircleOutline } from 'react-icons/md'

import { signOut, useAuthState, useScrollToBottom, useTodos } from 'hooks'
import Loading from 'components/Loading'

function HomePage() {
  const [date, setDate] = useState<Date | null>(new Date())
  const $todosRef = useRef<HTMLDivElement>(null)

  const { user } = useAuthState()
  const { todos, loading, addTodo, updatedTodo, deleteTodo } = useTodos(
    user?.uid,
    date,
  )

  const { control } = useForm()

  const {
    register: addItemRegister,
    handleSubmit: addItemHandleSubmit,
    reset: addItemReset,
  } = useForm()

  const handleDateChange = (date: Date) => {
    setDate(date)
    addItemReset()
  }

  const onContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: id, value } = e.target

    updatedTodo(id, value, false)
  }

  const handleAddClick = (data: { new: string }) => {
    const { new: content } = data
    if (content.trim() === '') return

    addTodo(content)
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

  const handleLogoutClick = () => {
    signOut()
    window.location.reload()
  }

  useScrollToBottom($todosRef, todos)

  return (
    <div>
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-indigo-200 z-10">
        <div className="flex h-full justify-between items-center px-4 ">
          <div className="font-bold text-2xl text-indigo-800">Study Diary</div>
          <div className="flex justify-between items-center gap-4">
            <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {user?.displayName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <span onClick={handleLogoutClick} className="cursor-pointer">
              Log out
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex justify-center gap-4 top-10 relative p-10 w-full h-full">
        <div className="">
          <Calendar
            onChange={handleDateChange}
            value={date}
            locale="ko"
            formatDay={(_, date) => moment(date).format('DD')}
            minDetail="month"
            maxDetail="month"
          />
        </div>

        <div className="relative w-5/12 border border-gray-400 h-[calc(100vh-120px)]">
          <div className="p-6 text-gray-900 font-semibold text-2xl">
            {moment(date).format('YYYY년 MM월 DD일')}
          </div>

          <div
            ref={$todosRef}
            className="flex flex-col px-6 overflow-auto align-center h-[calc(100%-140px)]"
          >
            {loading ? (
              <Loading size={'20px'} />
            ) : (
              todos?.map(({ id, content, completed }) => {
                return (
                  <div
                    key={id}
                    className="flex justify-between items-center mb-4 w-full"
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                      }}
                      className="flex items-center gap-4 grow-1 shrink-0 min-width-[calc(100%-2rem)] w-[calc(100%-2rem)]"
                    >
                      <input
                        type="checkbox"
                        name={id.toString()}
                        checked={completed}
                        onChange={(e) => handleCompleteChange(e, content)}
                        className={`appearance-none h-4 w-4 border border-gray-400 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer`}
                      />
                      <Controller
                        control={control}
                        name={id.toString() + content}
                        render={({ field: { onChange } }) => {
                          return (
                            <input
                              name={id.toString()}
                              value={content}
                              onChange={(e) => {
                                onContentChange(e)
                                onChange(e.target.value)
                              }}
                              className={`rounded px-2 py-1 w-full ${
                                completed && 'text-gray-500 line-through'
                              } focus:outline-none focus:border-blue-600`}
                            />
                          )
                        }}
                      />
                    </form>
                    <button onClick={(e) => handleDeleteClick(e, id)}>
                      <TiDelete size="24px" />
                    </button>
                  </div>
                )
              })
            )}

            {/* Add item */}
            <form
              onSubmit={addItemHandleSubmit(handleAddClick)}
              className="flex gap-2 items-center absolute bottom-0 left-0 w-full bg-white p-4 border-t border-gray-300"
            >
              <input
                placeholder="무엇을 할 건가요?"
                className="w-full line-height-1.2 px-2 py-1 border border-gray-300 rounded"
                {...addItemRegister('new', { required: true })}
              />
              <button type="submit" className="cursor-pointer">
                <MdOutlineAddCircleOutline className="text-2xl" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
