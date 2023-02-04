import { ChangeEvent, useState } from 'react'
import moment from 'moment'
import Calendar from 'react-calendar'
import { Controller, useForm } from 'react-hook-form'
import 'react-calendar/dist/Calendar.css'

import { TiDelete } from 'react-icons/ti'
import { MdOutlineAddCircleOutline } from 'react-icons/md'

import { useAuthState, useTodos } from 'hooks'
import Loading from 'components/Loading'

function HomePage() {
  const [date, setDate] = useState<Date | null>(new Date())
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
        />
      </div>

      <div className="w-5/12 border border-gray-400">
        <div className="p-6 pb-0 text-gray-900 font-semibold text-2xl">
          {moment(date).format('YYYY년 MM월 DD일')}
        </div>

        <div className="flex flex-col p-6 overflow-auto align-center h-[calc(100%-56px)]">
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
                            }  focus:outline-none focus:border-blue-600`}
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
            className="flex gap-2 items-center"
          >
            <input
              placeholder="무엇을 할 건가요?"
              className="w-full px-2 py-1 border border-gray-300 rounded"
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
