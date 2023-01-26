import { useState } from 'react'
import moment from 'moment'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { TiDelete } from 'react-icons/ti'
import { useForm } from 'react-hook-form'

function HomePage() {
  const [value, onDateChange] = useState(new Date())

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onChange = (e: any) => {
    //TODO: api 보내기
  }

  const onAddClick = (data: any) => {}

  const onDeleteClick = (e: any) => {
    e.preventDefafult()
  }

  return (
    <div className="flex justify-center p-12 gap-4 h-screen w-4xl">
      <div className="">
        <Calendar
          onChange={onDateChange}
          value={value}
          locale="ko"
          formatDay={(_, date) => moment(date).format('DD')}
          minDetail="month"
          maxDetail="month"
          showNeighboringMonth={false}
        />
      </div>
      <div className="w-6/12 p-6 border border-gray-300">
        <div className="text-gray-900 font-semibold text-2xl">
          {moment(value).format('YYYY년 MM월 DD일')}
        </div>

        <div className="flex flex-col p-4 h-full overflow-auto">
          {sampleList?.map(({ id, name, completed }) => (
            <div className="flex justify-between items-center p-2">
              <div className="flex justify-center">
                <form>
                  <input
                    className={`appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`}
                    type="checkbox"
                    id="flexCheckChecked"
                    checked={completed}
                  />
                  <input
                    defaultValue={name}
                    {...register(`todo${id}`, {
                      required: true,
                      onChange,
                    })}
                  />
                  <button onClick={onDeleteClick}>
                    <TiDelete size="24px" />
                  </button>
                </form>
              </div>
            </div>
          ))}

          {/* Add list */}
          <form
            onSubmit={handleSubmit(onAddClick)}
            className="flex gap-2 items-center"
          >
            <input
              placeholder="enter..."
              className=" px-2 py-1 border border-gray-300"
              {...register('new', { required: true })}
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

const sampleList = [
  { id: 1, name: '테스트1', completed: true },
  { id: 2, name: '테스트2', completed: false },
  { id: 3, name: '테스트3', completed: true },
  { id: 4, name: '테스트4', completed: false },
  { id: 5, name: '테스트5', completed: true },
  { id: 6, name: '테스트6', completed: false },
  { id: 7, name: '테스트7', completed: true },
  { id: 8, name: '테스트8', completed: false },
  { id: 9, name: '테스트9', completed: true },
  { id: 10, name: '테스트10', completed: false },
  { id: 11, name: '테스트11', completed: true },
]
