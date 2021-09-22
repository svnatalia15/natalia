import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Head from './head'

const Dummy = () => {
  const listItems = []
  const [ items, setItems ] = useState(listItems)
  
  const newItem = ''
  const [ item, setItem ] = useState(newItem)

  useEffect(() => {
    axios
    .get("/tasks")
    .then(result => {
      setItems(result.data)
    })
    .catch(error => console.log(error));
  },[items]);

  const add = () => {
    axios.post('/tasks', {
      action: item,
      status: 'Not Done'
    })
    .then(response => {
      setItems(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }

  const update = (index, status) => {
    console.log(index, status)
    axios.put(`/tasks/${index}`, {
      status: status
    })
    .then(response => {
      setItems(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  return (
    <div>
      <Head title="Hello" />
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">To Do List</h1>
            <div className="flex mt-4">              
              <input 
              className="py-2 px-3 focus:ring-indigo-500 border focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
              placeholder="Add Task"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              />
              <span className="button inline-flex items-center px-3 rounded-r-md border-2 border-indigo-500 bg-white text-gray-500 text-sm hover:text-white hover:bg-indigo-500">
              <button
                type="button"
                className="hover:bg-indigo-500"
                onClick={add}
              >
                Add
              </button>
              </span>
            </div>
          </div>
          <div>
            {items.map((i, index) => {
              return (
                <div className={`flex mb-4 items-center rounded-md py-2 px-3 ${i.status === 'Done' ? 'bg-indigo-200': 'bg-indigo-600'}`} key={index}>
                  <div className="flex items-center justify-between flex-wrap">
                    <p className={`${i.status === 'Done' ? 'text-grey': 'text-white'}`}>
                      {i.action}
                    </p>
                    <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                      <button
                        type="button"
                        className={`flex-no-shrink p-2 ml-4 relative mr-2 border-2 rounded ${i.status === 'Done' ? 'bg-blue-200 hover:bg-blue-400': 'bg-green-500 hover:bg-green-700'} `}
                        onClick={() => update(index, i.status === "Done" ? "Not Done":"Done")}
                      >
                        {i.status === "Done" ? 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        }
                      </button>
                      <button
                        type="button"
                        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red bg-red-500 hover:text-white hover:bg-red-700 "
                        onClick={() => setItems(items.filter(listItem => listItem.action !== i.action))}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>                    
                  </div>                  
                </div>
              )
            })}            
          </div>
        </div>
      </div>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
